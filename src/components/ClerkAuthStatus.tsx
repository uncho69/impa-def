"use client";

import { UserButton, useUser, SignInButton, SignUpButton } from "@clerk/nextjs";
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';

export function ClerkAuthStatus() {
  const { isSignedIn, user, isLoaded } = useUser();
  const { t } = useLanguage();
  const [showFallback, setShowFallback] = useState(false);

  // Show fallback after 3 seconds if Clerk hasn't loaded
  useEffect(() => {
    if (!isLoaded) {
      const timer = setTimeout(() => {
        setShowFallback(true);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setShowFallback(false);
    }
  }, [isLoaded]);

  // Show loading state briefly, but show fallback if it takes too long
  if (!isLoaded && !showFallback) {
    return (
      <div className="flex items-center space-x-4">
        <div className="animate-pulse bg-neutral-200 rounded-lg w-20 h-8"></div>
        <div className="animate-pulse bg-neutral-200 rounded-lg w-24 h-8"></div>
      </div>
    );
  }

  // If Clerk is taking too long, show the buttons anyway
  if (!isLoaded && showFallback) {
    return (
      <div className="flex items-center space-x-3">
        <SignInButton mode="modal">
          <button className="px-4 py-2 border-2 border-primary-600 text-primary-600 bg-white rounded-lg font-semibold text-sm hover:bg-primary-50 transition-colors">
            Accedi
          </button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold text-sm hover:bg-primary-700 transition-colors">
            Registrati
          </button>
        </SignUpButton>
      </div>
    );
  }

  // If user is signed in, show user button
  if (isSignedIn && user) {
    return (
      <div className="flex items-center space-x-3">
        <UserButton afterSignOutUrl="/" />
      </div>
    );
  }

  // Show both Accedi and Registrati buttons when not signed in - directly open Clerk modal
  return (
    <div className="flex items-center space-x-3">
      <SignInButton mode="modal">
        <button className="px-4 py-2 border-2 border-primary-600 text-primary-600 bg-white rounded-lg font-semibold text-sm hover:bg-primary-50 transition-colors">
          Accedi
        </button>
      </SignInButton>
      <SignUpButton mode="modal">
        <button className="px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold text-sm hover:bg-primary-700 transition-colors">
          Registrati
        </button>
      </SignUpButton>
    </div>
  );
}
