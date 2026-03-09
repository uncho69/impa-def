"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { PrivySocialConnector } from "@/components/profile/PrivySocialConnector";
import { LearningBadgesPanel } from "@/components/profile/LearningBadgesPanel";
import { trackEvent } from "@/lib/analytics";
import { useAppAuth } from "@/lib/auth/useAppAuth";
import { usePrivy, useWallets } from "@privy-io/react-auth";

type ProfileResponse = {
  noDatabase?: boolean;
  profile: {
    userId: string;
    email?: string | null;
    username: string;
    defaultUsername?: string | null;
    customUsername?: string | null;
    xProfileUrl?: string | null;
    instagramUrl?: string | null;
    tiktokUrl?: string | null;
    youtubeUrl?: string | null;
    walletAddress?: string | null;
    walletAddresses?: string[];
    showWalletAddressPublic: boolean;
    ranking: {
      globalRank: number;
      totalPoints: number;
      totalTweets: number;
    };
    totals: {
      likes: number;
      replies: number;
      retweets: number;
      quotes: number;
    };
  };
  contents: {
    id: number;
    postId?: string | null;
    tweetUrl?: string | null;
    text?: string | null;
    projectId?: string | null;
    campaignIndex?: number | null;
    epochIndex?: number | null;
    likes: number;
    replies: number;
    retweets: number;
    quotes: number;
    postedAt?: string | null;
    isVerified?: number | null;
  }[];
};

type LocalProfileSettings = {
  customUsername: string | null;
  showWalletAddressPublic: boolean;
  walletAddresses: string[];
  instagramUrl: string | null;
  tiktokUrl: string | null;
  youtubeUrl: string | null;
};
const PUBLIC_USERNAME_COOKIE = "idf_public_username";

const PRIVY_ENABLED = Boolean(process.env.NEXT_PUBLIC_PRIVY_APP_ID?.trim());
const PANEL_CLASS = "rounded-2xl border border-indigo-500/25 bg-indigo-900/25 backdrop-blur p-6";

function getErrorMessage(err: unknown, fallback: string): string {
  if (err instanceof Error && err.message) return err.message;
  return fallback;
}

function shortenAddress(value?: string | null): string {
  if (!value) return "-";
  if (value.length < 14) return value;
  return `${value.slice(0, 8)}...${value.slice(-6)}`;
}

type SignableWallet = {
  type?: string;
};

async function requestOwnershipSignature(
  wallet: SignableWallet,
  address: string,
  privySignMessage: (input: { message: string }, options?: { address?: string }) => Promise<unknown>,
): Promise<void> {
  const message = `ImparoDeFi wallet ownership verification\nAddress: ${address}\nTimestamp: ${new Date().toISOString()}`;

  await privySignMessage({ message }, { address });
}

async function connectEvmWalletAddress(): Promise<string> {
  const ethereum = (typeof window !== "undefined"
    ? (window as unknown as { ethereum?: { request?: (input: { method: string; params?: unknown[] }) => Promise<unknown> } }).ethereum
    : undefined);
  if (!ethereum?.request) throw new Error("Provider EVM non rilevato nel browser.");
  const accounts = (await ethereum.request({ method: "eth_requestAccounts" })) as unknown;
  const first = Array.isArray(accounts) ? String(accounts[0] ?? "").trim().toLowerCase() : "";
  if (!first) throw new Error("Nessun account EVM disponibile.");
  return first;
}

async function signEvmOwnership(address: string): Promise<void> {
  const ethereum = (typeof window !== "undefined"
    ? (window as unknown as { ethereum?: { request?: (input: { method: string; params?: unknown[] }) => Promise<unknown> } }).ethereum
    : undefined);
  if (!ethereum?.request) throw new Error("Provider EVM non rilevato per la firma.");
  const message = `ImparoDeFi wallet ownership verification\nAddress: ${address}\nTimestamp: ${new Date().toISOString()}`;
  await ethereum.request({ method: "personal_sign", params: [message, address] });
}

async function connectSolanaWalletAddress(): Promise<string> {
  const phantom = (typeof window !== "undefined"
    ? (window as unknown as { phantom?: { solana?: { connect?: (opts?: { onlyIfTrusted?: boolean }) => Promise<{ publicKey?: { toString(): string } }> } }; solana?: { connect?: (opts?: { onlyIfTrusted?: boolean }) => Promise<{ publicKey?: { toString(): string } }> } }).phantom?.solana
    : undefined) ||
    (typeof window !== "undefined"
      ? (window as unknown as { solana?: { connect?: (opts?: { onlyIfTrusted?: boolean }) => Promise<{ publicKey?: { toString(): string } }> } }).solana
      : undefined);
  if (!phantom?.connect) throw new Error("Provider Solana non rilevato nel browser.");
  const res = await phantom.connect({ onlyIfTrusted: false });
  const address = res?.publicKey?.toString()?.trim().toLowerCase() ?? "";
  if (!address) throw new Error("Nessun account Solana disponibile.");
  return address;
}

async function signSolanaOwnership(address: string): Promise<void> {
  const phantom = (typeof window !== "undefined"
    ? (window as unknown as { phantom?: { solana?: { signMessage?: (message: Uint8Array, display?: string) => Promise<unknown> } }; solana?: { signMessage?: (message: Uint8Array, display?: string) => Promise<unknown> } }).phantom?.solana
    : undefined) ||
    (typeof window !== "undefined"
      ? (window as unknown as { solana?: { signMessage?: (message: Uint8Array, display?: string) => Promise<unknown> } }).solana
      : undefined);
  if (!phantom?.signMessage) throw new Error("Provider Solana non disponibile per la firma.");
  const message = `ImparoDeFi wallet ownership verification\nAddress: ${address}\nTimestamp: ${new Date().toISOString()}`;
  await phantom.signMessage(new TextEncoder().encode(message), "utf8");
}

export default function ProfiloPage() {
  const { isLoaded, isSignedIn, login } = useAppAuth();
  const { ready: privyReady, signMessage, linkWallet } = usePrivy();
  const { wallets } = useWallets();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ProfileResponse | null>(null);
  const [usernameInput, setUsernameInput] = useState("");
  const [showWalletPublic, setShowWalletPublic] = useState(false);
  const [instagramInput, setInstagramInput] = useState("");
  const [tiktokInput, setTiktokInput] = useState("");
  const [youtubeInput, setYoutubeInput] = useState("");
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [walletAddresses, setWalletAddresses] = useState<string[]>([]);
  const [pendingWalletAddresses, setPendingWalletAddresses] = useState<string[]>([]);
  const [verifyingAddress, setVerifyingAddress] = useState<string | null>(null);
  const pendingWalletKindsRef = useRef<Record<string, "evm" | "solana" | "privy">>({});

  const [activeTab, setActiveTab] = useState<"settings" | "badges" | "contents">("settings");

  const publicProfileHref = useMemo(() => {
    if (!data?.profile?.userId) return null;
    return `/profilo/${data.profile.userId}`;
  }, [data?.profile?.userId]);

  async function loadProfile() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/profile/me", { cache: "no-store" });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.error || "Errore nel caricamento profilo");
      const payload = json as ProfileResponse;

      if (payload.noDatabase) {
        const storageKey = `idf_profile_local_${payload.profile.userId}`;
        try {
          const raw = localStorage.getItem(storageKey);
          if (raw) {
            const local = JSON.parse(raw) as LocalProfileSettings;
            payload.profile.customUsername = local.customUsername ?? payload.profile.customUsername;
            payload.profile.username = local.customUsername || payload.profile.username;
            payload.profile.showWalletAddressPublic = Boolean(local.showWalletAddressPublic);
            payload.profile.walletAddresses = Array.isArray(local.walletAddresses) ? local.walletAddresses : [];
            payload.profile.instagramUrl = local.instagramUrl ?? payload.profile.instagramUrl;
            payload.profile.tiktokUrl = local.tiktokUrl ?? payload.profile.tiktokUrl;
            payload.profile.youtubeUrl = local.youtubeUrl ?? payload.profile.youtubeUrl;
          }
        } catch {
          // ignore invalid local cache
        }
        setError("Database non configurato: il profilo e visibile ma le modifiche non vengono salvate.");
      } else {
        setError(null);
      }

      setData(payload);
      setUsernameInput(payload.profile.customUsername || "");
      setShowWalletPublic(Boolean(payload.profile.showWalletAddressPublic));
      const initialWallets = Array.isArray(payload.profile.walletAddresses)
        ? payload.profile.walletAddresses
        : payload.profile.walletAddress
          ? [payload.profile.walletAddress]
          : [];
      setWalletAddresses(initialWallets);
      setPendingWalletAddresses([]);
      pendingWalletKindsRef.current = {};
      setInstagramInput(payload.profile.instagramUrl || "");
      setTiktokInput(payload.profile.tiktokUrl || "");
      setYoutubeInput(payload.profile.youtubeUrl || "");
      setInfoMessage(null);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Errore imprevisto"));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isLoaded && isSignedIn) loadProfile();
    if (isLoaded && !isSignedIn) setLoading(false);
  }, [isLoaded, isSignedIn]);

  useEffect(() => {
    if (!privyReady) return;
    const connectedWalletAddresses = (wallets || [])
      .map((wallet) => String(wallet?.address ?? "").trim().toLowerCase())
      .filter((address) => address.length > 0);
    if (connectedWalletAddresses.length === 0) return;

    setPendingWalletAddresses((prev) => {
      const next = [...prev];
      for (const address of connectedWalletAddresses) {
        if (walletAddresses.includes(address)) continue;
        if (next.includes(address)) continue;
        pendingWalletKindsRef.current[address] = "privy";
        next.push(address);
      }
      return next;
    });
  }, [privyReady, wallets, walletAddresses]);

  async function handleSave() {
    setSaving(true);
    setError(null);
    setInfoMessage(null);
    try {
      const payload = {
        customUsername: usernameInput.trim() === "" ? null : usernameInput.trim(),
        showWalletAddressPublic: showWalletPublic,
        walletAddresses,
        instagramUrl: instagramInput.trim() === "" ? null : instagramInput.trim(),
        tiktokUrl: tiktokInput.trim() === "" ? null : tiktokInput.trim(),
        youtubeUrl: youtubeInput.trim() === "" ? null : youtubeInput.trim(),
      };

      if (data?.noDatabase) {
        const storageKey = `idf_profile_local_${data.profile.userId}`;
        const localPayload: LocalProfileSettings = {
          customUsername: payload.customUsername,
          showWalletAddressPublic: payload.showWalletAddressPublic,
          walletAddresses: payload.walletAddresses,
          instagramUrl: payload.instagramUrl,
          tiktokUrl: payload.tiktokUrl,
          youtubeUrl: payload.youtubeUrl,
        };
        localStorage.setItem(storageKey, JSON.stringify(localPayload));
        const safeUsername = (localPayload.customUsername || "").trim();
        if (typeof document !== "undefined") {
          const maxAge = 60 * 60 * 24 * 30;
          document.cookie = `${PUBLIC_USERNAME_COOKIE}=${encodeURIComponent(safeUsername)}; Path=/; Max-Age=${safeUsername ? maxAge : 0}; SameSite=Lax`;
        }

        setData((prev) =>
          prev
            ? {
                ...prev,
                profile: {
                  ...prev.profile,
                  customUsername: localPayload.customUsername,
                  username: localPayload.customUsername || prev.profile.username,
                  showWalletAddressPublic: localPayload.showWalletAddressPublic,
                  walletAddresses: localPayload.walletAddresses,
                  instagramUrl: localPayload.instagramUrl,
                  tiktokUrl: localPayload.tiktokUrl,
                  youtubeUrl: localPayload.youtubeUrl,
                },
              }
            : prev
        );
        setInfoMessage("Salvato localmente in questo browser (fallback senza DB).");
        trackEvent("profile_save", { mode: "local_fallback" });
        return;
      }

      const res = await fetch("/api/profile/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.error || "Salvataggio fallito");
      if (json?.noDatabase) {
        setError(json?.message || "Database non configurato: modifiche non salvate.");
        return;
      }
      const saved = json?.profileSettings as
        | {
            customUsername?: string | null;
            showWalletAddressPublic?: boolean;
            walletAddresses?: string[];
            instagramUrl?: string | null;
            tiktokUrl?: string | null;
            youtubeUrl?: string | null;
          }
        | undefined;

      if (saved) {
        setData((prev) =>
          prev
            ? {
                ...prev,
                profile: {
                  ...prev.profile,
                  customUsername: saved.customUsername ?? prev.profile.customUsername,
                  username:
                    saved.customUsername && saved.customUsername.trim().length > 0
                      ? saved.customUsername
                      : prev.profile.defaultUsername || prev.profile.username,
                  showWalletAddressPublic:
                    typeof saved.showWalletAddressPublic === "boolean"
                      ? saved.showWalletAddressPublic
                      : prev.profile.showWalletAddressPublic,
                  walletAddresses: Array.isArray(saved.walletAddresses) ? saved.walletAddresses : prev.profile.walletAddresses,
                  instagramUrl: saved.instagramUrl ?? prev.profile.instagramUrl,
                  tiktokUrl: saved.tiktokUrl ?? prev.profile.tiktokUrl,
                  youtubeUrl: saved.youtubeUrl ?? prev.profile.youtubeUrl,
                },
              }
            : prev
        );
        if (typeof saved.customUsername === "string") {
          setUsernameInput(saved.customUsername);
        }
      }

      setInfoMessage(json?.partial ? "Username salvato. Alcune impostazioni avanzate non sono disponibili al momento." : "Impostazioni profilo salvate.");
      trackEvent("profile_save", { mode: json?.partial ? "database_partial" : "database" });
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Errore imprevisto"));
    } finally {
      setSaving(false);
    }
  }

  async function handleConnectEvmWallet() {
    if (!privyReady) {
      setInfoMessage("Wallet connect in inizializzazione, riprova tra qualche secondo.");
      return;
    }
    setError(null);
    setInfoMessage(null);
    try {
      const address = await connectEvmWalletAddress();
      if (walletAddresses.includes(address)) {
        setInfoMessage("Questo wallet EVM è già presente nella lista.");
        return;
      }
      pendingWalletKindsRef.current[address] = "evm";
      setPendingWalletAddresses((prev) => (prev.includes(address) ? prev : [...prev, address]));
    } catch (err: unknown) {
      if (typeof linkWallet === "function") {
        try {
          await linkWallet({ walletChainType: "ethereum-only" });
          setInfoMessage("Wallet EVM collegato tramite Privy. Se è nuovo apparirà tra i wallet da confermare.");
          return;
        } catch {
          // noop: show original error below
        }
      }
      setError(getErrorMessage(err, "Connessione wallet EVM fallita."));
    }
  }

  async function handleConnectSolanaWallet() {
    if (!privyReady) {
      setInfoMessage("Wallet connect in inizializzazione, riprova tra qualche secondo.");
      return;
    }
    setError(null);
    setInfoMessage(null);
    try {
      const address = await connectSolanaWalletAddress();
      if (walletAddresses.includes(address)) {
        setInfoMessage("Questo wallet Solana è già presente nella lista.");
        return;
      }
      pendingWalletKindsRef.current[address] = "solana";
      setPendingWalletAddresses((prev) => (prev.includes(address) ? prev : [...prev, address]));
    } catch (err: unknown) {
      if (typeof linkWallet === "function") {
        try {
          await linkWallet({ walletChainType: "solana-only" });
          setInfoMessage("Wallet Solana collegato tramite Privy. Se è nuovo apparirà tra i wallet da confermare.");
          return;
        } catch {
          // noop: show original error below
        }
      }
      setError(getErrorMessage(err, "Connessione wallet Solana fallita."));
    }
  }

  async function handleVerifyAndAddWallet(address: string) {
    setError(null);
    setInfoMessage(null);
    setVerifyingAddress(address);
    try {
      const kind = pendingWalletKindsRef.current[address] || "privy";
      if (kind === "evm") {
        await signEvmOwnership(address);
      } else if (kind === "solana") {
        await signSolanaOwnership(address);
      } else {
        await requestOwnershipSignature({ type: kind }, address, signMessage);
      }
      setWalletAddresses((prev) => (prev.includes(address) ? prev : [...prev, address]));
      setPendingWalletAddresses((prev) => prev.filter((item) => item !== address));
      delete pendingWalletKindsRef.current[address];
      setInfoMessage("Wallet verificato e aggiunto. Ricorda di salvare le impostazioni.");
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Firma wallet annullata o fallita."));
    } finally {
      setVerifyingAddress(null);
    }
  }

  function handleRemovePendingWallet(address: string) {
    setPendingWalletAddresses((prev) => prev.filter((item) => item !== address));
    delete pendingWalletKindsRef.current[address];
    setInfoMessage("Wallet rimosso dalla lista di conferma.");
  }

  if (!isLoaded || loading) {
    return <div className="max-w-5xl mx-auto animate-pulse text-slate-300 px-6 py-10">Caricamento profilo...</div>;
  }

  if (!isSignedIn) {
    return (
      <div className="px-6 py-10">
        <div className={`max-w-3xl mx-auto ${PANEL_CLASS}`}>
          <h1 className="text-2xl font-semibold">Profilo</h1>
          <p className="mt-2 text-slate-300">Per accedere al tuo profilo devi effettuare il login.</p>
          <div className="mt-5">
            <button
              type="button"
              onClick={() => login()}
              className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium hover:bg-indigo-400"
            >
              Accedi
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="px-6 py-10">
        <div className="max-w-3xl mx-auto rounded-2xl border border-rose-500/30 bg-rose-950/20 backdrop-blur p-6">
          <p className="text-rose-200">{error || "Impossibile caricare il profilo."}</p>
        </div>
      </div>
    );
  }

  const { profile, contents } = data;
  const primaryProfileWallet = walletAddresses[0] || null;
  const resolvedWalletAddress = primaryProfileWallet;

  return (
    <div className="relative z-10 px-4 sm:px-6 py-6 sm:py-8">
      <div className="max-w-6xl mx-auto space-y-4">
        <section className={PANEL_CLASS}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">{profile.username}</h1>
              <p className="mt-1 text-slate-300">Rank globale #{profile.ranking.globalRank}</p>
            </div>
            {publicProfileHref ? (
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={publicProfileHref}
                  className="rounded-lg border border-indigo-400/40 px-4 py-2 text-sm text-indigo-200 hover:bg-indigo-500/20"
                >
                  Visualizza profilo pubblico
                </Link>
              </div>
            ) : null}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">Punti totali</p>
              <p className="mt-1 text-2xl font-semibold">{profile.ranking.totalPoints.toLocaleString("it-IT")}</p>
            </div>
            <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">Tweet campagne</p>
              <p className="mt-1 text-2xl font-semibold">{profile.ranking.totalTweets.toLocaleString("it-IT")}</p>
            </div>
            <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">Address connessi</p>
              <p className="mt-1 text-lg font-medium">{shortenAddress(resolvedWalletAddress)}</p>
              <p className="mt-1 text-xs text-slate-400">{walletAddresses.length} salvati</p>
            </div>
          </div>
        </section>

        <section className={PANEL_CLASS}>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("settings")}
              className={`rounded-lg px-3 py-2 text-sm font-medium border transition-colors ${
                activeTab === "settings"
                  ? "border-indigo-300/70 bg-indigo-500/20 text-indigo-100"
                  : "border-indigo-500/30 bg-indigo-900/25 text-slate-300 hover:bg-indigo-800/30"
              }`}
            >
              Impostazioni
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("badges")}
              className={`rounded-lg px-3 py-2 text-sm font-medium border transition-colors ${
                activeTab === "badges"
                  ? "border-indigo-300/70 bg-indigo-500/20 text-indigo-100"
                  : "border-indigo-500/30 bg-indigo-900/25 text-slate-300 hover:bg-indigo-800/30"
              }`}
            >
              Badge
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("contents")}
              className={`rounded-lg px-3 py-2 text-sm font-medium border transition-colors ${
                activeTab === "contents"
                  ? "border-indigo-300/70 bg-indigo-500/20 text-indigo-100"
                  : "border-indigo-500/30 bg-indigo-900/25 text-slate-300 hover:bg-indigo-800/30"
              }`}
            >
              Contenuti campagne
            </button>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Vista compatta: scegli la sezione da gestire senza scroll infinito.
          </p>
        </section>

        {activeTab === "settings" && (
        <section className={PANEL_CLASS}>
          <h2 className="text-xl font-semibold">Impostazioni profilo pubblico</h2>
          <p className="mt-1 text-sm text-slate-300">
            Il profilo X e i contenuti campagne sono pubblici di default. Qui puoi personalizzare username e visibilita address.
          </p>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm text-slate-300">Username (opzionale)</span>
              <input
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder={profile.defaultUsername || "username_personale"}
                className="w-full rounded-lg border border-indigo-500/30 bg-indigo-900/25 px-3 py-2 text-white outline-none focus:border-indigo-400"
              />
              <span className="block text-xs text-slate-400">3-30 caratteri, solo lettere, numeri e underscore.</span>
            </label>

            <div className="rounded-lg border border-indigo-500/30 bg-indigo-900/25 px-4 py-3">
              <label className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-white">Rendi pubblico l&apos;address connesso</p>
                  <p className="text-xs text-slate-400">Se disattivato, sul profilo pubblico non si vedra il wallet.</p>
                </div>
                <input
                  type="checkbox"
                  checked={showWalletPublic}
                  onChange={(e) => setShowWalletPublic(e.target.checked)}
                  className="h-5 w-5 accent-indigo-500"
                />
              </label>
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-indigo-500/30 bg-indigo-900/25 px-4 py-3">
            <p className="text-sm text-slate-300 mb-2">Social connect</p>
            {!privyReady ? (
              <p className="text-xs text-slate-400">Inizializzazione social connect...</p>
            ) : (
              <PrivySocialConnector />
            )}
          </div>

          <div className="mt-5 rounded-lg border border-indigo-500/30 bg-indigo-900/25 px-4 py-3">
            <p className="text-sm font-medium text-white">Portafogli Connessi</p>
            <p className="mt-1 text-xs text-slate-400">
              Connetti wallet e scegli quali address pubblicare nel profilo.
            </p>

            {PRIVY_ENABLED ? (
              <div className="mt-3 space-y-2">
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handleConnectEvmWallet}
                    className="rounded-lg border border-emerald-400/40 px-3 py-2 text-sm text-emerald-200 hover:bg-emerald-500/20"
                  >
                    Connetti wallet EVM
                  </button>
                  <button
                    type="button"
                    onClick={handleConnectSolanaWallet}
                    className="rounded-lg border border-cyan-400/40 px-3 py-2 text-sm text-cyan-200 hover:bg-cyan-500/20"
                  >
                    Connetti wallet Solana
                  </button>
                </div>

                {pendingWalletAddresses.length > 0 ? (
                  <div className="space-y-2 rounded-md border border-amber-400/30 bg-amber-950/20 p-3">
                    <p className="text-xs text-amber-200">Wallet connessi da confermare con firma:</p>
                    {pendingWalletAddresses.map((address) => (
                      <div
                        key={`pending-${address}`}
                        className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-amber-400/30 bg-indigo-950/40 px-3 py-2"
                      >
                        <span className="text-xs text-slate-100">{shortenAddress(address)}</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleVerifyAndAddWallet(address)}
                            disabled={verifyingAddress === address}
                            className="rounded-md border border-amber-400/40 px-3 py-1 text-xs text-amber-100 hover:bg-amber-500/20 disabled:opacity-70"
                          >
                            {verifyingAddress === address ? "Firma..." : "Conferma firma e aggiungi"}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemovePendingWallet(address)}
                            className="rounded-md border border-rose-400/40 px-2 py-1 text-sm font-semibold leading-none text-rose-200 hover:bg-rose-500/20"
                            aria-label={`Rimuovi wallet in attesa ${address}`}
                            title="Rimuovi wallet in attesa"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}

                {walletAddresses.map((address) => {
                  return (
                    <div
                      key={address}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-indigo-500/30 bg-indigo-950/40 px-3 py-2"
                    >
                      <span className="text-xs text-slate-100">{shortenAddress(address)}</span>
                      <button
                        type="button"
                        onClick={() => setWalletAddresses((prev) => prev.filter((item) => item !== address))}
                        className="rounded-md border border-rose-400/40 px-2 py-1 text-sm font-semibold leading-none text-rose-200 hover:bg-rose-500/20"
                        aria-label={`Rimuovi ${address}`}
                        title="Rimuovi address"
                      >
                        ×
                      </button>
                    </div>
                  );
                })}

                {walletAddresses.length === 0 && pendingWalletAddresses.length === 0 ? (
                  <div className="rounded-md border border-indigo-500/20 bg-indigo-950/30 px-3 py-2 text-xs text-slate-300">
                    Nessun wallet connesso al profilo. Collega un wallet e conferma la firma per aggiungerlo.
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium hover:bg-indigo-400 disabled:opacity-70"
            >
              {saving ? "Salvataggio..." : data.noDatabase ? "Salva localmente" : "Salva impostazioni"}
            </button>

            {profile.xProfileUrl ? (
              <a
                href={profile.xProfileUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-indigo-300 underline-offset-2 hover:underline"
              >
                Profilo X pubblico
              </a>
            ) : (
              <span className="text-sm text-slate-400">Collega X dalla sezione Social connect</span>
            )}
          </div>

          {!PRIVY_ENABLED ? (
            <p className="mt-4 text-xs text-slate-400">
              Per abilitare wallet connect con Privy imposta `NEXT_PUBLIC_PRIVY_APP_ID` in ambiente.
            </p>
          ) : null}

          {infoMessage ? <p className="mt-3 text-sm text-emerald-300">{infoMessage}</p> : null}
          {error ? <p className="mt-3 text-sm text-rose-300">{error}</p> : null}
        </section>
        )}

        {activeTab === "badges" && (
        <LearningBadgesPanel wallet={primaryProfileWallet} />
        )}

        {activeTab === "contents" && (
        <section className={PANEL_CLASS}>
          <h2 className="text-xl font-semibold">Contenuti creati per le campagne</h2>
          <p className="mt-1 text-sm text-slate-300">Qui trovi tutti i contenuti che hai pubblicato e tracciato nelle campagne.</p>

          <div className="mt-5 space-y-3">
            {contents.length === 0 ? (
              <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4 text-slate-300">
                Nessun contenuto registrato per ora.
              </div>
            ) : (
              contents.map((item) => (
                <article key={item.id} className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-sm text-slate-300">
                      {item.projectId ? `Progetto: ${item.projectId}` : "Progetto non disponibile"}
                      {typeof item.campaignIndex === "number" ? ` • Campaign ${item.campaignIndex}` : ""}
                      {typeof item.epochIndex === "number" ? ` • Epoch ${item.epochIndex}` : ""}
                    </div>
                    {item.tweetUrl ? (
                      <a
                        href={item.tweetUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-indigo-300 underline-offset-2 hover:underline"
                      >
                        Apri su X
                      </a>
                    ) : null}
                  </div>
                  {item.text ? <p className="mt-2 text-sm text-slate-100 whitespace-pre-wrap">{item.text}</p> : null}
                  <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-400">
                    <span>Like: {item.likes}</span>
                    <span>Reply: {item.replies}</span>
                    <span>Retweet: {item.retweets}</span>
                    <span>Quote: {item.quotes}</span>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
        )}
      </div>
    </div>
  );
}

