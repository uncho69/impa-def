import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/auth/middleware";
import { verifyPrivyAccessToken } from "@/lib/auth/privy";
import { hasDatabase, pool } from "@/lib/db";
import { ensureUserBookmarksTable } from "@/lib/db/ensure-user-bookmarks-table";

export const dynamic = "force-dynamic";

type BookmarkType = "page" | "section" | "content";

function normalizeInternalUrl(input: string): string | null {
  const value = input.trim();
  if (!value) return null;
  try {
    const parsed = new URL(value);
    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    // already relative
  }
  if (!value.startsWith("/")) return null;
  if (value.length > 700) return null;
  return value;
}

function sanitizeBookmarkType(value: unknown): BookmarkType {
  if (value === "section" || value === "content") return value;
  return "page";
}

async function resolveAuthenticatedUserId(request: NextRequest): Promise<string | null> {
  const fromSession = await getUserIdFromRequest(request);
  if (fromSession) return fromSession;

  const authHeader = request.headers.get("authorization") ?? request.headers.get("Authorization");
  const bearerToken =
    typeof authHeader === "string" && authHeader.startsWith("Bearer ")
      ? authHeader.slice(7).trim()
      : (request.headers.get("x-privy-access-token") ?? "").trim();
  if (!bearerToken) return null;

  const verified = await verifyPrivyAccessToken(bearerToken);
  if (!verified?.userId) return null;
  return verified.userId;
}

export async function GET(request: NextRequest) {
  try {
    const userId = await resolveAuthenticatedUserId(request);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    if (!hasDatabase || !pool) {
      return NextResponse.json({ noDatabase: true, bookmarks: [] });
    }

    await ensureUserBookmarksTable();
    const result = await pool.query(
      `
      SELECT id, url, title, bookmark_type, project_id, section_id, created_at
      FROM user_bookmarks
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
      [userId],
    );

    return NextResponse.json({
      bookmarks: result.rows.map((row) => ({
        id: row.id,
        url: row.url,
        title: row.title,
        type: row.bookmark_type as BookmarkType,
        projectId: row.project_id ?? null,
        sectionId: row.section_id ?? null,
        createdAt: row.created_at,
      })),
    });
  } catch (error) {
    console.error("Error loading bookmarks:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = await resolveAuthenticatedUserId(request);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = (await request.json().catch(() => ({}))) as {
      url?: string;
      title?: string;
      type?: BookmarkType;
      projectId?: string | null;
      sectionId?: string | null;
    };

    const normalizedUrl = normalizeInternalUrl(String(body.url ?? ""));
    const title = String(body.title ?? "").trim();
    if (!normalizedUrl || !title) {
      return NextResponse.json({ error: "URL e titolo sono obbligatori" }, { status: 400 });
    }

    if (!hasDatabase || !pool) {
      return NextResponse.json({ noDatabase: true, bookmark: null });
    }

    await ensureUserBookmarksTable();
    const id = crypto.randomUUID();
    const bookmarkType = sanitizeBookmarkType(body.type);
    const projectId = body.projectId ? String(body.projectId).trim().slice(0, 120) : null;
    const sectionId = body.sectionId ? String(body.sectionId).trim().slice(0, 120) : null;

    const inserted = await pool.query(
      `
      INSERT INTO user_bookmarks (id, user_id, url, title, bookmark_type, project_id, section_id, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, now())
      ON CONFLICT (user_id, url)
      DO UPDATE SET
        title = EXCLUDED.title,
        bookmark_type = EXCLUDED.bookmark_type,
        project_id = EXCLUDED.project_id,
        section_id = EXCLUDED.section_id
      RETURNING id, url, title, bookmark_type, project_id, section_id, created_at
      `,
      [id, userId, normalizedUrl, title.slice(0, 255), bookmarkType, projectId, sectionId],
    );

    const row = inserted.rows[0];
    return NextResponse.json({
      bookmark: {
        id: row.id,
        url: row.url,
        title: row.title,
        type: row.bookmark_type as BookmarkType,
        projectId: row.project_id ?? null,
        sectionId: row.section_id ?? null,
        createdAt: row.created_at,
      },
    });
  } catch (error) {
    console.error("Error saving bookmark:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const userId = await resolveAuthenticatedUserId(request);
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = (await request.json().catch(() => ({}))) as { url?: string };
    const normalizedUrl = normalizeInternalUrl(String(body.url ?? ""));
    if (!normalizedUrl) return NextResponse.json({ error: "URL non valida" }, { status: 400 });

    if (!hasDatabase || !pool) {
      return NextResponse.json({ noDatabase: true, ok: true });
    }

    await ensureUserBookmarksTable();
    await pool.query(`DELETE FROM user_bookmarks WHERE user_id = $1 AND url = $2`, [userId, normalizedUrl]);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error deleting bookmark:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

