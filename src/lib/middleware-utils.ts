/**
 * Shared helpers for middleware. Used by root middleware and tests.
 */

const STATIC_EXTENSIONS =
  /\.(mp4|webm|mov|avi|mkv|m4v|jpg|jpeg|png|gif|svg|webp|ico|css|js|woff|woff2|ttf|eot|pdf|zip|doc|docx|xls|xlsx|csv|webmanifest)$/i;

export function isStaticFile(pathname: string): boolean {
  return (
    STATIC_EXTENSIONS.test(pathname) ||
    pathname.startsWith('/_next/static') ||
    pathname.startsWith('/_next/image')
  );
}

const PUBLIC_PATTERNS: Array<{ exact?: string; prefix?: string }> = [
  { exact: '/' },
  { prefix: '/api/webhooks/clerk' },
  { prefix: '/api/cron/process-tweets' },
  { prefix: '/api/leaderboards' },
  { prefix: '/api/campaigns' },
  { prefix: '/api/admin' },
  { prefix: '/sign-in' },
  { prefix: '/sign-up' },
  { prefix: '/registrati' },
  { prefix: '/videos' },
  // Routes that use ClerkProtectedRoute component for authentication
  { prefix: '/leaderboards' },
  { prefix: '/blockchain' },
  { prefix: '/defi' },
  { prefix: '/wallet' },
  { prefix: '/nft' },
  { prefix: '/exchange' },
  { prefix: '/giochi' },
  { prefix: '/compraevendicrypto' },
  { prefix: '/airdrops' },
  { prefix: '/campaigns' },
  { prefix: '/epochs' },
  { prefix: '/memecoins' },
  { prefix: '/eventi-storici' },
  { prefix: '/strumentiutili' },
];

export function matchesPublicRoute(pathname: string): boolean {
  for (const p of PUBLIC_PATTERNS) {
    if (p.exact && pathname === p.exact) return true;
    if (p.prefix && pathname.startsWith(p.prefix)) return true;
  }
  return false;
}
