import { NextResponse } from 'next/server';
import { createCheckout } from '@/lib/cms/commerce';
import { cmsConfigured } from '@/lib/env';
import type { CheckoutRequest } from '@/lib/types';

export const dynamic = 'force-dynamic';

const VARIANT_ID = /^gid:\/\/shopify\/ProductVariant\/[A-Za-z0-9_-]+={0,2}$/;

function parse(input: unknown): CheckoutRequest | null {
  if (typeof input !== 'object' || input === null || !('lines' in input)) return null;
  const { lines, note } = input as { lines: unknown; note?: unknown };
  if (!Array.isArray(lines) || lines.length === 0 || lines.length > 50) return null;

  const parsed: CheckoutRequest['lines'] = [];
  for (const line of lines as { variantId?: unknown; quantity?: unknown }[]) {
    if (
      typeof line.variantId !== 'string' ||
      !VARIANT_ID.test(line.variantId) ||
      typeof line.quantity !== 'number' ||
      !Number.isInteger(line.quantity) ||
      line.quantity < 1 ||
      line.quantity > 10
    ) {
      return null;
    }
    parsed.push({ variantId: line.variantId, quantity: line.quantity });
  }
  if (note !== undefined && (typeof note !== 'string' || note.length > 2000)) return null;
  return { lines: parsed, ...(typeof note === 'string' ? { note } : {}) };
}

export async function POST(request: Request) {
  if (!cmsConfigured()) {
    return NextResponse.json({ error: 'Checkout is not configured yet.' }, { status: 503 });
  }

  const body = parse(await request.json().catch(() => null));
  if (!body) return NextResponse.json({ error: 'Your bag contains invalid items.' }, { status: 400 });

  try {
    return NextResponse.json(await createCheckout(body));
  } catch (error) {
    console.error('[checkout]', error);
    return NextResponse.json({ error: 'Checkout is unavailable. Try again shortly.' }, { status: 502 });
  }
}
