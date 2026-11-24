'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const links = [
  { title: 'Dashboard', href: '/admin' },
  { title: 'Products/Fashions', href: '/admin/products' },
  { title: 'Hero Videos & Campaigns', href: '/admin/campaigns' },
  { title: 'Ghost Navigation', href: '/admin/navigation' },
  { title: 'Media Library', href: '/admin/media' },
  { title: 'Inquiries & Messages', href: '/admin/inquiries' },
  { title: 'Orders & Logs', href: '/admin/orders' },
  { title: 'Payments & Settings', href: '/admin/payments' },
  { title: 'Site Settings', href: '/admin/settings' },
];

interface PaymentStatus {
  commerceConfigured: boolean;
  webhookConfigured: boolean;
  webhookEndpoint: string;
}

export default function AdminPaymentsPage() {
  const [status, setStatus] = useState<PaymentStatus | null>(null);

  useEffect(() => {
    fetch('/api/admin/payments')
      .then((res) => (res.ok ? res.json() as Promise<PaymentStatus> : null))
      .then(setStatus)
      .catch(() => setStatus(null));
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="flex">
        <aside className="w-64 bg-luxuryBlack text-white min-h-screen fixed">
          <div className="p-6 border-b border-neutral-800">
            <Link href="/admin">
              <h1 className="font-serif text-xl tracking-extra-wide">DA-VELA CMS</h1>
              <p className="text-[10px] text-neutral-400 mt-1 tracking-editorial uppercase">Control Panel</p>
            </Link>
          </div>
          <nav className="p-4">
            {links.map((link) => (
              <Link key={link.href} href={link.href}
                className={`flex items-center gap-3 px-4 py-3 text-sm rounded mb-1 transition-colors ${
                  link.href === '/admin/payments' ? 'bg-neutral-900' : 'hover:bg-neutral-900'
                }`}>
                <span className="font-light">{link.title}</span>
              </Link>
            ))}
          </nav>
        </aside>

        <main className="ml-64 flex-1 p-8">
          <header className="mb-8">
            <h2 className="font-serif text-4xl mb-2">Payments & Settings</h2>
            <p className="text-neutral-600 font-light">Checkout and webhook configuration status</p>
          </header>

          <div className="max-w-4xl space-y-8">
            <div className="bg-white border border-neutral-200 p-6">
              <h3 className="font-serif text-2xl mb-6">Configuration</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                  <span>Online checkout (commerce engine)</span>
                  <span className={status?.commerceConfigured ? 'text-green-700' : 'text-red-700'}>
                    {status ? (status.commerceConfigured ? 'Configured' : 'Not configured') : 'Checking...'}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                  <span>Payment webhook secret</span>
                  <span className={status?.webhookConfigured ? 'text-green-700' : 'text-red-700'}>
                    {status ? (status.webhookConfigured ? 'Configured' : 'Not configured') : 'Checking...'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Webhook endpoint</span>
                  <code className="text-xs">{status?.webhookEndpoint ?? '—'}</code>
                </div>
              </div>
            </div>

            <div className="bg-white border border-neutral-200 p-6">
              <h3 className="font-serif text-2xl mb-4">Payment methods</h3>
              <p className="text-sm text-neutral-600">
                Card payments are handled by the secure checkout page created by the commerce engine.
                Customers can also order on WhatsApp for Mobile Money or payment on delivery; those
                enquiries appear under <Link href="/admin/inquiries" className="border-b border-luxuryBlack pb-0.5">Inquiries & Messages</Link>.
              </p>
              <p className="text-xs text-neutral-500 mt-4">
                Secrets are set as environment variables on the host and cannot be edited from this panel.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
