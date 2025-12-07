import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function isStaticFile(pathname: string): boolean {
  const staticExtensions = /\.(mp4|webm|mov|avi|mkv|m4v|jpg|jpeg|png|gif|svg|webp|ico|css|js|woff|woff2|ttf|eot|pdf|zip|doc|docx|xls|xlsx|csv|webmanifest)$/i;
  return staticExtensions.test(pathname) || pathname.startsWith('/_next/static') || pathname.startsWith('/_next/image');
}

// Define public routes
const publicRoutes = [
  '/',
  '/api/webhooks/clerk(.*)',
  '/api/cron/process-tweets(.*)',
  '/api/leaderboards(.*)',
  '/api/campaigns(.*)',
  '/api/admin(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/registrati(.*)',
  '/videos(.*)',
];

// Try to use Clerk middleware
let middleware: any;

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
  const { clerkMiddleware, createRouteMatcher } = require('@clerk/nextjs/server');
  const isPublicRoute = createRouteMatcher(publicRoutes);
  
  // Use Clerk middleware directly - this allows Clerk to detect it
  middleware = clerkMiddleware(async (auth: any, request: NextRequest) => {
    const pathname = request.nextUrl.pathname;
    
    // Skip static files
    if (isStaticFile(pathname)) {
      return NextResponse.next();
    }
    
    // Protect non-public routes
    if (!isPublicRoute(request) && !pathname.startsWith('/api')) {
      await auth.protect();
    }
    
    return NextResponse.next();
  });
} catch (error) {
  // Clerk not available - use passthrough
  middleware = async function(request: NextRequest) {
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
