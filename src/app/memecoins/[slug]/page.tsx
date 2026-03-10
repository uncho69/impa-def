"use client";

import { useParams, notFound } from "next/navigation";
import { ProjectPageTemplate } from "@/components/ProjectPageTemplate";
import { getProjectLogo } from "@/lib/project-logos";
import { getMemecoinPageData } from "@/lib/memecoin-page-data";
import type { ProjectPageData } from "@/lib/project-page-data";
import placeholder from "@/assets/placeholder.svg";

export default function MemecoinProjectPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const base = getMemecoinPageData(slug);
  if (!base) notFound();
  const logo = getProjectLogo(slug) ?? placeholder;
  const data: ProjectPageData = { ...base, logo };
  return <ProjectPageTemplate data={data} />;
}
