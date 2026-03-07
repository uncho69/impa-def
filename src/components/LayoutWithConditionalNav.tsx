"use client";

import { usePathname } from "next/navigation";
import { LeftSidebarShell } from "@/components/LeftSidebarShell";

export function LayoutWithConditionalNav({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isDefi = pathname === "/defi" || pathname.startsWith("/defi/");
  const isManuale = pathname === "/manuale";
  const isBlockchain = pathname === "/blockchain" || pathname.startsWith("/blockchain/");
  const isEsploraApp = pathname === "/esplora-app";
  const isAirdrops = pathname === "/airdrops" || pathname.startsWith("/airdrops/");

  if (isHome || isDefi || isManuale || isBlockchain || isEsploraApp || isAirdrops) {
    return <main className="w-full flex-grow min-h-screen">{children}</main>;
  }

  return <LeftSidebarShell>{children}</LeftSidebarShell>;
}
