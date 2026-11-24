'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Inquiry {
  id: string;
  name: string;
  contact: string;
  message: string;
  source: string;
  createdAt: string;
}

const menuItems = [
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

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    fetch('/api/admin/inquiries')
      .then((res) => (res.ok ? res.json() as Promise<{ inquiries: Inquiry[] }> : { inquiries: [] }))
      .then((data) => setInquiries(data.inquiries))
      .catch(() => setInquiries([]));
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="flex">
        <aside className="w-64 bg-luxuryBlack text-white min-h-screen fixed">
          <div className="p-6 border-b border-neutral-800">
            <h1 className="font-serif text-xl tracking-extra-wide">DA-VELA CMS</h1>
            <p className="text-[10px] text-neutral-400 mt-1 tracking-editorial uppercase">Control Panel</p>
          </div>
          <nav className="p-4">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-3 px-4 py-3 text-sm rounded mb-1 transition-colors ${
                  item.href === '/admin' ? 'bg-neutral-900' : 'hover:bg-neutral-900'
                }`}>
                <span className="font-light">{item.title}</span>
              </Link>
            ))}
          </nav>
        </aside>

        <main className="ml-64 flex-1 p-8">
          <header className="mb-8">
            <h2 className="font-serif text-4xl mb-2">Dashboard</h2>
            <p className="text-neutral-600 font-light">Welcome to DA-VELA Fashions CMS</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 border border-neutral-200">
              <p className="text-[11px] tracking-editorial uppercase text-neutral-500 mb-2">Inquiries</p>
              <p className="text-3xl font-serif">{inquiries.length}</p>
            </div>
            <div className="bg-white p-6 border border-neutral-200">
              <p className="text-[11px] tracking-editorial uppercase text-neutral-500 mb-2">Storefront</p>
              <Link href="/" className="inline-block mt-2 text-[11px] tracking-editorial uppercase border-b border-luxuryBlack pb-1">
                View live site
              </Link>
            </div>
            <div className="bg-white p-6 border border-neutral-200">
              <p className="text-[11px] tracking-editorial uppercase text-neutral-500 mb-2">Gallery</p>
              <Link href="/gallery" className="inline-block mt-2 text-[11px] tracking-editorial uppercase border-b border-luxuryBlack pb-1">
                View collection
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 border border-neutral-200">
              <h3 className="font-serif text-2xl mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Link href="/admin/products" className="block p-4 border border-neutral-200 hover:bg-neutral-50 transition-colors">
                  <p className="font-medium">Manage Products</p>
                  <p className="text-sm text-neutral-500">Products are synced from the commerce engine</p>
                </Link>
                <Link href="/admin/campaigns" className="block p-4 border border-neutral-200 hover:bg-neutral-50 transition-colors">
                  <p className="font-medium">Update Hero Campaign</p>
                  <p className="text-sm text-neutral-500">Edit headline, poster and video</p>
                </Link>
                <Link href="/admin/media" className="block p-4 border border-neutral-200 hover:bg-neutral-50 transition-colors">
                  <p className="font-medium">Upload Media</p>
                  <p className="text-sm text-neutral-500">Add images and videos to the library</p>
                </Link>
                <Link href="/admin/navigation" className="block p-4 border border-neutral-200 hover:bg-neutral-50 transition-colors">
                  <p className="font-medium">Edit Navigation</p>
                  <p className="text-sm text-neutral-500">Control the ghost navigation links</p>
                </Link>
              </div>
            </div>

            <div className="bg-white p-6 border border-neutral-200">
              <h3 className="font-serif text-2xl mb-4">Recent Inquiries</h3>
              {inquiries.length === 0 ? (
                <p className="text-sm text-neutral-500">No inquiries yet.</p>
              ) : (
                <div className="space-y-3">
                  {inquiries.slice(0, 5).map((inquiry) => (
                    <div key={inquiry.id} className="pb-3 border-b border-neutral-100 last:border-0">
                      <p className="font-medium text-sm">{inquiry.name} · {inquiry.contact}</p>
                      <p className="text-xs text-neutral-500">{inquiry.message}</p>
                      <p className="text-xs text-neutral-400 mt-1">
                        {new Date(inquiry.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              <Link href="/admin/inquiries" className="mt-4 inline-block text-[11px] tracking-editorial uppercase border-b border-luxuryBlack pb-1">
                View All
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
