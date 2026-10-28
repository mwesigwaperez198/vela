import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

export const config = {
  api: { bodyParser: false },
}

interface FileItem {
  id: number;
  name: string;
  type: 'image' | 'video' | 'file';
  size: string;
  uploaded: string;
}

export async function GET() {
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  
  let files: FileItem[] = [];
  
  try {
    if (fs.existsSync(uploadsDir)) {
      files = fs.readdirSync(uploadsDir).map((fileName) => {
        const filePath = path.join(uploadsDir, fileName);
        const stat = fs.statSync(filePath);
        const mtime = stat.mtimeMs ?? Date.now();
        const ext = fileName.split('.').pop()?.toLowerCase() || '';
        const isImage = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif'].includes(ext);
        const isVideo = ['mp4', 'mov', 'webm'].includes(ext);
        return {
          id: Date.now() - mtime,
          name: fileName,
          type: isImage ? 'image' : isVideo ? 'video' : 'file',
          size: formatBytes(stat.size),
          uploaded: new Date(mtime).toISOString().split('T')[0],
        };
      });
    }
  } catch (err) {
    console.error('Error reading uploads directory:', err);
  }
  
  files.sort((a, b) => b.id - a.id);
  
  return new Response(
    JSON.stringify({ files }),
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
    JSON.stringify({ error: 'Use /api/admin/upload' }),
    {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}