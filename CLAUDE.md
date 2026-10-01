# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Shared context (read before changing UI or copy)

- **Design system (source of truth):** the n+α Design System artifact, https://claude.ai/artifact/LkJFJ1m81KYet9EeMNzd3z. Read `project/README.md`, `project/tokens.json` and `project/guidelines/*.md` with the Artifact tool (read action) before touching UI, motion or copy. The site's port lives in `src/app/brand.css` and `src/components/brand.tsx`. When the two disagree, fix the site or update the artifact, and say which.
- **Brand voice:** every word on the site goes through the humanizer skill (https://github.com/blader/humanizer, 25 AI-writing patterns). Sentence case, no em dashes, short sentences, numbers first, "I" for Nav. Full rules: the Obsidian note "nPlusAlpha Brand Voice" and the design system's Writing rules section.
- **Working notes:** Obsidian vault at `~/Documents/Obsidian Vault`. Start at `Welcome`. Append what you did to the top of `Log` (newest first). Site status lives in `nPlus1 Ventures`, the platform in `nPlusAlpha Platform`. Never put secrets there.
- **Sister repo:** `~/nplusalpha-app` is app.nplusalpha.com, the growth-ops platform (Supabase, Ahrefs, agents). Separate Vercel project and codebase. Don't mix them up.
- **Deploys:** Vercel project `nplus1`. Every pushed branch builds a preview. Production has been deployed from the local working tree with `vercel --prod`, so check what is live before pushing `main`.
- **Settled facts:** all six case study companies may be named, Charta Health included (confirmed 2026-09-27). The portrait is the New York Times photo by Michael Swensen; keep the credit on /about.
- **Structured data rules:** no aggregateRating or Review markup for our own testimonials (self-serving, never eligible). Emit FAQPage only where the FAQs are visible on the page. Author is the Person `/about#navsingh`, not the company. `datePublished` is the date a page went live, not an engagement start.
- **Cowork agents:** the Cowork VM has no GitHub credentials, so Nav pushes. Git there can't delete its own lock files unless delete permission is granted on this folder; remove `.git/index.lock` after any git write or Nav's next command fails.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # ESLint
```

No test suite is configured.

## Project skills

Playbooks for the owner's local AI tooling live in `.claude/skills/`:

- `local-llm-setup` — diagnose/fix a crashing local Ollama model (Hermes) and swap to Qwen/Gemma with tool-calling support
- `comfyui-agent-setup` — connect agents to ComfyUI via the first-party Comfy MCP (local `comfy-mcp` or Comfy Cloud), the in-app Comfy agent, or the third-party ComfyUI-Agent-Kit

These target the owner's laptop; invoke them when running Claude Code locally, not in remote/cloud sessions.

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

**Next.js 16 App Router** site for n+α Ventures at nplusalpha.com (Nav Singh's fractional VP Marketing / RevOps consultancy; the repo keeps its old name, nplus1). Uses React 19, Tailwind CSS v4, TypeScript.

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
