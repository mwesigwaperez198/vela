/** @type {import('next').NextConfig} */
const remotePatterns = [{ protocol: 'https', hostname: 'cdn.shopify.com' }];

try {
  if (process.env.VISUAL_CMS_URL) {
    const { protocol, hostname, port } = new URL(process.env.VISUAL_CMS_URL);
    remotePatterns.push({ protocol: protocol.replace(':', ''), hostname, port });
  }
  if (process.env.VISUAL_CMS_MEDIA_HOST) {
    remotePatterns.push({ protocol: 'https', hostname: process.env.VISUAL_CMS_MEDIA_HOST });
  }
} catch {
  // Invalid VISUAL_CMS_URL is reported at request time by lib/env.ts.
}

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { 
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.shopify.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '**' },
    ], 
    formats: ['image/avif', 'image/webp'] 
  },
  compress: true,
};

export default nextConfig;
