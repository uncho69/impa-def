"use client";

import { usePrivy } from "@privy-io/react-auth";

type LinkedType = "twitter_oauth" | "instagram_oauth" | "tiktok_oauth" | "google_oauth";

function hasLinkedAccount(
  linkedAccounts: Array<{ type?: string | null }> | undefined,
  type: LinkedType
): boolean {
  return Boolean(linkedAccounts?.some((account) => account?.type === type));
}

export function PrivySocialConnector() {
  const {
    ready,
    authenticated,
    user,
    linkTwitter,
    linkInstagram,
    linkTiktok,
    linkGoogle,
  } = usePrivy();

  if (!ready) return null;

  if (!authenticated) {
    return (
      <p className="text-xs text-slate-400">
        Effettua login con Privy per collegare account social.
      </p>
    );
  }

  const linkedAccounts = (user?.linkedAccounts || []) as Array<{ type?: string | null }>;
  const xConnected = hasLinkedAccount(linkedAccounts, "twitter_oauth");
  const instagramConnected = hasLinkedAccount(linkedAccounts, "instagram_oauth");
  const tiktokConnected = hasLinkedAccount(linkedAccounts, "tiktok_oauth");
  const googleConnected = hasLinkedAccount(linkedAccounts, "google_oauth");

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => linkTwitter()}
        disabled={xConnected}
        className="rounded-lg border border-indigo-400/40 px-3 py-2 text-xs text-indigo-200 hover:bg-indigo-500/20 disabled:opacity-60"
      >
        {xConnected ? "X collegato" : "Collega X"}
      </button>
      <button
        type="button"
        onClick={() => linkInstagram()}
        disabled={instagramConnected}
        className="rounded-lg border border-indigo-400/40 px-3 py-2 text-xs text-indigo-200 hover:bg-indigo-500/20 disabled:opacity-60"
      >
        {instagramConnected ? "Instagram collegato" : "Collega Instagram"}
      </button>
      <button
        type="button"
        onClick={() => linkTiktok()}
        disabled={tiktokConnected}
        className="rounded-lg border border-indigo-400/40 px-3 py-2 text-xs text-indigo-200 hover:bg-indigo-500/20 disabled:opacity-60"
      >
        {tiktokConnected ? "TikTok collegato" : "Collega TikTok"}
      </button>
      <button
        type="button"
        onClick={() => linkGoogle()}
        disabled={googleConnected}
        className="rounded-lg border border-indigo-400/40 px-3 py-2 text-xs text-indigo-200 hover:bg-indigo-500/20 disabled:opacity-60"
      >
        {googleConnected ? "Google collegato" : "Collega YouTube (Google)"}
      </button>
    </div>
  );
}

