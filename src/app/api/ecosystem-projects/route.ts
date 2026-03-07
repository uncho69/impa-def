import { NextResponse } from "next/server";
import { PLATFORM_PROJECTS } from "@/lib/platform-projects";
import { NOTION_CATALOG_PROJECTS } from "@/lib/notion-catalog-projects";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export type EcosystemProject = {
  id: string;
  name: string;
  websiteUrl?: string | null;
  twitterUrl?: string | null;
  description?: string | null;
  category?: string | null;
};

/**
 * GET: Lista pubblica di tutti i progetti (platform + catalogo Notion) per la pagina Esplora l'Ecosistema.
 */
export async function GET() {
  const byId = new Map<string, EcosystemProject>();

  for (const p of PLATFORM_PROJECTS) {
    byId.set(p.id.toLowerCase(), {
      id: p.id,
      name: p.name,
      websiteUrl: null,
      twitterUrl: null,
      description: null,
      category: null,
    });
  }

  for (const p of NOTION_CATALOG_PROJECTS) {
    const key = p.id.toLowerCase();
    if (byId.has(key)) {
      const existing = byId.get(key)!;
      existing.websiteUrl = p.websiteUrl ?? existing.websiteUrl;
      existing.twitterUrl = p.twitterUrl ?? existing.twitterUrl;
      existing.description = p.description ?? existing.description;
      existing.category = p.category ?? existing.category;
    } else {
      byId.set(key, {
        id: p.id,
        name: p.name,
        websiteUrl: p.websiteUrl ?? null,
        twitterUrl: p.twitterUrl ?? null,
        description: p.description ?? null,
        category: p.category ?? null,
      });
    }
  }

  const projects = Array.from(byId.values()).sort((a, b) =>
    a.name.localeCompare(b.name, "it")
  );

  return NextResponse.json({ projects });
}
