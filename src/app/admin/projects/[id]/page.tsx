"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AVAILABLE_TAGS } from "@/app/admin/projects/page";
import { getProjectMacroCategory } from "@/lib/admin-project-categories";
import { NOTION_CATALOG_PROJECTS } from "@/lib/notion-catalog-projects";
import { getProjectPageData } from "@/lib/project-page-data";
import { getProjectLogo } from "@/lib/project-logos";

const ADMIN_TABS = [
  { id: "overview", label: "Overview" },
  { id: "come-usarlo", label: "Come usarlo" },
  { id: "contenuti", label: "Contenuti" },
  { id: "dati-rischi", label: "Dati & Rischi" },
  { id: "link-utili", label: "Link Utili" },
  { id: "notizie", label: "Notizie Rilevanti" },
] as const;

type AdminTabId = (typeof ADMIN_TABS)[number]["id"];

type ProjectDetail = {
  id: string;
  name: string;
  websiteUrl?: string | null;
  twitterUrl?: string | null;
  description?: string | null;
  category?: string | null;
  tags?: string[];
  source?: "platform" | "catalog";
  contentOverrides?: {
    overviewText?: string;
    appUrl?: string;
    guideUrl?: string;
    usefulLinks?: { label: string; href: string }[];
    featureCards?: { title: string; description: string; href?: string }[];
    howToSteps?: { title: string; description: string; href?: string }[];
    riskCards?: { title: string; description: string }[];
    contentItems?: {
      type: "video" | "article";
      title: string;
      href?: string;
      embedId?: string;
      source?: string;
      skillLevel?: string;
      tags?: string[];
    }[];
  } | null;
  tokenConfig?: {
    coingeckoId?: string;
    symbol?: string;
    contractAddress?: string;
    xUrl?: string;
  } | null;
};

type EditableLink = { label: string; href: string };
type EditableFeatureCard = {
  icon: "lightning" | "droplet" | "cap" | "warning" | "gift";
  title: string;
  description: string;
  href: string;
};
type EditableStep = { title: string; description: string; href: string };
type EditableRisk = { title: string; description: string };
type EditableContentItem = {
  type: "video" | "article";
  title: string;
  href: string;
  embedId?: string;
  source?: string;
  skillLevel?: string;
  tags?: string[];
};

type ContentDraft = {
  url: string;
  title: string;
  source: string;
  skillLevel: string;
};

function extractYoutubeId(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;
  const patterns = [
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{6,})/,
    /youtu\.be\/([a-zA-Z0-9_-]{6,})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{6,})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{6,})/,
  ];
  for (const regex of patterns) {
    const match = trimmed.match(regex);
    if (match?.[1]) return match[1];
  }
  return null;
}

function isXPostUrl(url: string): boolean {
  const u = url.toLowerCase();
  return (u.includes("x.com/") || u.includes("twitter.com/")) && u.includes("/status/");
}

function getProjectPageHref(projectId: string): string {
  const macro = getProjectMacroCategory(projectId);
  if (macro === "defi") return `/defi/${projectId}`;
  if (macro === "portafogli") return `/wallet/${projectId}`;
  if (macro === "nft") return `/nft/${projectId}`;
  if (macro === "blockchain") return `/blockchain/${projectId}`;
  if (macro === "compra-vendi-crypto") return "/compraevendicrypto";
  if (macro === "airdrops") return "/airdrops";
  if (macro === "memecoin") return "/memecoins";
  if (macro === "strumenti-utili") return "/strumentiutili";
  if (macro === "giochi-metaversi") return "/giochi";
  return `/blockchain/${projectId}`;
}

export default function AdminProjectEditorPage() {
  const params = useParams();
  const projectId = typeof params.id === "string" ? params.id.toLowerCase() : "";
  const baseData = useMemo(() => getProjectPageData(projectId), [projectId]);
  const publicHref = useMemo(() => getProjectPageHref(projectId), [projectId]);
  const logo = getProjectLogo(projectId);

  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<AdminTabId>("overview");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagSelect, setTagSelect] = useState("");
  const [tokenCoingeckoId, setTokenCoingeckoId] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenContractAddress, setTokenContractAddress] = useState("");
  const [tokenXUrl, setTokenXUrl] = useState("");

  const [overviewText, setOverviewText] = useState("");
  const [appUrl, setAppUrl] = useState("");
  const [guideUrl, setGuideUrl] = useState("");
  const [usefulLinks, setUsefulLinks] = useState<EditableLink[]>([]);
  const [featureCards, setFeatureCards] = useState<EditableFeatureCard[]>([]);
  const [howToSteps, setHowToSteps] = useState<EditableStep[]>([]);
  const [riskCards, setRiskCards] = useState<EditableRisk[]>([]);
  const [contentItems, setContentItems] = useState<EditableContentItem[]>([]);
  const [showContentModal, setShowContentModal] = useState(false);
  const [contentDraft, setContentDraft] = useState<ContentDraft>({
    url: "",
    title: "",
    source: "",
    skillLevel: "Beginner",
  });

  const availableToAdd = AVAILABLE_TAGS.filter((t) => !tags.includes(t));
  const resolvedOverview = overviewText.trim() || description.trim() || baseData?.description || "";
  const draftYoutubeId = extractYoutubeId(contentDraft.url);
  const draftIsXPost = isXPostUrl(contentDraft.url);

  const handleAddContentItem = () => {
    const rawUrl = contentDraft.url.trim();
    if (!rawUrl) return;
    const youtubeId = extractYoutubeId(rawUrl);
    const xPost = isXPostUrl(rawUrl);
    const type: "video" | "article" = youtubeId ? "video" : "article";
    const fallbackTitle = youtubeId ? "Video YouTube" : xPost ? "Post X" : "Contenuto";
    const next: EditableContentItem = {
      type,
      title: contentDraft.title.trim() || fallbackTitle,
      href: rawUrl,
      embedId: youtubeId ?? undefined,
      source: contentDraft.source.trim() || (youtubeId ? "YouTube" : xPost ? "X / Twitter" : undefined),
      skillLevel: contentDraft.skillLevel.trim() || undefined,
      tags: xPost ? ["Post X"] : youtubeId ? ["Video"] : undefined,
    };
    setContentItems((prev) => [next, ...prev]);
    setContentDraft({ url: "", title: "", source: "", skillLevel: "Beginner" });
    setShowContentModal(false);
  };

  useEffect(() => {
    if (!projectId) return;
    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/admin/projects/${encodeURIComponent(projectId)}`, {
          credentials: "include",
          cache: "no-store",
        });
        const json = await res.json().catch(() => ({}));
        let p: ProjectDetail | null = null;

        if (res.ok && json?.project) {
          p = json.project as ProjectDetail;
        } else {
          const [ecosystemRes, contentRes] = await Promise.all([
            fetch("/api/ecosystem-projects", { cache: "no-store" }).then((r) => (r.ok ? r.json() : null)).catch(() => null),
            fetch(`/api/projects/content/${encodeURIComponent(projectId)}`, { cache: "no-store" }).then((r) => (r.ok ? r.json() : null)).catch(() => null),
          ]);
          const fromEco = (
            ecosystemRes?.projects as
              | Array<{
                  id: string;
                  name: string;
                  websiteUrl?: string | null;
                  twitterUrl?: string | null;
                  description?: string | null;
                  category?: string | null;
                }>
              | undefined
          )?.find((item) => item.id.toLowerCase() === projectId);
          if (fromEco) {
            p = {
              id: fromEco.id,
              name: fromEco.name,
              websiteUrl: contentRes?.metadata?.websiteUrl ?? fromEco.websiteUrl ?? null,
              twitterUrl: contentRes?.metadata?.twitterUrl ?? fromEco.twitterUrl ?? null,
              description: contentRes?.metadata?.description ?? fromEco.description ?? baseData?.description ?? null,
              category: fromEco.category ?? null,
              tags: [],
              source: "platform",
              contentOverrides: contentRes?.contentOverrides ?? null,
            };
          }
        }

        if (!p) throw new Error(json.error || "Impossibile caricare il progetto");

        const notion = NOTION_CATALOG_PROJECTS.find((item) => item.id.toLowerCase() === projectId);
        const defaultName = baseData?.name ?? notion?.name ?? p.name ?? projectId;
        const defaultDescription = p.description || baseData?.description || notion?.description || "";
        const defaultWebsiteUrl = p.websiteUrl || notion?.websiteUrl || "";
        const defaultTwitterUrl = p.twitterUrl || notion?.twitterUrl || "";
        const defaultGuideUrl = p.contentOverrides?.guideUrl || baseData?.guideUrl || "";
        const defaultAppUrl = p.contentOverrides?.appUrl || baseData?.appUrl || "";

        const baseLinks = baseData?.usefulLinks ?? [];
        const defaultLinks = p.contentOverrides?.usefulLinks?.length ? p.contentOverrides.usefulLinks : baseLinks;
        const fallbackLinks: EditableLink[] =
          defaultLinks.length > 0
            ? defaultLinks.map((link) => ({ label: link.label, href: link.href }))
            : [
                { label: "Sito ufficiale", href: defaultWebsiteUrl },
                { label: "Twitter / X", href: defaultTwitterUrl },
              ].filter((link) => link.href.trim().length > 0);

        const defaultFeatureCards: EditableFeatureCard[] = (baseData?.featureCards ?? []).map((card, idx) => ({
          icon: card.icon,
          title: p?.contentOverrides?.featureCards?.[idx]?.title ?? card.title,
          description: p?.contentOverrides?.featureCards?.[idx]?.description ?? card.description,
          href: p?.contentOverrides?.featureCards?.[idx]?.href ?? card.href ?? "",
        }));
        const defaultHowToSteps: EditableStep[] = (baseData?.howToSteps ?? []).map((step, idx) => ({
          title: p?.contentOverrides?.howToSteps?.[idx]?.title ?? step.title,
          description: p?.contentOverrides?.howToSteps?.[idx]?.description ?? step.description,
          href: p?.contentOverrides?.howToSteps?.[idx]?.href ?? step.href ?? "",
        }));
        const defaultRiskCards: EditableRisk[] = (baseData?.riskCards ?? []).map((risk, idx) => ({
          title: p?.contentOverrides?.riskCards?.[idx]?.title ?? risk.title,
          description: p?.contentOverrides?.riskCards?.[idx]?.description ?? risk.description,
        }));
        const defaultContentItems: EditableContentItem[] = (
          p?.contentOverrides?.contentItems?.length ? p.contentOverrides.contentItems : baseData?.contentItems ?? []
        ).map((item) => ({
          type: item.type,
          title: item.title,
          href: item.href ?? (item.embedId ? `https://www.youtube.com/watch?v=${item.embedId}` : ""),
          embedId: item.embedId,
          source: item.source,
          skillLevel: item.skillLevel,
          tags: item.tags,
        }));

        setProject(p);
        setName(defaultName);
        setDescription(defaultDescription);
        setWebsiteUrl(defaultWebsiteUrl);
        setTwitterUrl(defaultTwitterUrl);
        setCategory(p.category || "");
        setTags(Array.isArray(p.tags) ? p.tags : []);
        setTokenCoingeckoId(p.tokenConfig?.coingeckoId || "");
        setTokenSymbol(p.tokenConfig?.symbol || "");
        setTokenContractAddress(p.tokenConfig?.contractAddress || "");
        setTokenXUrl(p.tokenConfig?.xUrl || "");
        setOverviewText(p.contentOverrides?.overviewText || defaultDescription || "");
        setAppUrl(defaultAppUrl);
        setGuideUrl(defaultGuideUrl);
        setUsefulLinks(fallbackLinks.length > 0 ? fallbackLinks : [{ label: "", href: "" }]);
        setFeatureCards(defaultFeatureCards);
        setHowToSteps(defaultHowToSteps);
        setRiskCards(defaultRiskCards);
        setContentItems(defaultContentItems);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Errore durante il caricamento");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [baseData, projectId]);

  const handleSave = async () => {
    if (!projectId) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const normalizedLinks = usefulLinks
        .map((link) => ({ label: link.label.trim(), href: link.href.trim() }))
        .filter((link) => link.label.length > 0 && link.href.length > 0);
      const normalizedFeatureCards = featureCards
        .map((card) => ({
          title: card.title.trim(),
          description: card.description.trim(),
          href: card.href.trim() || undefined,
        }))
        .filter((card) => card.title.length > 0 || card.description.length > 0);
      const normalizedHowToSteps = howToSteps
        .map((step) => ({
          title: step.title.trim(),
          description: step.description.trim(),
          href: step.href.trim() || undefined,
        }))
        .filter((step) => step.title.length > 0 || step.description.length > 0);
      const normalizedRiskCards = riskCards
        .map((risk) => ({
          title: risk.title.trim(),
          description: risk.description.trim(),
        }))
        .filter((risk) => risk.title.length > 0 || risk.description.length > 0);
      const normalizedContentItems = contentItems
        .map((item) => ({
          type: item.type,
          title: item.title.trim(),
          href: item.href.trim() || undefined,
          embedId: item.embedId?.trim() || undefined,
          source: item.source?.trim() || undefined,
          skillLevel: item.skillLevel?.trim() || undefined,
          tags: item.tags?.filter(Boolean),
        }))
        .filter((item) => item.title.length > 0);

      const contentOverrides =
        overviewText.trim() ||
        appUrl.trim() ||
        guideUrl.trim() ||
        normalizedLinks.length > 0 ||
        normalizedFeatureCards.length > 0 ||
        normalizedHowToSteps.length > 0 ||
        normalizedRiskCards.length > 0 ||
        normalizedContentItems.length > 0
          ? {
              overviewText: overviewText.trim() || undefined,
              appUrl: appUrl.trim() || undefined,
              guideUrl: guideUrl.trim() || undefined,
              usefulLinks: normalizedLinks.length > 0 ? normalizedLinks : undefined,
              featureCards: normalizedFeatureCards.length > 0 ? normalizedFeatureCards : undefined,
              howToSteps: normalizedHowToSteps.length > 0 ? normalizedHowToSteps : undefined,
              riskCards: normalizedRiskCards.length > 0 ? normalizedRiskCards : undefined,
              contentItems: normalizedContentItems.length > 0 ? normalizedContentItems : undefined,
            }
          : null;

      const res = await fetch(`/api/admin/projects/${encodeURIComponent(projectId)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: name.trim() || undefined,
          websiteUrl: websiteUrl.trim() || undefined,
          twitterUrl: twitterUrl.trim() || undefined,
          description: description.trim() || undefined,
          category: category.trim() || undefined,
          tags,
          tokenConfig:
            tokenCoingeckoId.trim() || tokenSymbol.trim() || tokenContractAddress.trim() || tokenXUrl.trim()
              ? {
                  coingeckoId: tokenCoingeckoId.trim() || undefined,
                  symbol: tokenSymbol.trim() || undefined,
                  contractAddress: tokenContractAddress.trim() || undefined,
                  xUrl: tokenXUrl.trim() || undefined,
                }
              : null,
          contentOverrides,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Errore durante il salvataggio");
      setSuccess("Salvato correttamente.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Errore durante il salvataggio");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-gray-600">Caricamento editor progetto...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <Link href="/admin/projects" className="text-sm text-indigo-300 hover:text-indigo-200">
            ← Torna ai progetti
          </Link>
          <h1 className="text-2xl font-bold text-white mt-1">Editor progetto: {project?.name || projectId}</h1>
          <p className="text-indigo-100/80 text-sm mt-1">Interfaccia allineata alla pagina utente con sezioni editabili inline.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={publicHref}
            target="_blank"
            className="px-3 py-2 rounded-lg border border-indigo-300/30 bg-indigo-500/10 text-indigo-100 hover:bg-indigo-500/20 text-sm font-medium"
          >
            Apri pagina pubblica
          </Link>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-400 disabled:opacity-50 text-sm font-medium"
          >
            {saving ? "Salvataggio..." : "Salva modifiche"}
          </button>
        </div>
      </div>

      {error && <div className="rounded-lg border border-red-400/40 bg-red-500/10 text-red-100 px-4 py-3">{error}</div>}
      {success && <div className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 text-emerald-100 px-4 py-3">{success}</div>}

      <div className="rounded-2xl border border-indigo-500/30 bg-[#171f49] text-white overflow-hidden">
        <div className="p-6 md:p-8 border-b border-indigo-500/20">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex items-start gap-4 w-full">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden bg-indigo-950/60 border border-white/10 shrink-0 flex items-center justify-center">
                {logo ? (
                  <Image src={logo} alt={name || projectId} width={64} height={64} className="object-contain" />
                ) : (
                  <span className="font-bold text-lg">{(name || projectId).charAt(0).toUpperCase()}</span>
                )}
              </div>
              <div className="w-full space-y-3">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full md:max-w-xl px-3 py-2 rounded-xl border border-white/15 bg-white/10 text-white placeholder:text-indigo-100/60"
                  placeholder="Nome progetto"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:max-w-xl">
                  <input
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-white/15 bg-white/10 text-white placeholder:text-indigo-100/60 text-sm"
                    placeholder="Sito ufficiale"
                  />
                  <input
                    value={twitterUrl}
                    onChange={(e) => setTwitterUrl(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-white/15 bg-white/10 text-white placeholder:text-indigo-100/60 text-sm"
                    placeholder="Twitter / X"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:max-w-xl">
                  <input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-white/15 bg-white/10 text-white placeholder:text-indigo-100/60 text-sm"
                    placeholder="Categoria"
                  />
                  <select
                    value={tagSelect}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (v && !tags.includes(v)) setTags((prev) => [...prev, v]);
                      setTagSelect("");
                    }}
                    className="px-3 py-2 rounded-lg border border-white/15 bg-white/10 text-white text-sm"
                  >
                    <option value="">Aggiungi tag...</option>
                    {availableToAdd.map((t) => (
                      <option key={t} value={t} className="text-slate-900">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:max-w-xl">
                  <input
                    value={tokenCoingeckoId}
                    onChange={(e) => setTokenCoingeckoId(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-white/15 bg-white/10 text-white placeholder:text-indigo-100/60 text-sm"
                    placeholder="Token CoinGecko ID (es. ethereum)"
                  />
                  <input
                    value={tokenSymbol}
                    onChange={(e) => setTokenSymbol(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-white/15 bg-white/10 text-white placeholder:text-indigo-100/60 text-sm"
                    placeholder="Token ticker (es. ETH)"
                  />
                  <input
                    value={tokenContractAddress}
                    onChange={(e) => setTokenContractAddress(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-white/15 bg-white/10 text-white placeholder:text-indigo-100/60 text-sm"
                    placeholder="Token contract (0x... / mint)"
                  />
                  <input
                    value={tokenXUrl}
                    onChange={(e) => setTokenXUrl(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-white/15 bg-white/10 text-white placeholder:text-indigo-100/60 text-sm"
                    placeholder="Token X URL"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-white/10 border border-white/10">
                      {tag}
                      <button type="button" onClick={() => setTags((prev) => prev.filter((t) => t !== tag))} className="hover:text-red-300">
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-slate-900/30 border border-white/10 rounded-xl p-4 min-w-[210px]">
              <p className="text-xs text-indigo-100/70 mb-1">Modalita editor</p>
              <p className="text-sm font-semibold">Stessa struttura della pagina utente</p>
              <p className="text-xs text-indigo-100/70 mt-2">Modifica testi e link direttamente nei blocchi.</p>
            </div>
          </div>

          <div className="space-y-2 mt-5">
            {usefulLinks.map((link, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-[220px_1fr_auto] gap-2">
                <input
                  value={link.label}
                  onChange={(e) =>
                    setUsefulLinks((prev) => prev.map((item, i) => (i === index ? { ...item, label: e.target.value } : item)))
                  }
                  className="px-3 py-2 rounded-lg border border-white/15 bg-white/10 text-white placeholder:text-indigo-100/60 text-sm"
                  placeholder="Label link"
                />
                <input
                  value={link.href}
                  onChange={(e) =>
                    setUsefulLinks((prev) => prev.map((item, i) => (i === index ? { ...item, href: e.target.value } : item)))
                  }
                  className="px-3 py-2 rounded-lg border border-white/15 bg-white/10 text-white placeholder:text-indigo-100/60 text-sm"
                  placeholder="https://..."
                />
                <button
                  type="button"
                  onClick={() => setUsefulLinks((prev) => prev.filter((_, i) => i !== index))}
                  className="px-3 py-2 rounded-lg border border-red-300/30 text-red-100 hover:bg-red-500/20 text-sm"
                >
                  Rimuovi
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setUsefulLinks((prev) => [...prev, { label: "", href: "" }])}
              className="px-3 py-2 rounded-lg border border-indigo-300/30 text-indigo-100 hover:bg-indigo-500/20 text-sm"
            >
              + Aggiungi link utile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
            <input
              value={appUrl}
              onChange={(e) => setAppUrl(e.target.value)}
              className="px-3 py-2 rounded-lg border border-white/15 bg-white/10 text-white placeholder:text-indigo-100/60 text-sm"
              placeholder='URL pulsante "Apri progetto"'
            />
            <input
              value={guideUrl}
              onChange={(e) => setGuideUrl(e.target.value)}
              className="px-3 py-2 rounded-lg border border-white/15 bg-white/10 text-white placeholder:text-indigo-100/60 text-sm"
              placeholder='URL pulsante "Guida Rapida"'
            />
          </div>
        </div>

        <div className="p-6 md:p-8 border-b border-indigo-500/20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {featureCards.map((card, index) => (
              <div key={index} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-[10px] uppercase tracking-wide text-indigo-100/70 mb-2">Feature {index + 1}</p>
                <input
                  value={card.title}
                  onChange={(e) => setFeatureCards((prev) => prev.map((item, i) => (i === index ? { ...item, title: e.target.value } : item)))}
                  className="w-full px-2.5 py-2 rounded-lg border border-white/15 bg-white/10 text-white text-sm"
                />
                <textarea
                  value={card.description}
                  onChange={(e) =>
                    setFeatureCards((prev) => prev.map((item, i) => (i === index ? { ...item, description: e.target.value } : item)))
                  }
                  rows={3}
                  className="w-full px-2.5 py-2 rounded-lg border border-white/15 bg-white/10 text-white text-xs mt-2"
                />
                <input
                  value={card.href}
                  onChange={(e) => setFeatureCards((prev) => prev.map((item, i) => (i === index ? { ...item, href: e.target.value } : item)))}
                  className="w-full px-2.5 py-2 rounded-lg border border-white/15 bg-white/10 text-white text-xs mt-2"
                  placeholder="Link approfondimento (opzionale)"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="border-b border-indigo-500/20 px-6 md:px-8">
          <nav className="flex flex-wrap gap-1 -mb-px">
            {ADMIN_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id ? "border-indigo-300 text-indigo-100" : "border-transparent text-indigo-100/70 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6 md:p-8">
          {activeTab === "overview" && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold">Overview</h2>
              <textarea
                value={overviewText}
                onChange={(e) => setOverviewText(e.target.value)}
                rows={6}
                className="w-full px-3 py-2 rounded-xl border border-white/15 bg-white/10 text-white placeholder:text-indigo-100/60"
                placeholder="Testo principale dell'overview"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 rounded-xl border border-white/15 bg-white/10 text-white placeholder:text-indigo-100/60 text-sm"
                placeholder="Descrizione base del progetto"
              />
              <p className="text-sm text-indigo-100/80">Anteprima testo: {resolvedOverview || "Nessuna descrizione."}</p>
            </div>
          )}

          {activeTab === "come-usarlo" && (
            <div>
              <h2 className="text-lg font-bold mb-4">Come usarlo</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {howToSteps.map((step, index) => (
                  <div key={index} className="rounded-xl border border-white/10 p-4 bg-white/5 space-y-2">
                    <div className="text-indigo-100/70 text-xs">Step {(index + 1).toString().padStart(2, "0")}</div>
                    <input
                      value={step.title}
                      onChange={(e) => setHowToSteps((prev) => prev.map((item, i) => (i === index ? { ...item, title: e.target.value } : item)))}
                      className="w-full px-2.5 py-2 rounded-lg border border-white/15 bg-white/10 text-white text-sm"
                    />
                    <textarea
                      value={step.description}
                      onChange={(e) =>
                        setHowToSteps((prev) => prev.map((item, i) => (i === index ? { ...item, description: e.target.value } : item)))
                      }
                      rows={3}
                      className="w-full px-2.5 py-2 rounded-lg border border-white/15 bg-white/10 text-white text-xs"
                    />
                    <input
                      value={step.href}
                      onChange={(e) => setHowToSteps((prev) => prev.map((item, i) => (i === index ? { ...item, href: e.target.value } : item)))}
                      placeholder="Link approfondimento"
                      className="w-full px-2.5 py-2 rounded-lg border border-white/15 bg-white/10 text-white text-xs"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "contenuti" && (
            <div>
              <h2 className="text-lg font-bold mb-4">Contenuti</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setShowContentModal(true)}
                  className="aspect-video rounded-xl border-2 border-dashed border-indigo-300/40 bg-white/5 hover:bg-white/10 transition-colors flex flex-col items-center justify-center"
                >
                  <span className="text-4xl leading-none text-indigo-100">+</span>
                  <span className="text-sm text-indigo-100/90 mt-2">Aggiungi contenuto (YouTube o X)</span>
                </button>

                {contentItems.map((item, index) => (
                  <div key={`${item.href}-${index}`} className="rounded-xl border border-white/10 overflow-hidden bg-white/5">
                    <div className="aspect-video bg-slate-900/40 border-b border-white/10 flex items-center justify-center">
                      {item.embedId ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${item.embedId}`}
                          title={item.title}
                          className="w-full h-full"
                          allowFullScreen
                        />
                      ) : (
                        <div className="text-center px-4">
                          <p className="text-xs text-indigo-100/80 mb-1">Anteprima link</p>
                          <p className="text-sm font-medium text-white line-clamp-2">{item.title}</p>
                          <p className="text-xs text-indigo-100/70 mt-1">Post X / Articolo esterno</p>
                        </div>
                      )}
                    </div>
                    <div className="p-3 space-y-2">
                      <input
                        value={item.title}
                        onChange={(e) =>
                          setContentItems((prev) => prev.map((it, i) => (i === index ? { ...it, title: e.target.value } : it)))
                        }
                        className="w-full px-2.5 py-2 rounded-lg border border-white/15 bg-white/10 text-white text-sm"
                      />
                      <input
                        value={item.href}
                        onChange={(e) =>
                          setContentItems((prev) =>
                            prev.map((it, i) => {
                              if (i !== index) return it;
                              const nextHref = e.target.value;
                              const nextEmbedId = extractYoutubeId(nextHref) ?? undefined;
                              return {
                                ...it,
                                href: nextHref,
                                embedId: nextEmbedId,
                                type: nextEmbedId ? "video" : "article",
                              };
                            })
                          )
                        }
                        className="w-full px-2.5 py-2 rounded-lg border border-white/15 bg-white/10 text-white text-xs"
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-indigo-100/70">{item.type === "video" ? "YouTube Video" : "Post X / Articolo"}</span>
                        <button
                          type="button"
                          onClick={() => setContentItems((prev) => prev.filter((_, i) => i !== index))}
                          className="text-xs px-2 py-1 rounded-md border border-red-300/40 text-red-100 hover:bg-red-500/20"
                        >
                          Rimuovi
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "dati-rischi" && (
            <div>
              <h2 className="text-lg font-bold mb-4">Rischi & Dati</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {riskCards.map((risk, index) => (
                  <div key={index} className="rounded-xl border border-amber-300/30 p-4 bg-amber-500/10 space-y-2">
                    <input
                      value={risk.title}
                      onChange={(e) => setRiskCards((prev) => prev.map((item, i) => (i === index ? { ...item, title: e.target.value } : item)))}
                      className="w-full px-2.5 py-2 rounded-lg border border-white/15 bg-white/10 text-white text-sm"
                    />
                    <textarea
                      value={risk.description}
                      onChange={(e) =>
                        setRiskCards((prev) => prev.map((item, i) => (i === index ? { ...item, description: e.target.value } : item)))
                      }
                      rows={3}
                      className="w-full px-2.5 py-2 rounded-lg border border-white/15 bg-white/10 text-white text-xs"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "link-utili" && (
            <div className="space-y-2">
              <h2 className="text-lg font-bold mb-2">Link Utili</h2>
              {usefulLinks.map((link, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-2">
                  <input
                    value={link.label}
                    onChange={(e) =>
                      setUsefulLinks((prev) => prev.map((item, i) => (i === index ? { ...item, label: e.target.value } : item)))
                    }
                    className="px-3 py-2 rounded-lg border border-white/15 bg-white/10 text-white text-sm"
                  />
                  <input
                    value={link.href}
                    onChange={(e) =>
                      setUsefulLinks((prev) => prev.map((item, i) => (i === index ? { ...item, href: e.target.value } : item)))
                    }
                    className="px-3 py-2 rounded-lg border border-white/15 bg-white/10 text-white text-sm"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === "notizie" && (
            <div>
              <h2 className="text-lg font-bold mb-2">Notizie Rilevanti</h2>
              <p className="text-sm text-indigo-100/80">Le notizie sono collegate automaticamente alla pagina utente.</p>
            </div>
          )}
        </div>
      </div>

      {showContentModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl rounded-2xl border border-indigo-400/30 bg-[#171f49] text-white p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Nuovo contenuto</h3>
              <button
                type="button"
                onClick={() => setShowContentModal(false)}
                className="text-sm px-2 py-1 rounded-md border border-white/20 hover:bg-white/10"
              >
                Chiudi
              </button>
            </div>

            <input
              value={contentDraft.url}
              onChange={(e) => setContentDraft((prev) => ({ ...prev, url: e.target.value }))}
              placeholder="Incolla URL YouTube o post X"
              className="w-full px-3 py-2 rounded-lg border border-white/15 bg-white/10 text-white placeholder:text-indigo-100/60"
            />
            <input
              value={contentDraft.title}
              onChange={(e) => setContentDraft((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Titolo (opzionale, auto se vuoto)"
              className="w-full px-3 py-2 rounded-lg border border-white/15 bg-white/10 text-white placeholder:text-indigo-100/60"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <input
                value={contentDraft.source}
                onChange={(e) => setContentDraft((prev) => ({ ...prev, source: e.target.value }))}
                placeholder="Fonte (opzionale)"
                className="px-3 py-2 rounded-lg border border-white/15 bg-white/10 text-white placeholder:text-indigo-100/60 text-sm"
              />
              <select
                value={contentDraft.skillLevel}
                onChange={(e) => setContentDraft((prev) => ({ ...prev, skillLevel: e.target.value }))}
                className="px-3 py-2 rounded-lg border border-white/15 bg-white/10 text-white text-sm"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="text-xs text-indigo-100/70 mb-2">Anteprima</p>
              {draftYoutubeId ? (
                <div className="space-y-2">
                  <div className="aspect-video rounded-lg overflow-hidden bg-slate-900">
                    <iframe
                      src={`https://www.youtube.com/embed/${draftYoutubeId}`}
                      className="w-full h-full"
                      title="Anteprima YouTube"
                      allowFullScreen
                    />
                  </div>
                  <p className="text-sm text-white">{contentDraft.title.trim() || "Video YouTube"}</p>
                </div>
              ) : draftIsXPost ? (
                <div className="rounded-lg border border-white/10 bg-slate-900/30 p-3">
                  <p className="text-sm text-white">{contentDraft.title.trim() || "Post X"}</p>
                  <p className="text-xs text-indigo-100/70 mt-1 break-all">{contentDraft.url.trim()}</p>
                </div>
              ) : (
                <p className="text-sm text-indigo-100/80">Inserisci un link YouTube o un link `x.com/.../status/...` per vedere l'anteprima.</p>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowContentModal(false)}
                className="px-3 py-2 rounded-lg border border-white/20 hover:bg-white/10 text-sm"
              >
                Annulla
              </button>
              <button
                type="button"
                onClick={handleAddContentItem}
                disabled={!contentDraft.url.trim()}
                className="px-3 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 text-sm"
              >
                Aggiungi contenuto
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
