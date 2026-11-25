'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { CampaignHero } from '@/lib/types';

const FONTS: Record<string, string> = {
  cormorant: "'Cormorant Garamond', Georgia, serif",
  inter: "'Inter', Helvetica Neue, Arial, sans-serif",
  georgia: 'Georgia, serif',
  times: "'Times New Roman', Times, serif",
};

const TEXT_ALIGN = {
  left: 'items-start text-left',
  center: 'items-center text-center',
  right: 'items-end text-right',
} as const;

function fontStack(hero: CampaignHero): string {
  const preset = FONTS[hero.headlineFont ?? 'cormorant'] ?? FONTS.cormorant;
  return hero.customFontUrl ? `'DA-Vela-Custom', ${preset}` : preset;
}

function fontFormat(url: string): string {
  if (url.endsWith('.woff2')) return 'woff2';
  if (url.endsWith('.woff')) return 'woff';
  if (url.endsWith('.ttf')) return 'truetype';
  return 'opentype';
}

function safeFontUrl(url: string): string {
  return /^(\/uploads\/|https:\/\/)/.test(url) ? url.replace(/["'<>]/g, '') : '';
}

export function HeroVideo({ hero }: { hero: CampaignHero }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);
  const [posterLoaded, setPosterLoaded] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      videoRef.current?.pause();
      setError(false);
    }
  }, []);

  const handleVideoError = () => {
    setError(true);
    if (videoRef.current) {
      videoRef.current.preload = 'none';
      videoRef.current.load();
    }
  };

  const customFont = safeFontUrl(hero.customFontUrl ?? '');
  const mediaFirst = hero.alignment === 'right';
  const headlineColor = hero.headlineColor || '#0d0d0d';
  const subheadlineColor = hero.subheadlineColor || '#1a1a1a';
  const panelColor = hero.panelColor || '#f5f3ef';

  return (
    <section className="relative w-full bg-[#f5f3ef]" aria-label={hero.headline}>
      {customFont && (
        <style dangerouslySetInnerHTML={{
          __html: `@font-face{font-family:'DA-Vela-Custom';src:url('${customFont}') format('${fontFormat(customFont)}');font-display:swap;font-weight:300 700;}`,
        }}
      />}

      <div className="grid min-h-[100svh] lg:grid-cols-2">
        <div
          className={`relative order-2 flex min-h-[52svh] flex-col justify-end px-6 pb-16 pt-10 lg:min-h-0 lg:px-16 lg:pb-24 lg:pt-28 ${
            mediaFirst ? 'lg:order-2' : 'lg:order-1'
          }`}
          style={{ backgroundColor: panelColor }}
        >
          <div className={`flex w-full flex-col gap-7 ${TEXT_ALIGN[hero.alignment]}`}>
            {hero.eyebrow && (
              <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-neutral-600">
                {hero.eyebrow}
              </p>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              style={{ color: headlineColor, fontFamily: fontStack(hero) }}
              className="max-w-3xl text-5xl font-medium leading-[1.02] tracking-[-0.025em] md:text-6xl lg:text-7xl"
            >
              {hero.headline}
            </motion.h1>

            {hero.subheadline && (
              <p
                style={{ color: subheadlineColor }}
                className="max-w-lg text-[13px] font-medium leading-relaxed tracking-[0.04em]"
              >
                {hero.subheadline}
              </p>
            )}

            <Link
              href={hero.ctaHref}
              style={{ color: headlineColor, borderColor: headlineColor }}
              className="inline-flex w-fit border-b pb-1 text-[11px] font-medium uppercase tracking-[0.24em] transition-opacity hover:opacity-60"
            >
              {hero.ctaLabel}
            </Link>
          </div>
        </div>

        <div
          className={`relative order-1 h-[46svh] overflow-hidden bg-neutral-200 lg:h-auto ${
            mediaFirst ? 'lg:order-1' : 'lg:order-2'
          }`}
        >
          {hero.posterUrl && (
            <Image
              src={hero.posterUrl}
              alt={hero.headline}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={`object-cover ${posterLoaded ? '' : 'opacity-0 transition-opacity duration-700'} ${
                error ? 'hidden' : ''
              }`}
              onLoad={() => setPosterLoaded(true)}
            />
          )}

          {error && hero.posterUrl && (
            <Image
              src={hero.posterUrl}
              alt={hero.headline}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          )}

          {hero.videoUrl && !error && (
            <video
              ref={videoRef}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                ready ? 'opacity-100' : 'opacity-0'
              }`}
              src={hero.videoUrl}
              poster={hero.posterUrl || undefined}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onCanPlay={() => setReady(true)}
              onError={handleVideoError}
              aria-hidden
            />
          )}
        </div>
      </div>
    </section>
  );
}
