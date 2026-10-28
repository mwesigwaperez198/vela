import { NextRequest, NextResponse } from 'next/server';
import { cmsStore } from '@/lib/cms-config';

export async function GET() {
  const nav = cmsStore.getAllNav();
  const siteConfig = cmsStore.getSiteConfig();
  return NextResponse.json({ nav, siteConfig });
}

export async function POST(request: NextRequest) {
  try {
    const { nav } = await request.json();
    cmsStore.updateNav(nav);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update navigation' }, { status: 500 });
  }
}
