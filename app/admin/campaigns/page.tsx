'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AdminCampaignsPage() {
  const [heroData, setHeroData] = useState({
    headline: 'The African Luxury Edit',
    eyebrow: 'DA-VELA / HOUSE OF ARTS',
    subheadline: 'Heritage reimagined. Craft with purpose.',
    ctaLabel: 'Visit Store',
    ctaHref: '/collections/new-arrivals',
    videoUrl: '',
    posterUrl: '',
    textTone: 'dark',
    alignment: 'left',
    headlineFont: 'cormorant',
    customFontUrl: '',
    headlineColor: '#0d0d0d',
    subheadlineColor: '#1a1a1a',
    panelColor: '#f5f3ef',
  });
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [fontUploading, setFontUploading] = useState(false);

  useEffect(() => {
    fetch('/api/admin/hero?page=home')
      .then((res) => (res.ok ? res.json() as Promise<{ hero: typeof heroData | null }> : { hero: null }))
      .then((data) => {
        const hero = data.hero;
        if (!hero) return;
        setHeroData((current) => ({
          headline: hero.headline ?? current.headline,
          eyebrow: hero.eyebrow ?? '',
          subheadline: hero.subheadline ?? '',
          ctaLabel: hero.ctaLabel ?? current.ctaLabel,
          ctaHref: hero.ctaHref ?? current.ctaHref,
          videoUrl: hero.videoUrl ?? '',
          posterUrl: hero.posterUrl ?? '',
          textTone: hero.textTone ?? 'dark',
          alignment: hero.alignment ?? 'left',
          headlineFont: hero.headlineFont ?? 'cormorant',
          customFontUrl: hero.customFontUrl ?? '',
          headlineColor: hero.headlineColor ?? '#0d0d0d',
          subheadlineColor: hero.subheadlineColor ?? '#1a1a1a',
          panelColor: hero.panelColor ?? '#f5f3ef',
        }));
      })
      .catch(() => setMessage('Could not load the saved hero.'));
  }, []);

  const saveHero = async () => {
    setMessage('');
    try {
      const res = await fetch('/api/admin/hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: 'home-hero', page: 'home', ...heroData, isActive: true }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? 'Failed to update hero');
      setMessage('Hero saved. Refresh the site to see it; allow up to a minute for cached media.');
      setEditing(false);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to update hero.');
    }
  };

  const uploadFont = async (file: File | undefined) => {
    if (!file) return;
    setFontUploading(true);
    setMessage('');
    const body = new FormData();
    body.append('file', file);
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error ?? 'Font upload failed.');
      setHeroData((current) => ({ ...current, customFontUrl: data.url as string, headlineFont: 'custom' }));
      setMessage('Font uploaded. Save the hero to apply it.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Font upload failed.');
    } finally {
      setFontUploading(false);
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
            <Link href="/admin/media" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-neutral-900 rounded mb-1">
              <span>🖼️</span><span className="font-light">Gallery Collection</span>
            </Link>
            <Link href="/admin/campaigns" className="flex items-center gap-3 px-4 py-3 text-sm bg-neutral-900 rounded mb-1">
              <span>🎬</span><span className="font-light">Hero Videos & Campaigns</span>
            </Link>
            <Link href="/admin/media" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-neutral-900 rounded mb-1">
              <span>📁</span><span className="font-light">Media Library</span>
            </Link>
            <Link href="/admin/campaigns" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-neutral-900 rounded mb-1">
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
            <Link href="/admin/media" className="bg-luxuryBlack text-white px-6 py-3 text-[11px] tracking-editorial uppercase hover:opacity-90 transition-opacity">
              Upload Hero Media
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
                    <p className="text-[11px] tracking-editorial uppercase text-neutral-500">Alignment</p>
                    <p className="font-light mt-1 capitalize">{heroData.alignment}</p>
                  </div>
                  <div>
                    <p className="text-[11px] tracking-editorial uppercase text-neutral-500">Typography</p>
                    <p className="font-light mt-1">
                      {heroData.headlineFont}
                      {heroData.customFontUrl ? ' (custom font)' : ''} · {heroData.headlineColor} on {heroData.panelColor}
                    </p>
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
                    <label className="block text-[11px] tracking-editorial uppercase text-neutral-600 mb-2">Eyebrow label</label>
                    <input
                      type="text"
                      value={heroData.eyebrow}
                      onChange={(e) => setHeroData({ ...heroData, eyebrow: e.target.value })}
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
                  <div>
                    <label className="block text-[11px] tracking-editorial uppercase text-neutral-600 mb-2">Poster Image URL</label>
                    <input
                      type="text"
                      value={heroData.posterUrl}
                      onChange={(e) => setHeroData({ ...heroData, posterUrl: e.target.value })}
                      placeholder="/uploads/pics/women.JPG or full URL"
                      className="w-full px-4 py-3 border border-neutral-200 focus:outline-none focus:border-luxuryBlack"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] tracking-editorial uppercase text-neutral-600 mb-2">Headline font</label>
                    <select
                      value={heroData.headlineFont}
                      onChange={(e) => setHeroData({ ...heroData, headlineFont: e.target.value })}
                      className="w-full px-4 py-3 border border-neutral-200 focus:outline-none focus:border-luxuryBlack"
                    >
                      <option value="cormorant">Cormorant Garamond</option>
                      <option value="inter">Inter</option>
                      <option value="georgia">Georgia</option>
                      <option value="times">Times New Roman</option>
                      <option value="custom">Custom uploaded font</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-editorial uppercase text-neutral-600 mb-2">Alignment</label>
                    <select
                      value={heroData.alignment}
                      onChange={(e) => setHeroData({ ...heroData, alignment: e.target.value as 'left' | 'center' | 'right' })}
                      className="w-full px-4 py-3 border border-neutral-200 focus:outline-none focus:border-luxuryBlack"
                    >
                      <option value="left">Left text / image right</option>
                      <option value="center">Centered text / image right</option>
                      <option value="right">Right text / image left</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] tracking-editorial uppercase text-neutral-600 mb-2">Upload custom font (woff2, woff, ttf, otf)</label>
                    <input
                      type="file"
                      accept=".woff2,.woff,.ttf,.otf"
                      disabled={fontUploading}
                      onChange={(e) => void uploadFont(e.target.files?.[0])}
                      className="w-full text-sm"
                    />
                    {heroData.customFontUrl && (
                      <p className="text-xs text-neutral-500 mt-2 break-all">Current: {heroData.customFontUrl}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-editorial uppercase text-neutral-600 mb-2">Custom font URL (optional)</label>
                    <input
                      type="text"
                      value={heroData.customFontUrl}
                      onChange={(e) => setHeroData({ ...heroData, customFontUrl: e.target.value, headlineFont: e.target.value ? 'custom' : heroData.headlineFont })}
                      placeholder="/uploads/...woff2 or https://...woff2"
                      className="w-full px-4 py-3 border border-neutral-200 focus:outline-none focus:border-luxuryBlack"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-[11px] tracking-editorial uppercase text-neutral-600 mb-2">Headline / CTA colour</label>
                    <input
                      type="color"
                      value={heroData.headlineColor}
                      onChange={(e) => setHeroData({ ...heroData, headlineColor: e.target.value })}
                      className="w-full h-12 border border-neutral-200"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-editorial uppercase text-neutral-600 mb-2">Subheadline colour</label>
                    <input
                      type="color"
                      value={heroData.subheadlineColor}
                      onChange={(e) => setHeroData({ ...heroData, subheadlineColor: e.target.value })}
                      className="w-full h-12 border border-neutral-200"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-editorial uppercase text-neutral-600 mb-2">Text panel colour</label>
                    <input
                      type="color"
                      value={heroData.panelColor}
                      onChange={(e) => setHeroData({ ...heroData, panelColor: e.target.value })}
                      className="w-full h-12 border border-neutral-200"
                    />
                  </div>
                </div>
                {message && <p role="status" className="text-sm text-neutral-700">{message}</p>}
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
