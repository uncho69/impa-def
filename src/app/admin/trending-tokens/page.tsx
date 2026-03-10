"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { PROJECT_COINGECKO_IDS } from "@/lib/project-coingecko-ids";

type AdminProject = {
  id: string;
  name: string;
  tokenConfig?: {
    coingeckoId?: string;
    symbol?: string;
    contractAddress?: string;
    xUrl?: string;
  } | null;
};

type AdminTrendingToken = {
  id: number;
  projectId: string;
  coingeckoId: string;
  sortOrder: number;
  isActive: boolean;
};

type CoinGeckoMeta = { name: string; symbol: string };
const EXCLUDED_PROJECT_IDS = new Set(["abstract", "base", "ink", "polymarket", "moonwell"]);
const FALLBACK_TICKERS_BY_PROJECT: Record<string, string> = {
  bitcoin: "BTC",
  solana: "SOL",
  ethereum: "ETH",
  hyperliquid: "HYPE",
};

function toTitleCaseFromSlug(value: string): string {
  return value
    .replace(/[-_]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getFallbackTicker(projectId: string): string {
  const key = projectId.toLowerCase();
  if (FALLBACK_TICKERS_BY_PROJECT[key]) return FALLBACK_TICKERS_BY_PROJECT[key];
  const compact = key.replace(/[^a-z0-9]/g, "");
  return (compact.slice(0, 5) || "TOK").toUpperCase();
}

function formatProjectLabel(projectId: string, name?: string, symbol?: string): string {
  const cleanName = (name || "").trim();
  const displayName = cleanName.length > 0 ? cleanName : toTitleCaseFromSlug(projectId);
  const ticker = (symbol || "").trim().toUpperCase() || getFallbackTicker(projectId);
  return `${displayName} (${ticker})`;
}

export default function AdminTrendingTokensPage() {
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [tokens, setTokens] = useState<AdminTrendingToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [projectId, setProjectId] = useState("");
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [dragOverId, setDragOverId] = useState<number | null>(null);
  const [reordering, setReordering] = useState(false);
  const [coinGeckoMetaById, setCoinGeckoMetaById] = useState<Record<string, CoinGeckoMeta>>({});

  const availableProjects = useMemo(() => {
    const byId = new Map<string, AdminProject>();
    for (const [id, coingeckoIdRaw] of Object.entries(PROJECT_COINGECKO_IDS)) {
      const key = id.toLowerCase();
      if (EXCLUDED_PROJECT_IDS.has(key)) continue;
      const coingeckoId = String(coingeckoIdRaw || "").trim().toLowerCase();
      if (!coingeckoId) continue;
      if (!coinGeckoMetaById[coingeckoId]) continue;
      byId.set(key, { id: key, name: key, tokenConfig: { coingeckoId } });
    }
    for (const project of projects) {
      const key = project.id.toLowerCase();
      if (EXCLUDED_PROJECT_IDS.has(key)) continue;
      const coingeckoId = (project.tokenConfig?.coingeckoId?.trim().toLowerCase() || PROJECT_COINGECKO_IDS[key] || "").trim().toLowerCase();
      if (!coingeckoId) continue;
      if (!coinGeckoMetaById[coingeckoId] && !project.tokenConfig?.symbol) continue;
      byId.set(key, {
        id: key,
        name: project.name || key,
        tokenConfig: project.tokenConfig ?? null,
      });
    }
    return Array.from(byId.values()).sort((a, b) => a.name.localeCompare(b.name, "it"));
  }, [projects, coinGeckoMetaById]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [projectsRes, tokensRes] = await Promise.all([
        fetch("/api/admin/projects", { cache: "no-store" }),
        fetch("/api/admin/trending-tokens", { cache: "no-store" }),
      ]);

      if (projectsRes.ok) {
        const data = await projectsRes.json();
        const list = Array.isArray(data?.projects) ? data.projects : [];
        setProjects(
          list
            .map(
              (item: {
                id?: string;
                name?: string;
                tokenConfig?: AdminProject["tokenConfig"];
              }) => ({
                id: String(item.id ?? ""),
                name: String(item.name ?? item.id ?? ""),
                tokenConfig: item.tokenConfig ?? null,
              })
            )
            .filter((item: AdminProject) => item.id.length > 0)
        );
      }

      if (!tokensRes.ok) {
        setError("Impossibile caricare i token in tendenza.");
        return;
      }

      const tokensData = await tokensRes.json();
      const nextTokens = Array.isArray(tokensData?.tokens) ? tokensData.tokens : [];
      nextTokens.sort((a: AdminTrendingToken, b: AdminTrendingToken) => a.sortOrder - b.sortOrder || a.id - b.id);
      setTokens(nextTokens);
      const nextMeta =
        tokensData?.coinMetaById && typeof tokensData.coinMetaById === "object"
          ? (tokensData.coinMetaById as Record<string, CoinGeckoMeta>)
          : {};
      setCoinGeckoMetaById(nextMeta);
    } catch {
      setError("Errore di rete durante il caricamento.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (!projectId && availableProjects.length > 0) {
      setProjectId(availableProjects[0].id);
    }
  }, [availableProjects, projectId]);

  const handleAdd = async (event: FormEvent) => {
    event.preventDefault();
    if (!projectId) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/trending-tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || "Salvataggio non riuscito.");
        return;
      }
      await loadData();
    } catch {
      setError("Errore di rete durante il salvataggio.");
    } finally {
      setSaving(false);
    }
  };

  const handleRemove = async (id: number) => {
    setError(null);
    try {
      const res = await fetch(`/api/admin/trending-tokens/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || "Eliminazione non riuscita.");
        return;
      }
      setTokens((prev) => prev.filter((token) => token.id !== id));
    } catch {
      setError("Errore di rete durante l'eliminazione.");
    }
  };

  const moveToken = (fromId: number, toId: number) => {
    if (fromId === toId) return;
    setTokens((prev) => {
      const fromIndex = prev.findIndex((item) => item.id === fromId);
      const toIndex = prev.findIndex((item) => item.id === toId);
      if (fromIndex < 0 || toIndex < 0) return prev;
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next.map((item, idx) => ({ ...item, sortOrder: idx + 1 }));
    });
  };

  const persistOrder = async () => {
    if (tokens.length <= 1) return;
    setReordering(true);
    setError(null);
    try {
      const orderedIds = tokens.map((item) => item.id);
      const res = await fetch("/api/admin/trending-tokens", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || "Aggiornamento ordine non riuscito.");
        await loadData();
      }
    } catch {
      setError("Errore di rete durante l'aggiornamento ordine.");
      await loadData();
    } finally {
      setReordering(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Token in Tendenza</h1>
        <p className="text-slate-300 mt-2">
          Gestisci i token mostrati in homepage. I prezzi vengono aggiornati ogni minuto via CoinGecko.
        </p>
      </div>

      <div className="bg-indigo-900/25 rounded-xl border border-indigo-500/20 p-6 backdrop-blur">
        <h2 className="text-lg font-semibold text-white mb-4">Aggiungi token progetto</h2>
        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_280px] gap-4 items-end">
          <label className="block">
            <span className="text-sm text-slate-300 mb-1 block">Progetto</span>
            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="w-full rounded-lg border border-indigo-400/25 bg-slate-950/50 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
            >
              {availableProjects.map((project) => (
                (() => {
                  const cgId = (project.tokenConfig?.coingeckoId?.trim().toLowerCase() || PROJECT_COINGECKO_IDS[project.id.toLowerCase()] || "").trim().toLowerCase();
                  const cgMeta = cgId ? coinGeckoMetaById[cgId] : undefined;
                  const label = formatProjectLabel(
                    project.id,
                    cgMeta?.name || project.name,
                    project.tokenConfig?.symbol || cgMeta?.symbol
                  );
                  return (
                    <option key={project.id} value={project.id}>
                      {label}
                    </option>
                  );
                })()
              ))}
            </select>
          </label>
          <button
            type="submit"
            disabled={saving || !projectId}
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors disabled:opacity-60"
          >
            {saving ? "Salvataggio..." : "Aggiungi"}
          </button>
        </form>
      </div>

      <div className="bg-indigo-900/25 rounded-xl border border-indigo-500/20 p-6 backdrop-blur">
        <h2 className="text-lg font-semibold text-white mb-4">Token configurati</h2>
        {error ? <p className="text-sm text-red-300 mb-3">{error}</p> : null}
        {loading ? (
          <p className="text-slate-400">Caricamento token...</p>
        ) : tokens.length === 0 ? (
          <p className="text-slate-400">Nessun token configurato.</p>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-slate-400">Trascina le card per cambiare l&apos;ordine in homepage.</p>
              <button
                type="button"
                onClick={persistOrder}
                disabled={reordering}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border border-indigo-400/35 text-indigo-100 hover:bg-indigo-500/10 transition-colors disabled:opacity-60"
              >
                {reordering ? "Salvataggio ordine..." : "Salva ordine"}
              </button>
            </div>
            {tokens.map((token) => (
              <div
                key={token.id}
                draggable
                onDragStart={() => setDraggingId(token.id)}
                onDragOver={(event) => {
                  event.preventDefault();
                  setDragOverId(token.id);
                }}
                onDragLeave={() => setDragOverId((prev) => (prev === token.id ? null : prev))}
                onDrop={(event) => {
                  event.preventDefault();
                  if (draggingId && draggingId !== token.id) {
                    moveToken(draggingId, token.id);
                  }
                  setDraggingId(null);
                  setDragOverId(null);
                }}
                onDragEnd={() => {
                  setDraggingId(null);
                  setDragOverId(null);
                }}
                className={`rounded-xl border bg-slate-950/45 p-4 flex items-center justify-between gap-3 cursor-move ${
                  dragOverId === token.id ? "border-indigo-300/70" : "border-indigo-400/20"
                }`}
              >
                <div>
                  <p className="text-white font-medium">
                    {formatProjectLabel(
                      token.projectId,
                      coinGeckoMetaById[token.coingeckoId]?.name || toTitleCaseFromSlug(token.projectId),
                      coinGeckoMetaById[token.coingeckoId]?.symbol
                    )}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">Ordine: {token.sortOrder}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemove(token.id)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium border border-red-400/35 text-red-200 hover:bg-red-500/10 transition-colors"
                >
                  Rimuovi
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
