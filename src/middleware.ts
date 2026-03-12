import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * 301-redirect any request arriving on nplus1ventures.com to nplusalpha.com.
 * Preserves full path + query string so all inbound links and Google's index
 * entries transfer cleanly to the new domain.
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  if (host.includes("nplus1ventures.com")) {
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
