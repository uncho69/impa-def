import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const isManuale = pathname.startsWith("/manuale");
  if (!isManuale) return NextResponse.next();

  const registered = request.cookies.get("imparodefi_registered")?.value === "1";
  if (registered) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/registrati";
  url.search = `?next=${encodeURIComponent(pathname + (search || ""))}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/manuale/:path*"],
};

