"use client";

import { useEffect, useRef } from "react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { trackEvent } from "@/lib/analytics";

export function PrivyAuthBridge() {
  const { ready, authenticated, user, getAccessToken } = usePrivy();
  const { wallets } = useWallets();
  const lastSyncedUserRef = useRef<string | null>(null);

  useEffect(() => {
    const run = async () => {
      if (!ready || !authenticated) return;

      const userId = user?.id ?? null;
      if (!userId) return;
      if (lastSyncedUserRef.current === userId) return;

      const accessToken = await getAccessToken();
      if (!accessToken) return;

      const walletAddress = wallets?.[0]?.address ?? null;
      const emailAccount = user?.linkedAccounts?.find((a) => a.type === "email");
      const email = emailAccount && "address" in emailAccount ? (emailAccount.address as string) : null;

      await fetch("/api/auth/privy/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accessToken,
          walletAddress,
          email,
        }),
      }).catch(() => null);

      trackEvent("login", { auth_provider: "privy" });
      lastSyncedUserRef.current = userId;
    };
    run();
  }, [ready, authenticated, user, wallets, getAccessToken]);

  useEffect(() => {
    if (!ready) return;
    if (authenticated) return;
    lastSyncedUserRef.current = null;
    fetch("/api/auth/privy/session", { method: "DELETE" }).catch(() => null);
  }, [ready, authenticated]);

  return null;
}

