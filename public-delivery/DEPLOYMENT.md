# Public Delivery Guide

This folder is a static-safe preview package for handoff/demo environments.

## What this package is

- Independent static preview (`index.html`, CSS, JS)
- Architecture and delivery-ready reference bundle
- Safe to deploy on Netlify, Hostinger, GitHub Pages, or any static host

## What this package is not

- It does not replace the full Next.js application.
- OTP, APIs, role-based auth, DB-backed modules run in the main app.

## Full App Deployment (recommended)

1. Configure `.env` from `.env.example`.
2. Set `DATABASE_URL`, `SESSION_SECRET`, and optional Supabase keys.
3. Run:
   - `npm install`
   - `npm run prisma:generate`
   - `npm run build`
4. Deploy to Vercel or Render.

## Static Preview Deployment

1. Deploy this `public-delivery/` directory as static files.
2. Ensure `index.html` is your default route.

## Build Public Bundle

Run:

```bash
npm run public-delivery:bundle
```

Output:

- `dist-public-delivery/`
