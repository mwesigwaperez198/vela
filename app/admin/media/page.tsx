'use client';

import { useCallback, useEffect, useRef, useState, type ChangeEvent } from 'react';
import Link from 'next/link';

interface FileItem {
  id: string;
  name: string;
  path: string;
  url: string;
  type: 'image' | 'video' | 'file';
  size: string;
  uploaded: string;
}

const links = [
  { title: 'Dashboard', href: '/admin' },
  { title: 'Products/Fashions', href: '/admin/products' },
  { title: 'Hero Videos & Campaigns', href: '/admin/campaigns' },
  { title: 'Ghost Navigation', href: '/admin/navigation' },
  { title: 'Media Library', href: '/admin/media' },
  { title: 'Inquiries & Messages', href: '/admin/inquiries' },
  { title: 'Orders & Logs', href: '/admin/orders' },
  { title: 'Payments & Settings', href: '/admin/payments' },
  { title: 'Site Settings', href: '/admin/settings' },
];

export default function AdminMediaPage() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/media/files');
      if (!res.ok) throw new Error('Could not load the media library.');
      const data = (await res.json()) as { files: FileItem[] };
      setFiles(data.files);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Could not load the media library.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const upload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setMessage('');
    const body = new FormData();
    body.append('file', file);
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? 'Upload failed.');
      setMessage(`Uploaded ${file.name}.`);
      await load();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const copyUrl = async (url: string) => {
    const absolute = new URL(url, window.location.origin).toString();
    try {
      await navigator.clipboard.writeText(absolute);
      setMessage('URL copied to clipboard.');
    } catch {
      setMessage(`Copy this URL: ${absolute}`);
    }
  };

  const remove = async (file: FileItem) => {
    if (!window.confirm(`Delete ${file.name}?`)) return;
    setMessage('');
    try {
      const res = await fetch('/api/admin/media/files', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: file.path }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? 'Could not delete the file.');
      setMessage(`Deleted ${file.name}.`);
      await load();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Could not delete the file.');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="flex">
        <aside className="w-64 bg-luxuryBlack text-white min-h-screen fixed">
          <div className="p-6 border-b border-neutral-800">
            <Link href="/admin">
              <h1 className="font-serif text-xl tracking-extra-wide">DA-VELA CMS</h1>
              <p className="text-[10px] text-neutral-400 mt-1 tracking-editorial uppercase">Control Panel</p>
            </Link>
          </div>
          <nav className="p-4">
            {links.map((link) => (
              <Link key={link.href} href={link.href}
                className={`flex items-center gap-3 px-4 py-3 text-sm rounded mb-1 transition-colors ${
                  link.href === '/admin/media' ? 'bg-neutral-900' : 'hover:bg-neutral-900'
                }`}>
                <span className="font-light">{link.title}</span>
              </Link>
            ))}
          </nav>
        </aside>

        <main className="ml-64 flex-1 p-8">
          <header className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-4xl mb-2">Media Library</h2>
              <p className="text-neutral-600 font-light">Upload and manage videos, animations, and images</p>
            </div>
            <div>
              <input ref={inputRef} type="file" accept="image/*,video/*" onChange={upload} className="hidden" />
              <button type="button" disabled={busy} onClick={() => inputRef.current?.click()}
                className="bg-luxuryBlack text-white px-6 py-3 text-[11px] tracking-editorial uppercase hover:opacity-90 transition-opacity disabled:opacity-50">
                {busy ? 'Uploading...' : 'Upload Files'}
              </button>
            </div>
          </header>

          {message && <p role="status" className="mb-6 text-sm text-neutral-700">{message}</p>}
          {loading && <p className="text-sm text-neutral-500">Loading...</p>}

          {!loading && (
            <div className="bg-white border border-neutral-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-neutral-50 border-b border-neutral-200">
                    <tr>
                      <th className="text-left p-4 text-[11px] tracking-editorial uppercase font-light text-neutral-600">File</th>
                      <th className="text-left p-4 text-[11px] tracking-editorial uppercase font-light text-neutral-600">Type</th>
                      <th className="text-left p-4 text-[11px] tracking-editorial uppercase font-light text-neutral-600">Size</th>
                      <th className="text-left p-4 text-[11px] tracking-editorial uppercase font-light text-neutral-600">Uploaded</th>
                      <th className="text-left p-4 text-[11px] tracking-editorial uppercase font-light text-neutral-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {files.length === 0 && (
                      <tr><td colSpan={5} className="p-8 text-center text-sm text-neutral-500">No files found in public/uploads.</td></tr>
                    )}
                    {files.map((file) => (
                      <tr key={file.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                        <td className="p-4">
                          <a href={file.url} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline">{file.name}</a>
                          <p className="text-xs text-neutral-400 mt-1">{file.path}</p>
                        </td>
                        <td className="p-4 text-neutral-600 capitalize">{file.type}</td>
                        <td className="p-4 text-neutral-600">{file.size}</td>
                        <td className="p-4 text-neutral-600">{file.uploaded}</td>
                        <td className="p-4 flex gap-3">
                          <button type="button" onClick={() => void copyUrl(file.url)} className="text-[11px] tracking-editorial uppercase border-b border-luxuryBlack pb-0.5">Copy URL</button>
                          <button type="button" onClick={() => void remove(file)} className="text-[11px] tracking-editorial uppercase text-red-600">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
