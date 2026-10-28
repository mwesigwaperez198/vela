import { NextRequest, NextResponse } from 'next/server';
import { cmsStore } from '@/lib/cms-config';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || 'home';
  const hero = cmsStore.getHero(page);
  return NextResponse.json({ hero });
}

export async function POST(request: NextRequest) {
  try {
    const hero = await request.json();
    cmsStore.updateHero(hero);
    return NextResponse.json({ success: true, hero });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update hero' }, { status: 500 });
  }
}
