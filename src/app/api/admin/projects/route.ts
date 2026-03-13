import { NextRequest, NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { projects, projectCatalog, projectMetadata } from '@/lib/db/schema';
import { eq, sql } from 'drizzle-orm';
import { PLATFORM_PROJECTS } from '@/lib/platform-projects';
import { parseProjectMetadataTags, stringifyProjectMetadataTags, type ProjectTokenConfig } from '@/lib/project-page-overrides';

export const dynamic = 'force-dynamic';

const ADMIN_EMAILS = [
  'jeffben69zos@gmail.com',
  'admin@imparodefi.com',
  'cofounder@imparodefi.com',
  'lordbaconf@gmail.com',
];
const EXCLUDED_PROJECT_IDS = new Set(['imparodefi']);

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

export type ProjectItem = {
  id: string;
  name: string;
  websiteUrl?: string | null;
  twitterUrl?: string | null;
  description?: string | null;
  category?: string | null;
  tags?: string[];
  contentOverrides?: {
    overviewText?: string;
    appUrl?: string;
    guideUrl?: string;
    usefulLinks?: { label: string; href: string }[];
  } | null;
  tokenConfig?: ProjectTokenConfig | null;
  source: 'platform' | 'catalog';
};

/**
 * GET: Lista tutti i progetti (platform + catalog) con metadata. Solo admin.
 */
export async function GET() {
  const isAdmin = await checkAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const result: ProjectItem[] = [];
  const seen = new Set<string>();

  try {
    let dbList: { id: string; name: string }[] = [];
    try {
      dbList = await db
        .select({ id: projects.id, name: projects.name })
        .from(projects)
        .where(sql`${projects.deletedAt} IS NULL`);
    } catch {
      // ignore
    }

    const catalogRows = await db
      .select()
      .from(projectCatalog)
      .where(sql`${projectCatalog.deletedAt} IS NULL`);
    const metaRows = await db.select().from(projectMetadata);

    const metaById = new Map(metaRows.map((m) => [m.projectId, m]));
    const catalogById = new Map(catalogRows.map((c) => [c.id, c]));
    const dbByName = new Map(dbList.map((p) => [p.id, p]));

    for (const p of PLATFORM_PROJECTS) {
      if (EXCLUDED_PROJECT_IDS.has(p.id.toLowerCase())) continue;
      seen.add(p.id);
      const meta = metaById.get(p.id);
      const name = dbByName.get(p.id)?.name ?? p.name;
      const parsedMeta = parseProjectMetadataTags(meta?.tags ?? null);
      const tags = parsedMeta.tags;
      result.push({
        id: p.id,
        name,
        websiteUrl: meta?.websiteUrl ?? null,
        twitterUrl: meta?.twitterUrl ?? null,
        description: meta?.description ?? null,
        category: meta?.category ?? null,
        tags: tags.length ? tags : undefined,
        contentOverrides: parsedMeta.contentOverrides,
        tokenConfig: parsedMeta.tokenConfig ?? p.tokenConfig ?? null,
        source: 'platform',
      });
    }
    for (const c of catalogRows) {
      if (EXCLUDED_PROJECT_IDS.has(c.id.toLowerCase())) continue;
      if (seen.has(c.id)) continue;
      seen.add(c.id);
      const meta = metaById.get(c.id);
      const parsedMeta = parseProjectMetadataTags(meta?.tags ?? c.tags ?? null);
      const tags = parsedMeta.tags;
      result.push({
        id: c.id,
        name: c.name,
        websiteUrl: meta?.websiteUrl ?? c.websiteUrl ?? null,
        twitterUrl: meta?.twitterUrl ?? c.twitterUrl ?? null,
        description: meta?.description ?? c.description ?? null,
        category: meta?.category ?? c.category ?? null,
        tags: tags.length ? tags : undefined,
        contentOverrides: parsedMeta.contentOverrides,
        tokenConfig: parsedMeta.tokenConfig ?? null,
        source: 'catalog',
      });
    }
    for (const p of dbList) {
      if (EXCLUDED_PROJECT_IDS.has(p.id.toLowerCase())) continue;
      if (!seen.has(p.id)) {
        seen.add(p.id);
        const meta = metaById.get(p.id);
        const parsedMeta = parseProjectMetadataTags(meta?.tags ?? null);
        const tags = parsedMeta.tags;
        result.push({
          id: p.id,
          name: p.name,
          websiteUrl: meta?.websiteUrl ?? null,
          twitterUrl: meta?.twitterUrl ?? null,
          description: meta?.description ?? null,
          category: meta?.category ?? null,
          tags: tags.length ? tags : undefined,
          contentOverrides: parsedMeta.contentOverrides,
          tokenConfig: parsedMeta.tokenConfig ?? null,
          source: 'platform',
        });
      }
    }

    result.sort((a, b) => a.name.localeCompare(b.name, 'it'));
    return NextResponse.json({ projects: result }, { status: 200 });
  } catch (err) {
    console.error('Error listing projects:', err);
    const fallback = PLATFORM_PROJECTS.filter((p) => !EXCLUDED_PROJECT_IDS.has(p.id.toLowerCase())).map((p) => ({
      id: p.id,
      name: p.name,
      websiteUrl: null,
      twitterUrl: null,
      description: null,
      category: null,
      tags: undefined,
      tokenConfig: p.tokenConfig ?? null,
      source: 'platform' as const,
    }));
    return NextResponse.json({ projects: fallback }, { status: 200 });
  }
}

/**
 * POST: Aggiungi un progetto al catalogo. Solo admin.
 * Body: { id, name, websiteUrl?, twitterUrl?, description?, category? }
 */
export async function POST(request: NextRequest) {
  const isAdmin = await checkAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  let body: {
    id: string;
    name: string;
    websiteUrl?: string;
    twitterUrl?: string;
    description?: string;
    category?: string;
    tags?: string[];
    tokenConfig?: ProjectTokenConfig | null;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const id = String(body.id ?? '').trim().toLowerCase().replace(/\s+/g, '-');
  const name = String(body.name ?? '').trim();
  if (!id || !name) {
    return NextResponse.json({ error: 'id e name obbligatori' }, { status: 400 });
  }

  const websiteUrl = body.websiteUrl ? String(body.websiteUrl).trim() || null : null;
  const twitterUrl = body.twitterUrl ? String(body.twitterUrl).trim() || null : null;
  const description = body.description ? String(body.description).trim() || null : null;
  const category = body.category ? String(body.category).trim() || null : null;
  const tagsRaw = Array.isArray(body.tags) ? body.tags.filter((x): x is string => typeof x === 'string') : [];
  const tagsJson = stringifyProjectMetadataTags({
    tags: tagsRaw,
    tokenConfig: body.tokenConfig ?? null,
  });

  try {
    const existing = await db.select().from(projectCatalog).where(eq(projectCatalog.id, id)).limit(1);
    const now = new Date();
    if (existing.length > 0) {
      await db.update(projectCatalog).set({
        name,
        websiteUrl: websiteUrl ?? null,
        twitterUrl: twitterUrl ?? null,
        description: description ?? null,
        category: category ?? null,
        tags: tagsJson,
        updatedAt: now,
        deletedAt: null,
      }).where(eq(projectCatalog.id, id));
    } else {
      await db.insert(projectCatalog).values({
        id,
        name,
        websiteUrl: websiteUrl ?? null,
        twitterUrl: twitterUrl ?? null,
        description: description ?? null,
        category: category ?? null,
        tags: tagsJson,
        updatedAt: now,
      });
    }
    return NextResponse.json({ ok: true, id }, { status: 200 });
  } catch (err) {
    console.error('Error adding project:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
