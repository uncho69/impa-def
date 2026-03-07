"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { ProjectPageTemplate } from "@/components/ProjectPageTemplate";
import { getProjectPageData } from "@/lib/project-page-data";
import { getProjectLogo } from "@/lib/project-logos";
import type { ProjectPageData } from "@/lib/project-page-data";
import placeholder from "@/assets/placeholder.svg";

export default function DefiProjectPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const base = getProjectPageData(slug);
  if (!base) notFound();
  const logo = getProjectLogo(slug) ?? placeholder;
  const data: ProjectPageData = { ...base, logo };
  return <ProjectPageTemplate data={data} />;
}
