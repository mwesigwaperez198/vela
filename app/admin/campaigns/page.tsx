'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function AdminCampaignsPage() {
  const [heroData, setHeroData] = useState({
    headline: 'The African Luxury Edit',
    subheadline: 'Heritage reimagined. Craft with purpose.',
    ctaLabel: 'Visit Store',
    ctaHref: '/collections/new-arrivals',
    videoUrl: '',
    posterUrl: '',
    textTone: 'dark',
    alignment: 'left',
  });
  const [editing, setEditing] = useState(false);

  const saveHero = async () => {
    try {
      await fetch('/api/admin/hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: 'home-hero', page: 'home', ...heroData, isActive: true }),
      });
      alert('Hero updated successfully! Changes will appear on the site.');
      setEditing(false);
    } catch (error) {
      alert('Failed to update hero');
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
            <Link href="/admin/campaigns" className="flex items-center gap-3 px-4 py-3 text-sm bg-neutral-900 rounded mb-1">
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
              <h2 className="font-serif text-4xl mb-2">Hero Videos & Campaigns</h2>
              <p className="text-neutral-600 font-light">Manage infinite video hero and campaign banners</p>
            </div>
            <Link href="/admin/campaigns/new" className="bg-luxuryBlack text-white px-6 py-3 text-[11px] tracking-editorial uppercase hover:opacity-90 transition-opacity">
              Upload New Hero
            </Link>
          </header>

          <div className="bg-white border border-neutral-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-xl">Active Hero - Home (Infinite Video Hero)</h3>
              <button onClick={() => setEditing(!editing)} className="text-[11px] tracking-editorial uppercase border-b border-luxuryBlack pb-0.5">
                {editing ? 'Cancel' : 'Edit Hero'}
              </button>
            </div>
            {!editing ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="relative aspect-video bg-neutral-200 overflow-hidden">
                  {heroData.videoUrl ? (
                    <video className="w-full h-full object-cover" muted autoPlay loop>
                      <source src={heroData.videoUrl} type="video/mp4" />
                    </video>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-400 text-sm">
                      No video uploaded
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-[11px] tracking-editorial uppercase text-neutral-500">Headline</p>
                    <p className="text-lg font-serif mt-1">{heroData.headline}</p>
                  </div>
                  <div>
                    <p className="text-[11px] tracking-editorial uppercase text-neutral-500">Subheadline</p>
                    <p className="font-light mt-1">{heroData.subheadline}</p>
                  </div>
                  <div>
                    <p className="text-[11px] tracking-editorial uppercase text-neutral-500">CTA</p>
                    <p className="font-light mt-1">{heroData.ctaLabel} → {heroData.ctaHref}</p>
                  </div>
                  <div>
                    <p className="text-[11px] tracking-editorial uppercase text-neutral-500">Text Tone / Alignment</p>
                    <p className="font-light mt-1 capitalize">{heroData.textTone} / {heroData.alignment}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] tracking-editorial uppercase text-neutral-600 mb-2">Headline</label>
                    <input
                      type="text"
                      value={heroData.headline}
                      onChange={(e) => setHeroData({ ...heroData, headline: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-200 focus:outline-none focus:border-luxuryBlack"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-editorial uppercase text-neutral-600 mb-2">CTA Label</label>
                    <input
                      type="text"
                      value={heroData.ctaLabel}
                      onChange={(e) => setHeroData({ ...heroData, ctaLabel: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-200 focus:outline-none focus:border-luxuryBlack"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] tracking-editorial uppercase text-neutral-600 mb-2">Subheadline</label>
                  <input
                    type="text"
                    value={heroData.subheadline}
                    onChange={(e) => setHeroData({ ...heroData, subheadline: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-200 focus:outline-none focus:border-luxuryBlack"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] tracking-editorial uppercase text-neutral-600 mb-2">CTA Link</label>
                    <input
                      type="text"
                      value={heroData.ctaHref}
                      onChange={(e) => setHeroData({ ...heroData, ctaHref: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-200 focus:outline-none focus:border-luxuryBlack"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-editorial uppercase text-neutral-600 mb-2">Video URL (MP4)</label>
                    <input
                      type="text"
                      value={heroData.videoUrl}
                      onChange={(e) => setHeroData({ ...heroData, videoUrl: e.target.value })}
                      placeholder="/uploads/hero-video.mp4 or full URL"
                      className="w-full px-4 py-3 border border-neutral-200 focus:outline-none focus:border-luxuryBlack"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] tracking-editorial uppercase text-neutral-600 mb-2">Text Tone</label>
                    <select
                      value={heroData.textTone}
                      onChange={(e) => setHeroData({ ...heroData, textTone: e.target.value as 'light' | 'dark' })}
                      className="w-full px-4 py-3 border border-neutral-200 focus:outline-none focus:border-luxuryBlack"
                    >
                      <option value="dark">Dark</option>
                      <option value="light">Light</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-editorial uppercase text-neutral-600 mb-2">Alignment</label>
                    <select
                      value={heroData.alignment}
                      onChange={(e) => setHeroData({ ...heroData, alignment: e.target.value as 'left' | 'center' | 'right' })}
                      className="w-full px-4 py-3 border border-neutral-200 focus:outline-none focus:border-luxuryBlack"
                    >
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={saveHero} className="bg-luxuryBlack text-white px-6 py-3 text-[11px] tracking-editorial uppercase hover:opacity-90 transition-opacity">
                    Save Hero
                  </button>
                  <Link href="/admin/media" className="border border-luxuryBlack px-6 py-3 text-[11px] tracking-editorial uppercase hover:bg-neutral-50 transition-colors">
                    Upload Video in Media Library
                  </Link>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
