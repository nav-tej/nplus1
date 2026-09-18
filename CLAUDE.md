# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # ESLint
```

No test suite is configured.

## Environment Variables

Required for full functionality (copy to `.env.local`):

```
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
CONTACT_EMAIL=
```

## Architecture

**Next.js 16 App Router** site for nPlus1 Ventures (Nav Singh's fractional VP Marketing / RevOps consultancy). Uses React 19, Tailwind CSS v4, TypeScript.

### Key structural patterns

- `src/app/` — App Router pages and API routes
- `src/components/` — All UI components (no sub-directories; flat structure)
- `src/lib/` — Shared logic: `constants.ts` (all site content/copy), `blog.ts` (post metadata), `blog-content.tsx` (full post JSX content), `blog-content-md.ts` (markdown versions), `case-studies.ts` (all case study content), `supabase.ts` (lazy singleton client)

### Content management

All site copy lives in `src/lib/constants.ts` — FOUNDER, SERVICES, TESTIMONIALS, NAV_LINKS, etc. Blog post metadata is in `src/lib/blog.ts` (BLOG_POSTS array); full post content is in `src/lib/blog-content.tsx` as exported JSX functions keyed by slug, with a markdown variant in `src/lib/blog-content-md.ts`.

### Case study system

All case study content lives in `src/lib/case-studies.ts`. That one array drives the `/case-studies` hub, the `/case-studies/[slug]` detail pages, the `/md` routes, the sitemap, `llms.txt`, the homepage strip, the footer column and every cross-link. Add a study by appending to `CASE_STUDIES`; everything else follows automatically.

HeyGen is the exception: it keeps a hand-built route at `src/app/case-studies/heygen/page.tsx` for its VideoObject schema, and is flagged `hasCustomPage: true` so the dynamic route skips it. A static segment always wins over `[slug]`, so both coexist.

`BLOG_TO_CASE_STUDY` maps a post slug to the engagement that proves its argument, rendered by `CaseStudyCallout` at the foot of each post.

### Blog system

Blog is statically rendered. Add a new post by: (1) adding an entry to `BLOG_POSTS` in `src/lib/blog.ts`, (2) adding a matching export to `src/lib/blog-content.tsx`, and (3) optionally adding a markdown version to `src/lib/blog-content-md.ts`. The `src/app/blog/[slug]/md/route.ts` serves raw markdown for LLM consumption.

### API routes

- `POST /api/contact` — Saves to Supabase `contact_submissions` table + sends email via Resend
- `GET /llms.txt` and `GET /llms-full.txt` — LLM-friendly site content

### Analytics

PostHog is initialized in a `useEffect` inside `PostHogProvider` (client component). `PostHogLoader` code-splits it via `next/dynamic` and wraps the app tree in `layout.tsx`. Page views are captured manually (`capture_pageview: false`); `PostHogPageView` uses `useSearchParams` and must stay inside its own `Suspense` boundary.

**Never pass `ssr: false` to that dynamic import.** It wrapped `{children}`, so from Feb to Sep 2026 every route shipped an empty shell (Next emits `BAILOUT_TO_CLIENT_SIDE_RENDERING`), which broke in-page anchors and left pages in Search Console as "Crawled - currently not indexed". Regression check:

```bash
curl -s https://nplusalpha.com/ | grep -c '<h1'   # must be >= 1
```

### SEO notes

- OG image routes serve `X-Robots-Tag: noindex` via `next.config.ts`; Google was crawling them as pages.
- `src/proxy.ts` 301s everything to the apex except `localhost` and `*.vercel.app` previews.
- `scripts/indexnow.mjs` submits the live sitemap to Bing, Yandex and DuckDuckGo. Google does not participate in IndexNow, so Google needs Search Console.

### Performance patterns

- `Services` and `Testimonials` are dynamically imported on the homepage (below-fold split)
- Inter font loaded via `next/font/google` with `display: swap`
- SEO: `opengraph-image.tsx` files generate OG images; `JsonLd` component emits structured data
