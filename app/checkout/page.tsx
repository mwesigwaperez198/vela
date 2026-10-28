'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/components/CartProvider';
import { formatUGX } from '@/lib/format';

export default function CheckoutPage() {
  const { lines, total } = useCart();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: 'Kampala',
    country: 'Uganda',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate checkout - in production would integrate with payment provider
    setTimeout(() => {
      alert('Order placed successfully! We will contact you via WhatsApp/Email.');
      setLoading(false);
    }, 1500);
  };

  if (lines.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 lg:px-10">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-serif text-5xl md:text-7xl mb-6">Checkout</h1>
          <p className="text-neutral-600 font-light mb-8">Your bag is empty</p>
          <Link href="/collections/new-arrivals" className="border-b border-luxuryBlack pb-1 text-[11px] tracking-editorial uppercase">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 lg:px-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="font-serif text-5xl md:text-7xl">Checkout</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <h2 className="font-serif text-2xl mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-200 focus:outline-none focus:border-luxuryBlack"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number (WhatsApp)"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-200 focus:outline-none focus:border-luxuryBlack"
                  />
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl mb-6">Shipping Address</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="px-4 py-3 border border-neutral-200 focus:outline-none focus:border-luxuryBlack"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="px-4 py-3 border border-neutral-200 focus:outline-none focus:border-luxuryBlack"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Address"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-200 focus:outline-none focus:border-luxuryBlack"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="px-4 py-3 border border-neutral-200 focus:outline-none focus:border-luxuryBlack"
                    />
                    <input
                      type="text"
                      placeholder="Country"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="px-4 py-3 border border-neutral-200 focus:outline-none focus:border-luxuryBlack"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-2xl mb-6">Payment</h2>
                <div className="p-4 border border-neutral-200 bg-neutral-50">
                  <p className="text-sm font-light">Payment on delivery or via Mobile Money. We will contact you to confirm payment details.</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-luxuryBlack text-white py-4 text-[11px] tracking-editorial uppercase hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-neutral-50 p-6 sticky top-32">
              <h2 className="font-serif text-2xl mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {lines.map((line) => (
                  <div key={line.variantId} className="flex gap-4">
                    <div className="relative w-16 h-20 flex-shrink-0 bg-neutral-200">
                      <div className="absolute -top-2 -right-2 bg-luxuryBlack text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                        {line.quantity}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{line.title}</p>
                      <p className="text-xs text-neutral-600">Size: {line.size}</p>
                      <p className="text-sm mt-1">{formatUGX(line.unitPriceUGX * line.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-3 pt-6 border-t border-neutral-200 mb-6">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatUGX(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
              </div>
              <div className="pt-6 border-t border-neutral-200">
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>{formatUGX(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
