import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isStaticFile, matchesPublicRoute } from '@/lib/middleware-utils';
export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (isStaticFile(pathname)) return NextResponse.next();
  if (pathname.startsWith('/api')) return NextResponse.next();
  if (!matchesPublicRoute(pathname)) return NextResponse.next();
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|_next/webpack-hmr|favicon\\.ico|.*\\.(?:mp4|webm|mov|avi|mkv|m4v|jpg|jpeg|png|gif|svg|webp|ico|css|js|woff|woff2|ttf|eot|pdf|zip|doc|docx|xls|xlsx|csv|webmanifest)$).*)',
  ],
};
