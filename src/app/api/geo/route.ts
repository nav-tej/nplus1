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

function markdownResponse(content: string) {
  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept, User-Agent",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
