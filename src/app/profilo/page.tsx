"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useUser, SignInButton } from "@clerk/nextjs";
import { PrivyWalletConnector } from "@/components/profile/PrivyWalletConnector";
import { PrivySocialConnector } from "@/components/profile/PrivySocialConnector";
import { trackEvent } from "@/lib/analytics";

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

const PRIVY_ENABLED = Boolean(process.env.NEXT_PUBLIC_PRIVY_APP_ID?.trim());
const PAGE_BG_CLASS = "min-h-screen text-white bg-gradient-to-b from-indigo-950 via-slate-900/95 via-30% to-indigo-950";
const GRID_OVERLAY_CLASS =
  "fixed inset-0 pointer-events-none bg-[size:48px_48px] bg-[linear-gradient(rgba(99,102,241,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.06)_1px,transparent_1px)]";
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

function normalizeWalletAddress(value: string): string | null {
  const next = value.trim().toLowerCase();
  if (!next) return null;
  if (next.length > 255) return null;
  return next;
}

export default function ProfiloPage() {
  const { isLoaded, isSignedIn } = useUser();
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
  const [privyWalletAddress, setPrivyWalletAddress] = useState<string | null>(null);
  const [walletAddressInput, setWalletAddressInput] = useState("");
  const [walletAddresses, setWalletAddresses] = useState<string[]>([]);

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
      setWalletAddressInput("");
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
      setInfoMessage("Impostazioni profilo salvate.");
      trackEvent("profile_save", { mode: "database" });
      await loadProfile();
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Errore imprevisto"));
    } finally {
      setSaving(false);
    }
  }

  if (!isLoaded || loading) {
    return (
      <div className={PAGE_BG_CLASS}>
        <div className={GRID_OVERLAY_CLASS} />
        <div className="relative z-10 px-6 py-10">
          <div className="max-w-5xl mx-auto animate-pulse text-slate-300">Caricamento profilo...</div>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className={PAGE_BG_CLASS}>
        <div className={GRID_OVERLAY_CLASS} />
        <div className="relative z-10 px-6 py-10">
          <div className={`max-w-3xl mx-auto ${PANEL_CLASS}`}>
            <h1 className="text-2xl font-semibold">Profilo</h1>
            <p className="mt-2 text-slate-300">Per accedere al tuo profilo devi effettuare il login.</p>
            <div className="mt-5">
              <SignInButton mode="modal">
                <button className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium hover:bg-indigo-400">
                  Accedi
                </button>
              </SignInButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={PAGE_BG_CLASS}>
        <div className={GRID_OVERLAY_CLASS} />
        <div className="relative z-10 px-6 py-10">
          <div className="max-w-3xl mx-auto rounded-2xl border border-rose-500/30 bg-rose-950/20 backdrop-blur p-6">
            <p className="text-rose-200">{error || "Impossibile caricare il profilo."}</p>
          </div>
        </div>
      </div>
    );
  }

  const { profile, contents } = data;
  const resolvedWalletAddress = privyWalletAddress || walletAddresses[0] || profile.walletAddress;

  return (
    <div className={PAGE_BG_CLASS}>
      <div className={GRID_OVERLAY_CLASS} />
      <div className="relative z-10 px-6 py-10">
        <div className="max-w-6xl mx-auto space-y-6">
        <section className={PANEL_CLASS}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">{profile.username}</h1>
              <p className="mt-1 text-slate-300">Rank globale #{profile.ranking.globalRank}</p>
            </div>
            {publicProfileHref ? (
              <Link
                href={publicProfileHref}
                className="rounded-lg border border-indigo-400/40 px-4 py-2 text-sm text-indigo-200 hover:bg-indigo-500/20"
              >
                Visualizza profilo pubblico
              </Link>
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

          <div className="mt-5 grid gap-5 md:grid-cols-3">
            <label className="space-y-2">
              <span className="text-sm text-slate-300">Instagram (opzionale)</span>
              <input
                value={instagramInput}
                onChange={(e) => setInstagramInput(e.target.value)}
                placeholder="https://instagram.com/tuo_account"
                className="w-full rounded-lg border border-indigo-500/30 bg-indigo-900/25 px-3 py-2 text-white outline-none focus:border-indigo-400"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-slate-300">TikTok (opzionale)</span>
              <input
                value={tiktokInput}
                onChange={(e) => setTiktokInput(e.target.value)}
                placeholder="https://www.tiktok.com/@tuo_account"
                className="w-full rounded-lg border border-indigo-500/30 bg-indigo-900/25 px-3 py-2 text-white outline-none focus:border-indigo-400"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-slate-300">YouTube (opzionale)</span>
              <input
                value={youtubeInput}
                onChange={(e) => setYoutubeInput(e.target.value)}
                placeholder="https://youtube.com/@tuo_canale"
                className="w-full rounded-lg border border-indigo-500/30 bg-indigo-900/25 px-3 py-2 text-white outline-none focus:border-indigo-400"
              />
            </label>
          </div>

          <div className="mt-5 rounded-lg border border-indigo-500/30 bg-indigo-900/25 px-4 py-3">
            <p className="text-sm font-medium text-white">Address wallet</p>
            <p className="mt-1 text-xs text-slate-400">
              Aggiungi o rimuovi address da mostrare nel profilo pubblico (se visibilita attiva).
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {walletAddresses.length === 0 ? (
                <span className="text-xs text-slate-400">Nessun address salvato.</span>
              ) : (
                walletAddresses.map((address) => (
                  <div
                    key={address}
                    className="flex items-center gap-2 rounded-md border border-indigo-500/30 bg-indigo-950/40 px-2 py-1"
                  >
                    <span className="text-xs text-slate-100">{shortenAddress(address)}</span>
                    <button
                      type="button"
                      onClick={() => setWalletAddresses((prev) => prev.filter((item) => item !== address))}
                      className="rounded px-1 text-xs text-rose-200 hover:bg-rose-500/20"
                      aria-label={`Rimuovi ${address}`}
                    >
                      X
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <input
                value={walletAddressInput}
                onChange={(e) => setWalletAddressInput(e.target.value)}
                placeholder="0x..."
                className="min-w-[220px] flex-1 rounded-lg border border-indigo-500/30 bg-indigo-900/25 px-3 py-2 text-sm text-white outline-none focus:border-indigo-400"
              />
              <button
                type="button"
                onClick={() => {
                  const normalized = normalizeWalletAddress(walletAddressInput);
                  if (!normalized) return;
                  setWalletAddresses((prev) => (prev.includes(normalized) ? prev : [...prev, normalized]));
                  setWalletAddressInput("");
                }}
                className="rounded-lg border border-indigo-400/40 px-3 py-2 text-sm text-indigo-200 hover:bg-indigo-500/20"
              >
                Aggiungi address
              </button>
              {privyWalletAddress ? (
                <button
                  type="button"
                  onClick={() => {
                    const normalized = normalizeWalletAddress(privyWalletAddress);
                    if (!normalized) return;
                    setWalletAddresses((prev) => (prev.includes(normalized) ? prev : [...prev, normalized]));
                  }}
                  className="rounded-lg border border-emerald-400/40 px-3 py-2 text-sm text-emerald-200 hover:bg-emerald-500/20"
                >
                  Aggiungi wallet connesso
                </button>
              ) : null}
            </div>
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
              <a
                href="/api/auth/x/connect"
                className="rounded-lg border border-indigo-400/40 px-4 py-2 text-sm text-indigo-200 hover:bg-indigo-500/20"
              >
                Collega account X
              </a>
            )}
          </div>

          {PRIVY_ENABLED ? (
            <div className="mt-4 rounded-lg border border-indigo-500/30 bg-indigo-900/25 px-4 py-3">
              <p className="text-sm text-slate-300 mb-2">Wallet (Privy)</p>
              <PrivyWalletConnector onAddressChange={setPrivyWalletAddress} />
              <div className="mt-3">
                <p className="text-sm text-slate-300 mb-2">Social connect (Privy)</p>
                <PrivySocialConnector />
              </div>
            </div>
          ) : (
            <p className="mt-4 text-xs text-slate-400">
              Per abilitare wallet connect con Privy imposta `NEXT_PUBLIC_PRIVY_APP_ID` in ambiente.
            </p>
          )}

          {infoMessage ? <p className="mt-3 text-sm text-emerald-300">{infoMessage}</p> : null}
          {error ? <p className="mt-3 text-sm text-rose-300">{error}</p> : null}
        </section>

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
        </div>
      </div>
    </div>
  );
}

