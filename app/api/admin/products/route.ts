import { NextResponse } from 'next/server';
import { getEditorialCollection } from '@/lib/fashions-api';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const slug = process.env.FEATURED_COLLECTION_SLUG ?? 'new-arrivals';
    const products = await getEditorialCollection(slug);
    return NextResponse.json({ products });
  } catch (error) {
    console.error('[admin/products]', error);
    return NextResponse.json({ error: 'Could not load products from the commerce engine.' }, { status: 502 });
  }
}
