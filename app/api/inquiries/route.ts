import { NextResponse } from 'next/server';
import { cmsStore } from '@/lib/cms-config';

const limit = (value: unknown, max: number): string | null =>
  typeof value === 'string' && value.trim().length > 0 && value.trim().length <= max
    ? value.trim()
    : null;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid inquiry.' }, { status: 400 });
  }

  const input = body as Record<string, unknown>;
  const name = limit(input.name, 120);
  const contact = limit(input.contact, 120);
  const message = limit(input.message, 2000);
  const email = typeof input.email === 'string' ? limit(input.email, 180) ?? '' : '';
  const source = typeof input.source === 'string' ? limit(input.source, 120) ?? '' : '';

  if (!name || !contact || !message) {
    return NextResponse.json(
      { error: 'Please provide your name, a contact number and a message.' },
      { status: 400 },
    );
  }

  try {
    const inquiry = await cmsStore.addInquiry({ name, contact, email, message, source });
    return NextResponse.json({ success: true, inquiry }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Could not save the inquiry.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
