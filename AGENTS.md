# Adv3D Funnel Template Agent Guide

## Purpose

This repository is the baseline for future Advanc3D landing pages. It starts from the O&P services funnel and is intended to be copied into new private repos for additional audiences, services, campaigns, or layout variants.

## Read First

1. `README.md`
2. `TEMPLATE_GUIDE.md`
3. `BRAND.md`
4. `PAYLOAD_PLAYBOOK.md`

## Hard Rules

1. Do not let production metadata resolve to `localhost`.
2. Do not remove or bypass `lib/site-url.ts`, `lib/site-config.ts`, `middleware.ts`, `app/robots.ts`, or `app/sitemap.ts` when making a new funnel variant.
3. Before the first production deploy of any new funnel, update `lib/site-config.ts` and set `NEXT_PUBLIC_SITE_URL` in Vercel to the same canonical custom-domain URL.
4. Keep exactly one canonical production host per funnel. Preview deployments may stay public, but production aliases must redirect to the custom domain.
5. Do not hardcode audience-specific metadata URLs in multiple places. Use the site URL helper.
6. Verify the running system, not just the build.

## Canonical SEO Invariants

- Homepage metadata must emit a self-canonical URL.
- Open Graph and Twitter image URLs must be absolute and production-safe.
- `robots.txt` must expose the canonical sitemap URL.
- `sitemap.xml` must include only canonical public URLs.
- Middleware must redirect non-canonical production hosts to the canonical host with a `308`.

## Where To Change Variant Identity

- `lib/site-config.ts`
  - `funnelName`
  - `audienceKey`
  - `productionSiteUrl`
- `lib/business-contact.ts`
  - business phone/address defaults if needed
- Payload content in the `landing-page` global
- `README.md` if the repo stops being a generic template and becomes a specific deployed funnel

## Required Verification For New Variants

Run from repo root:

```bash
npm install
npx tsc --noEmit
npm run lint
npm run build
```

Then verify:

```bash
curl -I https://your-canonical-domain.example/robots.txt
curl -I https://your-canonical-domain.example/sitemap.xml
curl -I https://your-project.vercel.app/some-path?x=1
```

Expected:

- `robots.txt` returns `200`
- `sitemap.xml` returns `200`
- `.vercel.app` production alias returns `308` to the canonical custom domain
- homepage HTML has no `localhost` metadata in production

## Content And Layout Guidance

- Preserve the brand system unless the business explicitly wants a new one.
- Keep all editable copy in Payload globals instead of scattering content in TSX.
- Layout variants are acceptable, but preserve the existing analytics hooks, contact flow, metadata, crawl routes, and canonical redirect behavior.
