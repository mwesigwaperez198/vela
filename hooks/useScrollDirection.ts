'use client';

import { useEffect, useState } from 'react';

/** Hides on downward scroll, reveals on any upward scroll, always visible near the top. */
export function useScrollDirection(threshold = 12) {
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = Math.max(window.scrollY, 0);
      setAtTop(y < 8);
      if (Math.abs(y - last) >= threshold) {
        setHidden(y > last && y > 80);
        last = y;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return { hidden, atTop };
}
