import { NextResponse } from 'next/server';
import { handlePaymentEvent } from '@/lib/payments/handle-event';
import { getProviderAdapter } from '@/lib/payments/providers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/webhooks/:provider
 * Verifies the signature on the raw body, normalises the event, hands it to the handler.
 * Non-2xx responses make providers retry, so only return 5xx for retryable failures.
 */
export async function POST(request: Request, { params }: { params: Promise<{ provider: string }> }) {
  const { provider } = await params;
  const adapter = getProviderAdapter(provider);
  if (!adapter) return NextResponse.json({ error: 'Unknown provider' }, { status: 404 });

  const rawBody = await request.text();
  if (!adapter.verify(rawBody, request.headers)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  let event;
  try {
    event = adapter.parse(rawBody);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Bad payload' }, { status: 400 });
  }

  try {
    await handlePaymentEvent(event);
  } catch (error) {
    console.error('[webhook]', provider, event.eventId, error);
    return NextResponse.json({ error: 'Handler failed' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
