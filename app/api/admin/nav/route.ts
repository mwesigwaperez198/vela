import { NextRequest, NextResponse } from 'next/server';
import { cmsStore } from '@/lib/cms-config';

export async function GET() {
  const [nav, siteConfig] = await Promise.all([
    cmsStore.getNav(),
    cmsStore.getSiteConfig(),
  ]);
  return NextResponse.json({ nav, siteConfig });
}

export async function POST(request: NextRequest) {
  try {
    const { nav } = await request.json();
    await cmsStore.updateNav(nav);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update navigation';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
