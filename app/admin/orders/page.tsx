'use client';

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

export default function AdminOrdersPage() {
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
                  link.href === '/admin/orders' ? 'bg-neutral-900' : 'hover:bg-neutral-900'
                }`}>
                <span className="font-light">{link.title}</span>
              </Link>
            ))}
          </nav>
        </aside>

        <main className="ml-64 flex-1 p-8">
          <header className="mb-8">
            <h2 className="font-serif text-4xl mb-2">Orders & Logs</h2>
            <p className="text-neutral-600 font-light">Orders placed through the storefront</p>
          </header>

          <div className="bg-white border border-neutral-200 p-8 max-w-4xl">
            <h3 className="font-serif text-2xl mb-4">No orders stored here yet</h3>
            <p className="text-sm text-neutral-600 mb-4">
              Checkout is handled by the commerce engine, so orders are managed in the Shopify admin.
              Payment webhook events arrive at <code className="text-xs">/api/webhooks/[provider]</code> but
              are not yet recorded in a local order database.
            </p>
            <p className="text-sm text-neutral-600">
              Customer enquiries sent from the contact and gallery pages are available under{' '}
              <Link href="/admin/inquiries" className="border-b border-luxuryBlack pb-0.5">Inquiries & Messages</Link>.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
