import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { blobPut, isBlobConfigured } from '@/lib/blob-store';

const ALLOWED = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif', 'mp4', 'webm', 'mov', 'woff2', 'woff', 'ttf', 'otf']);
const MAX_BYTES = 50 * 1024 * 1024;

const CONTENT_TYPES: Record<string, string> = {
  jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp',
  gif: 'image/gif', avif: 'image/avif', mp4: 'video/mp4', webm: 'video/webm',
  mov: 'video/quicktime', woff2: 'font/woff2', woff: 'font/woff',
  ttf: 'font/ttf', otf: 'font/otf',
};

export async function POST(request: Request) {
  const data = await request.formData().catch(() => null);
  const file = data?.get('file');
  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
  }

  const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
  if (!ALLOWED.has(ext)) {
    return NextResponse.json({ error: 'Only images, videos and font files (woff2, woff, ttf, otf) are allowed.' }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'Files must be 50 MB or smaller.' }, { status: 400 });
  }

  const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  if (isBlobConfigured()) {
    try {
      const blob = await blobPut(`uploads/${filename}`, bytes, CONTENT_TYPES[ext] ?? 'application/octet-stream');
      return NextResponse.json(
        { success: true, url: blob.url, filename, path: `uploads/${filename}`, storage: 'blob' },
        { status: 201 },
      );
    } catch (error) {
      console.error('[upload] blob failed', error);
      return NextResponse.json({ error: 'Could not upload to the media library.' }, { status: 500 });
    }
  }

  if (process.env.VERCEL) {
    return NextResponse.json(
      { error: 'Media storage is not configured. Add BLOB_READ_WRITE_TOKEN to this project, then redeploy.' },
      { status: 503 },
    );
  }

  const directory = path.resolve(process.cwd(), 'public', 'uploads');
  try {
    fs.mkdirSync(directory, { recursive: true });
    fs.writeFileSync(path.join(directory, filename), bytes);
  } catch (error) {
    console.error('[upload] failed', error);
    return NextResponse.json({ error: 'Could not save the file.' }, { status: 500 });
  }

  return NextResponse.json({ success: true, url: `/uploads/${filename}`, filename, path: filename }, { status: 201 });
}
