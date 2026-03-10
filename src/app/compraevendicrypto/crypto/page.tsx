import { ProjectPageTemplate } from "@/components/ProjectPageTemplate";
import { getCompraVendiPageData } from "@/lib/compra-vendi-page-data";
import { getProjectLogo } from "@/lib/project-logos";
import type { ProjectPageData } from "@/lib/project-page-data";
import placeholder from "@/assets/placeholder.svg";

export default function CryptoDotCom() {
  const base = getCompraVendiPageData("crypto");
  if (!base) return null;
  const logo = getProjectLogo("crypto") ?? placeholder;
  const data: ProjectPageData = { ...base, logo };
  return <ProjectPageTemplate data={data} />;
}
