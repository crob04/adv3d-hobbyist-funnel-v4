# PAYLOAD_PLAYBOOK

## Recommended architecture

Use Payload as part of the same Next.js application instead of splitting the site and CMS into separate services unless there is a strong reason to do otherwise.

Recommended structure:

- `app/(site)` for the public website
- `app/(payload)` for Payload admin and API routes
- root-level Payload config in `payload.config.ts`
- root-level seed script for writing starter content into the database

## Rules that prevent breakage

1. Give the Payload admin route group its own real root layout.
2. Load public-site CSS only in `(site)`.
3. Import Payload admin CSS explicitly in `(payload)/layout.tsx`.
4. Use generated Payload types when writing seed data.
5. Do not use boot-time `onInit` seeding for production-critical content.
6. Use a clean Postgres database for Payload projects.
7. Do not point a new Payload project at an old Strapi database.
8. Clear `.next` when route-group moves or admin module errors appear in dev.
9. Verify the exact checkout that contains `.env.local` before debugging database issues.
10. Validate both `/` and `/admin` locally before pushing.

## Database guidance

- Use Neon or another Postgres provider.
- Use a separate database or branch per project.
- For production, prefer explicit migrations or a deliberate schema-init workflow.

## Vercel guidance

Set:

- `NEXT_PUBLIC_SITE_URL`
- `PAYLOAD_SECRET`
- `DATABASE_URL`
- optional project-specific API keys only if the site truly needs them

Do not leave old CMS env vars such as `STRAPI_URL` or `STRAPI_API_TOKEN` in the project.

## Starter workflow for new projects

1. Clone this starter into a new repo.
2. Replace mock content and metadata.
3. Remove or add integrations only after the core Payload site is working.
4. Point `DATABASE_URL` at a fresh Postgres database.
5. Run locally and create the first admin user.
6. Run `npm run seed:landing` if you want starter content in the Payload global.
7. Generate updated Payload types after schema changes.
8. Push to GitHub.
9. Deploy to Vercel.
10. Verify `/admin` and the public homepage.
