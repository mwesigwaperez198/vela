import { NextResponse } from 'next/server';
import { cmsConfigured } from '@/lib/env';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    commerceConfigured: cmsConfigured(),
    webhookConfigured: Boolean(process.env.PAYMENT_WEBHOOK_SECRET),
    webhookEndpoint: '/api/webhooks/[provider]',
  });
}
