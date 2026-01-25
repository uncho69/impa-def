/**
 * Clerk Account Portal URLs
 * All authentication actions (login, signup, logout) should redirect to these URLs
 */
export const CLERK_ACCOUNT_PORTAL_URLS = {
  SIGN_IN: 'https://accounts.imparodefi.xyz/sign-in',
  SIGN_UP: 'https://accounts.imparodefi.xyz/sign-up',
  SIGN_OUT_REDIRECT: 'https://accounts.imparodefi.xyz/sign-in',
} as const;
