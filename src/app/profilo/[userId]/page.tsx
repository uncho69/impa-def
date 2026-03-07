"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

type PublicProfileResponse = {
  profile: {
    userId: string;
    username: string;
    xProfileUrl?: string | null;
    instagramUrl?: string | null;
    tiktokUrl?: string | null;
    youtubeUrl?: string | null;
    walletAddress?: string | null;
    walletAddresses?: string[];
    ranking: {
      globalRank: number;
      totalPoints: number;
      totalTweets: number;
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
  }[];
};

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

export default function PublicProfilePage() {
  const params = useParams<{ userId: string }>();
  const userId = params?.userId;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PublicProfileResponse | null>(null);

  useEffect(() => {
    const run = async () => {
      if (!userId) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/profile/${userId}`, { cache: "no-store" });
        const json = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(json?.error || "Errore caricamento profilo");
        setData(json as PublicProfileResponse);
      } catch (err: unknown) {
        setError(getErrorMessage(err, "Errore imprevisto"));
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [userId]);

  if (loading) {
    return (
      <div className={PAGE_BG_CLASS}>
        <div className={GRID_OVERLAY_CLASS} />
        <div className="relative z-10 px-6 py-10">
          <div className="max-w-5xl mx-auto text-slate-300 animate-pulse">Caricamento profilo pubblico...</div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={PAGE_BG_CLASS}>
        <div className={GRID_OVERLAY_CLASS} />
        <div className="relative z-10 px-6 py-10">
          <div className="max-w-3xl mx-auto rounded-2xl border border-rose-500/30 bg-rose-950/20 backdrop-blur p-6">
            <p className="text-rose-200">{error || "Profilo non disponibile"}</p>
            <Link href="/profilo" className="mt-4 inline-block text-sm text-indigo-300 underline-offset-2 hover:underline">
              Vai al mio profilo
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={PAGE_BG_CLASS}>
      <div className={GRID_OVERLAY_CLASS} />
      <div className="relative z-10 px-6 py-10">
        <div className="max-w-6xl mx-auto space-y-6">
        <section className={PANEL_CLASS}>
          <h1 className="text-3xl font-semibold tracking-tight">{data.profile.username}</h1>
          <p className="mt-1 text-slate-300">Rank globale #{data.profile.ranking.globalRank}</p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">Punti totali</p>
              <p className="mt-1 text-2xl font-semibold">{data.profile.ranking.totalPoints.toLocaleString("it-IT")}</p>
            </div>
            <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">Tweet campagne</p>
              <p className="mt-1 text-2xl font-semibold">{data.profile.ranking.totalTweets.toLocaleString("it-IT")}</p>
            </div>
            <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">Address pubblici</p>
              {Array.isArray(data.profile.walletAddresses) && data.profile.walletAddresses.length > 0 ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {data.profile.walletAddresses.map((address) => (
                    <span
                      key={address}
                      className="rounded-md border border-indigo-500/30 bg-indigo-950/40 px-2 py-1 text-xs text-slate-100"
                    >
                      {shortenAddress(address)}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-1 text-lg font-medium">{shortenAddress(data.profile.walletAddress)}</p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <div className="flex flex-wrap items-center gap-3">
              {data.profile.xProfileUrl ? (
                <a
                  href={data.profile.xProfileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-indigo-300 underline-offset-2 hover:underline"
                >
                  Profilo X
                </a>
              ) : (
                <span className="text-sm text-slate-400">Profilo X non collegato</span>
              )}
              {data.profile.instagramUrl ? (
                <a
                  href={data.profile.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-indigo-300 underline-offset-2 hover:underline"
                >
                  Instagram
                </a>
              ) : null}
              {data.profile.tiktokUrl ? (
                <a
                  href={data.profile.tiktokUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-indigo-300 underline-offset-2 hover:underline"
                >
                  TikTok
                </a>
              ) : null}
              {data.profile.youtubeUrl ? (
                <a
                  href={data.profile.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-indigo-300 underline-offset-2 hover:underline"
                >
                  YouTube
                </a>
              ) : null}
            </div>
          </div>
        </section>

        <section className={PANEL_CLASS}>
          <h2 className="text-xl font-semibold">Contenuti campagne</h2>
          <div className="mt-5 space-y-3">
            {data.contents.length === 0 ? (
              <div className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4 text-slate-300">
                Nessun contenuto pubblico disponibile.
              </div>
            ) : (
              data.contents.map((item) => (
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

