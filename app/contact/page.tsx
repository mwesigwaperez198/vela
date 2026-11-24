import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ContactForm } from '@/components/ContactForm';
import { CONTACT_INFO } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Enquire about DA-VELA Fashions designs, custom orders and collections.',
};

export default function ContactPage() {
  const whatsapp = `https://wa.me/256${CONTACT_INFO.whatsapp.replace(/^0/, '')}`;

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 lg:px-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 tracking-tight">Contact</h1>
          <p className="text-lg font-light text-neutral-600 max-w-2xl">
            Have a design in mind or need help with an order? Send us a message and we will get back to you.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-[11px] tracking-editorial uppercase text-neutral-500 mb-3">Call / WhatsApp</p>
              <a href={`tel:+256${CONTACT_INFO.phone.replace(/^0/, '')}`} className="font-serif text-2xl border-b border-luxuryBlack pb-1">
                {CONTACT_INFO.phone}
              </a>
              <p className="mt-3">
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="text-[11px] tracking-editorial uppercase border-b border-luxuryBlack pb-1">
                  Chat on WhatsApp
                </a>
              </p>
            </div>
            <div>
              <p className="text-[11px] tracking-editorial uppercase text-neutral-500 mb-3">Email</p>
              <a href={`mailto:${CONTACT_INFO.email}`} className="font-serif text-2xl border-b border-luxuryBlack pb-1 break-all">
                {CONTACT_INFO.email}
              </a>
            </div>
            <div>
              <p className="text-[11px] tracking-editorial uppercase text-neutral-500 mb-3">Visit</p>
              <p className="font-serif text-2xl">{CONTACT_INFO.location}</p>
            </div>
          </div>

          <div className="lg:col-span-7 border border-neutral-200 p-6 lg:p-10">
            <h2 className="font-serif text-3xl mb-8">Send an enquiry</h2>
            <Suspense fallback={<p className="text-sm text-neutral-500">Loading form...</p>}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
