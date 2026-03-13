import { ProjectPageTemplate } from "@/components/ProjectPageTemplate";
import { getWalletPageData } from "@/lib/wallet-page-data";
import { getProjectLogo } from "@/lib/project-logos";
import type { ProjectPageData } from "@/lib/project-page-data";
import placeholder from "@/assets/placeholder.svg";

export default function Ledger() {
  const base = getWalletPageData("ledger");
  if (!base) return null;
  const logo = getProjectLogo("ledger") ?? placeholder;
  const data: ProjectPageData = { ...base, logo };
  return <ProjectPageTemplate data={data} />;
}