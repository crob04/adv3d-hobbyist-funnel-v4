# Adv3D Funnel Template Guide

This repo is the starting point for new Advanc3D funnels built from the current O&P services site.

## What To Change For A New Funnel

1. Create a new private GitHub repo from this template.
2. Update `lib/site-config.ts`:
   - `funnelName`
   - `audienceKey`
   - `productionSiteUrl`
3. Configure the real production domain in Vercel.
4. Set `NEXT_PUBLIC_SITE_URL` in Vercel to the same canonical URL.
5. Update the Payload `landing-page` content and any seed content for the new audience.
6. If the phone/address differs, update `lib/business-contact.ts`.

## Why The Template Uses A Production URL Fallback

`lib/site-url.ts` intentionally falls back to a hardcoded production URL when `NEXT_PUBLIC_SITE_URL` is missing or invalid in production. That protects metadata from falling back to `localhost`, but it is only a safeguard.

For every new funnel:

- change the fallback in `lib/site-config.ts`
- set the matching `NEXT_PUBLIC_SITE_URL` env in Vercel

If those two values disagree, you create canonical confusion.

## SEO Checklist For Every New Funnel

- canonical tag points to the custom domain
- `og:url` points to the custom domain
- social image URLs are absolute and not `localhost`
- `robots.txt` includes the canonical sitemap
- `sitemap.xml` contains only canonical public URLs
- non-canonical production hosts `308` to the canonical domain
- Search Console receives the sitemap after deploy

## Safe Places To Vary The Design

- section order and spacing
- imagery and proof blocks
- CTA labels
- audience-specific positioning and copy
- additional sections or alternate card layouts

## Things To Preserve

- `app/robots.ts`
- `app/sitemap.ts`
- `middleware.ts`
- `lib/site-url.ts`
- metadata generation in `app/(site)/layout.tsx` and `app/(site)/page.tsx`
- analytics helpers in `lib/analytics.ts`
- server-side contact route in `app/api/contact/route.ts`
