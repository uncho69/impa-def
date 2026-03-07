import Link from "next/link";
import { LEARNING_PATHS } from "@/lib/learning-paths";

export default function LearningPathsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <section className="rounded-2xl border border-indigo-500/25 bg-indigo-900/25 backdrop-blur p-6">
        <h1 className="text-3xl font-bold text-white">Percorsi di Apprendimento</h1>
        <p className="mt-2 text-slate-300 max-w-3xl">
          Roadmap strutturate per imparare Web3 in modo progressivo. Ogni percorso include obiettivi, moduli pratici e
          checklist anti-errori.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {LEARNING_PATHS.map((path) => (
          <Link
            key={path.slug}
            href={`/percorsi-apprendimento/${path.slug}`}
            className="rounded-2xl border border-indigo-500/25 bg-indigo-900/25 backdrop-blur p-5 transition-colors hover:border-indigo-400/50 hover:bg-indigo-800/25"
          >
            <p className="text-xs uppercase tracking-wide text-indigo-300">{path.subtitle}</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">{path.level}</h2>
            <p className="mt-2 text-sm text-slate-300">{path.summary}</p>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
              <span>{path.duration}</span>
              <span>{path.commitment}</span>
            </div>
            <div className="mt-4 text-sm font-medium text-indigo-300">Apri percorso →</div>
          </Link>
        ))}
      </section>
    </div>
  );
}

