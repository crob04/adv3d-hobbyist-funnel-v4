import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getCanonicalHost } from "@/lib/site-url";

const CANONICAL_HOST = getCanonicalHost();

export function middleware(request: NextRequest) {
  const host = request.headers.get("host");
  const isProduction = process.env.VERCEL_ENV === "production";

  if (!isProduction || !host || host === CANONICAL_HOST || host.startsWith("localhost")) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.protocol = "https:";
  url.hostname = CANONICAL_HOST;
  url.port = "";

  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"
  ]
};
