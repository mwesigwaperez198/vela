'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { CampaignHero } from '@/lib/types';

const ALIGN = {
  left: 'items-start text-left',
  center: 'items-center text-center',
  right: 'items-end text-right',
} as const;

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

  const tone = hero.textTone === 'light' ? 'text-white' : 'text-luxuryBlack';

  const handleVideoError = () => {
    setError(true);
    if (videoRef.current) {
      videoRef.current.preload = 'none';
      videoRef.current.load();
    }
  };

  const handlePosterLoad = () => {
    setPosterLoaded(true);
  };

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-neutral-200">
      {hero.posterUrl && (
        <Image
          src={hero.posterUrl}
          alt={hero.headline}
          fill
          sizes="100vw"
          className={`object-cover ${posterLoaded ? '' : 'opacity-0 transition-opacity duration-1000'} ${error ? 'hidden' : ''}`}
          onLoad={() => setPosterLoaded(true)}
        />
      )}

      {error && hero.posterUrl && (
        <Image
          src={hero.posterUrl}
          alt={hero.headline}
          fill
          sizes="100vw"
          className="object-cover"
        )
      )}

      {hero.videoUrl && !error && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
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

      {error && (
        <div className="absolute inset-0 flex items-center justify-center text-neutral-400 text-sm">
          Video error — showing poster image
        </div>
      )}

      <div className={`absolute inset-0 flex flex-col justify-end gap-6 px-4 pb-16 lg:px-10 lg:pb-20 ${ALIGN[hero.alignment]} ${tone}`}>
        <motion.h1
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="max-w-4xl font-serif text-5xl leading-[1.05] md:text-7xl lg:text-8xl"
        >
          {hero.headline}
        </motion.h1>
        {hero.subheadline && (
          <p className="max-w-md text-sm font-light tracking-wide">{hero.subheadline}</p>
        )}
        <Link
          href={hero.ctaHref}
          className="border-b border-current pb-1 text-[11px] font-extralight tracking-extra-wide uppercase hover:opacity-70 transition-opacity"
        >
          {hero.ctaLabel === 'Shop the collection' ? 'Visit Store' : hero.ctaLabel}
        </Link>
      </div>
    </section>
  );
}
