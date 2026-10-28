export type Currency = 'UGX';

/* ---------- Commerce engine schema ---------- */

export interface ProductVariant {
  id: string;
  sku: string;
  size: string;
  fabric?: string;
  priceUGX: number;
  quantity: number;
  available: boolean;
}

export interface CommerceProduct {
  id: string;
  /** Product-level SKU. This is the join key against the Visual CMS. */
  sku: string;
  handle: string;
  title: string;
  description: string;
  priceUGX: number;
  variants: ProductVariant[];
}

/* ---------- Editorial / Visual CMS schema ---------- */

export interface VisualAsset {
  sku: string;
  image: string;
  imageAlt?: string;
  videoUrl?: string;
}

export interface CampaignHero {
  slug: string;
  headline: string;
  subheadline?: string;
  ctaLabel: string;
  ctaHref: string;
  posterUrl: string;
  videoUrl?: string;
  textTone: 'light' | 'dark';
  alignment: 'left' | 'center' | 'right';
}

/* ---------- Unified storefront schema ---------- */

export interface UnifiedProduct {
  id: string;
  sku: string;
  handle: string;
  title: string;
  description: string;
  priceUGX: number;
  inventoryCount: number;
  editorialImage: string; // Visual CMS
  editorialImageAlt?: string; // Visual CMS
  campaignVideoUrl?: string; // Visual CMS
  sizes: string[]; // Commerce engine
  variants: ProductVariant[]; // Commerce engine
}

/* ---------- Cart & checkout ---------- */

export interface CartLine {
  variantId: string;
  handle: string;
  title: string;
  size: string;
  image: string;
  unitPriceUGX: number;
  quantity: number;
}

export interface CheckoutRequest {
  lines: { variantId: string; quantity: number }[];
}

export interface CheckoutResponse {
  checkoutUrl: string;
  totalUGX: number;
}

/* ---------- Payments ---------- */

export type PaymentEventType = 'payment.succeeded' | 'payment.failed' | 'payment.refunded';

export interface PaymentEvent {
  provider: string;
  eventId: string;
  type: PaymentEventType;
  /** Our order / cart reference, echoed back by the payment provider. */
  orderReference: string;
  amountUGX: number;
}
