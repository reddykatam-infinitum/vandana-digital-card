# Infinitum Digital Business Card — Vandana B

A production-ready, mobile-first digital business card built with Next.js, TypeScript and QR sharing.

## Included

- Infinitum black/cyan brand system
- Vandana B profile image and company logo artwork
- Tap to call, WhatsApp, email and website
- Downloadable vCard contact (`.vcf`)
- Native mobile share with clipboard fallback
- QR-code modal
- LinkedIn and Instagram profiles
- Office address and Google Maps link
- SEO, Open Graph metadata, PWA manifest, robots and sitemap
- GitHub/Vercel-ready project structure

## Local setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The root route redirects to `/vandana-b`.

## Deploy to Vercel

Import this repository into Vercel and keep the detected framework as **Next.js**. Optionally configure:

```text
NEXT_PUBLIC_SITE_URL=https://your-final-domain.com
```

## Edit profile information

All profile fields are in `src/data/cards.ts`.

The supplied profile image and brand graphic are in:

```text
public/images/vandana.webp
public/images/infinitum-network.webp
```

The verified email address is `vandana@infinitumnetwork.in`.
