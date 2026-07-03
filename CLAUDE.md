# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
- `comfyui-agent-setup` — connect agents to ComfyUI, locally via ComfyUI-Agent-Kit or hosted via Comfy Cloud MCP

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

**Next.js 16 App Router** site for nPlus1 Ventures (Nav Singh's fractional VP Marketing / RevOps consultancy). Uses React 19, Tailwind CSS v4, TypeScript.

### Key structural patterns

- `src/app/` — App Router pages and API routes
- `src/components/` — All UI components (no sub-directories; flat structure)
- `src/lib/` — Shared logic: `constants.ts` (all site content/copy), `blog.ts` (post metadata), `blog-content.tsx` (full post JSX content), `blog-content-md.ts` (markdown versions), `supabase.ts` (lazy singleton client)

### Content management

All site copy lives in `src/lib/constants.ts` — FOUNDER, SERVICES, TESTIMONIALS, NAV_LINKS, etc. Blog post metadata is in `src/lib/blog.ts` (BLOG_POSTS array); full post content is in `src/lib/blog-content.tsx` as exported JSX functions keyed by slug, with a markdown variant in `src/lib/blog-content-md.ts`.

### Blog system

Blog is statically rendered. Add a new post by: (1) adding an entry to `BLOG_POSTS` in `src/lib/blog.ts`, (2) adding a matching export to `src/lib/blog-content.tsx`, and (3) optionally adding a markdown version to `src/lib/blog-content-md.ts`. The `src/app/blog/[slug]/md/route.ts` serves raw markdown for LLM consumption.

### API routes

- `POST /api/contact` — Saves to Supabase `contact_submissions` table + sends email via Resend
- `GET /llms.txt` and `GET /llms-full.txt` — LLM-friendly site content

### Analytics

PostHog is initialized lazily via `requestIdleCallback` in `PostHogProvider` (client component). `PostHogLoader` in `layout.tsx` wraps it in a server component boundary. Page views are captured manually (`capture_pageview: false`).

### Performance patterns

- `Services` and `Testimonials` are dynamically imported on the homepage (below-fold split)
- Inter font loaded via `next/font/google` with `display: swap`
- SEO: `opengraph-image.tsx` files generate OG images; `JsonLd` component emits structured data
