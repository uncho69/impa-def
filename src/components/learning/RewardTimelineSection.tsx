"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { LearningPathData } from "@/lib/learning-paths";

type RewardTask = LearningPathData["rewardTasks"][number];
type LevelKey = "principiante" | "intermedio" | "avanzato";

type LearningCampaign = {
  id: string;
  level: "principiante" | "intermedio" | "avanzato" | "globale" | "speciale";
  conditionType: "badge_key" | "wallet_metric" | "manual";
  conditionValue: string;
  eligible: boolean;
  eligibilityReason: string;
  claimed: boolean;
  isActive: boolean;
};

type LearningBadge = {
  key: string;
  metRequirement: boolean;
  unlocked: boolean;
  claimable?: boolean;
};

export function RewardTimelineSection({
  tasks,
  rewardNote,
  levelRewardUsdc,
  levelKey,
}: {
  tasks: RewardTask[];
  rewardNote: string;
  levelRewardUsdc: number;
  levelKey: LevelKey;
}) {
  const [selectedTask, setSelectedTask] = useState<RewardTask | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [campaign, setCampaign] = useState<LearningCampaign | null>(null);
  const [completedBadges, setCompletedBadges] = useState<Set<string>>(new Set());
  const [claimedBadges, setClaimedBadges] = useState<Set<string>>(new Set());
  const [claimMessage, setClaimMessage] = useState<string | null>(null);
  const [claiming, setClaiming] = useState(false);
  const [claimingTaskBadge, setClaimingTaskBadge] = useState<string | null>(null);
  const timelineWidth = useMemo(() => (tasks.length + 1) * 220, [tasks.length]);

  useEffect(() => {
    if (!selectedTask) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedTask(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedTask]);

  useEffect(() => {
    const loadWallet = async () => {
      try {
        const res = await fetch("/api/profile/me", { cache: "no-store" });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setWalletAddress(null);
          return;
        }
        const candidate = Array.isArray(data?.profile?.walletAddresses) ? data.profile.walletAddresses[0] : null;
        if (candidate && typeof candidate === "string") {
          setWalletAddress(candidate.toLowerCase());
        } else {
          setWalletAddress(null);
        }
      } catch {
        setWalletAddress(null);
      }
    };
    loadWallet();
  }, []);

  useEffect(() => {
    const loadCampaign = async () => {
      if (!walletAddress) {
        setCampaign(null);
        setCompletedBadges(new Set());
        setClaimedBadges(new Set());
        return;
      }
      try {
        const res = await fetch(`/api/learning-badges?wallet=${encodeURIComponent(walletAddress)}`, {
          cache: "no-store",
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) return;
        const campaigns = Array.isArray(data?.campaigns) ? (data.campaigns as LearningCampaign[]) : [];
        const badges = Array.isArray(data?.badges) ? (data.badges as LearningBadge[]) : [];
        setCompletedBadges(
          new Set(
            badges
              .filter((item) => item.metRequirement)
              .map((item) => item.key),
          ),
        );
        setClaimedBadges(
          new Set(
            badges
              .filter((item) => item.unlocked)
              .map((item) => item.key),
          ),
        );
        const preferred = campaigns.find(
          (item) =>
            item.isActive &&
            item.level === levelKey &&
            item.conditionType === "badge_key" &&
            item.conditionValue === `${levelKey}_level_complete`,
        );
        const fallback = campaigns.find((item) => item.isActive && item.level === levelKey) || null;
        setCampaign(preferred || fallback);
      } catch {
        // keep null
      }
    };
    loadCampaign();
  }, [walletAddress, levelKey]);

  const handleClaim = async () => {
    if (!walletAddress || !campaign) return;
    setClaiming(true);
    setClaimMessage(null);
    try {
      const res = await fetch("/api/learning-badges/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet: walletAddress, campaignId: campaign.id }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setClaimMessage(data?.error || "Claim non riuscito.");
        return;
      }
      setClaimMessage("Reward claimata con successo.");
      setCampaign((prev) => (prev ? { ...prev, claimed: true } : prev));
    } catch {
      setClaimMessage("Errore di rete durante il claim.");
    } finally {
      setClaiming(false);
    }
  };

  const handleClaimTaskBadge = async (task: RewardTask) => {
    if (!walletAddress) return;
    setClaimingTaskBadge(task.badge);
    setClaimMessage(null);
    try {
      const res = await fetch("/api/learning-badges/claim-badge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet: walletAddress, badgeKey: task.badge }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setClaimMessage(data?.error || "Claim badge non riuscito.");
        return;
      }
      setClaimMessage("Badge claimato con successo.");
      setClaimedBadges((prev) => new Set([...prev, task.badge]));
    } catch {
      setClaimMessage("Errore di rete durante il claim badge.");
    } finally {
      setClaimingTaskBadge(null);
    }
  };

  const isTaskCompleted = (task: RewardTask): boolean => completedBadges.has(task.badge);
  const isTaskClaimed = (task: RewardTask): boolean => claimedBadges.has(task.badge);

  return (
    <>
      <p className="mt-2 text-sm text-slate-300">{rewardNote}</p>

      <div className="mt-3 rounded-xl border border-indigo-400/20 bg-indigo-950/30 px-3 py-2">
        <p className="text-xs text-slate-300">
          Clicca ogni azione per aprire la guida completa con step operativi, tips e tutorial.
        </p>
      </div>

      <p className="mt-2 text-xs text-slate-400">
        Wallet analizzato per avanzamento task: {walletAddress || "nessun wallet connesso nel profilo"}
      </p>
      {!walletAddress ? (
        <p className="mt-2 text-xs text-amber-200">
          Connetti e salva un wallet nel profilo per vedere il progresso reale dei badge.
        </p>
      ) : null}

      <div className="mt-6 hidden md:block overflow-x-auto pb-2">
        <div className="relative min-w-[980px] px-2 py-3" style={{ width: `${timelineWidth}px` }}>
          <div className="absolute left-14 right-14 top-1/2 h-[2px] -translate-y-1/2 bg-orange-400/90" />
          <div className="relative grid" style={{ gridTemplateColumns: `repeat(${tasks.length + 1}, minmax(0, 1fr))` }}>
            {tasks.map((task) => (
              <div key={task.badge} className="flex flex-col items-center px-3">
                <button
                  type="button"
                  onClick={() => setSelectedTask(task)}
                  className="relative z-10 flex h-[92px] w-[92px] items-center justify-center rounded-full border-4 border-indigo-300/40 bg-indigo-950/70 shadow-[0_0_24px_rgba(99,102,241,0.2)] transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400/70"
                  aria-label={`Apri tutorial ${task.title}`}
                >
                  <Image src={task.badgeImage} alt={task.title} width={76} height={76} className="h-[76px] w-[76px] rounded-full" />
                </button>
                <div className="mt-2 flex items-center gap-2">
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full border text-[11px] font-bold ${
                      isTaskCompleted(task)
                        ? "border-emerald-300 bg-emerald-500 text-emerald-950"
                        : "border-slate-400/50 bg-slate-800/40 text-slate-300"
                    }`}
                  >
                    {isTaskCompleted(task) ? "✓" : ""}
                  </span>
                  <span className={`text-[11px] ${isTaskCompleted(task) ? "text-emerald-300" : "text-slate-400"}`}>
                    {isTaskCompleted(task) ? "Completata" : "Da completare"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleClaimTaskBadge(task)}
                  disabled={!isTaskCompleted(task) || isTaskClaimed(task) || claimingTaskBadge === task.badge}
                  className="mt-2 rounded-full border border-cyan-400/45 bg-cyan-500/15 px-3 py-1 text-[11px] font-semibold text-cyan-100 hover:bg-cyan-500/25 disabled:opacity-50"
                >
                  {isTaskClaimed(task) ? "Badge claimato" : claimingTaskBadge === task.badge ? "Claim..." : "Claim badge"}
                </button>
                <div className="mt-4 text-center min-h-[54px]">
                  <p className="text-sm font-semibold text-white leading-tight">{task.title}</p>
                  <p className="mt-1 text-xs text-slate-300 leading-tight">{task.requirement}</p>
                </div>
              </div>
            ))}

            <div className="flex flex-col items-center px-3">
              <div className="mb-4 text-center">
                <p className="text-sm font-semibold text-emerald-300">Reward finale</p>
                <p className="mt-1 text-xs text-slate-300">Completa tutte le azioni del livello</p>
              </div>
              <div className="relative z-10 flex h-[88px] w-[88px] items-center justify-center rounded-full border-4 border-emerald-300/50 bg-emerald-950/30 shadow-[0_0_24px_rgba(16,185,129,0.25)]">
                <Image src="/badges/tasks/reward_usdc.svg" alt="Reward USDC" width={72} height={72} className="h-[72px] w-[72px] rounded-full" />
              </div>
              <div className="mt-4 rounded-full border border-emerald-400/40 bg-emerald-500/15 px-3 py-1 text-sm font-semibold text-emerald-200">
                ${levelRewardUsdc} USDC
              </div>
              <button
                type="button"
                onClick={handleClaim}
                disabled={!walletAddress || !campaign || !campaign.eligible || campaign.claimed || claiming}
                className="mt-3 rounded-full border border-emerald-400/50 bg-emerald-500/20 px-4 py-1.5 text-xs font-semibold text-emerald-100 hover:bg-emerald-500/30 disabled:opacity-50"
              >
                {campaign?.claimed ? "Claimed" : claiming ? "Claim..." : campaign?.eligible ? "Claim reward" : "Non idoneo"}
              </button>
              {claimMessage ? <p className="mt-2 text-[11px] text-slate-300 text-center max-w-[140px]">{claimMessage}</p> : null}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:hidden">
        {tasks.map((task) => (
          <button
            key={task.badge}
            type="button"
            onClick={() => setSelectedTask(task)}
            className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4 text-left"
          >
            <div className="flex items-center gap-3">
              <Image
                src={task.badgeImage}
                alt={task.title}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full border border-indigo-300/40"
              />
              <div>
                <p className="text-sm font-semibold text-white">{task.title}</p>
                <p className="mt-1 text-xs text-slate-300">{task.requirement}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-bold ${
                      isTaskCompleted(task)
                        ? "border-emerald-300 bg-emerald-500 text-emerald-950"
                        : "border-slate-400/50 bg-slate-800/40 text-slate-300"
                    }`}
                  >
                    {isTaskCompleted(task) ? "✓" : ""}
                  </span>
                  <span className={`text-[11px] ${isTaskCompleted(task) ? "text-emerald-300" : "text-slate-400"}`}>
                    {isTaskCompleted(task) ? "Completata" : "Da completare"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleClaimTaskBadge(task)}
                  disabled={!isTaskCompleted(task) || isTaskClaimed(task) || claimingTaskBadge === task.badge}
                  className="mt-2 rounded-full border border-cyan-400/45 bg-cyan-500/15 px-3 py-1 text-[11px] font-semibold text-cyan-100 hover:bg-cyan-500/25 disabled:opacity-50"
                >
                  {isTaskClaimed(task) ? "Badge claimato" : claimingTaskBadge === task.badge ? "Claim..." : "Claim badge"}
                </button>
              </div>
            </div>
          </button>
        ))}
        <div className="rounded-xl border border-emerald-400/35 bg-emerald-500/10 p-4">
          <p className="text-sm font-semibold text-emerald-200">Reward finale completamento livello</p>
          <p className="mt-1 text-sm text-white">${levelRewardUsdc} USDC</p>
          <button
            type="button"
            onClick={handleClaim}
            disabled={!walletAddress || !campaign || !campaign.eligible || campaign.claimed || claiming}
            className="mt-3 rounded-full border border-emerald-400/50 bg-emerald-500/20 px-4 py-1.5 text-xs font-semibold text-emerald-100 hover:bg-emerald-500/30 disabled:opacity-50"
          >
            {campaign?.claimed ? "Claimed" : claiming ? "Claim..." : campaign?.eligible ? "Claim reward" : "Non idoneo"}
          </button>
          {claimMessage ? <p className="mt-2 text-xs text-slate-300">{claimMessage}</p> : null}
        </div>
      </div>

      {selectedTask && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-4xl rounded-2xl border border-indigo-400/30 bg-indigo-950 p-6 text-slate-100 shadow-2xl">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-3xl font-semibold">Task details</h3>
              <button
                type="button"
                onClick={() => setSelectedTask(null)}
                className="rounded-full border border-indigo-400/35 px-4 py-2 text-sm font-medium hover:bg-indigo-900/70"
              >
                Close
              </button>
            </div>

            <div className="mt-5 grid gap-6 md:grid-cols-[220px,1fr]">
              <div className="flex justify-center">
                <div className="relative flex h-44 w-44 items-center justify-center rounded-full border-[10px] border-cyan-400 bg-indigo-950/80">
                  <Image src={selectedTask.badgeImage} alt={selectedTask.title} width={140} height={140} className="h-[140px] w-[140px] rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h4 className="text-4xl font-semibold tracking-tight">{selectedTask.title}</h4>
                  <Link
                    href={selectedTask.guide.ctaHref}
                    className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400"
                  >
                    {selectedTask.guide.ctaLabel}
                  </Link>
                </div>
                <p className="mt-2 text-sm text-slate-300">{selectedTask.guide.intro}</p>

                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full border border-indigo-400/40 bg-indigo-500/15 px-3 py-1 text-indigo-200">
                    Tempo: {selectedTask.guide.estimatedTime}
                  </span>
                  <span className="rounded-full border border-emerald-400/40 bg-emerald-500/15 px-3 py-1 text-emerald-200">
                    Difficolta: {selectedTask.guide.difficulty}
                  </span>
                  <span
                    className={`rounded-full border px-3 py-1 ${
                      isTaskCompleted(selectedTask)
                        ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-200"
                        : "border-slate-500/40 bg-slate-700/30 text-slate-200"
                    }`}
                  >
                    Stato: {isTaskCompleted(selectedTask) ? "Completata ✓" : "Da completare"}
                  </span>
                  <span
                    className={`rounded-full border px-3 py-1 ${
                      isTaskClaimed(selectedTask)
                        ? "border-cyan-400/50 bg-cyan-500/20 text-cyan-100"
                        : "border-slate-500/40 bg-slate-700/30 text-slate-200"
                    }`}
                  >
                    Badge: {isTaskClaimed(selectedTask) ? "Claimato" : "Non claimato"}
                  </span>
                </div>

                <div className="mt-4 rounded-xl border border-indigo-500/25 bg-indigo-900/30 p-4">
                  <p className="text-sm font-semibold">Step operativi</p>
                  <ol className="mt-2 list-decimal pl-5 text-sm text-slate-200 space-y-1">
                    {selectedTask.guide.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </div>

                <div className="mt-3 rounded-xl border border-emerald-500/25 bg-emerald-950/20 p-4">
                  <p className="text-sm font-semibold text-emerald-200">Tips pratici</p>
                  <ul className="mt-2 list-disc pl-5 text-sm text-slate-200 space-y-1">
                    {selectedTask.guide.tips.map((tip) => (
                      <li key={tip}>{tip}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleClaimTaskBadge(selectedTask)}
                    disabled={!isTaskCompleted(selectedTask) || isTaskClaimed(selectedTask) || claimingTaskBadge === selectedTask.badge}
                    className="rounded-lg border border-cyan-400/45 bg-cyan-500/20 px-4 py-2 text-sm font-medium text-cyan-100 hover:bg-cyan-500/30 disabled:opacity-50"
                  >
                    {isTaskClaimed(selectedTask)
                      ? "Badge claimato"
                      : claimingTaskBadge === selectedTask.badge
                        ? "Claim..."
                        : "Claim badge"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
