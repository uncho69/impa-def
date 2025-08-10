import { ReactNode } from "react";

const bodyClass =
  "bg-white rounded-xl shadow-sm border border-neutral-200 p-5 md:p-6 text-neutral-800 flex flex-col gap-4";

export function SectionBody({ children }: { children?: ReactNode }) {
  return <section className={bodyClass}>{children}</section>;
}
