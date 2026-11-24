'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function ContactForm() {
  const params = useSearchParams();
  const design = params.get('design') ?? '';
  const collection = params.get('collection') ?? '';
  const initialMessage = design
    ? `Hello DA-VELA, I would like to enquire about ${design}${collection ? ` from the ${collection}` : ''}.`
    : '';

  const [form, setForm] = useState({ name: '', contact: '', email: '', message: initialMessage });
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const update = (key: keyof typeof form) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
  };

  async function submit(event: FormEvent) {
    event.preventDefault();
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: design ? `Gallery: ${design}` : 'Contact page' }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? 'Could not send your message.');
      setForm({ name: '', contact: '', email: '', message: '' });
      setStatus('sent');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send your message.');
      setStatus('error');
    }
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-[11px] tracking-editorial uppercase text-neutral-600 mb-2">Name</label>
        <input id="name" required maxLength={120} value={form.name} onChange={update('name')} placeholder="Your name"
          className="w-full px-4 py-3 border border-neutral-200 focus:outline-none focus:border-luxuryBlack" />
      </div>
      <div>
        <label htmlFor="contact" className="block text-[11px] tracking-editorial uppercase text-neutral-600 mb-2">Phone / WhatsApp</label>
        <input id="contact" required maxLength={120} value={form.contact} onChange={update('contact')} placeholder="07xxxxxxxx"
          className="w-full px-4 py-3 border border-neutral-200 focus:outline-none focus:border-luxuryBlack" />
      </div>
      <div>
        <label htmlFor="email" className="block text-[11px] tracking-editorial uppercase text-neutral-600 mb-2">Email (optional)</label>
        <input id="email" type="email" maxLength={180} value={form.email} onChange={update('email')} placeholder="you@example.com"
          className="w-full px-4 py-3 border border-neutral-200 focus:outline-none focus:border-luxuryBlack" />
      </div>
      <div>
        <label htmlFor="message" className="block text-[11px] tracking-editorial uppercase text-neutral-600 mb-2">Message</label>
        <textarea id="message" required maxLength={2000} rows={6} value={form.message} onChange={update('message')}
          placeholder="Tell us what you are looking for"
          className="w-full px-4 py-3 border border-neutral-200 focus:outline-none focus:border-luxuryBlack" />
      </div>
      {status === 'sent' && (
        <p role="status" className="text-sm text-green-800">Thank you. We have received your message and will get back to you shortly.</p>
      )}
      {(status === 'error' || error) && <p role="alert" className="text-sm text-red-700">{error}</p>}
      <button type="submit" disabled={status === 'sending'}
        className="w-full bg-luxuryBlack text-white py-4 text-[11px] tracking-editorial uppercase hover:opacity-90 transition-opacity disabled:opacity-50">
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
