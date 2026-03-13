"use client";

import { useMemo } from "react";
import { usePrivy } from "@privy-io/react-auth";

export function useAppAuth() {
  const { ready, authenticated, login, logout, user } = usePrivy();
  const hasPrivy = Boolean(process.env.NEXT_PUBLIC_PRIVY_APP_ID?.trim());

  return useMemo(
    () => ({
      hasPrivy,
      isLoaded: hasPrivy ? ready : true,
      isSignedIn: hasPrivy ? ready && authenticated : false,
      userId: user?.id ?? null,
      user,
      login,
      logout,
    }),
    [authenticated, hasPrivy, login, logout, ready, user],
  );
}

