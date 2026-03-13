"use client";

import Link from "next/link";
import { LEARNING_PATHS } from "@/lib/learning-paths";
import { useLanguage } from "@/contexts/LanguageContext";

const PATH_COPY_EN: Record<string, { level: string; subtitle: string; summary: string; duration: string; commitment: string }> = {
  principiante: {
    level: "Beginner",
    subtitle: "Web3 onboarding without chaos",
    summary: "Learn practical basics: wallets, security, first assets, and first app usage with controlled risk.",
    duration: "2-3 weeks",
    commitment: "20-30 minutes per day",
  },
  intermedio: {
    level: "Intermediate",
    subtitle: "DeFi execution and risk management",
    summary: "Move from basic user to operational user: swaps, LP, lending, and comparative protocol analysis.",
    duration: "4-6 weeks",
    commitment: "30-45 minutes per day",
  },
  avanzato: {
    level: "Advanced",
    subtitle: "Alpha research and advanced strategies",
    summary: "Power-user workflow: research pipeline, on-chain monitoring, and performance optimization.",
    duration: "Ongoing (monthly cycle)",
    commitment: "45-60 minutes per day",
  },
};

export default function LearningPathsPage() {
  const { language } = useLanguage();
  const isEnglish = language === "en";

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <section className="rounded-2xl border border-indigo-500/25 bg-indigo-900/25 backdrop-blur p-6">
        <h1 className="text-3xl font-bold text-white">{isEnglish ? "Learning Paths" : "Percorsi di Apprendimento"}</h1>
        <p className="mt-2 text-slate-300 max-w-3xl">
          {isEnglish
            ? "Structured roadmaps to learn Web3 progressively. Each path includes objectives, practical modules, and anti-mistake checklists."
            : "Roadmap strutturate per imparare Web3 in modo progressivo. Ogni percorso include obiettivi, moduli pratici e checklist anti-errori."}
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {LEARNING_PATHS.map((path) => (
          <Link
            key={path.slug}
            href={`/percorsi-apprendimento/${path.slug}`}
            className="rounded-2xl border border-indigo-500/25 bg-indigo-900/25 backdrop-blur p-5 transition-colors hover:border-indigo-400/50 hover:bg-indigo-800/25"
          >
            <p className="text-xs uppercase tracking-wide text-indigo-300">
              {isEnglish ? (PATH_COPY_EN[path.slug]?.subtitle ?? path.subtitle) : path.subtitle}
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              {isEnglish ? (PATH_COPY_EN[path.slug]?.level ?? path.level) : path.level}
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              {isEnglish ? (PATH_COPY_EN[path.slug]?.summary ?? path.summary) : path.summary}
            </p>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
              <span>{isEnglish ? (PATH_COPY_EN[path.slug]?.duration ?? path.duration) : path.duration}</span>
              <span>{isEnglish ? (PATH_COPY_EN[path.slug]?.commitment ?? path.commitment) : path.commitment}</span>
            </div>
            <div className="mt-3 text-xs text-emerald-300">
              {isEnglish ? "Task reward" : "Task reward"}: {path.rewardTasks.length} {isEnglish ? "badge missions" : "missioni badge"}
            </div>
            <div className="mt-4 text-sm font-medium text-indigo-300">{isEnglish ? "Open path →" : "Apri percorso →"}</div>
          </Link>
        ))}
      </section>
    </div>
  );
}

