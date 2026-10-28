import 'server-only';
import { createHmac, timingSafeEqual } from 'node:crypto';
import type { PaymentEvent, PaymentEventType } from '@/lib/types';

export interface ProviderAdapter {
  verify(rawBody: string, headers: Headers): boolean;
  parse(rawBody: string): PaymentEvent;
}

const EVENT_TYPES: readonly PaymentEventType[] = [
  'payment.succeeded',
  'payment.failed',
  'payment.refunded',
];

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

/**
 * Generic adapter: HMAC-SHA256 (hex) of the raw body in the x-signature header,
 * payload { id, type, reference, amount }. Use it behind a gateway you control.
 * Register a dedicated adapter below for each real provider (mobile money, card
 * processor) because each signs and shapes its payloads differently.
 */
const genericHmac: ProviderAdapter = {
  verify(rawBody, headers) {
    const secret = process.env.PAYMENT_WEBHOOK_SECRET;
    const signature = headers.get('x-signature');
    if (!secret || !signature) return false;
    const expected = createHmac('sha256', secret).update(rawBody).digest('hex');
    return safeEqual(expected, signature);
  },
  parse(rawBody) {
    const body = JSON.parse(rawBody) as {
      id?: string;
      type?: string;
      reference?: string;
      amount?: number;
    };
    if (!body.id || !body.reference || typeof body.amount !== 'number') {
      throw new Error('Malformed payment payload');
    }
    if (!EVENT_TYPES.includes(body.type as PaymentEventType)) {
      throw new Error(`Unsupported event type ${body.type}`);
    }
    return {
      provider: 'generic',
      eventId: body.id,
      type: body.type as PaymentEventType,
      orderReference: body.reference,
      amountUGX: Math.round(body.amount),
    };
  },
};

const REGISTRY: Record<string, ProviderAdapter> = {
  generic: genericHmac,
};

export const getProviderAdapter = (provider: string): ProviderAdapter | undefined =>
  REGISTRY[provider];
