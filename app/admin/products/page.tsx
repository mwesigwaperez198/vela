'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatUGX } from '@/lib/format';

interface Product {
  id: string;
  sku: string;
  handle: string;
  title: string;
  priceUGX: number;
  inventoryCount: number;
  sizes: string[];
  editorialImage: string;
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

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/products')
      .then((res) => {
        if (!res.ok) throw new Error('Could not load products from the commerce engine.');
        return res.json() as Promise<{ products: Product[] }>;
      })
      .then((data) => setProducts(data.products))
      .catch((err) => setError(err instanceof Error ? err.message : 'Could not load products.'))
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
                  link.href === '/admin/products' ? 'bg-neutral-900' : 'hover:bg-neutral-900'
                }`}>
                <span className="font-light">{link.title}</span>
              </Link>
            ))}
          </nav>
        </aside>

        <main className="ml-64 flex-1 p-8">
          <header className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-4xl mb-2">Products & Fashions</h2>
              <p className="text-neutral-600 font-light">Products synced from the commerce engine and visual CMS</p>
            </div>
            <Link href="/collections/new-arrivals" className="bg-luxuryBlack text-white px-6 py-3 text-[11px] tracking-editorial uppercase hover:opacity-90 transition-opacity">
              View Storefront
            </Link>
          </header>

          {error && <p role="alert" className="mb-6 text-sm text-red-700">{error}</p>}
          {loading && <p className="text-sm text-neutral-500">Loading...</p>}

          {!loading && !error && (
            <div className="bg-white border border-neutral-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-neutral-50 border-b border-neutral-200">
                    <tr>
                      <th className="text-left p-4 text-[11px] tracking-editorial uppercase font-light text-neutral-600">Product</th>
                      <th className="text-left p-4 text-[11px] tracking-editorial uppercase font-light text-neutral-600">SKU</th>
                      <th className="text-left p-4 text-[11px] tracking-editorial uppercase font-light text-neutral-600">Sizes</th>
                      <th className="text-left p-4 text-[11px] tracking-editorial uppercase font-light text-neutral-600">Price</th>
                      <th className="text-left p-4 text-[11px] tracking-editorial uppercase font-light text-neutral-600">Stock</th>
                      <th className="text-left p-4 text-[11px] tracking-editorial uppercase font-light text-neutral-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length === 0 && (
                      <tr><td colSpan={6} className="p-8 text-center text-sm text-neutral-500">No products found.</td></tr>
                    )}
                    {products.map((product) => (
                      <tr key={product.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                        <td className="p-4 font-medium">{product.title}</td>
                        <td className="p-4 text-neutral-600">{product.sku}</td>
                        <td className="p-4 text-neutral-600">{product.sizes.join(', ') || '—'}</td>
                        <td className="p-4 text-neutral-600">{formatUGX(product.priceUGX)}</td>
                        <td className="p-4 text-neutral-600">{product.inventoryCount}</td>
                        <td className="p-4">
                          <Link href={`/products/${product.handle}`} className="text-[11px] tracking-editorial uppercase border-b border-luxuryBlack pb-0.5">
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
