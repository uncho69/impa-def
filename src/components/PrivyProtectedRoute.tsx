"use client";

import { usePrivy } from '@privy-io/react-auth';
import { useEffect, useState } from 'react';
import { ReactNode } from 'react';
import { PrivyAuthStatus } from './PrivyAuthStatus';

interface PrivyProtectedRouteProps {
  children: ReactNode;
  title: string;
}

export function PrivyProtectedRoute({ children, title }: PrivyProtectedRouteProps) {
  const { authenticated, ready } = usePrivy();
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    if (!ready) {
      const t = setTimeout(() => setShowFallback(true), 2500);
      return () => clearTimeout(t);
    } else {
      setShowFallback(false);
    }
  }, [ready]);

  if (!ready && !showFallback) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-neutral-600">Caricamento...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-background flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <h1 className="text-3xl font-bold gradient-text mb-6">{title}</h1>
          <p className="text-neutral-600 mb-8">
            Devi effettuare l&apos;accesso per visualizzare questa pagina.
          </p>
          <div className="flex justify-center">
            <PrivyAuthStatus />
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

