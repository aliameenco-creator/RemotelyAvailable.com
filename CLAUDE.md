# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Turbopack) at localhost:3000
npm run build    # Production build — also runs TypeScript + generates all static pages
npm run lint     # ESLint (eslint-config-next)
npm start        # Serve the production build
```

There is no test framework configured. `npm run build` is the primary correctness gate: it type-checks the whole project and statically generates every route, so a build failure surfaces both TS errors and any `generateStaticParams`/data mismatch. After changing anything under `src/data/` or a dynamic route, run `npm run build` to confirm all pages still generate.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript (strict) · Tailwind CSS v4 · Framer Motion (`motion`) · Zod · React Hook Form · Nodemailer. Path alias `@/*` → `./src/*`.

Note: the `RemotelyAvailable.com/` and `new pages/` directories are **not** part of the app (excluded from `tsconfig`) — treat them as scratch/reference material, not source.

## Architecture

### Content-as-data + static generation
This is a marketing site where **page content lives in typed data files under `src/data/`**, not hardcoded in components. Each file (`services.ts`, `systems.ts`, `automations.ts`, `caseStudies.ts`, `ukLocations.ts`, `faq.ts`, `testimonials.ts`) exports a typed array plus lookup helpers (e.g. `getCity`, `getAutomation`, `getAdjacentAutomations`).

Dynamic routes consume these arrays through `generateStaticParams` so every page is pre-rendered to static HTML at build time (SSG). To add content, edit the data file — routes, sitemap entries, and internal links derive from it automatically. Dynamic route segments set `export const dynamicParams = false` where the param set is closed.

Key dynamic routes:
- `services/[…]` — individual service pages rendered via `ServicePageTemplate`
- `automations/[slug]`, `ai-automation-systems/[slug]`, `projects/[slug]`
- `locations/[city]` and `locations/[city]/[service]` — programmatic SEO. ~75 UK cities × 6 services ≈ 525 pages generated from `src/data/ukLocations.ts`. Copy is assembled from per-city facts plus deterministic template variants (`pickVariant`, seeded by slug) so each page reads uniquely — this is intentional to avoid Google "doorway page" penalties. Do not collapse it into one shared paragraph.

### SEO is a first-class concern
When adding or changing pages, preserve these patterns:
- Per-page `generateMetadata` returning unique `title`, `description`, canonical (`alternates.canonical`), and OpenGraph.
- JSON-LD structured data injected via `<script type="application/ld+json">` — location pages emit `Service`/`ProfessionalService`, `BreadcrumbList`, and `FAQPage`.
- Every new static route must be added to `src/app/sitemap.ts` (location and service pages are mapped from their data arrays there).
- **Renaming/removing a route requires a permanent redirect** in `next.config.ts` `redirects()` to keep SEO equity — see the existing `/services/ai-*` → new-structure and `/systems` → `/ai-automation-systems` redirects.

### Layout chrome
`src/app/layout.tsx` wraps all pages in `SiteChrome`, which renders Navbar + Footer + LeadCapturePopup — **except** routes under `/dashboard`, which get a bare shell. Fonts (`Plus_Jakarta_Sans`, `Space_Mono`) are loaded via `next/font` in `src/lib/fonts.ts` and exposed as CSS variables.

### API routes → external webhooks
API routes in `src/app/api/` (`contact`, `chat`, `leads`, `shopify-lead`) validate input with Zod, then **forward to an external webhook URL** configured via env vars (`N8N_WEBHOOK_URL`, `N8N_CHAT_WEBHOOK_URL`, `LEADS_WEBHOOK_URL`). The endpoint is not required to be n8n, it's just a POST target — `leads` currently points at the Google Apps Script in `docs/lead-system/google-apps-script.gs` (no n8n dependency); `contact`/`chat` still assume an n8n workflow on the other end unless repointed. Each route has a **graceful fallback when its webhook env var is unset** (contact also sends SMTP mail if configured; otherwise logs to console), so the site runs fully in local dev with no env setup. The contact route also does honeypot (`_hp`) filtering and per-IP in-memory rate limiting. See `.env.example` for the full env surface.

### Design system
Brand tokens are defined in `src/app/globals.css` under `@theme inline` (Tailwind v4 style) — a warm-technical dark theme (near-black base, copper primary, lavender accent, cream text, Georgia serif display font). Use the semantic utility classes these generate rather than raw hex: `bg-bg-base` / `bg-bg-card`, `text-text-primary` / `text-text-secondary` / `text-text-muted`, `text-primary-400`, `border-white/[0.08]`, `font-display`. Reusable primitives live in `src/components/ui/` (`Button`, `Card`, `Badge`, `Pill`, `SectionHeading`, `ServiceIcon`) and section blocks in `src/components/sections/` (`CTABanner`, `FAQ`, `Hero`, etc.).

### Server vs client components
Components are Server Components by default. Add `"use client"` only where interactivity is needed (forms, the FAQ accordion, `SiteChrome` for `usePathname`, `ServicePageTemplate`, chat widget, popups). Page-level metadata/JSON-LD stays in server components.
