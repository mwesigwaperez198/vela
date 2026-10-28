import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)', 'Cormorant Garamond', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'Helvetica Neue', 'sans-serif'],
      },
      letterSpacing: {
        'extra-wide': '0.35em',
        editorial: '0.2em',
      },
      colors: {
        luxuryBlack: '#0d0d0d',
        luxuryGold: '#d4af37',
        gucciGreen: '#004225',
        gucciRed: '#e4002b',
        ivory: '#f5f3ef',
        charcoal: '#1a1a1a',
      },
      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
