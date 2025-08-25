"use client";

import { useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';

export function PrivyDebug() {
  const { ready, authenticated, user } = usePrivy();

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('[Privy][debug] ready:', ready, 'authenticated:', authenticated, 'user:', user);
  }, [ready, authenticated, user]);

  return null;
}


