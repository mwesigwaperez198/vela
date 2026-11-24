'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import type { SiteConfig } from '@/lib/cms-config';

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

const emptyConfig: SiteConfig = {
  brandName: '',
  brandNameSecondary: '',
  tagline: '',
  phone: '',
  whatsapp: '',
  email: '',
  location: '',
  logoText: '',
  showBag: true,
  ghostNavEnabled: true,
};

export default function AdminSettingsPage() {
  const [config, setConfig] = useState<SiteConfig>(emptyConfig);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => (res.ok ? res.json() as Promise<{ siteConfig: SiteConfig }> : null))
      .then((data) => { if (data?.siteConfig) setConfig(data.siteConfig); })
      .catch(() => setMessage('Could not load settings.'))
      .finally(() => setLoading(false));
  }, []);

  const set = <K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) =>
    setConfig((current) => ({ ...current, [key]: value }));

  const save = async (event: FormEvent) => {
    event.preventDefault();
    setMessage('');
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? 'Could not save settings.');
      setMessage('Settings saved. Changes appear in the navigation while the server is running.');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Could not save settings.');
    }
  };

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
                  link.href === '/admin/settings' ? 'bg-neutral-900' : 'hover:bg-neutral-900'
                }`}>
                <span className="font-light">{link.title}</span>
              </Link>
            ))}
          </nav>
        </aside>

        <main className="ml-64 flex-1 p-8">
          <header className="mb-8">
            <h2 className="font-serif text-4xl mb-2">Site Settings</h2>
            <p className="text-neutral-600 font-light">Configure your brand and contact details</p>
          </header>

          {loading ? (
            <p className="text-sm text-neutral-500">Loading...</p>
          ) : (
            <form onSubmit={save} className="max-w-4xl space-y-8">
              <div className="bg-white border border-neutral-200 p-6">
                <h3 className="font-serif text-2xl mb-6">Brand Information</h3>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="brandName" className="block text-[11px] tracking-editorial uppercase text-neutral-600 mb-2">Primary Brand Name</label>
                    <input id="brandName" required value={config.brandName} onChange={(e) => set('brandName', e.target.value)} className="w-full px-4 py-3 border border-neutral-200 focus:outline-none focus:border-luxuryBlack" />
                  </div>
                  <div>
                    <label htmlFor="brandNameSecondary" className="block text-[11px] tracking-editorial uppercase text-neutral-600 mb-2">Secondary Brand Name</label>
                    <input id="brandNameSecondary" value={config.brandNameSecondary} onChange={(e) => set('brandNameSecondary', e.target.value)} className="w-full px-4 py-3 border border-neutral-200 focus:outline-none focus:border-luxuryBlack" />
                  </div>
                  <div>
                    <label htmlFor="tagline" className="block text-[11px] tracking-editorial uppercase text-neutral-600 mb-2">Tagline</label>
                    <input id="tagline" value={config.tagline} onChange={(e) => set('tagline', e.target.value)} className="w-full px-4 py-3 border border-neutral-200 focus:outline-none focus:border-luxuryBlack" />
                  </div>
                  <div>
                    <label htmlFor="logoText" className="block text-[11px] tracking-editorial uppercase text-neutral-600 mb-2">Logo Text</label>
                    <input id="logoText" value={config.logoText} onChange={(e) => set('logoText', e.target.value)} className="w-full px-4 py-3 border border-neutral-200 focus:outline-none focus:border-luxuryBlack" />
                  </div>
                </div>
              </div>

              <div className="bg-white border border-neutral-200 p-6">
                <h3 className="font-serif text-2xl mb-6">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-[11px] tracking-editorial uppercase text-neutral-600 mb-2">Phone Number</label>
                    <input id="phone" value={config.phone} onChange={(e) => set('phone', e.target.value)} className="w-full px-4 py-3 border border-neutral-200 focus:outline-none focus:border-luxuryBlack" />
                  </div>
                  <div>
                    <label htmlFor="whatsapp" className="block text-[11px] tracking-editorial uppercase text-neutral-600 mb-2">WhatsApp Number</label>
                    <input id="whatsapp" value={config.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} className="w-full px-4 py-3 border border-neutral-200 focus:outline-none focus:border-luxuryBlack" />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="email" className="block text-[11px] tracking-editorial uppercase text-neutral-600 mb-2">Email Address</label>
                    <input id="email" type="email" required value={config.email} onChange={(e) => set('email', e.target.value)} className="w-full px-4 py-3 border border-neutral-200 focus:outline-none focus:border-luxuryBlack" />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="location" className="block text-[11px] tracking-editorial uppercase text-neutral-600 mb-2">Location</label>
                    <input id="location" required value={config.location} onChange={(e) => set('location', e.target.value)} className="w-full px-4 py-3 border border-neutral-200 focus:outline-none focus:border-luxuryBlack" />
                  </div>
                </div>
              </div>

              <div className="bg-white border border-neutral-200 p-6">
                <h3 className="font-serif text-2xl mb-6">Display Options</h3>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={config.showBag} onChange={(e) => set('showBag', e.target.checked)} className="w-4 h-4" />
                    <span className="text-sm">Show bag button in navigation</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={config.ghostNavEnabled} onChange={(e) => set('ghostNavEnabled', e.target.checked)} className="w-4 h-4" />
                    <span className="text-sm">Enable ghost navigation</span>
                  </label>
                </div>
              </div>

              {message && <p role="status" className="text-sm text-neutral-700">{message}</p>}
              <button type="submit" className="bg-luxuryBlack text-white px-8 py-4 text-[11px] tracking-editorial uppercase hover:opacity-90 transition-opacity">
                Save All Settings
              </button>
            </form>
          )}
        </main>
      </div>
    </div>
  );
}
