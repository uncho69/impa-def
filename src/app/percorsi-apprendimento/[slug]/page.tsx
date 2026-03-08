import Link from "next/link";
import { notFound } from "next/navigation";
import { LEARNING_PATHS, getLearningPathBySlug } from "@/lib/learning-paths";
import { RewardTimelineSection } from "@/components/learning/RewardTimelineSection";

export function generateStaticParams() {
  return LEARNING_PATHS.map((path) => ({ slug: path.slug }));
}

export default function LearningPathDetailPage({ params }: { params: { slug: string } }) {
  const path = getLearningPathBySlug(params.slug);
  if (!path) notFound();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <section className="rounded-2xl border border-indigo-500/25 bg-indigo-900/25 backdrop-blur p-6">
        <Link href="/percorsi-apprendimento" className="text-sm text-indigo-300 hover:text-indigo-200">
          ← Torna a tutti i percorsi
        </Link>
        <p className="mt-3 text-xs uppercase tracking-wide text-indigo-300">{path.subtitle}</p>
        <h1 className="mt-1 text-3xl font-bold text-white">{path.level}</h1>
        <p className="mt-3 max-w-4xl text-slate-300">{path.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full border border-indigo-400/40 bg-indigo-500/15 px-3 py-1 text-indigo-200">{path.duration}</span>
          <span className="rounded-full border border-emerald-400/40 bg-emerald-500/15 px-3 py-1 text-emerald-200">{path.commitment}</span>
          <span className="rounded-full border border-slate-500/40 bg-slate-700/30 px-3 py-1 text-slate-200">{path.whoIsFor}</span>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-indigo-500/25 bg-indigo-900/25 backdrop-blur p-5">
          <h2 className="text-xl font-semibold text-white">Cosa ottieni</h2>
          <ul className="mt-3 space-y-2 text-slate-300 text-sm">
            {path.outcomes.map((item) => (
              <li key={item} className="rounded-lg border border-indigo-500/20 bg-slate-950/20 px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-indigo-500/25 bg-indigo-900/25 backdrop-blur p-5">
          <h2 className="text-xl font-semibold text-white">Errori da evitare</h2>
          <ul className="mt-3 space-y-2 text-slate-300 text-sm">
            {path.pitfalls.map((item) => (
              <li key={item} className="rounded-lg border border-amber-500/30 bg-amber-950/10 px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border border-indigo-500/25 bg-indigo-900/25 backdrop-blur p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold text-white">Complete le task e ottieni ricompense</h2>
          <Link href="/profilo" className="text-sm font-medium text-indigo-300 hover:text-indigo-200">
            Vai ai Badge →
          </Link>
        </div>
        <RewardTimelineSection
          tasks={path.rewardTasks}
          rewardNote="Completa le azioni per ricevere i badge; ottienili tutti e ottieni la ricompensa finale"
          levelRewardUsdc={path.levelRewardUsdc}
          levelKey={path.slug as "principiante" | "intermedio" | "avanzato"}
        />
      </section>

      <section className="rounded-2xl border border-indigo-500/25 bg-indigo-900/25 backdrop-blur p-6">
        <h2 className="text-2xl font-semibold text-white">Moduli consigliati</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {path.modules.map((module) => (
            <div key={module.title} className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4">
              <h3 className="text-lg font-semibold text-white">{module.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{module.description}</p>
              <Link href={module.href} className="mt-4 inline-block text-sm font-medium text-indigo-300 hover:text-indigo-200">
                {module.cta} →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

