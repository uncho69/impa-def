import Link from "next/link";
import { notFound } from "next/navigation";
import { LeftSidebarShell } from "@/components/LeftSidebarShell";
import {
  getManualAudiencePageData,
  MANUAL_AUDIENCE_SLUGS,
} from "@/lib/manual-audience-pages";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return MANUAL_AUDIENCE_SLUGS.map((slug) => ({ slug }));
}

export default function ManualAudiencePage({ params }: Props) {
  const data = getManualAudiencePageData(params.slug);
  if (!data) notFound();

  return (
    <LeftSidebarShell>
      <div className="w-full">
        <div className="mb-5">
          <Link
            href="/manuale"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Torna al Manuale
          </Link>
          <div className="mt-4 rounded-2xl border border-indigo-500/25 bg-indigo-900/25 p-5">
            <p className="text-3xl">{data.icon}</p>
            <h1 className="mt-2 text-2xl md:text-3xl font-bold text-white">{data.title}</h1>
            <p className="mt-1 text-indigo-200">{data.subtitle}</p>
            <p className="mt-3 text-slate-300">{data.summary}</p>
          </div>
        </div>

        <section className="rounded-2xl border border-indigo-500/20 bg-indigo-900/25 p-5 mb-5">
          <h2 className="text-lg font-semibold text-white">Cosa conta davvero</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {data.keyPoints.map((point) => (
              <div
                key={point}
                className="rounded-xl border border-indigo-500/25 bg-slate-950/25 p-3 text-sm text-slate-200"
              >
                {point}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-indigo-500/20 bg-indigo-900/25 p-5 mb-5">
          <h2 className="text-lg font-semibold text-white">Playbook operativo</h2>
          <ol className="mt-3 space-y-2">
            {data.playbook.map((step, index) => (
              <li
                key={step}
                className="rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-3 text-sm text-slate-200 flex items-start gap-3"
              >
                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/30 text-xs font-semibold text-indigo-100">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-2xl border border-indigo-500/20 bg-indigo-900/25 p-5 mb-5">
          <h2 className="text-lg font-semibold text-white">Azioni consigliate</h2>
          <p className="mt-1 text-sm text-slate-300">
            Apri queste sezioni per passare subito dalla teoria alla pratica.
          </p>
          <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {data.actions.map((action) => {
              const external = action.href.startsWith("http");
              const cardCls =
                "rounded-xl border border-indigo-500/25 bg-indigo-900/20 p-4 hover:border-indigo-300/60 transition-colors";
              const content = (
                <>
                  <h3 className="font-semibold text-white">{action.title}</h3>
                  <p className="mt-1.5 text-sm text-slate-300">{action.description}</p>
                  <p className="mt-3 text-sm font-medium text-indigo-300">
                    {action.cta} {external ? "↗" : "→"}
                  </p>
                </>
              );
              if (external) {
                return (
                  <a
                    key={action.title}
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardCls}
                  >
                    {content}
                  </a>
                );
              }
              return (
                <Link key={action.title} href={action.href} className={cardCls}>
                  {content}
                </Link>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-amber-500/25 bg-amber-900/10 p-5">
          <h2 className="text-lg font-semibold text-amber-200">Errori da evitare</h2>
          <ul className="mt-3 space-y-2 text-sm text-amber-100/90">
            {data.pitfalls.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-amber-500/25 bg-slate-950/20 px-3 py-2"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </LeftSidebarShell>
  );
}
