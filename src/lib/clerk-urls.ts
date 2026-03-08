/**
 * Clerk Account Portal URLs
 * All authentication actions (login, signup, logout) should redirect to these URLs
 */
export const CLERK_ACCOUNT_PORTAL_URLS = {
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  SIGN_OUT_REDIRECT: '/sign-in',
} as const;
