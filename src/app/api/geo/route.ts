import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createGeoHandler } from "next-geo";
import { BLOG_POSTS } from "@/lib/blog";
import { BLOG_CONTENT_MD } from "@/lib/blog-content-md";
import { caseStudyToMarkdown, getCaseStudy } from "@/lib/case-studies";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Internal target for the rewrite in src/proxy.ts. Never linked or crawled
 * directly — it only ever runs for requests that already signaled they want
 * markdown for a real page URL (see excludePaths for /api/*).
 *
 * Blog posts and case studies have hand-written markdown twins already used
 * elsewhere on the site (RSS feed, llms-full.txt), so those are served
 * as-is for quality. Every other page falls back to next-geo's generic
 * HTML→markdown auto-conversion of the same URL's <main> content.
 */
const autoConvert = createGeoHandler();

export async function GET(request: NextRequest) {
  const path =
    request.headers.get("x-llm-target-path") ??
    request.nextUrl.searchParams.get("path");

  if (path) {
    const blogSlug = matchSegment(path, "/blog/");
    if (blogSlug && BLOG_POSTS.some((p) => p.slug === blogSlug)) {
      const markdown = BLOG_CONTENT_MD[blogSlug];
      if (markdown) return markdownResponse(markdown);
    }

    const caseStudySlug = matchSegment(path, "/case-studies/");
    if (caseStudySlug) {
      const study = getCaseStudy(caseStudySlug);
      if (study) return markdownResponse(caseStudyToMarkdown(study));
    }
  }

  return autoConvert.GET(request);
}

/** Extracts the single path segment after `prefix`, e.g. "/blog/foo" -> "foo". */
function matchSegment(path: string, prefix: string): string | null {
  if (!path.startsWith(prefix)) return null;
  const rest = path.slice(prefix.length);
  return rest && !rest.includes("/") ? rest : null;
}

/**
 * `Vary: Accept, User-Agent` belongs here and nowhere else.
 *
 * The HTML responses deliberately do NOT declare it. Never `Vary` a cacheable
 * page on User-Agent: UA strings run to thousands of distinct values and every
 * CDN, Vercel's included, folds Vary into the cache key, so one entry per page
 * becomes thousands and the hit rate collapses.
 *
 * We do not need it anyway. The branch happens in proxy.ts, which runs at the
 * edge *before* the CDN cache lookup and rewrites agent traffic to this route.
 * The two representations therefore live at different cache keys structurally
 * rather than by negotiation, and a browser request can never reach a cached
 * markdown entry. Declaring it here is still correct for any intermediary cache
 * downstream, and costs nothing: this route is force-dynamic and never CDN-cached.
 */
function markdownResponse(content: string) {
  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept, User-Agent",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
