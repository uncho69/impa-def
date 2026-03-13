import { NextResponse } from "next/server";
import { hasDatabase, pool } from "@/lib/db";
import { ensureTrendingTokensTable } from "@/lib/db/ensure-trending-tokens-table";
import { PROJECT_COINGECKO_IDS } from "@/lib/project-coingecko-ids";
import {
  hydrateNoDbTrendingTokensFromRemote,
  listNoDbTrendingTokens,
} from "@/lib/trending-tokens-fallback-store";

export const dynamic = "force-dynamic";

type TrendingTokenItem = {
  projectId: string;
  coingeckoId: string;
};

const FALLBACK_PROJECTS = ["bitcoin", "solana", "ethereum"];
const EXCLUDED_PROJECT_IDS = new Set(["abstract", "base", "ink", "polymarket", "moonwell", "opensea"]);
const TRENDING_REMOTE_ORIGIN =
  process.env.TRENDING_TOKENS_SOURCE_ORIGIN?.trim() || "https://imparodefi.xyz";

function isFallbackOnly(tokens: TrendingTokenItem[]): boolean {
  if (tokens.length !== FALLBACK_PROJECTS.length) return false;
  return tokens.every((item) => FALLBACK_PROJECTS.includes(item.projectId.toLowerCase()));
}

async function fetchRemoteTrendingConfig(): Promise<TrendingTokenItem[]> {
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

async function loadConfiguredTokens(): Promise<TrendingTokenItem[]> {
  if (!hasDatabase || !pool) {
    const remote = await fetchRemoteTrendingConfig();
    hydrateNoDbTrendingTokensFromRemote(remote);
    return listNoDbTrendingTokens()
      .map((item) => ({ projectId: item.projectId, coingeckoId: item.coingeckoId }))
      .filter((item) => !EXCLUDED_PROJECT_IDS.has(item.projectId.toLowerCase()));
  }

  try {
    await ensureTrendingTokensTable();
    const result = await pool.query(
      `
      SELECT project_id, coingecko_id
      FROM trending_tokens
      WHERE is_active = 1
      ORDER BY sort_order ASC, id ASC
      `
    );
    if (result.rows.length > 0) {
      const activeTokens = result.rows.map((row) => ({
        projectId: String(row.project_id),
        coingeckoId: String(row.coingecko_id),
      })).filter((item) => !EXCLUDED_PROJECT_IDS.has(item.projectId.toLowerCase()));
      if (activeTokens.length > 0) {
        if (isFallbackOnly(activeTokens)) {
          const remote = await fetchRemoteTrendingConfig();
          if (remote.length > 0) return remote;
        }
        return activeTokens;
      }
    }
  } catch {
    // Fallback below.
  }

  return FALLBACK_PROJECTS.map((projectId) => ({
    projectId,
    coingeckoId: PROJECT_COINGECKO_IDS[projectId],
  })).filter((item) => Boolean(item.coingeckoId) && !EXCLUDED_PROJECT_IDS.has(item.projectId.toLowerCase()));
}

export async function GET() {
  try {
    const configured = await loadConfiguredTokens();
    if (configured.length === 0) {
      return NextResponse.json({ tokens: [] });
    }

    const ids = configured.map((item) => item.coingeckoId).join(",");
    const cgUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${encodeURIComponent(ids)}&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h`;
    const res = await fetch(cgUrl, { next: { revalidate: 60 } });
    if (!res.ok) {
      return NextResponse.json({ tokens: [] }, { status: 200 });
    }
    const rows = (await res.json()) as Array<{
      id: string;
      symbol: string;
      name: string;
      current_price: number;
      price_change_percentage_24h: number | null;
      image?: string;
    }>;
    const byId = new Map(rows.map((row) => [row.id, row]));
    const tokens = configured
      .map((item) => {
        const coin = byId.get(item.coingeckoId);
        if (!coin) return null;
        return {
          projectId: item.projectId,
          coingeckoId: item.coingeckoId,
          symbol: coin.symbol.toUpperCase(),
          name: coin.name,
          image: coin.image || null,
          priceUsd: Number(coin.current_price || 0),
          change24h: typeof coin.price_change_percentage_24h === "number" ? coin.price_change_percentage_24h : 0,
        };
      })
      .filter(Boolean);

    return NextResponse.json({ tokens });
  } catch {
    return NextResponse.json({ tokens: [] }, { status: 200 });
  }
}
