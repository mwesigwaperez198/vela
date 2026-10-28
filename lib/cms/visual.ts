import 'server-only';
import { requireEnv } from '@/lib/env';
import type { CampaignHero, VisualAsset } from '@/lib/types';

/**
 * Visual CMS adapter (Strapi v5, flat REST responses).
 * Expected content types:
 *   editorial-assets: sku, collection_slug, image (media), video (media)
 *   campaigns: slug, headline, subheadline, cta_label, cta_href,
 *              text_tone, alignment, poster (media), video (media)
 */

interface StrapiMedia {
  url: string;
  alternativeText?: string | null;
}

interface AssetRow {
  sku: string;
  image?: StrapiMedia | null;
  video?: StrapiMedia | null;
}

interface CampaignRow {
  slug: string;
  headline: string;
  subheadline?: string | null;
  cta_label?: string | null;
  cta_href?: string | null;
  text_tone?: 'light' | 'dark' | null;
  alignment?: 'left' | 'center' | 'right' | null;
  poster?: StrapiMedia | null;
  video?: StrapiMedia | null;
}

const REVALIDATE_SECONDS = 60;

const absolute = (url: string): string =>
  /^https?:\/\//.test(url) ? url : `${requireEnv('VISUAL_CMS_URL')}${url}`;

async function strapi<T>(query: string, tag: string): Promise<T[]> {
  const res = await fetch(`${requireEnv('VISUAL_CMS_URL')}/api/${query}`, {
    headers: { Authorization: `Bearer ${requireEnv('VISUAL_CMS_TOKEN')}` },
    next: { revalidate: REVALIDATE_SECONDS, tags: [tag] },
  });
  if (!res.ok) throw new Error(`Visual CMS responded ${res.status} for ${query}`);
  const json = (await res.json()) as { data?: T[] };
  return json.data ?? [];
}

const toAsset = (row: AssetRow): VisualAsset | null =>
  row.image
    ? {
        sku: row.sku,
        image: absolute(row.image.url),
        imageAlt: row.image.alternativeText ?? undefined,
        videoUrl: row.video ? absolute(row.video.url) : undefined,
      }
    : null;

export async function fetchVisualAssetsByCollection(slug: string): Promise<VisualAsset[]> {
  const rows = await strapi<AssetRow>(
    `editorial-assets?filters[collection_slug][$eq]=${encodeURIComponent(slug)}` +
      `&populate[0]=image&populate[1]=video&pagination[pageSize]=100`,
    'visual-assets',
  );
  return rows.map(toAsset).filter((a): a is VisualAsset => a !== null);
}

export async function fetchVisualAssetBySku(sku: string): Promise<VisualAsset | null> {
  const rows = await strapi<AssetRow>(
    `editorial-assets?filters[sku][$eq]=${encodeURIComponent(sku)}&populate[0]=image&populate[1]=video`,
    'visual-assets',
  );
  const first = rows[0];
  return first ? toAsset(first) : null;
}

export async function fetchCampaignHero(slug: string): Promise<CampaignHero | null> {
  const rows = await strapi<CampaignRow>(
    `campaigns?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[0]=poster&populate[1]=video`,
    'campaigns',
  );
  const row = rows[0];
  if (!row?.poster) return null;
  return {
    slug: row.slug,
    headline: row.headline,
    subheadline: row.subheadline ?? undefined,
    ctaLabel: row.cta_label ?? 'Discover',
    ctaHref: row.cta_href ?? '/collections/new-arrivals',
    posterUrl: absolute(row.poster.url),
    videoUrl: row.video ? absolute(row.video.url) : undefined,
    textTone: row.text_tone ?? 'light',
    alignment: row.alignment ?? 'left',
  };
}
