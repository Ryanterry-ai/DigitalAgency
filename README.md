# Sai Associates Management System

Production-ready operations dashboard built with Next.js 14 App Router, TypeScript, Tailwind CSS, Prisma/PostgreSQL-ready schema, OTP login structure, role-based access, and responsive admin UX.

## Core Capabilities

- Admin + Employee role flow
- OTP-ready auth API (`/api/auth/request-otp`, `/api/auth/verify-otp`)
- ATM modules: sites, visits/issues, attendance, expenses
- Crompton retail modules: retailers, visits, orders
- Reports + charts (Recharts)
- Notification center with read-state updates
- Upload endpoint scaffold (`/api/uploads`)
- Motion-enhanced UX with reduced-motion support
- Public static handoff preview package (`public-delivery/`)

## Tech Stack

- Next.js 14 App Router
- TypeScript (strict)
- Tailwind CSS
- Framer Motion
- Recharts
- Zod validation
- Prisma ORM (PostgreSQL schema)

## Environment Setup

1. Copy `.env.example` to `.env.local`
2. Fill required values:
   - `DATABASE_URL`
   - `SESSION_SECRET`
3. Optional:
   - Supabase storage keys for real file upload

## Development

```bash
npm install
npm run prisma:generate
npm run dev
```

## Build & Deploy

```bash
npm run build
npm run start
```

### Vercel

- Repo: `Ryanterry-ai/DigitalAgency`
- Framework preset: Next.js
- Ensure environment variables are set in Vercel project settings

## Public Delivery Package

Static handoff preview files are inside `public-delivery/`.

Create distributable bundle:

```bash
npm run public-delivery:bundle
```

This generates `dist-public-delivery/` for independent static deployment.

## Important Notes

- Current upload route returns preview-safe URLs by default. Replace with Supabase/Cloudinary adapter for production media storage.
- OTP provider is scaffolded with dev fallback (`123456`) when `OTP_DEV_FALLBACK=true`.
