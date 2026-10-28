import 'server-only';
import { requireEnv } from '@/lib/env';
import type { CheckoutRequest, CheckoutResponse, CommerceProduct, ProductVariant } from '@/lib/types';

/**
 * Commerce adapter (Shopify Storefront GraphQL).
 * Requirements on the Shopify side:
 *  - Store currency is UGX.
 *  - Product metafield custom.sku holds the product-level SKU shared with the Visual CMS
 *    (falls back to the product handle).
 *  - Storefront token has unauthenticated_read_product_inventory for stock counts.
 */

const API_VERSION = process.env.COMMERCE_API_VERSION ?? '2025-01';
const REVALIDATE_SECONDS = 60;

interface Money {
  amount: string;
  currencyCode: string;
}

interface VariantNode {
  id: string;
  sku: string | null;
  availableForSale: boolean;
  quantityAvailable: number | null;
  price: Money;
  selectedOptions: { name: string; value: string }[];
}

interface ProductNode {
  id: string;
  handle: string;
  title: string;
  description: string;
  skuMetafield: { value: string } | null;
  variants: { nodes: VariantNode[] };
}

const PRODUCT_FIELDS = /* GraphQL */ `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    skuMetafield: metafield(namespace: "custom", key: "sku") { value }
    variants(first: 50) {
      nodes {
        id
        sku
        availableForSale
        quantityAvailable
        price { amount currencyCode }
        selectedOptions { name value }
      }
    }
  }
`;

async function storefront<T>(
  query: string,
  variables: Record<string, unknown>,
  cacheable: boolean,
): Promise<T> {
  const res = await fetch(`${requireEnv('COMMERCE_CMS_URL')}/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': requireEnv('COMMERCE_STOREFRONT_TOKEN'),
    },
    body: JSON.stringify({ query, variables }),
    ...(cacheable
      ? { next: { revalidate: REVALIDATE_SECONDS, tags: ['commerce'] } }
      : { cache: 'no-store' as const }),
  });
  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };
  if (!res.ok || json.errors?.length || !json.data) {
    throw new Error(`Commerce engine error: ${json.errors?.[0]?.message ?? res.status}`);
  }
  return json.data;
}

function toUGX(money: Money): number {
  if (money.currencyCode !== 'UGX') {
    throw new Error(`Expected UGX pricing but the store returned ${money.currencyCode}`);
  }
  return Math.round(Number(money.amount));
}

const optionValue = (node: VariantNode, pattern: RegExp): string | undefined =>
  node.selectedOptions.find((o) => pattern.test(o.name))?.value;

function toVariant(node: VariantNode): ProductVariant {
  return {
    id: node.id,
    sku: node.sku ?? node.id,
    size: optionValue(node, /^size$/i) ?? 'One size',
    fabric: optionValue(node, /^(fabric|material)$/i),
    priceUGX: toUGX(node.price),
    quantity: node.quantityAvailable ?? 0,
    available: node.availableForSale,
  };
}

function toProduct(node: ProductNode): CommerceProduct {
  const variants = node.variants.nodes.map(toVariant);
  return {
    id: node.id,
    sku: node.skuMetafield?.value ?? node.handle,
    handle: node.handle,
    title: node.title,
    description: node.description,
    priceUGX: variants.length ? Math.min(...variants.map((v) => v.priceUGX)) : 0,
    variants,
  };
}

export async function fetchCommerceCollection(handle: string): Promise<CommerceProduct[]> {
  const data = await storefront<{ collection: { products: { nodes: ProductNode[] } } | null }>(
    `${PRODUCT_FIELDS}
     query Collection($handle: String!) {
       collection(handle: $handle) { products(first: 48) { nodes { ...ProductFields } } }
     }`,
    { handle },
    true,
  );
  return (data.collection?.products.nodes ?? []).map(toProduct);
}

export async function fetchCommerceProduct(handle: string): Promise<CommerceProduct | null> {
  const data = await storefront<{ product: ProductNode | null }>(
    `${PRODUCT_FIELDS}
     query Product($handle: String!) { product(handle: $handle) { ...ProductFields } }`,
    { handle },
    true,
  );
  return data.product ? toProduct(data.product) : null;
}

/** Prices are always recomputed by the commerce engine; client totals are never trusted. */
export async function createCheckout(request: CheckoutRequest): Promise<CheckoutResponse> {
  const data = await storefront<{
    cartCreate: {
      cart: { checkoutUrl: string; cost: { totalAmount: Money } } | null;
      userErrors: { message: string }[];
    };
  }>(
    `mutation CartCreate($lines: [CartLineInput!]!) {
       cartCreate(input: { lines: $lines }) {
         cart { checkoutUrl cost { totalAmount { amount currencyCode } } }
         userErrors { message }
       }
     }`,
    { lines: request.lines.map((l) => ({ merchandiseId: l.variantId, quantity: l.quantity })) },
    false,
  );
  const { cart, userErrors } = data.cartCreate;
  if (!cart || userErrors.length) {
    throw new Error(userErrors[0]?.message ?? 'Could not create checkout');
  }
  return { checkoutUrl: cart.checkoutUrl, totalUGX: toUGX(cart.cost.totalAmount) };
}
