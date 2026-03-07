import { ReactNode } from "react";
import { BackToHome } from "./BackToHome";

const titleClass =
  "text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white";

export function SectionTitle({
  children,
  showBackToHome = false,
}: {
  children?: ReactNode;
  showBackToHome?: boolean;
}) {
  return (
    <div className="flex items-center justify-between w-full">
      <h2 className={titleClass}>{children}</h2>
      {showBackToHome && <BackToHome />}
    </div>
  );
}
