'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function AdminPaymentsPage() {
  const [settings, setSettings] = useState({
    paymentOnDelivery: true,
    mobileMoney: true,
    bankTransfer: true,
    cardPayments: false,
    webhookSecret: '*****',
    enableWebhooks: true,
  });

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
            <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-neutral-900 rounded mb-1">
              <span>📊</span><span className="font-light">Dashboard</span>
            </Link>
            <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-neutral-900 rounded mb-1">
              <span>👗</span><span className="font-light">Products/Fashions</span>
            </Link>
            <Link href="/admin/gallery" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-neutral-900 rounded mb-1">
              <span>🖼️</span><span className="font-light">Gallery Collection</span>
            </Link>
            <Link href="/admin/campaigns" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-neutral-900 rounded mb-1">
              <span>🎬</span><span className="font-light">Hero Videos & Campaigns</span>
            </Link>
            <Link href="/admin/navigation" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-neutral-900 rounded mb-1">
              <span>🧭</span><span className="font-light">Ghost Navigation</span>
            </Link>
            <Link href="/admin/payments" className="flex items-center gap-3 px-4 py-3 text-sm bg-neutral-900 rounded mb-1">
              <span>💳</span><span className="font-light">Payments & Settings</span>
            </Link>
            <Link href="/admin/media" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-neutral-900 rounded mb-1">
              <span>📁</span><span className="font-light">Media Library</span>
            </Link>
            <Link href="/admin/inquiries" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-neutral-900 rounded mb-1">
              <span>💬</span><span className="font-light">Inquiries & Messages</span>
            </Link>
            <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-neutral-900 rounded mb-1">
              <span>⚙️</span><span className="font-light">Site Settings</span>
            </Link>
          </nav>
        </aside>

        <main className="ml-64 flex-1 p-8">
          <header className="mb-8">
            <h2 className="font-serif text-4xl mb-2">Payments & Settings</h2>
            <p className="text-neutral-600 font-light">Configure payment methods and webhook settings</p>
          </header>

          <div className="max-w-4xl space-y-8">
            <div className="bg-white border border-neutral-200 p-6">
              <h3 className="font-serif text-2xl mb-6">Payment Methods</h3>
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={settings.paymentOnDelivery} onChange={(e) => setSettings({...settings, paymentOnDelivery: e.target.checked})} className="w-4 h-4" />
                  <div>
                    <p className="font-medium">Payment on Delivery</p>
                    <p className="text-sm text-neutral-500">Accept cash on delivery</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={settings.mobileMoney} onChange={(e) => setSettings({...settings, mobileMoney: e.target.checked})} className="w-4 h-4" />
                  <div>
                    <p className="font-medium">Mobile Money (MTN/Airtel)</p>
                    <p className="text-sm text-neutral-500">Accept mobile money payments</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={settings.bankTransfer} onChange={(e) => setSettings({...settings, bankTransfer: e.target.checked})} className="w-4 h-4" />
                  <div>
                    <p className="font-medium">Bank Transfer</p>
                    <p className="text-sm text-neutral-500">Accept direct bank transfers</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={settings.cardPayments} onChange={(e) => setSettings({...settings, cardPayments: e.target.checked})} className="w-4 h-4" />
                  <div>
                    <p className="font-medium">Card Payments</p>
                    <p className="text-sm text-neutral-500">Accept Visa/Mastercard (requires gateway)</p>
                  </div>
                </label>
              </div>
            </div>

            <div className="bg-white border border-neutral-200 p-6">
              <h3 className="font-serif text-2xl mb-6">Webhooks & Notifications</h3>
              <div className="space-y-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={settings.enableWebhooks} onChange={(e) => setSettings({...settings, enableWebhooks: e.target.checked})} className="w-4 h-4" />
                  <div>
                    <p className="font-medium">Enable Webhooks</p>
                    <p className="text-sm text-neutral-500">Receive payment notifications</p>
                  </div>
                </label>
                <div>
                  <label className="block text-[11px] tracking-editorial uppercase text-neutral-600 mb-2">Webhook Secret</label>
                  <input type="password" value={settings.webhookSecret} onChange={(e) => setSettings({...settings, webhookSecret: e.target.value})} className="w-full px-4 py-3 border border-neutral-200 focus:outline-none focus:border-luxuryBlack" />
                  <p className="text-xs text-neutral-500 mt-2">Webhook endpoint: /api/webhooks/[provider]</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-neutral-200 p-6">
              <h3 className="font-serif text-2xl mb-6">Email Notifications</h3>
              <p className="text-sm text-neutral-600 mb-4">Order notifications will be sent to: <strong>novaratechafrica@gmail.com</strong></p>
              <p className="text-xs text-neutral-500">All orders, inquiries, and payments are logged and emailed to the admin.</p>
            </div>

            <button className="bg-luxuryBlack text-white px-8 py-4 text-[11px] tracking-editorial uppercase hover:opacity-90 transition-opacity">
              Save Payment Settings
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
