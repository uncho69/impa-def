"use client";

import { useUser } from '@clerk/nextjs';
import { ReactNode, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AuthModal } from '@/components/auth/AuthModal';
import { usePathname } from 'next/navigation';

interface ClerkProtectedRouteProps {
  children: ReactNode;
  title?: string;
}

export function ClerkProtectedRoute({ children, title }: ClerkProtectedRouteProps) {
  const { t } = useLanguage();
  const { isLoaded, isSignedIn } = useUser();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const pathname = usePathname();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4" />
          <p className="text-neutral-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-b from-primary-50 to-background flex items-center justify-center">
          <div className="max-w-md mx-auto text-center p-8">
            <h1 className="text-3xl font-bold gradient-text mb-6">{title || t('protected.title')}</h1>
            <p className="text-neutral-600 mb-8">
              {t('protected.pleaseLogin')}
            </p>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-neutral-200">
              <div className="space-y-3">
                <button 
                  onClick={() => {
                    setAuthMode("signin");
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full bg-primary-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
                >
                  {t('auth.accedi')}
                </button>

                <button 
                  onClick={() => {
                    setAuthMode("signup");
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full bg-white text-primary-600 py-3 px-4 rounded-xl font-semibold border-2 border-primary-600 hover:bg-primary-50 transition-colors"
                >
                  {t('auth.createNewAccount')}
                </button>
              </div>
            </div>
          </div>
        </div>
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)}
          initialMode={authMode}
          redirectUrl={pathname}
        />
      </>
    );
  }

  return <>{children}</>;
}
