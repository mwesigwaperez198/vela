'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '@/components/CartProvider';
import { formatUGX } from '@/lib/format';
import type { CheckoutRequest, CheckoutResponse } from '@/lib/types';

export function CartDrawer() {
  const { lines, totalUGX, isOpen, close, setQuantity } = useCart();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, close]);

  async function checkout() {
    setBusy(true);
    setError(null);
    try {
      const body: CheckoutRequest = {
        lines: lines.map((l) => ({ variantId: l.variantId, quantity: l.quantity })),
      };
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = (await res.json()) as CheckoutResponse & { error?: string };
      if (!res.ok) throw new Error(data.error ?? 'Checkout could not start.');
      window.location.assign(data.checkoutUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Checkout could not start. Try again.');
      setBusy(false);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[60] bg-luxuryBlack/40"
          />
          <motion.aside
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-white"
          >
            <div className="flex items-center justify-between px-6 py-5 text-[11px] tracking-editorial uppercase">
              <h2>Bag</h2>
              <button type="button" onClick={close}>Close</button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-start justify-center gap-4 px-6">
                <p className="font-serif text-3xl">Your bag is empty.</p>
                <Link href="/collections/new-arrivals" onClick={close} className="border-b border-luxuryBlack pb-1 text-[11px] tracking-editorial uppercase">
                  Shop new arrivals
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-neutral-200 overflow-y-auto px-6">
                  {lines.map((line) => (
                    <li key={line.variantId} className="flex gap-4 py-5">
                      <div className="relative h-28 w-20 shrink-0 bg-neutral-100">
                        {line.image && <Image src={line.image} alt="" fill sizes="80px" className="object-cover" />}
                      </div>
                      <div className="flex flex-1 flex-col justify-between text-xs">
                        <div className="space-y-1">
                          <p className="tracking-editorial uppercase">{line.title}</p>
                          <p className="text-neutral-500">Size {line.size}</p>
                          <p>{formatUGX(line.unitPriceUGX)}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity(line.variantId, line.quantity - 1)}>−</button>
                          <span aria-live="polite">{line.quantity}</span>
                          <button type="button" aria-label="Increase quantity" onClick={() => setQuantity(line.variantId, line.quantity + 1)}>+</button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="space-y-4 border-t border-neutral-200 px-6 py-6">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatUGX(totalUGX)}</span>
                  </div>
                  {error && <p role="alert" className="text-xs text-red-700">{error}</p>}
                  <button
                    type="button"
                    onClick={checkout}
                    disabled={busy}
                    className="w-full bg-luxuryBlack py-4 text-[11px] font-light tracking-extra-wide text-white uppercase disabled:opacity-60"
                  >
                    {busy ? 'Preparing checkout' : 'Checkout'}
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
