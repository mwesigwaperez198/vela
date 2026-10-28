'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Wool Cape Coat', sku: 'DV-1001', price: 4850000, status: 'published', category: 'Women' },
    { id: 2, name: 'Silk Slip Dress', sku: 'DV-1002', price: 3200000, status: 'published', category: 'Women' },
    { id: 3, name: 'Bark Cloth Blazer', sku: 'DV-1006', price: 3900000, status: 'draft', category: 'Men' },
  ]);

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
            <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 text-sm bg-neutral-900 rounded mb-1">
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
            <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-neutral-900 rounded mb-1">
              <span>⚙️</span><span className="font-light">Site Settings</span>
            </Link>
          </nav>
        </aside>

        <main className="ml-64 flex-1 p-8">
          <header className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-4xl mb-2">Products & Fashions</h2>
              <p className="text-neutral-600 font-light">Manage your fashion collection</p>
            </div>
            <Link href="/admin/products/new" className="bg-luxuryBlack text-white px-6 py-3 text-[11px] tracking-editorial uppercase hover:opacity-90 transition-opacity">
              Add New Product
            </Link>
          </header>

          <div className="bg-white border border-neutral-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="text-left p-4 text-[11px] tracking-editorial uppercase font-light text-neutral-600">Product</th>
                    <th className="text-left p-4 text-[11px] tracking-editorial uppercase font-light text-neutral-600">SKU</th>
                    <th className="text-left p-4 text-[11px] tracking-editorial uppercase font-light text-neutral-600">Category</th>
                    <th className="text-left p-4 text-[11px] tracking-editorial uppercase font-light text-neutral-600">Price</th>
                    <th className="text-left p-4 text-[11px] tracking-editorial uppercase font-light text-neutral-600">Status</th>
                    <th className="text-left p-4 text-[11px] tracking-editorial uppercase font-light text-neutral-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                      <td className="p-4 font-medium">{product.name}</td>
                      <td className="p-4 text-neutral-600">{product.sku}</td>
                      <td className="p-4 text-neutral-600">{product.category}</td>
                      <td className="p-4 text-neutral-600">UGX {product.price.toLocaleString()}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs ${product.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="p-4 flex gap-3">
                        <button className="text-[11px] tracking-editorial uppercase border-b border-luxuryBlack pb-0.5">Edit</button>
                        <button className="text-[11px] tracking-editorial uppercase text-red-600">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
