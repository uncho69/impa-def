import { PROJECT_COINGECKO_IDS } from "@/lib/project-coingecko-ids";

type FallbackTrendingToken = {
  id: number;
  projectId: string;
  coingeckoId: string;
  sortOrder: number;
  isActive: boolean;
  updatedAt: string | null;
};

const FALLBACK_PROJECTS = ["bitcoin", "solana", "ethereum"];

declare global {
  // eslint-disable-next-line no-var
  var __idfTrendingTokensFallbackStore: FallbackTrendingToken[] | undefined;
  // eslint-disable-next-line no-var
  var __idfTrendingTokensFallbackSeq: number | undefined;
  // eslint-disable-next-line no-var
  var __idfTrendingTokensFallbackDirty: boolean | undefined;
}

function normalizeStoreOrder(tokens: FallbackTrendingToken[]): FallbackTrendingToken[] {
  return [...tokens]
    .sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id)
    .map((item, idx) => ({ ...item, sortOrder: idx + 1 }));
}

function ensureStore(): FallbackTrendingToken[] {
  if (!globalThis.__idfTrendingTokensFallbackStore) {
    const seeded = FALLBACK_PROJECTS.map((projectId, idx) => {
      const coingeckoId = PROJECT_COINGECKO_IDS[projectId];
      if (!coingeckoId) return null;
      return {
        id: idx + 1,
        projectId,
        coingeckoId,
        sortOrder: idx + 1,
        isActive: true,
        updatedAt: null,
      } satisfies FallbackTrendingToken;
    }).filter((item): item is FallbackTrendingToken => Boolean(item));
    globalThis.__idfTrendingTokensFallbackStore = seeded;
    globalThis.__idfTrendingTokensFallbackSeq = seeded.reduce((max, item) => Math.max(max, item.id), 0);
    globalThis.__idfTrendingTokensFallbackDirty = false;
  }
  return globalThis.__idfTrendingTokensFallbackStore;
}

export function listNoDbTrendingTokens(): FallbackTrendingToken[] {
  const store = ensureStore();
  return normalizeStoreOrder(store);
}

export function isNoDbTrendingStoreDirty(): boolean {
  ensureStore();
  return Boolean(globalThis.__idfTrendingTokensFallbackDirty);
}

export function hydrateNoDbTrendingTokensFromRemote(
  remoteTokens: Array<{ projectId: string; coingeckoId: string }>
): FallbackTrendingToken[] {
  const store = ensureStore();
  if (isNoDbTrendingStoreDirty()) return [...store];
  if (!Array.isArray(remoteTokens) || remoteTokens.length === 0) return [...store];

  const normalized = remoteTokens
    .map((item, idx) => {
      const projectId = String(item.projectId || "").trim().toLowerCase();
      const coingeckoId = String(item.coingeckoId || "").trim().toLowerCase();
      if (!projectId || !coingeckoId) return null;
      return {
        id: idx + 1,
        projectId,
        coingeckoId,
        sortOrder: idx + 1,
        isActive: true,
        updatedAt: null,
      } satisfies FallbackTrendingToken;
    })
    .filter((item): item is FallbackTrendingToken => Boolean(item));

  if (normalized.length === 0) return [...store];
  globalThis.__idfTrendingTokensFallbackStore = normalizeStoreOrder(normalized);
  globalThis.__idfTrendingTokensFallbackSeq = normalized.reduce((max, item) => Math.max(max, item.id), 0);
  globalThis.__idfTrendingTokensFallbackDirty = false;
  return [...globalThis.__idfTrendingTokensFallbackStore];
}

export function replaceNoDbTrendingTokensFromRemote(
  remoteTokens: Array<{ projectId: string; coingeckoId: string }>
): FallbackTrendingToken[] {
  ensureStore();
  if (!Array.isArray(remoteTokens) || remoteTokens.length === 0) {
    return listNoDbTrendingTokens();
  }

  const normalized = remoteTokens
    .map((item, idx) => {
      const projectId = String(item.projectId || "").trim().toLowerCase();
      const coingeckoId = String(item.coingeckoId || "").trim().toLowerCase();
      if (!projectId || !coingeckoId) return null;
      return {
        id: idx + 1,
        projectId,
        coingeckoId,
        sortOrder: idx + 1,
        isActive: true,
        updatedAt: null,
      } satisfies FallbackTrendingToken;
    })
    .filter((item): item is FallbackTrendingToken => Boolean(item));

  if (normalized.length === 0) return listNoDbTrendingTokens();
  globalThis.__idfTrendingTokensFallbackStore = normalizeStoreOrder(normalized);
  globalThis.__idfTrendingTokensFallbackSeq = normalized.reduce((max, item) => Math.max(max, item.id), 0);
  globalThis.__idfTrendingTokensFallbackDirty = false;
  return [...globalThis.__idfTrendingTokensFallbackStore];
}

export function upsertNoDbTrendingToken(projectId: string, coingeckoId: string, sortOrder = 100): FallbackTrendingToken[] {
  const normalizedProjectId = projectId.trim().toLowerCase();
  const normalizedCgId = coingeckoId.trim().toLowerCase();
  const store = ensureStore();
  const now = new Date().toISOString();

  const existingIndex = store.findIndex(
    (item) => item.projectId === normalizedProjectId || item.coingeckoId === normalizedCgId
  );

  if (existingIndex >= 0) {
    store[existingIndex] = {
      ...store[existingIndex],
      projectId: normalizedProjectId,
      coingeckoId: normalizedCgId,
      sortOrder: Number.isFinite(sortOrder) ? Number(sortOrder) : store[existingIndex].sortOrder,
      isActive: true,
      updatedAt: now,
    };
  } else {
    const nextId = (globalThis.__idfTrendingTokensFallbackSeq ?? 0) + 1;
    globalThis.__idfTrendingTokensFallbackSeq = nextId;
    store.push({
      id: nextId,
      projectId: normalizedProjectId,
      coingeckoId: normalizedCgId,
      sortOrder: Number.isFinite(sortOrder) ? Number(sortOrder) : store.length + 1,
      isActive: true,
      updatedAt: now,
    });
  }

  globalThis.__idfTrendingTokensFallbackStore = normalizeStoreOrder(store);
  globalThis.__idfTrendingTokensFallbackDirty = true;
  return [...globalThis.__idfTrendingTokensFallbackStore];
}

export function reorderNoDbTrendingTokens(orderedIds: number[]): FallbackTrendingToken[] {
  const store = ensureStore();
  const rank = new Map<number, number>();
  orderedIds.forEach((id, idx) => rank.set(id, idx + 1));

  const reordered = [...store].sort((a, b) => {
    const rankA = rank.get(a.id);
    const rankB = rank.get(b.id);
    if (rankA != null && rankB != null) return rankA - rankB;
    if (rankA != null) return -1;
    if (rankB != null) return 1;
    return a.sortOrder - b.sortOrder || a.id - b.id;
  });

  globalThis.__idfTrendingTokensFallbackStore = normalizeStoreOrder(reordered);
  globalThis.__idfTrendingTokensFallbackDirty = true;
  return [...globalThis.__idfTrendingTokensFallbackStore];
}

export function deleteNoDbTrendingToken(id: number): FallbackTrendingToken[] {
  const store = ensureStore();
  globalThis.__idfTrendingTokensFallbackStore = normalizeStoreOrder(store.filter((item) => item.id !== id));
  globalThis.__idfTrendingTokensFallbackDirty = true;
  return [...globalThis.__idfTrendingTokensFallbackStore];
}
