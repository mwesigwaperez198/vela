import 'server-only';

const API_URL = 'https://blob.vercel-storage.com/';
const API_VERSION = '13';

export interface BlobItem {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: string;
}

function token(): string | null {
  return process.env.BLOB_READ_WRITE_TOKEN || null;
}

function storeIdFromToken(value: string): string | null {
  return /^vercel_blob_rw_([^_]+)_/.exec(value)?.[1] ?? null;
}

export function isBlobConfigured(): boolean {
  const value = token();
  return Boolean(value && storeIdFromToken(value));
}

function headers(extra: Record<string, string> = {}): HeadersInit {
  const value = token();
  const storeId = value ? storeIdFromToken(value) : null;
  return {
    ...(value ? { authorization: `Bearer ${value}` } : {}),
    ...(storeId ? { 'x-vercel-blob-store-id': storeId } : {}),
    'x-api-version': API_VERSION,
    ...extra,
  };
}

async function failure(response: Response, action: string): Promise<Error> {
  let detail = '';
  try {
    const body = (await response.json()) as { error?: { message?: string } };
    detail = body.error?.message ?? '';
  } catch {
    detail = '';
  }
  return new Error(
    `Vercel Blob ${action} failed (${response.status})${detail ? `: ${detail}` : ''}`,
  );
}

function missingToken(): Error {
  return new Error(
    'CMS storage is not configured. Create a public Vercel Blob store and add BLOB_READ_WRITE_TOKEN to the project, then redeploy.',
  );
}

function requestBody(body: string | ArrayBuffer | Uint8Array): BodyInit {
  if (typeof body === 'string' || body instanceof ArrayBuffer) return body;
  return Uint8Array.from(body);
}

export async function blobPut(
  pathname: string,
  body: string | ArrayBuffer | Uint8Array,
  contentType: string,
): Promise<{ url: string; pathname: string }> {
  const value = token();
  if (!value) throw missingToken();

  const query = new URLSearchParams({ pathname });
  const response = await fetch(`${API_URL}?${query.toString()}`, {
    method: 'PUT',
    headers: headers({
      'x-vercel-blob-access': 'public',
      'x-add-random-suffix': '0',
      'x-allow-overwrite': '1',
      'x-cache-control-max-age': '60',
      'x-content-type': contentType,
    }),
    body: requestBody(body),
    cache: 'no-store',
  });
  if (!response.ok) throw await failure(response, 'upload');
  const data = (await response.json()) as { url: string; pathname: string };
  return { url: data.url, pathname: data.pathname };
}

export async function blobReadText(pathname: string): Promise<string | null> {
  const value = token();
  const storeId = value ? storeIdFromToken(value) : null;
  if (!value || !storeId) return null;

  const url = `https://${storeId}.public.blob.vercel-storage.com/${pathname}?cache=0`;
  const response = await fetch(url, { headers: headers(), cache: 'no-store' });
  if (response.status === 404) return null;
  if (!response.ok) throw await failure(response, 'read');
  return response.text();
}

export async function blobList(prefix: string): Promise<BlobItem[]> {
  if (!isBlobConfigured()) return [];
  const query = new URLSearchParams({ prefix, limit: '500' });
  const response = await fetch(`${API_URL}?${query.toString()}`, {
    headers: headers(),
    cache: 'no-store',
  });
  if (!response.ok) throw await failure(response, 'list');
  const data = (await response.json()) as { blobs?: BlobItem[] };
  return data.blobs ?? [];
}

export async function blobDelete(pathname: string): Promise<void> {
  if (!token()) throw missingToken();
  const response = await fetch(`${API_URL}delete`, {
    method: 'POST',
    headers: headers({ 'content-type': 'application/json' }),
    body: JSON.stringify({ urls: [pathname] }),
    cache: 'no-store',
  });
  if (!response.ok && response.status !== 404) {
    throw await failure(response, 'delete');
  }
}
