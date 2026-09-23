import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createGeoMiddleware } from "next-geo";

/**
 * Serves markdown instead of HTML, on the same URL, when a request signals
 * it's an AI agent (Accept: text/markdown, or a known crawler User-Agent).
 * `enableMdSuffix` stays off deliberately: appending `.md` to any URL would
 * create a second crawlable path per page, which is the duplicate-URL
 * problem this is meant to avoid. See src/app/api/geo/route.ts for the
 * handler this rewrites to.
 */
const geoMiddleware = createGeoMiddleware({
  enableMdSuffix: false,
  excludePaths: [
    "/api/*",
    "/_next/*",
    "/llms.txt",
    "/llms-full.txt",
    "/sitemap.xml",
    "/robots.txt",
    "/feed.xml",
    "/manifest.webmanifest",
  ],
});

/**
 * 301-redirect any request arriving on an old domain or www to nplusalpha.com.
 * Preserves full path + query string so all inbound links and Google's index
 * entries transfer cleanly to the new primary domain.
 */
export function proxy(request: NextRequest) {
  const { hostname, pathname, search } = request.nextUrl;
  const proto = request.headers.get("x-forwarded-proto") ?? "https";

  // Case-insensitive check for protocol and host
  const isHttp = proto.toLowerCase() === "http";
  const isWww = hostname.startsWith("www.");
  // Preview deployments must serve themselves. Without this every
  // *.vercel.app preview 301s to production and cannot be QA'd.
  const isPreview = hostname.endsWith(".vercel.app");
  const isNotPrimaryHost =
    hostname !== "nplusalpha.com" &&
    !hostname.includes("localhost") &&
    !isPreview;

  if (!isPreview && (isHttp || isWww || isNotPrimaryHost)) {
    // Normalize pathname to prevent redirect chains (remove trailing slash except for root)
    let normalizedPathname = pathname;
    if (normalizedPathname !== "/" && normalizedPathname.endsWith("/")) {
      normalizedPathname = normalizedPathname.slice(0, -1);
    }

    // Construct the target URL explicitly to ensure consistency
    const targetUrl = new URL(normalizedPathname + search, "https://nplusalpha.com");
    return NextResponse.redirect(targetUrl, { status: 301 });
  }

  // Legacy markdown paths. /blog/<slug>/md and /case-studies/<slug>/md were
  // real routes until markdown moved onto the canonical URL via Accept
  // negotiation. 301 rather than 404 them, and do it before the geo
  // middleware so the old URL is gone for agents as well as browsers: they
  // follow the redirect and get markdown from the canonical URL instead.
  const legacyMarkdown = pathname.match(
    /^\/(blog|case-studies)\/([^/]+)\/md$/
  );
  if (legacyMarkdown) {
    const [, section, slug] = legacyMarkdown;
    return NextResponse.redirect(
      new URL(`/${section}/${slug}`, request.nextUrl.origin),
      { status: 301 }
    );
  }

  const geoResponse = geoMiddleware(request);
  if (geoResponse) return geoResponse;

  return NextResponse.next();
}

export const config = {
  // Pages need this middleware for the canonical-host redirect. Static files do
  // not, and every matched request costs an edge invocation, so skip anything
  // with a file extension alongside the Next.js internals.
  matcher:
    "/((?!_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|txt|xml|json|webmanifest|css|js|woff2?|mp4)$).*)",
};
