'use client';

import Link from 'next/link';

export default function AdminMediaPage() {
  const mediaFiles = [
    { id: 1, name: 'hero-african-luxury.mp4', type: 'video', size: '24.5 MB', uploaded: '2024-01-15' },
    { id: 2, name: 'kente-collection.jpg', type: 'image', size: '2.3 MB', uploaded: '2024-01-14' },
    { id: 3, name: 'ankara-gown.jpg', type: 'image', size: '1.8 MB', uploaded: '2024-01-14' },
    { id: 4, name: 'barkcloth-blazer.jpg', type: 'image', size: '2.1 MB', uploaded: '2024-01-13' },
  ];

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
            <Link href="/admin/media" className="flex items-center gap-3 px-4 py-3 text-sm bg-neutral-900 rounded mb-1">
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
              <h2 className="font-serif text-4xl mb-2">Media Library</h2>
              <p className="text-neutral-600 font-light">Upload and manage videos, animations, and images</p>
            </div>
            <button className="bg-luxuryBlack text-white px-6 py-3 text-[11px] tracking-editorial uppercase hover:opacity-90 transition-opacity">
              Upload Files
            </button>
          </header>

          <div className="bg-white border border-neutral-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="text-left p-4 text-[11px] tracking-editorial uppercase font-light text-neutral-600">File</th>
                    <th className="text-left p-4 text-[11px] tracking-editorial uppercase font-light text-neutral-600">Type</th>
                    <th className="text-left p-4 text-[11px] tracking-editorial uppercase font-light text-neutral-600">Size</th>
                    <th className="text-left p-4 text-[11px] tracking-editorial uppercase font-light text-neutral-600">Uploaded</th>
                    <th className="text-left p-4 text-[11px] tracking-editorial uppercase font-light text-neutral-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mediaFiles.map((file) => (
                    <tr key={file.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                      <td className="p-4 font-medium">{file.name}</td>
                      <td className="p-4 text-neutral-600 capitalize">{file.type}</td>
                      <td className="p-4 text-neutral-600">{file.size}</td>
                      <td className="p-4 text-neutral-600">{file.uploaded}</td>
                      <td className="p-4 flex gap-3">
                        <button className="text-[11px] tracking-editorial uppercase border-b border-luxuryBlack pb-0.5">Copy URL</button>
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
