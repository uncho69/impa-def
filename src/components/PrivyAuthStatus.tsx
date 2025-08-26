"use client";

import { usePrivy } from '@privy-io/react-auth';
import { Button } from './Button';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePrivyReady } from '@/hooks/usePrivyReady';

export function PrivyAuthStatus() {
  const { login, logout } = usePrivy();
  const { ready, isFullyReady, authenticated, user, forceReset } = usePrivyReady();
  const [showFallback, setShowFallback] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (!ready) {
      const t = setTimeout(() => setShowFallback(true), 2000);
      return () => clearTimeout(t);
    } else {
      setShowFallback(false);
    }
  }, [ready]);

  if (authenticated && user) {
    return (
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-neutral-600">
            {user.email?.address || user.wallet?.address?.slice(0, 6) + '...' || 'User'}
          </span>
        </div>
        <Button onClick={logout} className="btn btn-outline">
          {t('auth.logout')}
        </Button>
      </div>
    );
  }

  // Se non ready da troppo, mostra comunque il bottone Accedi per sbloccare
  if (!ready && !showFallback) {
    return (
      <div className="flex items-center space-x-4">
        <div className="animate-pulse bg-neutral-200 rounded-full w-8 h-8"></div>
        <div className="animate-pulse bg-neutral-200 rounded-full w-20 h-4"></div>
      </div>
    );
  }

  // Se Privy non è completamente pronto, mostra un bottone disabilitato visivamente
  if (!isFullyReady) {
    return (
      <div className="flex items-center space-x-4">
        <button 
          className="btn btn-primary opacity-50 cursor-not-allowed"
          disabled
          onClick={forceReset} // Permette di forzare il reset se necessario
        >
          {t('auth.accedi')}
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <Button onClick={login} className="btn btn-primary">
        {t('auth.accedi')}
      </Button>
    </div>
  );
}

