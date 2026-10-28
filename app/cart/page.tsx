'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/components/CartProvider';
import { formatUGX } from '@/lib/format';

export default function CartPage() {
  const { lines, remove, updateQuantity, total, clear } = useCart();

  if (lines.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 lg:px-10">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-serif text-5xl md:text-7xl mb-6">Your Bag</h1>
          <p className="text-neutral-600 font-light mb-8">Your bag is empty</p>
          <Link href="/collections/new-arrivals" className="border-b border-luxuryBlack pb-1 text-[11px] tracking-editorial uppercase hover:opacity-60 transition-opacity">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 lg:px-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 flex items-end justify-between">
          <h1 className="font-serif text-5xl md:text-7xl">Your Bag</h1>
          <button onClick={clear} className="text-[11px] tracking-editorial uppercase text-neutral-500 hover:text-luxuryBlack">
            Clear Bag
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-6">
            {lines.map((line) => (
              <div key={line.variantId} className="flex gap-6 pb-6 border-b border-neutral-100">
                <div className="relative w-32 h-40 flex-shrink-0 bg-neutral-100">
                  <Image src={line.image} alt={line.title} fill className="object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <Link href={`/products/${line.handle}`} className="font-serif text-xl hover:opacity-70 transition-opacity">
                      {line.title}
                    </Link>
                    <p className="text-sm text-neutral-600 mt-1">Size: {line.size}</p>
                    <p className="text-sm mt-2">{formatUGX(line.unitPriceUGX)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button onClick={() => updateQuantity(line.variantId, Math.max(0, line.quantity - 1))} className="text-lg">-</button>
                      <span className="text-sm w-8 text-center">{line.quantity}</span>
                      <button onClick={() => updateQuantity(line.variantId, line.quantity + 1)} className="text-lg">+</button>
                    </div>
                    <button onClick={() => remove(line.variantId)} className="text-[11px] tracking-editorial uppercase text-neutral-500 hover:text-luxuryBlack">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-4">
            <div className="bg-neutral-50 p-6 sticky top-32">
              <h2 className="font-serif text-2xl mb-6">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatUGX(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span className="text-neutral-500">Calculated at checkout</span>
                </div>
              </div>
              <div className="pt-6 border-t border-neutral-200 mb-6">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{formatUGX(total)}</span>
                </div>
              </div>
              <Link href="/checkout" className="block w-full bg-luxuryBlack text-white text-center py-4 text-[11px] tracking-editorial uppercase hover:opacity-90 transition-opacity">
                Proceed to Checkout
              </Link>
              <p className="text-xs text-neutral-500 text-center mt-4">Secure checkout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
