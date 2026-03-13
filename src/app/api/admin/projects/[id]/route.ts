import { NextRequest, NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { db, hasDatabase } from '@/lib/db';
import { projectCatalog, projectMetadata, projects } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { PLATFORM_PROJECTS } from '@/lib/platform-projects';
import { NOTION_CATALOG_PROJECTS } from '@/lib/notion-catalog-projects';
import { parseProjectMetadataTags, stringifyProjectMetadataTags, type ProjectContentOverrides, type ProjectTokenConfig } from '@/lib/project-page-overrides';

export const dynamic = 'force-dynamic';

const ADMIN_EMAILS = [
  'jeffben69zos@gmail.com',
  'admin@imparodefi.com',
  'cofounder@imparodefi.com',
  'lordbaconf@gmail.com',
];

async function checkAdmin(): Promise<boolean> {
  try {
    const hasValidClerkKeys = Boolean(
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
      process.env.CLERK_SECRET_KEY &&
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.startsWith('pk_') &&
      process.env.CLERK_SECRET_KEY.startsWith('sk_')
    );
    if (!hasValidClerkKeys && process.env.NODE_ENV !== 'production') {
      return true;
    }

    const { userId } = await auth();
    if (!userId) return false;
    const user = await currentUser();
    if (!user?.emailAddresses?.[0]?.emailAddress) return false;
    const email = user.emailAddresses[0].emailAddress.toLowerCase();
    return ADMIN_EMAILS.some((e) => e.toLowerCase() === email);
  } catch {
    return false;
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const id = (await params).id?.trim().toLowerCase();
  if (!id) return NextResponse.json({ error: 'id mancante' }, { status: 400 });

  try {
    const normalizedId = id.toLowerCase();
    const notionProject = NOTION_CATALOG_PROJECTS.find((p) => p.id.toLowerCase() === normalizedId);
    const platform = PLATFORM_PROJECTS.find((p) => p.id.toLowerCase() === normalizedId);
    if (!hasDatabase || !db) {
      return NextResponse.json(
        {
          project: {
            id: normalizedId,
            name: notionProject?.name ?? platform?.name ?? normalizedId,
            websiteUrl: notionProject?.websiteUrl ?? null,
            twitterUrl: notionProject?.twitterUrl ?? null,
            description: notionProject?.description ?? null,
            category: notionProject?.category ?? null,
            tags: [],
            contentOverrides: null,
          tokenConfig: platform?.tokenConfig ?? null,
            source: 'platform',
          },
        },
        { status: 200 }
      );
    }

    const [catalogRow] = await db.select().from(projectCatalog).where(eq(projectCatalog.id, normalizedId)).limit(1);
    const [metaRow] = await db.select().from(projectMetadata).where(eq(projectMetadata.projectId, normalizedId)).limit(1);
    const [projectRow] = await db.select().from(projects).where(eq(projects.id, normalizedId)).limit(1);
    const parsedMeta = parseProjectMetadataTags(metaRow?.tags ?? null);

    const name =
      projectRow?.name ??
      catalogRow?.name ??
      notionProject?.name ??
      platform?.name ??
      normalizedId;

    return NextResponse.json(
      {
        project: {
          id: normalizedId,
          name,
          websiteUrl: metaRow?.websiteUrl ?? catalogRow?.websiteUrl ?? notionProject?.websiteUrl ?? null,
          twitterUrl: metaRow?.twitterUrl ?? catalogRow?.twitterUrl ?? notionProject?.twitterUrl ?? null,
          description: metaRow?.description ?? catalogRow?.description ?? notionProject?.description ?? null,
          category: metaRow?.category ?? catalogRow?.category ?? notionProject?.category ?? null,
          tags: parsedMeta.tags,
          contentOverrides: parsedMeta.contentOverrides,
          tokenConfig: parsedMeta.tokenConfig ?? platform?.tokenConfig ?? null,
          source: catalogRow ? 'catalog' : 'platform',
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('Error fetching project detail:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * PATCH: Aggiorna sito, twitter, descrizione, categoria. Solo admin.
 */
export async function PATCH(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const id = (await params).id?.trim().toLowerCase();
  if (!id) return NextResponse.json({ error: 'id mancante' }, { status: 400 });

  let body: {
    name?: string;
    websiteUrl?: string;
    twitterUrl?: string;
    description?: string;
    category?: string;
    tags?: string[];
    contentOverrides?: ProjectContentOverrides | null;
    tokenConfig?: ProjectTokenConfig | null;
  };
  try {
    body = await _request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const now = new Date();
  const websiteUrl = body.websiteUrl !== undefined ? (String(body.websiteUrl).trim() || null) : undefined;
  const twitterUrl = body.twitterUrl !== undefined ? (String(body.twitterUrl).trim() || null) : undefined;
  const description = body.description !== undefined ? (String(body.description).trim() || null) : undefined;
  const category = body.category !== undefined ? (String(body.category).trim() || null) : undefined;
  const name = body.name !== undefined ? String(body.name).trim() : undefined;
  const tagsArr = body.tags !== undefined && Array.isArray(body.tags) ? body.tags.filter((x): x is string => typeof x === 'string') : undefined;

  try {
    if (!hasDatabase || !db) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }
    const catalogRow = await db.select().from(projectCatalog).where(eq(projectCatalog.id, id)).limit(1);
    if (catalogRow.length > 0) {
      const set: Record<string, unknown> = { updatedAt: now };
      if (name !== undefined) set.name = name;
      if (websiteUrl !== undefined) set.websiteUrl = websiteUrl;
      if (twitterUrl !== undefined) set.twitterUrl = twitterUrl;
      if (description !== undefined) set.description = description;
      if (category !== undefined) set.category = category;
      if (tagsArr !== undefined) set.tags = tagsArr.length > 0 ? JSON.stringify(tagsArr) : null;
      await db.update(projectCatalog).set(set).where(eq(projectCatalog.id, id));
    } else {
      if (name !== undefined) {
        const existingProject = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
        if (existingProject.length > 0) {
          await db.update(projects).set({ name, updatedAt: now }).where(eq(projects.id, id));
        }
      }
      const existingMeta = await db.select().from(projectMetadata).where(eq(projectMetadata.projectId, id)).limit(1);
      const existingParsed = parseProjectMetadataTags(existingMeta[0]?.tags ?? null);
      const nextTags = tagsArr !== undefined ? tagsArr : existingParsed.tags;
      const nextContentOverrides =
        body.contentOverrides !== undefined ? body.contentOverrides : existingParsed.contentOverrides;
      const nextTokenConfig =
        body.tokenConfig !== undefined ? body.tokenConfig : existingParsed.tokenConfig;
      const nextTagsJson = stringifyProjectMetadataTags({
        tags: nextTags,
        contentOverrides: nextContentOverrides,
        tokenConfig: nextTokenConfig,
      });

      const metaSet: { websiteUrl?: string | null; twitterUrl?: string | null; description?: string | null; category?: string | null; tags?: string | null; updatedAt: Date } = { updatedAt: now };
      if (websiteUrl !== undefined) metaSet.websiteUrl = websiteUrl;
      if (twitterUrl !== undefined) metaSet.twitterUrl = twitterUrl;
      if (description !== undefined) metaSet.description = description;
      if (category !== undefined) metaSet.category = category;
      if (tagsArr !== undefined || body.contentOverrides !== undefined) metaSet.tags = nextTagsJson;
      if (existingMeta.length > 0) {
        await db.update(projectMetadata).set(metaSet).where(eq(projectMetadata.projectId, id));
      } else {
        await db.insert(projectMetadata).values({
          projectId: id,
          websiteUrl: metaSet.websiteUrl ?? null,
          twitterUrl: metaSet.twitterUrl ?? null,
          description: metaSet.description ?? null,
          category: metaSet.category ?? null,
          tags: metaSet.tags ?? null,
          updatedAt: now,
        });
      }
    }

    // Manteniamo eventuali override avanzati e token config in project_metadata.
    if (body.contentOverrides !== undefined || body.tokenConfig !== undefined) {
      const existingMeta = await db.select().from(projectMetadata).where(eq(projectMetadata.projectId, id)).limit(1);
      const parsedExisting = parseProjectMetadataTags(existingMeta[0]?.tags ?? null);
      const tagsForMeta = tagsArr !== undefined ? tagsArr : parsedExisting.tags;
      const tagsJsonForMeta = stringifyProjectMetadataTags({
        tags: tagsForMeta,
        contentOverrides:
          body.contentOverrides !== undefined ? body.contentOverrides : parsedExisting.contentOverrides,
        tokenConfig: body.tokenConfig !== undefined ? body.tokenConfig : parsedExisting.tokenConfig,
      });

      if (existingMeta.length > 0) {
        await db
          .update(projectMetadata)
          .set({ tags: tagsJsonForMeta, updatedAt: now })
          .where(eq(projectMetadata.projectId, id));
      } else {
        await db.insert(projectMetadata).values({
          projectId: id,
          tags: tagsJsonForMeta,
          updatedAt: now,
        });
      }
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error('Error updating project:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * DELETE: Rimuovi dal catalogo (soft delete). Solo per progetti source=catalog. Solo admin.
 */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const id = (await params).id?.trim().toLowerCase();
  if (!id) return NextResponse.json({ error: 'id mancante' }, { status: 400 });

  try {
    if (!hasDatabase || !db) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }
    const catalogRow = await db.select().from(projectCatalog).where(eq(projectCatalog.id, id)).limit(1);
    if (catalogRow.length === 0) {
      return NextResponse.json({ error: 'Progetto non trovato nel catalogo o non rimovibile' }, { status: 404 });
    }
    await db.update(projectCatalog).set({ deletedAt: new Date(), updatedAt: new Date() }).where(eq(projectCatalog.id, id));
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error('Error deleting project:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
