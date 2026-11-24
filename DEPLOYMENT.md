# Deployment Guide for DA-VELA FASHIONS

## Hosting Requirements (Uganda Premium Hosting)

This site is built with Next.js 15 and requires Node.js hosting. For cPanel/shared hosting in Uganda, you'll need:

- Node.js 18.x or higher
- Access to run npm commands or use Node.js app manager
- At least 512MB RAM (1GB+ recommended)
- SSL certificate

## Deployment Options

### Fastest live test: Vercel (recommended)

The repository already contains `vercel.json`. Import `mwesigwaperez198/vela` at Vercel, keep the detected Next.js settings (`npm install`, `npm run build`, output `.next`) and deploy. With no CMS variables set, the storefront renders from bundled fixtures, so no secrets are needed for a first test.

### Cloudflare Pages

Cloudflare Pages deploys static assets only unless a build command is configured. The log line `No build command specified. Skipping build step.` means the raw repository was uploaded; since there is no root `index.html`, `/` returns 404.

For a full-stack deploy, use Cloudflare Workers with the Next.js adapter, or set the Pages build command to `npm run build` with output directory `out` after converting the app to `output: 'export'` (static only; API routes and the CMS will not work).

Do not leave both the build command and output directory blank.

### Option 1: cPanel with Node.js
1. Upload all files via FTP/File Manager
2. Set up Node.js application pointing to `npm start`
3. Set environment variables
4. Ensure `.next` build is generated or build on server

### Option 2: VPS/Cloud Hosting
1. Clone repository
2. Run `npm install`
3. Run `npm run build`
4. Run `npm start` with PM2

## Environment Variables
Copy `.env.example` to `.env.local` and configure as needed.

## CMS
Access the built-in CMS at `yourdomain.com/admin` for full content control.
- Upload fashions, videos, animations
- Manage gallery by sex, culture, country
- Control hero videos
- Manage advertisements
- Monitor system health
- Handle inquiries

## Contact
For support: novaratechafrica@gmail.com or call 0765866555
