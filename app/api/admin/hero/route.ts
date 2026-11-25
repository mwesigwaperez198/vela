import { NextRequest, NextResponse } from 'next/server';
import { cmsStore } from '@/lib/cms-config';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || 'home';
  const hero = await cmsStore.getHero(page);
  return NextResponse.json({ hero });
}

export async function POST(request: NextRequest) {
  try {
    const hero = await request.json();
    await cmsStore.updateHero(hero);
    return NextResponse.json({ success: true, hero });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update hero';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
