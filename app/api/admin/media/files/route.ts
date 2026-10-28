import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

export const config = {
  api: { bodyParser: false },
};

export async function GET() {
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  
  let files: any[] = [];
  
  try {
    if (fs.existsSync(uploadsDir)) {
      files = fs.readdirSync(uploadsDir).map((fileName) => {
        const filePath = path.join(uploadsDir, fileName);
        const stat = fs.statSync(filePath);
        return {
          id: Date.now() - stat.mtimeMs,
          name: fileName,
          type: fileName.split('.').pop() ? fileName.split('.').pop() === 'mp4' || fileName.split('.').pop() === 'mov' ? 'video' : 'image' : 'file',
          size: formatBytes(stat.size),
          uploaded: new Date(stat.mtimeMs).toISOString().split('T')[0],
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
