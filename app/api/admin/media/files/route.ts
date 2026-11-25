import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

interface FileItem {
  id: string;
  name: string;
  path: string;
  url: string;
  type: 'image' | 'video' | 'file';
  size: string;
  uploaded: string;
}

const UPLOADS = path.resolve(process.cwd(), 'public', 'uploads');
const IMAGES = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif', 'svg'];
const VIDEOS = ['mp4', 'mov', 'webm'];

function resolveUpload(relative: string): string | null {
  const target = path.resolve(UPLOADS, relative);
  if (target !== UPLOADS && !target.startsWith(UPLOADS + path.sep)) return null;
  return target;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(1))} ${sizes[i]}`;
}

function collect(directory: string, relative = ''): FileItem[] {
  const items: FileItem[] = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const relativePath = relative ? `${relative}/${entry.name}` : entry.name;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      items.push(...collect(absolute, relativePath));
      continue;
    }
    if (!entry.isFile()) continue;
    const stat = fs.statSync(absolute);
    const ext = entry.name.split('.').pop()?.toLowerCase() ?? '';
    items.push({
      id: `${relativePath}-${stat.mtimeMs}`,
      name: entry.name,
      path: relativePath,
      url: `/uploads/${relativePath.split('/').map(encodeURIComponent).join('/')}`,
      type: IMAGES.includes(ext) ? 'image' : VIDEOS.includes(ext) ? 'video' : 'file',
      size: formatBytes(stat.size),
      uploaded: new Date(stat.mtime).toISOString().split('T')[0] ?? '',
    });
  }
  return items;
}

export async function GET() {
  let files: FileItem[] = [];
  try {
    if (fs.existsSync(UPLOADS)) files = collect(UPLOADS);
  } catch (error) {
    console.error('[media] listing failed', error);
    return NextResponse.json({ error: 'Could not read the media library.' }, { status: 500 });
  }
  files.sort((a, b) => b.id.localeCompare(a.id));
  return NextResponse.json({ files });
}

export async function DELETE(request: Request) {
  const body = await request.json().catch(() => null);
  const relative = typeof body?.path === 'string' ? body.path : '';
  const target = relative ? resolveUpload(relative) : null;
  if (!target) {
    return NextResponse.json({ error: 'Invalid file path.' }, { status: 400 });
  }
  try {
    if (!fs.existsSync(target) || !fs.statSync(target).isFile()) {
      return NextResponse.json({ error: 'File not found.' }, { status: 404 });
    }
    fs.unlinkSync(target);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[media] delete failed', error);
    return NextResponse.json({ error: 'Could not delete the file.' }, { status: 500 });
  }
}
