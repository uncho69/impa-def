"use client";

import { useEffect, useRef } from "react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { trackEvent } from "@/lib/analytics";

const MIGRATION_SOURCE_USER_ID_KEY = "idf_merge_from_user_id";

function extractLinkedEmail(linkedAccounts: Array<Record<string, unknown>> | undefined): string | null {
  if (!Array.isArray(linkedAccounts)) return null;
  for (const account of linkedAccounts) {
    const candidates = [account?.address, account?.email, account?.emailAddress];
    for (const candidate of candidates) {
      if (typeof candidate === "string" && candidate.includes("@")) {
        return candidate.trim().toLowerCase();
      }
    }
  }
  return null;
}

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
      const email = extractLinkedEmail(user?.linkedAccounts as Array<Record<string, unknown>> | undefined);
      const twitterAccount = user?.linkedAccounts?.find((a) => a.type === "twitter_oauth") as
        | { subject?: string | null; username?: string | null }
        | undefined;
      const twitterSubject = twitterAccount?.subject ?? null;
      const twitterUsername = twitterAccount?.username ?? null;
      const migrationFromUserId =
        typeof window !== "undefined" ? window.localStorage.getItem(MIGRATION_SOURCE_USER_ID_KEY) : null;
      const syncSignature = `${userId}|${walletAddress ?? ""}|${email ?? ""}|${twitterSubject ?? ""}|${twitterUsername ?? ""}`;
      if (lastSyncedSignatureRef.current === syncSignature) return;

      // #region agent log
      fetch('http://127.0.0.1:7427/ingest/53de14af-f544-4874-907d-9c3852d2c5f6',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'933492'},body:JSON.stringify({sessionId:'933492',runId:'run6',hypothesisId:'H15',location:'src/components/auth/PrivyAuthBridge.tsx:run:beforeSessionPost',message:'privy bridge preparing session sync',data:{ready,authenticated,hasUserId:Boolean(userId),hasAccessToken:Boolean(accessToken),hasWalletAddress:Boolean(walletAddress),hasTwitterSubject:Boolean(twitterSubject),hasMigrationFromUserId:Boolean(migrationFromUserId)},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
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
      // #region agent log
      fetch('http://127.0.0.1:7427/ingest/53de14af-f544-4874-907d-9c3852d2c5f6',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'933492'},body:JSON.stringify({sessionId:'933492',runId:'run6',hypothesisId:'H15',location:'src/components/auth/PrivyAuthBridge.tsx:run:afterSessionPost',message:'privy bridge session sync response',data:{status:res?.status ?? null,ok:Boolean(res?.ok)},timestamp:Date.now()})}).catch(()=>{});
      // #endregion
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
    // #region agent log
    fetch('http://127.0.0.1:7427/ingest/53de14af-f544-4874-907d-9c3852d2c5f6',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'933492'},body:JSON.stringify({sessionId:'933492',runId:'run6',hypothesisId:'H18',location:'src/components/auth/PrivyAuthBridge.tsx:effect:deleteSession',message:'privy bridge clearing session on unauthenticated state',data:{ready,authenticated,migrationInProgress},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    fetch("/api/auth/privy/session", { method: "DELETE" }).catch(() => null);
  }, [ready, authenticated]);

  return null;
}

