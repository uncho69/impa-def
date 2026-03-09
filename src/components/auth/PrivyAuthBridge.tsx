"use client";

import { useEffect, useRef } from "react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { trackEvent } from "@/lib/analytics";

const MIGRATION_SOURCE_USER_ID_KEY = "idf_merge_from_user_id";

export function PrivyAuthBridge() {
  const { ready, authenticated, user, getAccessToken } = usePrivy();
  const { wallets } = useWallets();
  const lastSyncedSignatureRef = useRef<string | null>(null);

  useEffect(() => {
    const run = async () => {
      if (!ready || !authenticated) return;

      const userId = user?.id ?? null;
      if (!userId) return;

      const accessToken = await getAccessToken();
      if (!accessToken) return;

      const walletAddress = wallets?.[0]?.address ?? null;
      const emailAccount = user?.linkedAccounts?.find((a) => a.type === "email");
      const email = emailAccount && "address" in emailAccount ? (emailAccount.address as string) : null;
      const twitterAccount = user?.linkedAccounts?.find((a) => a.type === "twitter_oauth") as
        | { subject?: string | null; username?: string | null }
        | undefined;
      const twitterSubject = twitterAccount?.subject ?? null;
      const twitterUsername = twitterAccount?.username ?? null;
      const migrationFromUserId =
        typeof window !== "undefined" ? window.localStorage.getItem(MIGRATION_SOURCE_USER_ID_KEY) : null;
      const syncSignature = `${userId}|${walletAddress ?? ""}|${email ?? ""}|${twitterSubject ?? ""}|${twitterUsername ?? ""}`;
      if (lastSyncedSignatureRef.current === syncSignature) return;

      const res = await fetch("/api/auth/privy/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accessToken,
          walletAddress,
          email,
          twitterSubject,
          twitterUsername,
          migrationFromUserId,
        }),
      }).catch(() => null);
      if (res?.ok && typeof window !== "undefined" && migrationFromUserId) {
        window.localStorage.removeItem(MIGRATION_SOURCE_USER_ID_KEY);
      }

      trackEvent("login", { auth_provider: "privy" });
      lastSyncedSignatureRef.current = syncSignature;
    };
    run();
  }, [ready, authenticated, user, wallets, getAccessToken]);

  useEffect(() => {
    if (!ready) return;
    if (authenticated) return;
    const migrationInProgress =
      typeof window !== "undefined" && Boolean(window.localStorage.getItem(MIGRATION_SOURCE_USER_ID_KEY));
    if (migrationInProgress) return;
    lastSyncedSignatureRef.current = null;
    fetch("/api/auth/privy/session", { method: "DELETE" }).catch(() => null);
  }, [ready, authenticated]);

  return null;
}

