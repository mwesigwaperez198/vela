'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Inquiry {
  id: string;
  name: string;
  contact: string;
  email: string;
  message: string;
  source: string;
  createdAt: string;
}

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

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/inquiries')
      .then((res) => {
        if (!res.ok) throw new Error('Could not load inquiries.');
        return res.json() as Promise<{ inquiries: Inquiry[] }>;
      })
      .then((data) => setInquiries(data.inquiries))
      .catch(() => setError('Could not load inquiries.'))
      .finally(() => setLoading(false));
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
                  link.href === '/admin/inquiries' ? 'bg-neutral-900' : 'hover:bg-neutral-900'
                }`}>
                <span className="font-light">{link.title}</span>
              </Link>
            ))}
          </nav>
        </aside>

        <main className="ml-64 flex-1 p-8">
          <header className="mb-8">
            <h2 className="font-serif text-4xl mb-2">Inquiries & Messages</h2>
            <p className="text-neutral-600 font-light">Messages sent from the contact page and gallery enquiries</p>
          </header>

          {loading && <p className="text-sm text-neutral-500">Loading...</p>}
          {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
          {!loading && !error && inquiries.length === 0 && (
            <div className="bg-white border border-neutral-200 p-8 text-center">
              <p className="text-neutral-500 font-light">No inquiries yet.</p>
            </div>
          )}

          <div className="space-y-4">
            {inquiries.map((inquiry) => (
              <article key={inquiry.id} className="bg-white border border-neutral-200 p-6">
                <div className="flex items-start justify-between gap-6 mb-3">
                  <div>
                    <h3 className="font-medium">{inquiry.name}</h3>
                    <p className="text-xs text-neutral-500 mt-1">
                      {inquiry.contact}{inquiry.email ? ` · ${inquiry.email}` : ''}
                    </p>
                  </div>
                  <time className="text-xs text-neutral-400 whitespace-nowrap" dateTime={inquiry.createdAt}>
                    {new Date(inquiry.createdAt).toLocaleString()}
                  </time>
                </div>
                <p className="text-sm text-neutral-700 whitespace-pre-wrap">{inquiry.message}</p>
                {inquiry.source && <p className="text-[11px] tracking-editorial uppercase text-neutral-400 mt-4">{inquiry.source}</p>}
              </article>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
