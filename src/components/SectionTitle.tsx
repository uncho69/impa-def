import { ReactNode } from "react";
import { BackToHome } from "./BackToHome";

const titleClass =
  "text-2xl md:text-3xl font-bold tracking-tight gradient-text";

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
