import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_PREFIX = "/admin";
const PUBLIC_ADMIN_PATH = "/admin/login";
const COOKIE_NAME = "gladys_admin_session";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith(PROTECTED_PREFIX)) return NextResponse.next();
  if (pathname === PUBLIC_ADMIN_PATH) return NextResponse.next();

  const session = request.cookies.get(COOKIE_NAME)?.value;
  if (!session) {
    const url = request.nextUrl.clone();
    url.pathname = PUBLIC_ADMIN_PATH;
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
