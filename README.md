# Adv3D Funnel Template

A reusable Next.js + Payload baseline for future private Advanc3D landing-page repos.

- Next.js 15
- Payload CMS 3
- Tailwind CSS
- Postgres / Neon
- Brevo Transactional Email

## What this template does

- Public website and CMS admin live in the same Next.js app
- Payload admin is isolated in its own route group so admin styling stays stable
- The current baseline content comes from the Advanc3D O&P services funnel
- The landing page content is modeled as a fixed-order `landing-page` global
- All editable copy lives in Payload
- The contact form posts to a server-side Brevo email route
- The repo includes a one-shot seed script for the funnel content
- The deployment path is Vercel-friendly
- SEO and canonical-host protections are included by default

## Funnel sections

The `landing-page` global includes:

- Hero
- Problem
- Differentiators
- Benefits
- Workflow
- Proof
- FAQ
- Contact
- Footer CTA
- Contact config overrides for email behavior

## Environment variables

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SITE_URL`
- `PAYLOAD_SECRET`
- `DATABASE_URL`
- `BREVO_API_KEY`
- `BREVO_STAFF_EMAIL`
- `BREVO_FROM_EMAIL`
- `BREVO_STAFF_FROM_EMAIL`
- `BREVO_FROM_NAME`
- `NEXT_PUBLIC_GA_ID`
- `USE_MOCK_DATA`

`BREVO_STAFF_EMAIL` accepts a comma-separated recipient list. `BREVO_FROM_EMAIL` is the customer-facing sender, while `BREVO_STAFF_FROM_EMAIL` is used for internal staff notifications when those need a different mailbox.

For production deploys, `NEXT_PUBLIC_SITE_URL` must be the real canonical custom-domain URL for that funnel. Never leave `localhost` in Vercel envs.

## Template identity

Before creating a new production funnel from this repo, update:

- `lib/site-config.ts`
- `lib/business-contact.ts` if the contact details differ
- Payload `landing-page` content for the new audience

Read `TEMPLATE_GUIDE.md` before deploying a new variant.

## Local setup

```bash
npm install
npm run dev
```

Open:

- `http://localhost:3000`
- `http://localhost:3000/admin`

If you want a mock-only frontend run without a real database, set `USE_MOCK_DATA=true`.

## Seed the funnel

After the Payload tables exist and your env vars are set:

```bash
npm run seed:landing
```

That writes the Advanc3D funnel content into the `landing-page` global.

## Deployment

Deploy this repo to Vercel with the root directory set to the repo root and configure:

- `NEXT_PUBLIC_SITE_URL`
- `PAYLOAD_SECRET`
- `DATABASE_URL`
- `BREVO_API_KEY`
- `BREVO_STAFF_EMAIL`
- `BREVO_FROM_EMAIL`
- `BREVO_STAFF_FROM_EMAIL`
- `BREVO_FROM_NAME`
- `NEXT_PUBLIC_GA_ID`

Use a fresh Postgres database for each new project.

Production-safe SEO behavior is driven by:

- `lib/site-config.ts`
- `lib/site-url.ts`
- `middleware.ts`
- `app/robots.ts`
- `app/sitemap.ts`
- metadata in `app/(site)/layout.tsx` and `app/(site)/page.tsx`

## Contact CTA behavior

- Shared business contact data lives in `lib/business-contact.ts`
- The time-gated phone CTA uses `lib/business-hours.ts` and `components/business-hours-call-button.tsx`
- The call button stays hidden until client-side JavaScript runs, then appears only during Monday-Friday, 9:00 AM-5:00 PM in `America/New_York`
- The contact section also emits an organization/contact JSON-LD block from `app/(site)/page.tsx`
- GA4 phone-click tracking uses the `click_call_button` event with `phone_number` and `site_section` params

## Guidance

Read `PAYLOAD_PLAYBOOK.md` before starting a new site from this starter.
