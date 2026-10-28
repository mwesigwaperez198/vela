import 'server-only';
import type { PaymentEvent } from '@/lib/types';

/**
 * Integration point for verified payment events.
 * Providers retry on non-2xx, so handlers must be idempotent: key on event.eventId
 * in a durable store before applying side effects.
 */
export async function handlePaymentEvent(event: PaymentEvent): Promise<void> {
  switch (event.type) {
    case 'payment.succeeded':
      // Mark the order paid in the commerce engine, then trigger fulfilment email.
      break;
    case 'payment.failed':
      // Release reserved stock and notify the customer.
      break;
    case 'payment.refunded':
      // Record the refund against the order.
      break;
  }
  console.info('[payments]', event.provider, event.type, event.orderReference, event.amountUGX);
}
