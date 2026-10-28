'use client';

import Link from 'next/link';

export default function AdminSettingsPage() {
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
            <Link href="/admin/media" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-neutral-900 rounded mb-1">
              <span>📁</span><span className="font-light">Media Library</span>
            </Link>
            <Link href="/admin/ads" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-neutral-900 rounded mb-1">
              <span>📢</span><span className="font-light">Advertisements</span>
            </Link>
            <Link href="/admin/inquiries" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-neutral-900 rounded mb-1">
              <span>💬</span><span className="font-light">Inquiries & Messages</span>
            </Link>
            <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-sm bg-neutral-900 rounded mb-1">
              <span>⚙️</span><span className="font-light">Site Settings</span>
            </Link>
          </nav>
        </aside>

        <main className="ml-64 flex-1 p-8">
          <header className="mb-8">
            <h2 className="font-serif text-4xl mb-2">Site Settings</h2>
            <p className="text-neutral-600 font-light">Configure your brand and website settings</p>
          </header>

          <div className="max-w-4xl space-y-8">
            <div className="bg-white border border-neutral-200 p-6">
              <h3 className="font-serif text-2xl mb-6">Brand Information</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-[11px] tracking-editorial uppercase text-neutral-600 mb-2">Primary Brand Name</label>
                  <input type="text" defaultValue="DA-VELA FASHIONS" className="w-full px-4 py-3 border border-neutral-200 focus:outline-none focus:border-luxuryBlack" />
                </div>
                <div>
                  <label className="block text-[11px] tracking-editorial uppercase text-neutral-600 mb-2">Secondary Brand Name</label>
                  <input type="text" defaultValue="DA-VELA HOUSE OF ARTS" className="w-full px-4 py-3 border border-neutral-200 focus:outline-none focus:border-luxuryBlack" />
                </div>
                <div>
                  <label className="block text-[11px] tracking-editorial uppercase text-neutral-600 mb-2">Tagline</label>
                  <input type="text" defaultValue="African Luxury Redefined" className="w-full px-4 py-3 border border-neutral-200 focus:outline-none focus:border-luxuryBlack" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-neutral-200 p-6">
              <h3 className="font-serif text-2xl mb-6">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] tracking-editorial uppercase text-neutral-600 mb-2">Phone Number</label>
                  <input type="text" defaultValue="0765866555" className="w-full px-4 py-3 border border-neutral-200 focus:outline-none focus:border-luxuryBlack" />
                </div>
                <div>
                  <label className="block text-[11px] tracking-editorial uppercase text-neutral-600 mb-2">WhatsApp Number</label>
                  <input type="text" defaultValue="0765866555" className="w-full px-4 py-3 border border-neutral-200 focus:outline-none focus:border-luxuryBlack" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[11px] tracking-editorial uppercase text-neutral-600 mb-2">Email Address</label>
                  <input type="email" defaultValue="novaratechafrica@gmail.com" className="w-full px-4 py-3 border border-neutral-200 focus:outline-none focus:border-luxuryBlack" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[11px] tracking-editorial uppercase text-neutral-600 mb-2">Location</label>
                  <input type="text" defaultValue="Kampala, Uganda" className="w-full px-4 py-3 border border-neutral-200 focus:outline-none focus:border-luxuryBlack" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-neutral-200 p-6">
              <h3 className="font-serif text-2xl mb-6">Hosting & Deployment</h3>
              <p className="text-sm text-neutral-600 mb-4">Ready for deployment to premium Uganda hosting</p>
              <button className="bg-luxuryBlack text-white px-6 py-3 text-[11px] tracking-editorial uppercase hover:opacity-90 transition-opacity">
                Generate Deployment Package
              </button>
            </div>

            <button className="bg-luxuryBlack text-white px-8 py-4 text-[11px] tracking-editorial uppercase hover:opacity-90 transition-opacity">
              Save All Settings
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
