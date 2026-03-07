import { ReactNode } from "react";

const bodyClass =
  "legacy-section-body bg-white dark:bg-indigo-950/35 rounded-2xl shadow-lg border border-slate-200 dark:border-indigo-500/20 p-8 md:p-8 text-slate-800 dark:text-slate-100 flex flex-col gap-6";

export function SectionBody({ children, className }: { children?: ReactNode; className?: string }) {
  return <section className={`${bodyClass} ${className || ''}`}>{children}</section>;
}
