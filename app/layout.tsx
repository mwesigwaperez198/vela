import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Inter, Playfair_Display, Cormorant_Garamond } from 'next/font/google';
import { CartDrawer } from '@/components/CartDrawer';
import { CartProvider } from '@/components/CartProvider';
import { GhostMenu } from '@/components/GhostMenu';
import { SITE_NAME } from '@/lib/site';
import './globals.css';

const serif = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-serif', display: 'swap' });
const sans = Inter({ subsets: ['latin'], weight: ['200', '300', '400'], variable: '--font-sans', display: 'swap' });

export const metadata: Metadata = {
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: 'African luxury fashion from Kampala. DA-VELA HOUSE OF ARTS. Prices in Ugandan shillings.',
};

export const viewport: Viewport = { themeColor: '#ffffff' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-UG" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <CartProvider>
          <GhostMenu />
          <main className="min-h-screen">{children}</main>
          <footer className="px-4 py-20 text-[11px] font-extralight tracking-editorial uppercase lg:px-10 border-t border-neutral-100">
            <div className="max-w-7xl mx-auto">
              <p className="font-serif text-3xl tracking-extra-wide normal-case">DA-VELA FASHIONS</p>
              <p className="font-serif text-lg tracking-extra-wide normal-case mt-2">DA-VELA HOUSE OF ARTS</p>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-neutral-700 mb-4">Contact</p>
                  <p className="mt-2 text-neutral-500">Tel: 0765866555</p>
                  <p className="mt-2 text-neutral-500">WhatsApp: 0765866555</p>
                  <p className="mt-2 text-neutral-500">Email: novaratechafrica@gmail.com</p>
                </div>
                <div>
                  <p className="text-neutral-700 mb-4">Location</p>
                  <p className="mt-2 text-neutral-500">Kampala, Uganda</p>
                  <p className="mt-2 text-neutral-500">East Africa</p>
                </div>
                <div>
                  <p className="text-neutral-700 mb-4">Info</p>
                  <p className="mt-2 text-neutral-500">All prices in UGX</p>
                  <p className="mt-2 text-neutral-500">African Luxury Redefined</p>
                </div>
              </div>
              <p className="mt-12 text-neutral-400 text-[10px]">© {new Date().getFullYear()} DA-VELA FASHIONS. All rights reserved.</p>
            </div>
          </footer>
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
