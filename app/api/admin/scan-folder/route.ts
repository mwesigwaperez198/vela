import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

const ALLOWED_BASE = path.join(process.cwd(), 'public', 'uploads');

export const config = {
  api: { bodyParser: false },
};

interface FileItem {
  name: string;
  url: string;
  size: string;
  type: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const folder = searchParams.get('folder') || '';

  const resolved = path.resolve(ALLOWED_BASE, folder);
  if (!resolved.startsWith(ALLOWED_BASE)) {
    return new Response(JSON.stringify({ error: 'Invalid folder path' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let files: FileItem[] = [];
  try {
    if (fs.existsSync(resolved) && fs.statSync(resolved).isDirectory()) {
      files = fs.readdirSync(resolved).map((fileName) => {
        const filePath = path.join(resolved, fileName);
        try {
          const stat = fs.statSync(filePath);
          const ext = fileName.split('.').pop()?.toLowerCase() || '';
          const isImage = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif'].includes(ext);
          const isVideo = ['mp4', 'mov', 'webm'].includes(ext);
          return {
            name: fileName,
            url: `/${filePath.replace(process.cwd() + '/', '')}`,
            size: formatBytes(stat.size),
            type: isImage ? 'image' : isVideo ? 'video' : 'file',
          };
        } catch {
          return { name: fileName, type: 'error', size: '0', url: '' };
        }
      });
    }
  } catch (err) {
    console.error('Error scanning folder:', err);
  }

  files.sort((a, b) => {
    if (a.type !== b.type) return a.type.localeCompare(b.type);
    return b.name.localeCompare(a.name);
  });

  return new Response(
    JSON.stringify({ files, base: '/public/uploads' }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export async function POST(request: NextRequest) {
  return new Response(
    JSON.stringify({ error: 'Use GET with folder parameter' }),
    {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}