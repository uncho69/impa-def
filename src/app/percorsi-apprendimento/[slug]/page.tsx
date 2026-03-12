"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getLearningPathBySlug } from "@/lib/learning-paths";
import { RewardTimelineSection } from "@/components/learning/RewardTimelineSection";
import { useLanguage } from "@/contexts/LanguageContext";

const PATH_COPY_EN: Record<
  string,
  {
    level: string;
    subtitle: string;
    summary: string;
    duration: string;
    commitment: string;
    whoIsFor: string;
    outcomes: string[];
    pitfalls: string[];
  }
> = {
  principiante: {
    level: "Beginner",
    subtitle: "Web3 onboarding without chaos",
    summary: "Learn practical basics: wallets, security, first assets, and first app usage with controlled risk.",
    duration: "2-3 weeks",
    commitment: "20-30 minutes per day",
    whoIsFor: "For users starting from zero or wanting a clean reset of fundamentals.",
    outcomes: [
      "Set up a non-custodial wallet securely",
      "Understand the difference between CEX, on-ramp, and personal wallet",
      "Execute first transactions without common mistakes",
      "Read core metrics (market cap, supply, risk)",
    ],
    pitfalls: [
      "Using one single wallet for everything",
      "Signing transactions without verifying domain and permissions",
      "Entering with oversized positions in the first days",
    ],
  },
  intermedio: {
    level: "Intermediate",
    subtitle: "DeFi execution and risk management",
    summary: "Move from basic user to operational user: swaps, LP, lending, and comparative protocol analysis.",
    duration: "4-6 weeks",
    commitment: "30-45 minutes per day",
    whoIsFor: "For users already using wallets who want better execution and decision quality.",
    outcomes: [
      "Evaluate protocols with a clear framework (TVL/MC, tokenomics, narrative)",
      "Build a DeFi routine with controlled risk",
      "Distinguish real opportunities from temporary hype",
      "Set a periodic portfolio review process",
    ],
    pitfalls: [
      "Confusing high APR with protocol quality",
      "Ignoring lockup/unlock and dilution risk",
      "Overtrading based on short-term signals",
    ],
  },
  avanzato: {
    level: "Advanced",
    subtitle: "Alpha research and advanced strategies",
    summary: "Power-user workflow: research pipeline, on-chain monitoring, and performance optimization.",
    duration: "Ongoing (monthly cycle)",
    commitment: "45-60 minutes per day",
    whoIsFor: "For users who want a repeatable research, execution, and review system.",
    outcomes: [
      "Build a research pipeline (news, on-chain data, narratives)",
      "Apply a multi-scenario execution plan",
      "Reduce drawdowns with discipline and post-analysis",
      "Maintain long-term informational edge",
    ],
    pitfalls: [
      "Chasing too many narratives at once",
      "Changing strategy after each trade",
      "Neglecting journaling and decision reviews",
    ],
  },
};

export default function LearningPathDetailPage() {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const path = getLearningPathBySlug(slug);
  if (!path) {
    return (
      <div className="max-w-3xl mx-auto rounded-2xl border border-indigo-500/25 bg-indigo-900/25 backdrop-blur p-6 text-slate-200">
        {isEnglish ? "Path not found." : "Percorso non trovato."}
      </div>
    );
  }

  const copy = isEnglish ? PATH_COPY_EN[path.slug] : null;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <section className="rounded-2xl border border-indigo-500/25 bg-indigo-900/25 backdrop-blur p-6">
        <Link href="/percorsi-apprendimento" className="text-sm text-indigo-300 hover:text-indigo-200">
          {isEnglish ? "← Back to all paths" : "← Torna a tutti i percorsi"}
        </Link>
        <p className="mt-3 text-xs uppercase tracking-wide text-indigo-300">{copy?.subtitle ?? path.subtitle}</p>
        <h1 className="mt-1 text-3xl font-bold text-white">{copy?.level ?? path.level}</h1>
        <p className="mt-3 max-w-4xl text-slate-300">{copy?.summary ?? path.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full border border-indigo-400/40 bg-indigo-500/15 px-3 py-1 text-indigo-200">{copy?.duration ?? path.duration}</span>
          <span className="rounded-full border border-emerald-400/40 bg-emerald-500/15 px-3 py-1 text-emerald-200">{copy?.commitment ?? path.commitment}</span>
          <span className="rounded-full border border-slate-500/40 bg-slate-700/30 px-3 py-1 text-slate-200">{copy?.whoIsFor ?? path.whoIsFor}</span>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-indigo-500/25 bg-indigo-900/25 backdrop-blur p-5">
          <h2 className="text-xl font-semibold text-white">{isEnglish ? "What you get" : "Cosa ottieni"}</h2>
          <ul className="mt-3 space-y-2 text-slate-300 text-sm">
            {(copy?.outcomes ?? path.outcomes).map((item) => (
              <li key={item} className="rounded-lg border border-indigo-500/20 bg-slate-950/20 px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-indigo-500/25 bg-indigo-900/25 backdrop-blur p-5">
          <h2 className="text-xl font-semibold text-white">{isEnglish ? "Mistakes to avoid" : "Errori da evitare"}</h2>
          <ul className="mt-3 space-y-2 text-slate-300 text-sm">
            {(copy?.pitfalls ?? path.pitfalls).map((item) => (
              <li key={item} className="rounded-lg border border-amber-500/30 bg-amber-950/10 px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border border-indigo-500/25 bg-indigo-900/25 backdrop-blur p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold text-white">{isEnglish ? "Complete tasks and earn rewards" : "Complete le task e ottieni ricompense"}</h2>
          <Link href="/profilo" className="text-sm font-medium text-indigo-300 hover:text-indigo-200">
            {isEnglish ? "Go to badges →" : "Vai ai Badge →"}
          </Link>
        </div>
        <RewardTimelineSection
          tasks={path.rewardTasks}
          rewardNote={
            isEnglish
              ? "Complete the actions to earn badges; earn all badges to unlock the final reward."
              : "Completa le azioni per ricevere i badge; ottienili tutti e ottieni la ricompensa finale"
          }
          levelRewardUsdc={path.levelRewardUsdc}
          levelKey={path.slug as "principiante" | "intermedio" | "avanzato"}
        />
      </section>

      <section className="rounded-2xl border border-indigo-500/25 bg-indigo-900/25 backdrop-blur p-6">
        <h2 className="text-2xl font-semibold text-white">{isEnglish ? "Recommended modules" : "Moduli consigliati"}</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {path.modules.map((module) => (
            <div key={module.title} className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
              <h3 className="text-lg font-semibold text-white">{module.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{module.description}</p>
              <Link href={module.href} className="mt-4 inline-block text-sm font-medium text-indigo-300 hover:text-indigo-200">
                {isEnglish && module.cta.startsWith("Apri ") ? module.cta.replace("Apri ", "Open ") : module.cta} →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

