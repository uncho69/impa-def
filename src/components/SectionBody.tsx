import { ReactNode } from "react";

const bodyClass =
  "bg-white rounded-2xl shadow-lg border border-neutral-200 p-8 md:p-8 text-neutral-800 flex flex-col gap-6";

export function SectionBody({ children, className }: { children?: ReactNode; className?: string }) {
  return <section className={`${bodyClass} ${className || ''}`}>{children}</section>;
}
