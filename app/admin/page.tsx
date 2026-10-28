'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats] = useState({
    products: 24,
    galleries: 6,
    campaigns: 3,
    inquiries: 12,
    views: 15420,
  });

  const menuItems = [
    { title: 'Dashboard', href: '/admin', icon: '📊' },
    { title: 'Products/Fashions', href: '/admin/products', icon: '👗' },
    { title: 'Gallery Collection', href: '/admin/gallery', icon: '🖼️' },
    { title: 'Hero Videos & Campaigns', href: '/admin/campaigns', icon: '🎬' },
    { title: 'Ghost Navigation', href: '/admin/navigation', icon: '🧭' },
    { title: 'Payments & Settings', href: '/admin/payments', icon: '💳' },
    { title: 'Media Library', href: '/admin/media', icon: '📁' },
    { title: 'Advertisements', href: '/admin/ads', icon: '📢' },
    { title: 'Inquiries & Messages', href: '/admin/inquiries', icon: '💬' },
    { title: 'Orders & Logs', href: '/admin/orders', icon: '📋' },
    { title: 'Users & Permissions', href: '/admin/users', icon: '👥' },
    { title: 'Site Settings', href: '/admin/settings', icon: '⚙️' },
    { title: 'System Health', href: '/admin/health', icon: '❤️' },
  ];

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
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-neutral-900 rounded mb-1 transition-colors"
              >
                <span>{item.icon}</span>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-white p-6 border border-neutral-200">
              <p className="text-[11px] tracking-editorial uppercase text-neutral-500 mb-2">Products</p>
              <p className="text-3xl font-serif">{stats.products}</p>
            </div>
            <div className="bg-white p-6 border border-neutral-200">
              <p className="text-[11px] tracking-editorial uppercase text-neutral-500 mb-2">Gallery Items</p>
              <p className="text-3xl font-serif">{stats.galleries}</p>
            </div>
            <div className="bg-white p-6 border border-neutral-200">
              <p className="text-[11px] tracking-editorial uppercase text-neutral-500 mb-2">Campaigns</p>
              <p className="text-3xl font-serif">{stats.campaigns}</p>
            </div>
            <div className="bg-white p-6 border border-neutral-200">
              <p className="text-[11px] tracking-editorial uppercase text-neutral-500 mb-2">Inquiries</p>
              <p className="text-3xl font-serif">{stats.inquiries}</p>
            </div>
            <div className="bg-white p-6 border border-neutral-200">
              <p className="text-[11px] tracking-editorial uppercase text-neutral-500 mb-2">Views</p>
              <p className="text-3xl font-serif">{stats.views.toLocaleString()}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 border border-neutral-200">
              <h3 className="font-serif text-2xl mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Link href="/admin/products/new" className="block p-4 border border-neutral-200 hover:bg-neutral-50 transition-colors">
                  <p className="font-medium">Add New Fashion/Product</p>
                  <p className="text-sm text-neutral-500">Upload new designs with images/videos</p>
                </Link>
                <Link href="/admin/gallery/new" className="block p-4 border border-neutral-200 hover:bg-neutral-50 transition-colors">
                  <p className="font-medium">Add Gallery Collection</p>
                  <p className="text-sm text-neutral-500">Create new category by sex, culture, country</p>
                </Link>
                <Link href="/admin/campaigns/new" className="block p-4 border border-neutral-200 hover:bg-neutral-50 transition-colors">
                  <p className="font-medium">Upload Hero Video</p>
                  <p className="text-sm text-neutral-500">Update infinite video hero section</p>
                </Link>
                <Link href="/admin/ads/new" className="block p-4 border border-neutral-200 hover:bg-neutral-50 transition-colors">
                  <p className="font-medium">Create Advertisement</p>
                  <p className="text-sm text-neutral-500">Promote collections & campaigns</p>
                </Link>
              </div>
            </div>

            <div className="bg-white p-6 border border-neutral-200">
              <h3 className="font-serif text-2xl mb-4">Recent Inquiries</h3>
              <div className="space-y-3">
                <div className="pb-3 border-b border-neutral-100">
                  <p className="font-medium text-sm">WhatsApp - 0754321098</p>
                  <p className="text-xs text-neutral-500">Interested in Kente Royal Collection</p>
                  <p className="text-xs text-neutral-400 mt-1">2 hours ago</p>
                </div>
                <div className="pb-3 border-b border-neutral-100">
                  <p className="font-medium text-sm">Email - sarah@example.com</p>
                  <p className="text-xs text-neutral-500">Custom order inquiry</p>
                  <p className="text-xs text-neutral-400 mt-1">5 hours ago</p>
                </div>
                <div className="pb-3">
                  <p className="font-medium text-sm">Phone - 0789123456</p>
                  <p className="text-xs text-neutral-500">Pricing for bulk order</p>
                  <p className="text-xs text-neutral-400 mt-1">1 day ago</p>
                </div>
              </div>
              <Link href="/admin/inquiries" className="mt-4 inline-block text-[11px] tracking-editorial uppercase border-b border-luxuryBlack pb-1">
                View All
              </Link>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 border border-neutral-200">
            <h3 className="font-serif text-2xl mb-4">System Health</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Website Online</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">CMS Operational</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Media Storage</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">All Systems OK</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
