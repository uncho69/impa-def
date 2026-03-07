"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { TEMPLATE_WALLET } from "@/lib/learning-badges/catalog";

type Badge = {
  key: string;
  title: string;
  description: string;
  level: "principiante" | "intermedio" | "avanzato" | "globale" | "speciale";
  category: "task" | "reputation" | "campaign" | "level";
  requirementLabel: string;
  icon: string;
  unlocked: boolean;
  metRequirement: boolean;
  claimable: boolean;
  claimed: boolean;
  claimedAt: string | null;
  progressValue: number;
  threshold: number;
  unit: string;
  order: number;
};

type Campaign = {
  id: string;
  title: string;
  description: string;
  level: "principiante" | "intermedio" | "avanzato" | "globale" | "speciale";
  rewardValue: string;
  rewardToken: string | null;
  eligible: boolean;
  eligibilityReason: string;
  claimed: boolean;
  claimedAt: string | null;
  isActive: boolean;
};

type ApiResponse = {
  wallet: string;
  badges: Badge[];
  levels: Array<{
    key: "principiante" | "intermedio" | "avanzato";
    label: string;
    completed: number;
    total: number;
    completionUnlocked: boolean;
  }>;
  campaigns: Campaign[];
};

const LEVEL_RING_COLORS: Record<Badge["level"], string> = {
  principiante: "border-cyan-400/70",
  intermedio: "border-violet-400/70",
  avanzato: "border-amber-400/70",
  globale: "border-emerald-400/70",
  speciale: "border-fuchsia-400/70",
};

function formatProgressValue(value: number, unit: string): string {
  if (unit === "USD") return `$${value.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
  if (unit === "ETH" || unit === "HYPE") return `${value.toFixed(4)} ${unit}`;
  if (unit === "YEARS") return `${value.toFixed(1)}y`;
  if (unit === "BOOL") return value >= 1 ? "Si" : "No";
  return value.toLocaleString("it-IT");
}

export function LearningBadgesPanel({ wallet }: { wallet?: string | null }) {
  const targetWallet = useMemo(() => {
    const normalized = (wallet || "").trim().toLowerCase();
    return normalized || TEMPLATE_WALLET;
  }, [wallet]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [claimingId, setClaimingId] = useState<string | null>(null);
  const [claimingBadgeKey, setClaimingBadgeKey] = useState<string | null>(null);
  const [showAllBadges, setShowAllBadges] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/learning-badges?wallet=${encodeURIComponent(targetWallet)}`, {
        cache: "no-store",
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json?.error || "Impossibile caricare i badge.");
        return;
      }
      setData(json as ApiResponse);
    } catch {
      setError("Errore di rete durante il caricamento badge.");
    } finally {
      setLoading(false);
    }
  }, [targetWallet]);

  useEffect(() => {
    load();
  }, [load]);

  const handleClaim = async (campaignId: string) => {
    setClaimingId(campaignId);
    setError(null);
    try {
      const res = await fetch("/api/learning-badges/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet: targetWallet, campaignId }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json?.error || "Claim non riuscito.");
        return;
      }
      await load();
    } catch {
      setError("Errore di rete durante il claim.");
    } finally {
      setClaimingId(null);
    }
  };

  const handleClaimBadge = async (badgeKey: string) => {
    setClaimingBadgeKey(badgeKey);
    setError(null);
    try {
      const res = await fetch("/api/learning-badges/claim-badge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet: targetWallet, badgeKey }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json?.error || "Claim badge non riuscito.");
        return;
      }
      await load();
    } catch {
      setError("Errore di rete durante il claim badge.");
    } finally {
      setClaimingBadgeKey(null);
    }
  };

  const sortedBadges = useMemo(() => {
    return [...(data?.badges || [])].sort((a, b) => a.order - b.order);
  }, [data?.badges]);

  const visibleBadges = useMemo(() => {
    if (showAllBadges) return sortedBadges;
    return sortedBadges.slice(0, 8);
  }, [sortedBadges, showAllBadges]);

  useEffect(() => {
    if (!selectedBadge) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedBadge(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedBadge]);

  return (
    <section className="rounded-2xl border border-indigo-500/25 bg-indigo-900/25 backdrop-blur p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Badges</h2>
          <p className="mt-1 text-sm text-slate-300">
            Badge stile Abstract: ottenuti colorati, mancanti shaded.
          </p>
          <p className="mt-1 text-xs text-slate-400">Wallet analizzato: {targetWallet}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => load()}
            className="rounded-full border border-indigo-400/35 bg-indigo-900/55 px-4 py-2 text-sm font-medium text-indigo-100 hover:bg-indigo-800/70"
          >
            Refresh
          </button>
          <button
            type="button"
            onClick={() => setShowAllBadges((prev) => !prev)}
            className="rounded-full border border-indigo-400/35 bg-indigo-900/55 px-4 py-2 text-sm font-medium text-indigo-100 hover:bg-indigo-800/70"
          >
            {showAllBadges ? "Show less" : "View All"}
          </button>
        </div>
      </div>

      {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}
      {loading ? (
        <p className="mt-4 text-slate-400">Caricamento badge...</p>
      ) : !data ? (
        <p className="mt-4 text-slate-400">Nessun dato disponibile.</p>
      ) : (
        <div className="mt-5 space-y-6">
          <div className="grid gap-3 md:grid-cols-3">
            {data.levels.map((level) => (
              <div key={level.key} className="rounded-xl border border-indigo-400/25 bg-indigo-950/40 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">{level.label}</p>
                <p className="mt-1 text-xl font-semibold">
                  {level.completed}/{level.total}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  {level.completionUnlocked ? "Badge livello sbloccato" : "Completa tutte le missioni"}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-indigo-400/25 bg-indigo-950/55 p-5 text-slate-100">
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5">
              {visibleBadges.map((badge) => (
                <button
                  key={badge.key}
                  type="button"
                  onClick={() => setSelectedBadge(badge)}
                  className="group flex flex-col items-center gap-2 text-center"
                  aria-label={`Apri dettaglio badge ${badge.title}`}
                >
                  <div
                    className={`relative flex h-24 w-24 items-center justify-center rounded-full border-[6px] bg-indigo-950/80 shadow-sm transition-transform group-hover:scale-105 ${
                      badge.claimable
                        ? "border-emerald-300 shadow-[0_0_22px_rgba(16,185,129,0.45)]"
                        : badge.unlocked
                          ? LEVEL_RING_COLORS[badge.level]
                          : "border-slate-300 grayscale"
                    }`}
                  >
                    <span className={`text-4xl ${badge.unlocked ? "" : "opacity-45"}`}>{badge.icon}</span>
                    {!badge.unlocked && (
                      <span className="absolute inset-0 rounded-full bg-slate-300/45" />
                    )}
                    {badge.claimable && (
                      <span className="absolute -top-2 -right-2 rounded-full border border-emerald-300/60 bg-emerald-500/25 px-2 py-0.5 text-[10px] font-bold text-emerald-100">
                        CLAIM
                      </span>
                    )}
                  </div>
                  <span className={`text-xs ${badge.unlocked ? "text-slate-100" : "text-slate-500"}`}>
                    {badge.title}
                  </span>
                </button>
              ))}
            </div>
            {!showAllBadges && sortedBadges.length > visibleBadges.length && (
              <p className="mt-4 text-xs text-slate-400">
                Mostrati {visibleBadges.length} badge su {sortedBadges.length}. Clicca “View All” per vederli tutti.
              </p>
            )}
          </div>

          {selectedBadge && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 p-4">
              <div className="w-full max-w-3xl rounded-2xl border border-indigo-400/30 bg-indigo-950 p-6 text-slate-100 shadow-2xl">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-3xl font-semibold">Badge details</h3>
                  <button
                    type="button"
                    onClick={() => setSelectedBadge(null)}
                    className="rounded-full border border-indigo-400/35 px-4 py-2 text-sm font-medium hover:bg-indigo-900/70"
                  >
                    Close
                  </button>
                </div>
                <div className="mt-5 grid gap-6 md:grid-cols-[220px,1fr] md:items-center">
                  <div className="flex justify-center">
                    <div
                      className={`relative flex h-44 w-44 items-center justify-center rounded-full border-[10px] bg-indigo-950/80 ${
                        selectedBadge.unlocked ? LEVEL_RING_COLORS[selectedBadge.level] : "border-slate-300"
                      }`}
                    >
                      <span className={`text-7xl ${selectedBadge.unlocked ? "" : "opacity-40 grayscale"}`}>
                        {selectedBadge.icon}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-4xl font-semibold tracking-tight">{selectedBadge.title}</h4>
                    <p className="mt-4 text-lg font-medium">Description</p>
                    <p className="mt-1 text-sm text-slate-300">{selectedBadge.description}</p>
                    <p className="mt-4 text-sm text-slate-200">
                      <span className="font-medium">Requirement:</span> {selectedBadge.requirementLabel}
                    </p>
                    <p className="mt-1 text-sm text-slate-200">
                      <span className="font-medium">Progress:</span>{" "}
                      {formatProgressValue(selectedBadge.progressValue, selectedBadge.unit)} /{" "}
                      {formatProgressValue(selectedBadge.threshold, selectedBadge.unit)}
                    </p>
                    <p className="mt-1 text-sm text-slate-200">
                      <span className="font-medium">Status:</span>{" "}
                      {selectedBadge.claimed
                        ? "Claimed"
                        : selectedBadge.metRequirement
                          ? "Completata (claim disponibile)"
                          : "Locked"}
                    </p>
                    {selectedBadge.claimable && (
                      <button
                        type="button"
                        onClick={() => handleClaimBadge(selectedBadge.key)}
                        disabled={claimingBadgeKey === selectedBadge.key}
                        className="mt-3 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400 disabled:opacity-60"
                      >
                        {claimingBadgeKey === selectedBadge.key ? "Claim..." : "Claim badge"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div>
            <h3 className="text-sm uppercase tracking-wide text-slate-300 mb-3">Reward Claim</h3>
            <div className="space-y-3">
              {data.campaigns.filter((item) => item.isActive).length === 0 ? (
                <p className="text-sm text-slate-400">Nessuna campagna reward attiva.</p>
              ) : (
                data.campaigns
                  .filter((item) => item.isActive)
                  .map((campaign) => (
                    <div
                      key={campaign.id}
                      className="rounded-xl border border-indigo-400/25 bg-indigo-950/40 p-4 flex flex-wrap items-center justify-between gap-3"
                    >
                      <div>
                        <p className="font-medium">{campaign.title}</p>
                        <p className="text-xs text-slate-300 mt-1">{campaign.description}</p>
                        <p className="text-xs text-slate-400 mt-1">
                          Reward: {campaign.rewardValue}
                          {campaign.rewardToken ? ` ${campaign.rewardToken}` : ""} · {campaign.eligibilityReason}
                        </p>
                      </div>
                      <button
                        type="button"
                        disabled={!campaign.eligible || campaign.claimed || claimingId === campaign.id}
                        onClick={() => handleClaim(campaign.id)}
                        className="rounded-lg px-3 py-2 text-sm font-medium bg-indigo-500 text-white hover:bg-indigo-400 disabled:opacity-50"
                      >
                        {campaign.claimed
                          ? "Claimed"
                          : claimingId === campaign.id
                            ? "Claim..."
                            : campaign.eligible
                              ? "Claim reward"
                              : "Non idoneo"}
                      </button>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
