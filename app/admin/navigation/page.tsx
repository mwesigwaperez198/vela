'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface NavItem {
  id: string;
  label: string;
  href: string;
  order: number;
  visible: boolean;
}

export default function AdminNavigationPage() {
  const [navItems, setNavItems] = useState<NavItem[]>([
    { id: '1', label: 'Women', href: '/collections/women', order: 1, visible: true },
    { id: '2', label: 'Men', href: '/collections/men', order: 2, visible: true },
    { id: '3', label: 'Gallery Collection', href: '/gallery', order: 3, visible: true },
    { id: '4', label: 'New in', href: '/collections/new-arrivals', order: 4, visible: true },
  ]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin/nav')
      .then((res) => res.json())
      .then((data) => {
        if (data.nav) setNavItems(data.nav);
      });
  }, []);

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newItems = [...navItems];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;
    [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
    newItems.forEach((item, i) => (item.order = i + 1));
    setNavItems(newItems);
  };

  const toggleVisibility = (id: string) => {
    setNavItems(navItems.map((item) => (item.id === id ? { ...item, visible: !item.visible } : item)));
  };

  const updateLabel = (id: string, label: string) => {
    setNavItems(navItems.map((item) => (item.id === id ? { ...item, label } : item)));
  };

  const updateHref = (id: string, href: string) => {
    setNavItems(navItems.map((item) => (item.id === id ? { ...item, href } : item)));
  };

  const addItem = () => {
    const newItem: NavItem = {
      id: Date.now().toString(),
      label: 'New Link',
      href: '/',
      order: navItems.length + 1,
      visible: true,
    };
    setNavItems([...navItems, newItem]);
  };

  const removeItem = (id: string) => {
    setNavItems(navItems.filter((item) => item.id !== id));
  };

  const saveNav = async () => {
    setSaving(true);
    try {
      await fetch('/api/admin/nav', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nav: navItems }),
      });
      alert('Navigation updated successfully!');
    } catch (error) {
      alert('Failed to update navigation');
    } finally {
      setSaving(false);
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
            <Link href="/admin/navigation" className="flex items-center gap-3 px-4 py-3 text-sm bg-neutral-900 rounded mb-1">
              <span>🧭</span><span className="font-light">Navigation Menu</span>
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
              <h2 className="font-serif text-4xl mb-2">Ghost Navigation</h2>
              <p className="text-neutral-600 font-light">Edit and reorder navigation links. Changes reflect on the ghost menu.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={addItem} className="border border-luxuryBlack px-6 py-3 text-[11px] tracking-editorial uppercase hover:bg-neutral-50 transition-colors">
                Add Link
              </button>
              <button onClick={saveNav} disabled={saving} className="bg-luxuryBlack text-white px-6 py-3 text-[11px] tracking-editorial uppercase hover:opacity-90 transition-opacity disabled:opacity-50">
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </header>

          <div className="bg-white border border-neutral-200 max-w-4xl">
            <div className="p-6 border-b border-neutral-200">
              <h3 className="font-serif text-xl">Navigation Links</h3>
              <p className="text-sm text-neutral-500 mt-1">Drag to reorder or use arrows</p>
            </div>
            <div className="divide-y divide-neutral-100">
              {navItems.map((item, index) => (
                <div key={item.id} className="p-4 flex items-center gap-4">
                  <div className="flex flex-col gap-1">
                    <button onClick={() => moveItem(index, 'up')} disabled={index === 0} className="text-neutral-400 hover:text-luxuryBlack disabled:opacity-30">▲</button>
                    <button onClick={() => moveItem(index, 'down')} disabled={index === navItems.length - 1} className="text-neutral-400 hover:text-luxuryBlack disabled:opacity-30">▼</button>
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) => updateLabel(item.id, e.target.value)}
                      className="px-3 py-2 border border-neutral-200 focus:outline-none focus:border-luxuryBlack"
                      placeholder="Label"
                    />
                    <input
                      type="text"
                      value={item.href}
                      onChange={(e) => updateHref(item.id, e.target.value)}
                      className="px-3 py-2 border border-neutral-200 focus:outline-none focus:border-luxuryBlack"
                      placeholder="URL"
                    />
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.visible}
                      onChange={() => toggleVisibility(item.id)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-neutral-600">Visible</span>
                  </label>
                  <button onClick={() => removeItem(item.id)} className="text-red-600 hover:text-red-700 text-sm">Remove</button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
