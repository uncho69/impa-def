import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isStaticFile, matchesPublicRoute } from '@/lib/middleware-utils';

// Try to use Clerk middleware
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let middleware: any;

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
  const { clerkMiddleware } = require('@clerk/nextjs/server');

  middleware = clerkMiddleware(async (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    auth: any,
    request: NextRequest
  ) => {
    const pathname = request.nextUrl.pathname;

    if (isStaticFile(pathname)) {
      return NextResponse.next();
    }

    if (pathname.startsWith('/api')) {
      await auth();
      return NextResponse.next();
    }

    if (!matchesPublicRoute(pathname)) {
      await auth.protect();
    }

    return NextResponse.next();
  });
} catch {
  middleware = async function (request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    if (isStaticFile(pathname)) {
      return NextResponse.next();
    }
    return NextResponse.next();
  };
}

export default middleware;

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|_next/webpack-hmr|favicon\\.ico|.*\\.(?:mp4|webm|mov|avi|mkv|m4v|jpg|jpeg|png|gif|svg|webp|ico|css|js|woff|woff2|ttf|eot|pdf|zip|doc|docx|xls|xlsx|csv|webmanifest)$).*)',
  ],
};
