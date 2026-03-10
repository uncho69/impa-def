"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { PLATFORM_PROJECTS } from "@/lib/platform-projects";
import { NOTION_CATALOG_PROJECTS } from "@/lib/notion-catalog-projects";
import { MACRO_CATEGORIES, getProjectMacroCategory, type MacroCategoryId } from "@/lib/admin-project-categories";
import { getProjectLogo } from "@/lib/project-logos";

/** Tag disponibili per i progetti (come in Notion). */
export const AVAILABLE_TAGS = [
  "DeFi",
  "Prestiti Decentralizzati",
  "Criptovaluta",
  "Airdrop",
  "Exchange Decentr.",
  "Bridge Aggregator",
  "Protezione",
  "Unlocks Tracker",
  "Aggregatore di Dati",
  "Marketplace NFT",
  "NFT",
  "Social Media Decentralizzato",
  "Predizioni",
  "Web3 Game",
  "Metaverso",
  "Governance",
  "Multi-sig",
  "Banca Digitale Web3",
  "Grants",
  "Portfolio Tracker",
  "Bridge Explorer",
  "Carta Cripto",
  "DEX Aggregator",
  "Restaking (LST)",
  "Rendimento (Yield Farming)",
  "MEV Protection",
  "Community",
  "Smart Contract Deployer",
  "Notizie",
  "Analisi di Mercato",
  "DePIN",
  "Piattaforma per Creatori",
  "Opzioni",
  "Generative Art Generator",
  "Piattaforma Lancio NFT",
] as const;

interface Project {
  id: string;
  name: string;
  websiteUrl?: string | null;
  twitterUrl?: string | null;
  description?: string | null;
  category?: string | null;
  tags?: string[];
  tokenConfig?: {
    coingeckoId?: string;
    symbol?: string;
    contractAddress?: string;
    xUrl?: string;
  } | null;
  source?: "platform" | "catalog";
}

const EXCLUDED_PROJECT_IDS = new Set(["imparodefi"]);

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<MacroCategoryId>("all");
  const [addOpen, setAddOpen] = useState(false);

  /** Unisce sempre l'elenco Notion (133 progetti) a quello dall'API, così si vedono tutti. */
  function mergeWithNotionList(apiList: Project[]): Project[] {
    const byId = new Map<string, Project>();
    for (const p of apiList) {
      const key = p.id.toLowerCase();
      if (EXCLUDED_PROJECT_IDS.has(key)) continue;
      byId.set(key, p);
    }
    for (const p of NOTION_CATALOG_PROJECTS) {
      const key = p.id.toLowerCase();
      if (EXCLUDED_PROJECT_IDS.has(key)) continue;
      if (byId.has(key)) continue;
      byId.set(key, {
        id: p.id,
        name: p.name,
        websiteUrl: p.websiteUrl ?? null,
        twitterUrl: p.twitterUrl ?? null,
        description: p.description ?? null,
        category: p.category ?? null,
        tags: p.tags ?? [],
        source: "catalog",
      });
    }
    return Array.from(byId.values()).sort((a, b) => a.name.localeCompare(b.name, "it"));
  }

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/admin/projects", { cache: "no-store", credentials: "include" });
      const data = await res.json().catch(() => ({}));
      let list: Project[];
      if (res.ok && Array.isArray(data.projects)) {
        list = data.projects;
      } else {
        list = [...PLATFORM_PROJECTS].map((p) => ({ id: p.id, name: p.name, source: "platform" as const }));
      }
      setProjects(mergeWithNotionList(list));
      setError(null);
    } catch {
      const fallback = [...PLATFORM_PROJECTS].map((p) => ({ id: p.id, name: p.name, source: "platform" as const }));
      setProjects(mergeWithNotionList(fallback));
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    const q = search.trim().toLowerCase();
    const bySearch = q ? projects.filter((p) => p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q)) : projects;
    if (activeCategory === "all") return bySearch;
    if (activeCategory === "airdrops") {
      const hasAirdropTag = (p: Project) => p.tags && p.tags.includes("Airdrop");
      const defaultAirdropIds = new Set(["base", "ink", "hyperliquid", "getgrass", "layerzero", "scroll", "zksync", "linea", "blast", "berachain", "stargate", "jumper", "debridge", "orbiter", "ens", "gitcoin", "farcaster", "snapshot"]);
      return bySearch.filter(
        (p) =>
          getProjectMacroCategory(p.id) === "airdrops" ||
          hasAirdropTag(p) ||
          defaultAirdropIds.has(p.id.toLowerCase())
      );
    }
    return bySearch.filter((p) => getProjectMacroCategory(p.id) === activeCategory);
  }, [projects, search, activeCategory]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Gestisci progetti</h1>
          <p className="text-slate-300 mt-1">
            Aggiungi, rimuovi e modifica progetti (sito, Twitter, descrizione).
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/admin/dashboard" className="text-sm font-medium text-slate-300 hover:text-white">
            ← Dashboard
          </Link>
          <button
            type="button"
            onClick={() => setAddOpen(true)}
            className="px-3 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-500"
          >
            + Aggiungi progetto
          </button>
        </div>
      </div>

      <div className="bg-indigo-900/25 rounded-xl border border-indigo-500/20 p-4 backdrop-blur">
        <div className="relative mb-4">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
          <input
            type="search"
            placeholder="Cerca per nome o id..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-indigo-400/30 bg-white/10 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {MACRO_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                activeCategory === cat.id
                  ? "bg-indigo-600 text-white"
                  : "bg-white/10 text-slate-300 hover:bg-white/20"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-indigo-900/25 rounded-xl border border-indigo-500/20 overflow-hidden backdrop-blur">
        {loading ? (
          <div className="p-8 text-center text-slate-300">Caricamento...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-300">{error}</div>
        ) : filteredProjects.length === 0 ? (
          <div className="p-8 text-center text-slate-300">Nessun progetto trovato.</div>
        ) : (
          <ul className="divide-y divide-indigo-500/20">
            {filteredProjects.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-white/5">
                <Link
                  href={`/admin/projects/${encodeURIComponent(p.id)}`}
                  className="flex items-center gap-4 min-w-0 flex-1 text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                    {getProjectLogo(p.id) ? (
                      <Image src={getProjectLogo(p.id)!} alt="" width={40} height={40} className="object-contain w-10 h-10" />
                    ) : (
                      <span className="text-slate-300 font-semibold text-sm">{p.name.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-white truncate">{p.name}</p>
                    <p className="text-sm text-slate-400 truncate">
                      ID: {p.id}
                      {p.websiteUrl && " · Sito"}
                      {p.twitterUrl && " · X"}
                      {p.tokenConfig?.coingeckoId && " · Token"}
                      {p.source === "catalog" && " · Catalogo"}
                    </p>
                  </div>
                </Link>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/admin/projects/${encodeURIComponent(p.id)}`}
                    className="text-sm font-medium text-indigo-300 hover:text-white"
                  >
                    Modifica
                  </Link>
                  <Link
                    href={getProjectMacroCategory(p.id) === "defi" ? `/defi/${p.id}` : getProjectMacroCategory(p.id) === "portafogli" ? `/wallet/${p.id}` : getProjectMacroCategory(p.id) === "nft" ? `/nft/${p.id}` : `/blockchain/${p.id}`}
                    className="text-sm font-medium text-sky-300 hover:text-white"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Pagina
                  </Link>
                  {p.source === "catalog" && (
                    <button
                      type="button"
                      onClick={async (e) => {
                        e.stopPropagation();
                        if (!confirm("Rimuovere questo progetto dal catalogo?")) return;
                        const res = await fetch(`/api/admin/projects/${encodeURIComponent(p.id)}`, { method: "DELETE", credentials: "include" });
                        if (res.ok) await fetchProjects();
                      }}
                      className="text-sm font-medium text-red-300 hover:text-red-200"
                    >
                      Rimuovi
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {addOpen && (
        <AddModal
          onClose={() => setAddOpen(false)}
          onSaved={async () => {
            setAddOpen(false);
            await fetchProjects();
          }}
        />
      )}
    </div>
  );
}

function AddModal({ onClose, onSaved }: { onClose: () => void; onSaved: () => void }) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tokenCoingeckoId, setTokenCoingeckoId] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenContractAddress, setTokenContractAddress] = useState("");
  const [tokenXUrl, setTokenXUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [tagSelect, setTagSelect] = useState("");
  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) setTags((prev) => [...prev, tag]);
    setTagSelect("");
  };
  const removeTag = (tag: string) => setTags((prev) => prev.filter((t) => t !== tag));
  const availableToAdd = AVAILABLE_TAGS.filter((t) => !tags.includes(t));

  const handleSave = async () => {
    const slug = id.trim().toLowerCase().replace(/\s+/g, "-") || name.trim().toLowerCase().replace(/\s+/g, "-");
    if (!slug || !name.trim()) {
      alert("Inserisci almeno nome e id (o nome per generare id).");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          id: slug,
          name: name.trim(),
          websiteUrl: websiteUrl.trim() || undefined,
          twitterUrl: twitterUrl.trim() || undefined,
          description: description.trim() || undefined,
          category: category.trim() || undefined,
          tags: tags.length ? tags : undefined,
          tokenConfig:
            tokenCoingeckoId.trim() || tokenSymbol.trim() || tokenContractAddress.trim() || tokenXUrl.trim()
              ? {
                  coingeckoId: tokenCoingeckoId.trim() || undefined,
                  symbol: tokenSymbol.trim() || undefined,
                  contractAddress: tokenContractAddress.trim() || undefined,
                  xUrl: tokenXUrl.trim() || undefined,
                }
              : undefined,
        }),
      });
      if (res.ok) onSaved();
      else {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "Errore durante l’aggiunta.");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="bg-[#171f49] rounded-xl border border-indigo-500/25 max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 text-white" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-bold text-white mb-4">Aggiungi progetto</h2>
        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-200">ID (slug)</label>
          <input value={id} onChange={(e) => setId(e.target.value)} placeholder="es. coinbase" className="w-full px-3 py-2 border border-indigo-400/30 rounded-lg bg-white/10 text-white placeholder:text-slate-400" />
          <label className="block text-sm font-medium text-slate-200">Nome *</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="es. Coinbase" className="w-full px-3 py-2 border border-indigo-400/30 rounded-lg bg-white/10 text-white placeholder:text-slate-400" />
          <label className="block text-sm font-medium text-slate-200">Sito web</label>
          <input value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} placeholder="https://..." className="w-full px-3 py-2 border border-indigo-400/30 rounded-lg bg-white/10 text-white placeholder:text-slate-400" />
          <label className="block text-sm font-medium text-slate-200">Profilo X / Twitter</label>
          <input value={twitterUrl} onChange={(e) => setTwitterUrl(e.target.value)} placeholder="https://x.com/..." className="w-full px-3 py-2 border border-indigo-400/30 rounded-lg bg-white/10 text-white placeholder:text-slate-400" />
          <label className="block text-sm font-medium text-slate-200">Token CoinGecko ID (opzionale)</label>
          <input value={tokenCoingeckoId} onChange={(e) => setTokenCoingeckoId(e.target.value)} placeholder="es. ethereum" className="w-full px-3 py-2 border border-indigo-400/30 rounded-lg bg-white/10 text-white placeholder:text-slate-400" />
          <label className="block text-sm font-medium text-slate-200">Token ticker (opzionale)</label>
          <input value={tokenSymbol} onChange={(e) => setTokenSymbol(e.target.value)} placeholder="es. ETH" className="w-full px-3 py-2 border border-indigo-400/30 rounded-lg bg-white/10 text-white placeholder:text-slate-400" />
          <label className="block text-sm font-medium text-slate-200">Token contract (opzionale)</label>
          <input value={tokenContractAddress} onChange={(e) => setTokenContractAddress(e.target.value)} placeholder="0x... oppure mint Solana" className="w-full px-3 py-2 border border-indigo-400/30 rounded-lg bg-white/10 text-white placeholder:text-slate-400" />
          <label className="block text-sm font-medium text-slate-200">Token social X (opzionale)</label>
          <input value={tokenXUrl} onChange={(e) => setTokenXUrl(e.target.value)} placeholder="https://x.com/..." className="w-full px-3 py-2 border border-indigo-400/30 rounded-lg bg-white/10 text-white placeholder:text-slate-400" />
          <label className="block text-sm font-medium text-slate-200">Descrizione</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="w-full px-3 py-2 border border-indigo-400/30 rounded-lg bg-white/10 text-white placeholder:text-slate-400" />
          <label className="block text-sm font-medium text-slate-200">Categoria</label>
          <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="es. Compra/Vendi Cripto" className="w-full px-3 py-2 border border-indigo-400/30 rounded-lg bg-white/10 text-white placeholder:text-slate-400" />
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1">Tag</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm bg-indigo-500/30 text-indigo-100 border border-indigo-300/30">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="hover:text-white font-bold" aria-label={`Rimuovi ${tag}`}>×</button>
                </span>
              ))}
            </div>
            <select
              value={tagSelect}
              onChange={(e) => { const v = e.target.value; if (v) addTag(v); setTagSelect(""); }}
              className="px-3 py-2 border border-indigo-400/30 rounded-lg text-sm text-white bg-white/10"
            >
              <option value="">Aggiungi tag...</option>
              {availableToAdd.map((t) => <option key={t} value={t} className="text-slate-900">{t}</option>)}
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-white/20 text-slate-200 hover:bg-white/10">Annulla</button>
          <button type="button" onClick={handleSave} disabled={saving} className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-50">{saving ? "Salvataggio..." : "Aggiungi"}</button>
        </div>
      </div>
    </div>
  );
}
