import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * 301-redirect any request arriving on an old domain or www to nplusalpha.com.
 * Preserves full path + query string so all inbound links and Google's index
 * entries transfer cleanly to the new primary domain.
 */
export function middleware(request: NextRequest) {
  const { hostname, pathname, search } = request.nextUrl;
  const proto = request.headers.get("x-forwarded-proto") ?? "https";

  // Case-insensitive check for protocol and host
  const isHttp = proto.toLowerCase() === "http";
  const isWww = hostname.startsWith("www.");
  const isNotPrimaryHost = hostname !== "nplusalpha.com" && !hostname.includes("localhost");

  if (isHttp || isWww || isNotPrimaryHost) {
    // Construct the target URL explicitly to ensure consistency
    const targetUrl = new URL(pathname + search, "https://nplusalpha.com");
    return NextResponse.redirect(targetUrl, { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  // Run on all routes except Next.js internals and static assets
  matcher: "/((?!_next/static|_next/image|logos|favicon|icon|apple-touch-icon).*)",
};
