"use client";

import { UserButton, useUser, SignInButton } from "@clerk/nextjs";
import { Button } from './Button';
import { useLanguage } from '@/contexts/LanguageContext';

export function ClerkAuthStatus() {
  const { isSignedIn, user, isLoaded } = useUser();
  const { t } = useLanguage();

  // Show loading state briefly
  if (!isLoaded) {
    return (
      <div className="flex items-center space-x-4">
        <div className="animate-pulse bg-neutral-200 rounded-lg w-20 h-8"></div>
      </div>
    );
  }

  // If user is signed in, show user info and logout
  if (isSignedIn && user) {
    return (
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-neutral-600">
            {user.emailAddresses[0]?.emailAddress || user.username || user.id.slice(0, 8) + '...'}
          </span>
        </div>
        <UserButton afterSignOutUrl="/" />
      </div>
    );
  }

  // Show sign in button - use redirect mode for better reliability
  return (
    <div className="flex items-center space-x-4">
      <SignInButton mode="redirect" redirectUrl="/">
        <Button className="btn btn-primary">
          {t('auth.accedi')}
        </Button>
      </SignInButton>
    </div>
  );
}

