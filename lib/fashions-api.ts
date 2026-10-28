import 'server-only';
import { cache } from 'react';
import { fetchCampaignHero, fetchVisualAssetBySku, fetchVisualAssetsByCollection } from '@/lib/cms/visual';
import { fetchCommerceCollection, fetchCommerceProduct } from '@/lib/cms/commerce';
import { cmsConfigured } from '@/lib/env';
import { FIXTURE_HERO, FIXTURE_PRODUCTS } from '@/lib/fixtures';
import type { CampaignHero, CommerceProduct, UnifiedProduct, VisualAsset } from '@/lib/types';

/** Fixtures are allowed in development only; production fails loudly on missing config. */
const useFixtures = (): boolean => process.env.NODE_ENV !== 'production' && !cmsConfigured();

function zip(product: CommerceProduct, asset: VisualAsset | undefined): UnifiedProduct {
  const inventoryCount = product.variants.reduce((sum, v) => sum + v.quantity, 0);
  return {
    id: product.id,
    sku: product.sku,
    handle: product.handle,
    title: product.title,
    description: product.description,
    priceUGX: product.priceUGX,
    inventoryCount,
    editorialImage: asset?.image ?? '',
    editorialImageAlt: asset?.imageAlt,
    campaignVideoUrl: asset?.videoUrl,
    sizes: [...new Set(product.variants.map((v) => v.size))],
    variants: product.variants,
  };
}

/** Joins Visual CMS media and Commerce Engine data on the product SKU. */
export const getEditorialCollection = cache(async (slug: string): Promise<UnifiedProduct[]> => {
  if (useFixtures()) return FIXTURE_PRODUCTS;

  const [assets, products] = await Promise.all([
    fetchVisualAssetsByCollection(slug),
    fetchCommerceCollection(slug),
  ]);
  const assetsBySku = new Map(assets.map((a) => [a.sku, a]));
  return products.map((p) => zip(p, assetsBySku.get(p.sku)));
});

export const getProductByHandle = cache(async (handle: string): Promise<UnifiedProduct | null> => {
  if (useFixtures()) return FIXTURE_PRODUCTS.find((p) => p.handle === handle) ?? null;

  const product = await fetchCommerceProduct(handle);
  if (!product) return null;
  return zip(product, (await fetchVisualAssetBySku(product.sku)) ?? undefined);
});

export const getCampaignHero = cache(async (slug: string): Promise<CampaignHero | null> => {
  if (useFixtures()) return FIXTURE_HERO;
  return fetchCampaignHero(slug);
});
