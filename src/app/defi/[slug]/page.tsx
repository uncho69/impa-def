"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { ProjectPageTemplate } from "@/components/ProjectPageTemplate";
import { getProjectPageData } from "@/lib/project-page-data";
import { getProjectLogo } from "@/lib/project-logos";
import type { ProjectPageData } from "@/lib/project-page-data";
import { useLanguage } from "@/contexts/LanguageContext";
import placeholder from "@/assets/placeholder.svg";

const IT_TO_EN_TEXT: Record<string, string> = {
  "Pagina progetto": "Project page",
  "Sito ufficiale": "Official website",
  "Guida Rapida": "Quick Guide",
  "Apri dettagli": "Open details",
  "Come usarlo": "How to use it",
  "Contenuti": "Content",
  "Dati & Rischi": "Data & Risk",
  "Link Utili": "Useful Links",
  "Notizie Rilevanti": "Relevant News",
  "Rischi & Dati": "Risk & Data",
  "Approfondisci": "Learn more",
  Verificato: "Verified",
  Guarda: "Watch",
  Leggi: "Read",
  Chiudi: "Close",
  "Apri contenuto": "Open content",
  "Checklist pre-esecuzione": "Pre-execution checklist",
  "Errori comuni da evitare": "Common mistakes to avoid",
  "Procedura consigliata": "Recommended procedure",
  "KPI di controllo": "Control KPIs",
  "Seleziona un progetto dalla categoria": "Select a project from this category",
  "Cerca progetto...": "Search project...",
  "Ordina:": "Sort:",
  Nessuno: "None",
  "Caricamento progetti...": "Loading projects...",
  "Nessun progetto trovato in questa categoria.": "No projects found in this category.",
  "Apri la pagina progetto per dettagli, link utili e contenuti.": "Open the project page for details, useful links, and content.",
  Prezzo: "Price",
  Portafogli: "Wallets",
  Applicazioni: "Apps",
  Rendimenti: "Yield",
  Prestiti: "Lending",
  Collezione: "Collection",
  Tutti: "All",
  Analisi: "Analysis",
  "Questo contenuto non ha embed interno. Aprilo nel link originale.": "This content has no internal embed. Open it from the original link.",
};

function translateString(value: string): string {
  let translated = value;
  Object.entries(IT_TO_EN_TEXT).forEach(([it, en]) => {
    translated = translated.split(it).join(en);
  });
  return translated;
}

function translateDataToEnglish<T>(value: T): T {
  if (typeof value === "string") {
    return translateString(value) as T;
  }
  if (Array.isArray(value)) {
    return value.map((item) => translateDataToEnglish(item)) as T;
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    Object.entries(value as Record<string, unknown>).forEach(([key, val]) => {
      out[key] = translateDataToEnglish(val);
    });
    return out as T;
  }
  return value;
}

export default function DefiProjectPage() {
  const { language } = useLanguage();
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const base = getProjectPageData(slug);
  if (!base) notFound();
  const logo = getProjectLogo(slug) ?? placeholder;
  const localizedBase = language === "en" ? translateDataToEnglish(base) : base;
  const data: ProjectPageData = { ...localizedBase, logo };
  return <ProjectPageTemplate data={data} />;
}
