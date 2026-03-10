import { notFound } from "next/navigation";
import { ProjectPageTemplate } from "@/components/ProjectPageTemplate";
import { getCompraVendiPageData } from "@/lib/compra-vendi-page-data";
import { getProjectLogo } from "@/lib/project-logos";
import type { ProjectPageData } from "@/lib/project-page-data";
import placeholder from "@/assets/placeholder.svg";

type Props = {
  params: { slug: string };
};

export default function CompraVendiProjectPage({ params }: Props) {
  const slug = params.slug.toLowerCase();
  const base = getCompraVendiPageData(slug);
  if (!base) notFound();

  const logo = getProjectLogo(slug) ?? placeholder;
  const data: ProjectPageData = { ...base, logo };

  return <ProjectPageTemplate data={data} />;
}
