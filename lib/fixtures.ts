import type { CampaignHero, UnifiedProduct } from '@/lib/types';

/** Development-only data so the storefront renders before CMS credentials exist. */
const make = (
  n: number,
  title: string,
  priceUGX: number,
  fabric: string,
  sizes: string[],
): UnifiedProduct => ({
  id: `fixture-${n}`,
  sku: `DV-${1000 + n}`,
  handle: title.toLowerCase().replace(/\s+/g, '-'),
  title,
  description: `${title} in ${fabric.toLowerCase()}, cut in Kampala.`,
  priceUGX,
  inventoryCount: sizes.length * 3,
  editorialImage: '',
  sizes,
  variants: sizes.map((size, i) => ({
    id: `gid://shopify/ProductVariant/${n}${i}`,
    sku: `DV-${1000 + n}-${size}`,
    size,
    fabric,
    priceUGX,
    quantity: 3,
    available: true,
  })),
});

export const FIXTURE_PRODUCTS: UnifiedProduct[] = [
  make(1, 'Wool Cape Coat', 4_850_000, 'Virgin wool', ['XS', 'S', 'M', 'L']),
  make(2, 'Silk Slip Dress', 3_200_000, 'Mulberry silk', ['XS', 'S', 'M']),
  make(3, 'Tailored Trouser', 1_950_000, 'Wool gabardine', ['S', 'M', 'L', 'XL']),
  make(4, 'Cashmere Knit', 2_700_000, 'Cashmere', ['S', 'M', 'L']),
  make(5, 'Leather Belt Bag', 3_600_000, 'Calf leather', ['One size']),
  make(6, 'Bark Cloth Blazer', 3_900_000, 'Bark cloth blend', ['S', 'M', 'L']),
];

export const FIXTURE_HERO: CampaignHero = {
  slug: 'home',
  headline: 'The African Luxury Edit',
  subheadline: 'Heritage reimagined. Craft with purpose.',
  ctaLabel: 'Visit Store',
  ctaHref: '/collections/new-arrivals',
  posterUrl: '',
  textTone: 'dark',
  alignment: 'left',
};
