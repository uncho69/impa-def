import { NextRequest, NextResponse } from "next/server";
import { hasDatabase, pool } from "@/lib/db";
import { ensureTrendingTokensTable } from "@/lib/db/ensure-trending-tokens-table";
import { PROJECT_COINGECKO_IDS } from "@/lib/project-coingecko-ids";
import { getUserIdFromRequest } from "@/lib/auth/middleware";
import { canManageAdmin } from "@/lib/auth/admin";
import { PLATFORM_PROJECTS } from "@/lib/platform-projects";
import { parseProjectMetadataTags } from "@/lib/project-page-overrides";
import {
  hydrateNoDbTrendingTokensFromRemote,
  listNoDbTrendingTokens,
  replaceNoDbTrendingTokensFromRemote,
  reorderNoDbTrendingTokens,
  upsertNoDbTrendingToken,
} from "@/lib/trending-tokens-fallback-store";

export const dynamic = "force-dynamic";

const FALLBACK_PROJECTS = ["bitcoin", "solana", "ethereum"];
const EXCLUDED_PROJECT_IDS = new Set(["abstract", "base", "ink", "polymarket", "moonwell", "opensea"]);
const TRENDING_REMOTE_ORIGIN =
  process.env.TRENDING_TOKENS_SOURCE_ORIGIN?.trim() || "https://imparodefi.xyz";

async function checkAdmin(request: NextRequest): Promise<boolean> {
  const userId = await getUserIdFromRequest(request);
  if (!userId) return false;
  if (!hasDatabase && process.env.NODE_ENV !== "production") return true;
  return canManageAdmin(userId);
}

function isFallbackOnly(tokens: Array<{ projectId: string }>): boolean {
  if (tokens.length !== FALLBACK_PROJECTS.length) return false;
  return tokens.every((item) => FALLBACK_PROJECTS.includes(item.projectId.toLowerCase()));
}

async function fetchRemoteTrendingConfig(): Promise<Array<{ projectId: string; coingeckoId: string }>> {
  if (process.env.NODE_ENV === "production") return [];
  try {
    const res = await fetch(`${TRENDING_REMOTE_ORIGIN}/api/trending-tokens`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json().catch(() => ({}));
    const tokens = Array.isArray(data?.tokens) ? data.tokens : [];
    return tokens
      .map((item) => ({
        projectId: String(item?.projectId ?? "").trim().toLowerCase(),
        coingeckoId: String(item?.coingeckoId ?? "").trim().toLowerCase(),
      }))
      .filter(
        (item) =>
          item.projectId.length > 0 &&
          item.coingeckoId.length > 0 &&
          !EXCLUDED_PROJECT_IDS.has(item.projectId)
      );
  } catch {
    return [];
  }
}

async function fetchCoinGeckoMetaById(
  coingeckoIds: string[]
): Promise<Record<string, { name: string; symbol: string }>> {
  const unique = Array.from(new Set(coingeckoIds.filter((id) => id && id.trim().length > 0)));
  if (unique.length === 0) return {};
  const map: Record<string, { name: string; symbol: string }> = {};
  const chunkSize = 80;
  try {
    for (let start = 0; start < unique.length; start += chunkSize) {
      const chunk = unique.slice(start, start + chunkSize);
      const idsParam = encodeURIComponent(chunk.join(","));
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${idsParam}&order=market_cap_desc&per_page=250&page=1&sparkline=false`,
        { next: { revalidate: 60 } }
      );
      if (!res.ok) continue;
      const rows = (await res.json()) as Array<{ id: string; name?: string; symbol?: string }>;
      for (const row of rows) {
        const id = typeof row.id === "string" ? row.id : "";
        if (!id) continue;
        const name = typeof row.name === "string" ? row.name : "";
        const symbol = typeof row.symbol === "string" ? row.symbol.toUpperCase() : "";
        if (!name && !symbol) continue;
        map[id] = { name, symbol };
      }
    }
    return map;
  } catch {
    return {};
  }
}

async function resolveProjectTokenCoingeckoId(projectId: string): Promise<string | null> {
  const normalizedProjectId = projectId.trim().toLowerCase();
  if (!normalizedProjectId) return null;
  if (EXCLUDED_PROJECT_IDS.has(normalizedProjectId)) return null;

  // Static platform fallback when metadata is unavailable.
  const platform = PLATFORM_PROJECTS.find((item) => item.id.toLowerCase() === normalizedProjectId);
  const platformCoingeckoId = platform?.tokenConfig?.coingeckoId?.trim().toLowerCase() || null;
  const legacyCoingeckoId = PROJECT_COINGECKO_IDS[normalizedProjectId]?.trim().toLowerCase() || null;

  if (!hasDatabase || !pool) {
    return platformCoingeckoId || legacyCoingeckoId;
  }

  try {
    const metaRows = await pool.query(
      `
      SELECT tags
      FROM project_metadata
      WHERE project_id = $1
      LIMIT 1
      `,
      [normalizedProjectId]
    );
    const metaParsed = parseProjectMetadataTags((metaRows.rows?.[0]?.tags as string | null | undefined) ?? null);
    const metaCgId = metaParsed.tokenConfig?.coingeckoId?.trim().toLowerCase() || null;
    if (metaCgId) return metaCgId;

    const catalogRows = await pool.query(
      `
      SELECT tags
      FROM project_catalog
      WHERE id = $1
      LIMIT 1
      `,
      [normalizedProjectId]
    );
    const catalogParsed = parseProjectMetadataTags((catalogRows.rows?.[0]?.tags as string | null | undefined) ?? null);
    const catalogCgId = catalogParsed.tokenConfig?.coingeckoId?.trim().toLowerCase() || null;
    if (catalogCgId) return catalogCgId;
  } catch {
    // ignore and fallback to platform defaults
  }

  return platformCoingeckoId || legacyCoingeckoId;
}

export async function GET(request: NextRequest) {
  const isAdmin = await checkAdmin(request);
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasDatabase || !pool) {
    const remote = await fetchRemoteTrendingConfig();
    hydrateNoDbTrendingTokensFromRemote(remote);
    const fallbackTokens = listNoDbTrendingTokens().filter(
      (item) => !EXCLUDED_PROJECT_IDS.has(item.projectId.toLowerCase())
    );
    const mappedIds = [
      ...PLATFORM_PROJECTS
        .map((item) => item.tokenConfig?.coingeckoId?.trim().toLowerCase() || "")
        .filter((value) => value.length > 0),
      ...Object.values(PROJECT_COINGECKO_IDS).map((value) => String(value).trim().toLowerCase()),
    ];
    const coinMetaById = await fetchCoinGeckoMetaById(
      [...mappedIds, ...fallbackTokens.map((item) => String(item.coingeckoId))]
    );
    return NextResponse.json({
      tokens: fallbackTokens,
      coinMetaById,
      noDatabase: true,
    });
  }

  try {
    await ensureTrendingTokensTable();
    const rows = await pool.query(
      `
      SELECT id, project_id, coingecko_id, sort_order, is_active, updated_at
      FROM trending_tokens
      ORDER BY sort_order ASC, id ASC
      `
    );
    let tokens = rows.rows
      .map((row) => ({
        id: Number(row.id),
        projectId: String(row.project_id),
        coingeckoId: String(row.coingecko_id),
        sortOrder: Number(row.sort_order ?? 100),
        isActive: Number(row.is_active ?? 0) === 1,
        updatedAt: row.updated_at,
      }))
      .filter((item) => !EXCLUDED_PROJECT_IDS.has(item.projectId.toLowerCase()));

    // Keep admin list aligned with homepage fallback defaults when table is empty.
    if (tokens.length === 0) {
      for (let idx = 0; idx < FALLBACK_PROJECTS.length; idx += 1) {
        const projectId = FALLBACK_PROJECTS[idx];
        const coingeckoId = PROJECT_COINGECKO_IDS[projectId];
        if (!coingeckoId) continue;
        await pool.query(
          `
          INSERT INTO trending_tokens (project_id, coingecko_id, sort_order, is_active, created_at, updated_at)
          VALUES ($1, $2, $3, 1, now(), now())
          ON CONFLICT (project_id)
          DO UPDATE SET
            coingecko_id = EXCLUDED.coingecko_id,
            sort_order = EXCLUDED.sort_order,
            is_active = 1,
            updated_at = now()
          `,
          [projectId, coingeckoId, idx + 1]
        );
      }
      const seededRows = await pool.query(
        `
        SELECT id, project_id, coingecko_id, sort_order, is_active, updated_at
        FROM trending_tokens
        ORDER BY sort_order ASC, id ASC
        `
      );
      tokens = seededRows.rows
        .map((row) => ({
          id: Number(row.id),
          projectId: String(row.project_id),
          coingeckoId: String(row.coingecko_id),
          sortOrder: Number(row.sort_order ?? 100),
          isActive: Number(row.is_active ?? 0) === 1,
          updatedAt: row.updated_at,
        }))
        .filter((item) => !EXCLUDED_PROJECT_IDS.has(item.projectId.toLowerCase()));
    }

    if (isFallbackOnly(tokens)) {
      const remote = await fetchRemoteTrendingConfig();
      if (remote.length > 0) {
        await pool.query("BEGIN");
        try {
          await pool.query(`DELETE FROM trending_tokens`);
          for (let idx = 0; idx < remote.length; idx += 1) {
            const item = remote[idx];
            await pool.query(
              `
              INSERT INTO trending_tokens (project_id, coingecko_id, sort_order, is_active, created_at, updated_at)
              VALUES ($1, $2, $3, 1, now(), now())
              ON CONFLICT (project_id)
              DO UPDATE SET
                coingecko_id = EXCLUDED.coingecko_id,
                sort_order = EXCLUDED.sort_order,
                is_active = 1,
                updated_at = now()
              `,
              [item.projectId, item.coingeckoId, idx + 1]
            );
          }
          await pool.query("COMMIT");
          const syncedRows = await pool.query(
            `
            SELECT id, project_id, coingecko_id, sort_order, is_active, updated_at
            FROM trending_tokens
            ORDER BY sort_order ASC, id ASC
            `
          );
          tokens = syncedRows.rows
            .map((row) => ({
              id: Number(row.id),
              projectId: String(row.project_id),
              coingeckoId: String(row.coingecko_id),
              sortOrder: Number(row.sort_order ?? 100),
              isActive: Number(row.is_active ?? 0) === 1,
              updatedAt: row.updated_at,
            }))
            .filter((item) => !EXCLUDED_PROJECT_IDS.has(item.projectId.toLowerCase()));
        } catch {
          await pool.query("ROLLBACK").catch(() => null);
        }
      }
    }
    const mappedIds = [
      ...PLATFORM_PROJECTS
        .map((item) => item.tokenConfig?.coingeckoId?.trim().toLowerCase() || "")
        .filter((value) => value.length > 0),
      ...Object.values(PROJECT_COINGECKO_IDS).map((value) => String(value).trim().toLowerCase()),
    ];
    const tokenIds = tokens.map((item) => item.coingeckoId);
    const coinMetaById = await fetchCoinGeckoMetaById([...mappedIds, ...tokenIds]);
    return NextResponse.json({ tokens, coinMetaById });
  } catch (error) {
    console.error("Error listing trending tokens:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const isAdmin = await checkAdmin(request);
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: { projectId?: string; sortOrder?: number; action?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (String(body.action ?? "").trim().toLowerCase() === "sync_live") {
    const remote = await fetchRemoteTrendingConfig();
    if (remote.length === 0) {
      return NextResponse.json(
        { error: "Nessun token disponibile dalla sorgente live." },
        { status: 400 }
      );
    }

    if (!hasDatabase || !pool) {
      replaceNoDbTrendingTokensFromRemote(remote);
      return NextResponse.json({ ok: true, noDatabase: true, synced: remote.length });
    }

    try {
      await ensureTrendingTokensTable();
      await pool.query("BEGIN");
      await pool.query(`DELETE FROM trending_tokens`);
      for (let idx = 0; idx < remote.length; idx += 1) {
        const item = remote[idx];
        await pool.query(
          `
          INSERT INTO trending_tokens (project_id, coingecko_id, sort_order, is_active, created_at, updated_at)
          VALUES ($1, $2, $3, 1, now(), now())
          ON CONFLICT (project_id)
          DO UPDATE SET
            coingecko_id = EXCLUDED.coingecko_id,
            sort_order = EXCLUDED.sort_order,
            is_active = 1,
            updated_at = now()
          `,
          [item.projectId, item.coingeckoId, idx + 1]
        );
      }
      await pool.query("COMMIT");
      return NextResponse.json({ ok: true, synced: remote.length });
    } catch (error) {
      await pool.query("ROLLBACK").catch(() => null);
      console.error("Error syncing trending tokens from live:", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }

  const projectId = String(body.projectId ?? "").trim().toLowerCase();
  if (!projectId) return NextResponse.json({ error: "projectId is required" }, { status: 400 });
  if (EXCLUDED_PROJECT_IDS.has(projectId)) {
    return NextResponse.json({ error: "This project has no token to track" }, { status: 400 });
  }
  const coingeckoId = await resolveProjectTokenCoingeckoId(projectId);
  if (!coingeckoId) {
    return NextResponse.json({ error: "Project has no token config in masterlist" }, { status: 400 });
  }
  const cgMeta = await fetchCoinGeckoMetaById([coingeckoId]);
  if (!cgMeta[coingeckoId]?.symbol) {
    return NextResponse.json({ error: "Token not found on CoinGecko" }, { status: 400 });
  }
  const sortOrder = Number.isFinite(Number(body.sortOrder)) ? Number(body.sortOrder) : 100;

  if (!hasDatabase || !pool) {
    upsertNoDbTrendingToken(projectId, coingeckoId, sortOrder);
    return NextResponse.json({ ok: true, noDatabase: true });
  }

  try {
    await ensureTrendingTokensTable();
    await pool.query(
      `
      INSERT INTO trending_tokens (project_id, coingecko_id, sort_order, is_active, created_at, updated_at)
      VALUES ($1, $2, $3, 1, now(), now())
      ON CONFLICT (project_id)
      DO UPDATE SET
        coingecko_id = EXCLUDED.coingecko_id,
        sort_order = EXCLUDED.sort_order,
        is_active = 1,
        updated_at = now()
      `,
      [projectId, coingeckoId, sortOrder]
    );
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error upserting trending token:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const isAdmin = await checkAdmin(request);
  if (!isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: { orderedIds?: number[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const orderedIds = Array.isArray(body.orderedIds)
    ? body.orderedIds.map((value) => Number(value)).filter((value) => Number.isFinite(value) && value > 0)
    : [];
  if (orderedIds.length === 0) {
    return NextResponse.json({ error: "orderedIds is required" }, { status: 400 });
  }

  if (!hasDatabase || !pool) {
    reorderNoDbTrendingTokens(orderedIds);
    return NextResponse.json({ ok: true, noDatabase: true });
  }

  try {
    await ensureTrendingTokensTable();
    await pool.query("BEGIN");
    for (let idx = 0; idx < orderedIds.length; idx += 1) {
      const id = orderedIds[idx];
      const sortOrder = idx + 1;
      await pool.query(
        `
        UPDATE trending_tokens
        SET sort_order = $2, updated_at = now()
        WHERE id = $1
        `,
        [id, sortOrder]
      );
    }
    await pool.query("COMMIT");
    return NextResponse.json({ ok: true });
  } catch (error) {
    await pool.query("ROLLBACK").catch(() => null);
    console.error("Error reordering trending tokens:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
