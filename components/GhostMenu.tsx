'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { useCart } from '@/components/CartProvider';
import { NAV_LINKS, SITE_NAME } from '@/lib/site';

const EASE = [0.22, 1, 0.36, 1] as const;

export function GhostMenu() {
  const { hidden } = useScrollDirection();
  const { count, open: openCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [navLinks, setNavLinks] = useState(NAV_LINKS);
  const [siteConfig, setSiteConfig] = useState({ brandName: SITE_NAME, showBag: true, ghostNavEnabled: true });

  useEffect(() => {
    fetch('/api/admin/nav')
      .then((res) => res.json())
      .then((data) => {
        if (data.nav) {
          setNavLinks(data.nav.map((n: any) => ({ label: n.label, href: n.href })));
        }
        if (data.siteConfig) {
          setSiteConfig(data.siteConfig);
        }
      })
      .catch(() => {
        // Use defaults if CMS not available
      });
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  return (
    <>
      {siteConfig.ghostNavEnabled !== false && (
        <motion.header
          initial={false}
          animate={{ y: hidden && !menuOpen ? '-100%' : '0%' }}
          transition={{ duration: 0.55, ease: EASE }}
          className="fixed inset-x-0 top-0 z-50 text-white mix-blend-difference"
        >
          <nav
            aria-label="Primary"
            className="grid grid-cols-[1fr_auto_1fr] items-center px-4 py-5 text-[11px] font-extralight tracking-editorial uppercase lg:px-10"
          >
            <div className="flex items-center gap-8">
              <button
                type="button"
                className="md:hidden"
                aria-expanded={menuOpen}
                aria-controls="menu-overlay"
                onClick={() => setMenuOpen((v) => !v)}
              >
                {menuOpen ? 'Close' : 'Menu'}
              </button>
              <ul className="hidden gap-8 md:flex">
                {navLinks.map((link: any) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <Link href="/" className="font-serif text-lg tracking-extra-wide md:text-xl lg:text-2xl" aria-label={siteConfig.brandName || SITE_NAME}>
              {(siteConfig.logoText || siteConfig.brandName || SITE_NAME).toUpperCase()}
            </Link>

            <div className="flex justify-end">
              {siteConfig.showBag !== false && (
                <button type="button" onClick={openCart} aria-label={`Open bag, ${count} items`}>
                  Bag ({count})
                </button>
              )}
            </div>
          </nav>
        </motion.header>
      )}

      <AnimatePresence>
        {menuOpen && siteConfig.ghostNavEnabled !== false && (
          <motion.div
            id="menu-overlay"
            key="overlay"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-luxuryBlack px-6 text-white md:hidden"
          >
            <ul className="space-y-6">
              {navLinks.map((link: any) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-serif text-5xl leading-tight"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
