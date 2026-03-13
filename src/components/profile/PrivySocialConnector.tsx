"use client";

import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";

type LinkedType = "twitter_oauth" | "tiktok_oauth" | "google_oauth";
const MIGRATION_SOURCE_USER_ID_KEY = "idf_merge_from_user_id";

function hasLinkedAccount(
  linkedAccounts: Array<{ type?: string | null }> | undefined,
  type: LinkedType
): boolean {
  return Boolean(linkedAccounts?.some((account) => account?.type === type));
}

export function PrivySocialConnector() {
  const privy = usePrivy();
  const {
    ready,
    authenticated,
    user,
    login,
    logout,
    linkTwitter,
    linkTiktok,
    linkGoogle,
  } = privy;
  const linkEmail = (privy as unknown as { linkEmail?: () => Promise<void> }).linkEmail;
  const [socialError, setSocialError] = useState<string | null>(null);
  const [recoveringX, setRecoveringX] = useState(false);
  const [linkingEmail, setLinkingEmail] = useState(false);
  const [showIdentityOptions, setShowIdentityOptions] = useState(false);

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
  const tiktokConnected = hasLinkedAccount(linkedAccounts, "tiktok_oauth");
  const googleConnected = hasLinkedAccount(linkedAccounts, "google_oauth");
  const emailConnected = linkedAccounts.some(
    (account) =>
      account?.type === "email" ||
      account?.type === "google_oauth"
  );
  const hasXLinkConflict = Boolean(socialError?.includes("already been linked to another user"));

  const getErrorMessage = (err: unknown) => {
    if (err instanceof Error && err.message) return err.message;
    return "Collegamento social fallito. Riprova.";
  };

  const handleLinkTwitter = async () => {
    setSocialError(null);
    try {
      await linkTwitter();
    } catch (err: unknown) {
      setSocialError(getErrorMessage(err));
    }
  };

  const handleRecoverXAccount = async () => {
    setRecoveringX(true);
    setSocialError(null);
    try {
      if (typeof window !== "undefined" && user?.id) {
        window.localStorage.setItem(MIGRATION_SOURCE_USER_ID_KEY, user.id);
      }
      await logout();
      await login({ loginMethods: ["twitter"] });
    } catch (err: unknown) {
      setSocialError(getErrorMessage(err));
    } finally {
      setRecoveringX(false);
    }
  };

  const handleLinkEmail = async () => {
    if (!linkEmail) return;
    setLinkingEmail(true);
    setSocialError(null);
    try {
      await linkEmail();
      setShowIdentityOptions(false);
    } catch (err: unknown) {
      setSocialError(getErrorMessage(err));
    } finally {
      setLinkingEmail(false);
    }
  };

  const handleLinkGoogle = async () => {
    setSocialError(null);
    try {
      await linkGoogle();
      setShowIdentityOptions(false);
    } catch (err: unknown) {
      setSocialError(getErrorMessage(err));
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleLinkTwitter}
          disabled={xConnected}
          className="rounded-lg border border-indigo-400/40 px-3 py-2 text-xs text-indigo-200 hover:bg-indigo-500/20 disabled:opacity-60"
        >
          {xConnected ? "X collegato" : "Collega X"}
        </button>
        <button
          type="button"
          onClick={() => linkTiktok()}
          disabled={tiktokConnected}
          className="rounded-lg border border-indigo-400/40 px-3 py-2 text-xs text-indigo-200 hover:bg-indigo-500/20 disabled:opacity-60"
        >
          {tiktokConnected ? "TikTok collegato" : "Collega TikTok"}
        </button>
        {linkEmail || !googleConnected ? (
          <button
            type="button"
            onClick={() => setShowIdentityOptions((v) => !v)}
            disabled={(emailConnected && googleConnected) || linkingEmail}
            className="rounded-lg border border-indigo-400/40 px-3 py-2 text-xs text-indigo-200 hover:bg-indigo-500/20 disabled:opacity-60"
          >
            {emailConnected && googleConnected
              ? "Email e Google collegati"
              : "Collega Email / Google"}
          </button>
        ) : null}
      </div>
      {showIdentityOptions && !(emailConnected && googleConnected) ? (
        <div className="flex flex-wrap items-center gap-2">
          {linkEmail && !emailConnected ? (
            <button
              type="button"
              onClick={handleLinkEmail}
              disabled={linkingEmail}
              className="rounded-md border border-indigo-400/40 px-2.5 py-1.5 text-xs text-indigo-200 hover:bg-indigo-500/20 disabled:opacity-60"
            >
              {linkingEmail ? "Collegamento email..." : "Usa email"}
            </button>
          ) : null}
          {!googleConnected ? (
            <button
              type="button"
              onClick={handleLinkGoogle}
              className="rounded-md border border-indigo-400/40 px-2.5 py-1.5 text-xs text-indigo-200 hover:bg-indigo-500/20 disabled:opacity-60"
            >
              Usa Google (YouTube)
            </button>
          ) : null}
        </div>
      ) : null}
      <p className="text-[11px] text-slate-400">
        Collega email o Google per stabilizzare accesso admin e recupero account.
      </p>

      {socialError ? (
        <div className="rounded-md border border-rose-500/30 bg-rose-950/20 px-3 py-2 text-xs text-rose-200">
          <p>{socialError}</p>
          {hasXLinkConflict ? (
            <button
              type="button"
              onClick={handleRecoverXAccount}
              disabled={recoveringX}
              className="mt-2 rounded-md border border-rose-300/40 px-2 py-1 text-xs text-rose-100 hover:bg-rose-500/20 disabled:opacity-70"
            >
              {recoveringX ? "Passaggio in corso..." : "Esci e accedi con X"}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

