import { NextResponse } from 'next/server';
import { cmsStore, type SiteConfig } from '@/lib/cms-config';

export async function GET() {
  return NextResponse.json({ siteConfig: await cmsStore.getSiteConfig() });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid settings.' }, { status: 400 });
  }

  const input = body as Partial<SiteConfig>;
  const text = (value: unknown, max: number): string | null =>
    typeof value === 'string' && value.trim().length > 0 && value.trim().length <= max ? value.trim() : null;

  const brandName = text(input.brandName, 120);
  const email = text(input.email, 180);
  const location = text(input.location, 120);
  if (!brandName || !email || !location) {
    return NextResponse.json({ error: 'Brand name, email and location are required.' }, { status: 400 });
  }

  try {
    const siteConfig = await cmsStore.updateSiteConfig({
      brandName,
      brandNameSecondary: text(input.brandNameSecondary, 120) ?? '',
      tagline: text(input.tagline, 120) ?? '',
      phone: text(input.phone, 60) ?? '',
      whatsapp: text(input.whatsapp, 60) ?? '',
      email,
      location,
      logoText: text(input.logoText, 120) ?? brandName,
      showBag: input.showBag !== false,
      ghostNavEnabled: input.ghostNavEnabled !== false,
    });

    return NextResponse.json({ success: true, siteConfig });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to save settings';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
