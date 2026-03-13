"use client";

import { useParams, notFound } from "next/navigation";
import { ProjectPageTemplate } from "@/components/ProjectPageTemplate";
import { getProjectLogo } from "@/lib/project-logos";
import { getNftPageData } from "@/lib/nft-page-data";
import type { ProjectPageData } from "@/lib/project-page-data";
import placeholder from "@/assets/placeholder.svg";

export default function NftProjectPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const base = getNftPageData(slug);
  if (!base) notFound();
  const logo = getProjectLogo(slug) ?? placeholder;
  const data: ProjectPageData = { ...base, logo };
  return <ProjectPageTemplate data={data} />;
}
