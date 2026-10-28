import { NextRequest } from 'next/server';

export const config = {
  api: { bodyParser: false },
};

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file = data.get('file') as File | null;
  if (!file) {
    return new Response(JSON.stringify({ error: 'No file provided' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = file.name.split('.').pop() || 'jpg';
  const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
  const filepath = `public/uploads/${filename}`;

  const fs = require('fs');
  fs.mkdirSync('public/uploads', { recursive: true });
  fs.writeFileSync(filepath, buffer);

  const url = `/${filepath}`;
  return new Response(
    JSON.stringify({ success: true, url, filename }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
