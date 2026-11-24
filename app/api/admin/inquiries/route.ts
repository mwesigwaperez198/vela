import { NextResponse } from 'next/server';
import { cmsStore } from '@/lib/cms-config';

export async function GET() {
  return NextResponse.json({ inquiries: cmsStore.getAllInquiries() });
}
