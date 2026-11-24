import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const ALLOWED = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif', 'mp4', 'webm', 'mov']);
const MAX_BYTES = 50 * 1024 * 1024;

export async function POST(request: Request) {
  const data = await request.formData().catch(() => null);
  const file = data?.get('file');
  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
  }

  const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
  if (!ALLOWED.has(ext)) {
    return NextResponse.json({ error: 'Only images (JPG, PNG, WEBP, GIF, AVIF) and videos (MP4, WEBM, MOV) are allowed.' }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'Files must be 50 MB or smaller.' }, { status: 400 });
  }

  const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
  const directory = path.resolve(process.cwd(), 'public', 'uploads');
  try {
    fs.mkdirSync(directory, { recursive: true });
    fs.writeFileSync(path.join(directory, filename), Buffer.from(await file.arrayBuffer()));
  } catch (error) {
    console.error('[upload] failed', error);
    return NextResponse.json({ error: 'Could not save the file.' }, { status: 500 });
  }

  return NextResponse.json({ success: true, url: `/uploads/${filename}`, filename, path: filename }, { status: 201 });
}
