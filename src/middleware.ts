import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Type for Clerk middleware module
type ClerkAuth = {
  protect: () => Promise<void>;
  userId: string | null;
  sessionId: string | null;
};

type ClerkMiddlewareCallback = (auth: ClerkAuth, request: NextRequest) => Promise<NextResponse> | NextResponse;

type ClerkMiddlewareModule = {
  clerkMiddleware: (callback: ClerkMiddlewareCallback) => MiddlewareFunction;
  createRouteMatcher: (routes: string[]) => (request: NextRequest) => boolean;
};

const hasValidClerkKeys = (): boolean => {
  if (process.env.SKIP_CLERK === 'true') {
    return false;
  }

  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim();
  const secretKey = process.env.CLERK_SECRET_KEY?.trim();
  
  const hasPublishableKey = !!(
    publishableKey &&
    publishableKey.length > 20 &&
    (publishableKey.startsWith('pk_test_') || publishableKey.startsWith('pk_live_'))
  );
  
  const hasSecretKey = !!(
    secretKey &&
    secretKey.length > 20 &&
    (secretKey.startsWith('sk_test_') || secretKey.startsWith('sk_live_'))
  );
  
  return hasPublishableKey && hasSecretKey;
};

function isStaticFile(pathname: string): boolean {
  const staticExtensions = /\.(mp4|webm|mov|avi|mkv|m4v|jpg|jpeg|png|gif|svg|webp|ico|css|js|woff|woff2|ttf|eot|pdf|zip|doc|docx|xls|xlsx|csv|webmanifest)$/i;
  return staticExtensions.test(pathname) || pathname.startsWith('/_next/static') || pathname.startsWith('/_next/image');
}

function passthroughMiddleware() {
  return NextResponse.next();
}

type MiddlewareFunction = (request: NextRequest) => Promise<NextResponse> | NextResponse;

let middleware: MiddlewareFunction = passthroughMiddleware;

if (hasValidClerkKeys()) {
  try {
    // Use require with type assertion for conditional imports in middleware
    // Next.js middleware requires synchronous imports, so we can't use dynamic import()
    // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
    const clerkModule = require('@clerk/nextjs/server') as ClerkMiddlewareModule;
    const { clerkMiddleware, createRouteMatcher } = clerkModule;
    
    const isPublicRoute = createRouteMatcher([
      '/',
      '/api/webhooks/clerk(.*)',
      '/api/cron/process-tweets(.*)',
      '/api/leaderboards(.*)',
      '/api/campaigns(.*)',
      '/api/admin(.*)',
      '/api/siwe(.*)',
      '/sign-in(.*)',
      '/sign-up(.*)',
      '/registrati(.*)',
      '/videos(.*)',
    ]);

    middleware = clerkMiddleware(async (auth: ClerkAuth, request: NextRequest) => {
      const pathname = request.nextUrl.pathname;
      
      if (pathname.match(/\.(mp4|webm|mov|avi|mkv|m4v|jpg|jpeg|png|gif|svg|webp|ico|css|js|woff|woff2|ttf|eot)$/i)) {
        return NextResponse.next();
      }
      
      if (!isPublicRoute(request) && !pathname.startsWith('/api')) {
        await auth.protect();
      }
      
      return NextResponse.next();
    });
  } catch (error) {
    console.warn('Clerk middleware not available, using passthrough:', error instanceof Error ? error.message : 'Unknown error');
    middleware = passthroughMiddleware;
  }
} else {
  console.log('Clerk not configured - running in dev mode without Clerk authentication');
}

export default async function mainMiddleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  if (isStaticFile(pathname)) {
    return NextResponse.next();
  }
  
  return middleware(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|_next/webpack-hmr|favicon\\.ico|.*\\.(?:mp4|webm|mov|avi|mkv|m4v|jpg|jpeg|png|gif|svg|webp|ico|css|js|woff|woff2|ttf|eot|pdf|zip|doc|docx|xls|xlsx|csv|webmanifest)$).*)',
  ],
};
