import { NextRequest, NextResponse } from "next/server";
import { db, hasDatabase } from "@/lib/db";
import { projectCatalog, projectMetadata } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { parseProjectMetadataTags } from "@/lib/project-page-overrides";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id?.trim().toLowerCase();
  if (!id) {
    return NextResponse.json({ error: "id mancante" }, { status: 400 });
  }

  if (!hasDatabase || !db) {
    return NextResponse.json({ contentOverrides: null }, { status: 200 });
  }

  try {
    const [meta] = await db.select().from(projectMetadata).where(eq(projectMetadata.projectId, id)).limit(1);
    const [catalog] = await db.select().from(projectCatalog).where(eq(projectCatalog.id, id)).limit(1);
    const parsed = parseProjectMetadataTags(meta?.tags ?? null);

    return NextResponse.json(
      {
        contentOverrides: parsed.contentOverrides,
        metadata: {
          description: meta?.description ?? catalog?.description ?? null,
          websiteUrl: meta?.websiteUrl ?? catalog?.websiteUrl ?? null,
          twitterUrl: meta?.twitterUrl ?? catalog?.twitterUrl ?? null,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching project content overrides:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

