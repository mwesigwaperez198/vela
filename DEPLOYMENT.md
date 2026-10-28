# Deployment Guide for DA-VELA FASHIONS

## Hosting Requirements (Uganda Premium Hosting)

This site is built with Next.js 15 and requires Node.js hosting. For cPanel/shared hosting in Uganda, you'll need:

- Node.js 18.x or higher
- Access to run npm commands or use Node.js app manager
- At least 512MB RAM (1GB+ recommended)
- SSL certificate

## Deployment Options

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
