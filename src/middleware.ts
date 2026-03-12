import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * 301-redirect any request arriving on an old domain or www to nplusalpha.com.
 * Preserves full path + query string so all inbound links and Google's index
 * entries transfer cleanly to the new primary domain.
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  // If the host is not the primary domain and not localhost, redirect to primary
  if (host && host !== "nplusalpha.com" && !host.includes("localhost")) {
    const url = request.nextUrl.clone();
    url.host = "nplusalpha.com";
    url.port = "";
    return NextResponse.redirect(url, { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  // Run on all routes except Next.js internals and static assets
  matcher: "/((?!_next/static|_next/image|favicon|icon|apple-touch-icon).*)",
};
