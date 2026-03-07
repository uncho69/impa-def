import { LearningBadgesPanel } from "@/components/profile/LearningBadgesPanel";
import { TEMPLATE_WALLET } from "@/lib/learning-badges/catalog";

export default function BadgeTemplatePage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <section className="rounded-2xl border border-indigo-500/25 bg-indigo-900/25 backdrop-blur p-6">
        <h1 className="text-3xl font-semibold text-white">Template Badge Wallet</h1>
        <p className="mt-2 text-slate-300">
          Anteprima badge/reward con wallet template richiesto per il profilo.
        </p>
        <p className="mt-2 text-xs text-slate-400">{TEMPLATE_WALLET}</p>
      </section>
      <LearningBadgesPanel wallet={TEMPLATE_WALLET} />
    </div>
  );
}
