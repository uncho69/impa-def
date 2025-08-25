"use client";

import { PrivyProvider as Privy, usePrivy } from '@privy-io/react-auth';
import { ReactNode, useEffect } from 'react';

function PrivyDebugInline() {
  const { ready, authenticated, user } = usePrivy();
  
  useEffect(() => {
    // nulla: solo debug logging
  }, [authenticated]);
  // eslint-disable-next-line no-console
  console.log('[Privy][debug] ready:', ready, 'authenticated:', authenticated, 'user:', user);
  return null;
}

interface PrivyProviderProps {
  children: ReactNode;
}

export function PrivyProvider({ children }: PrivyProviderProps) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID || "cmer575a700bojp0berbqok29";
  const enablePasskeys = process.env.NEXT_PUBLIC_ENABLE_PASSKEYS === 'true';
  const loginMethods = enablePasskeys ? (["wallet", "passkey", "email"] as const) : (["wallet", "email"] as const);

  return (
    <Privy
      appId={appId}
      config={{
        // Passkeys sono abilitati solo se configurati in env
        loginMethods: [...loginMethods],
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      <PrivyDebugInline />
      {children}
    </Privy>
  );
}
