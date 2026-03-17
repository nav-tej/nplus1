import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * 301-redirect any request arriving on an old domain or www to nplusalpha.com.
 * Preserves full path + query string so all inbound links and Google's index
 * entries transfer cleanly to the new primary domain.
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const proto = request.headers.get("x-forwarded-proto") ?? "https";

  // Redirect to https and primary domain
  const isHttp = proto === "http";
  const isNotPrimaryHost = host && host !== "nplusalpha.com" && !host.includes("localhost");

  if (isHttp || isNotPrimaryHost) {
    const url = request.nextUrl.clone();
    url.protocol = "https";
    url.host = "nplusalpha.com";
    url.port = "";
    return NextResponse.redirect(url, { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  // Run on all routes except Next.js internals and static assets
  matcher: "/((?!_next/static|_next/image|logos|favicon|icon|apple-touch-icon).*)",
};
