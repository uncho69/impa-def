"use client";

import { useMemo, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import axieLogo from "@/assets/axie-logo.png";
import sandboxLogo from "@/assets/sandbox-logo.jpg";
import decentralandLogo from "@/assets/decentraland-logo.jpg";
import { IntroduzioneGiochiModal } from "@/components/IntroduzioneGiochiModal";
import { BookmarkButton } from "@/components/bookmarks/BookmarkButton";
import { useLanguage } from "@/contexts/LanguageContext";

type GameItem = {
  title: string;
  icon: StaticImageData;
  description: string;
  descriptionEn: string;
  genre: "metaverse" | "strategy";
  website: string;
  xProfile: string;
  href: string;
};

const FILTERS = [
  { id: "all", label: "Tutti" },
  { id: "metaverse", label: "Metaverse" },
  { id: "strategy", label: "Strategy" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

const GAMES: GameItem[] = [
  {
    title: "Axie Infinity",
    icon: axieLogo,
    description: "Pioniere del modello play-to-earn con economia basata su asset digitali.",
    descriptionEn: "Pioneer of the play-to-earn model with a digital asset-driven economy.",
    genre: "strategy",
    website: "https://axieinfinity.com/",
    xProfile: "https://x.com/AxieInfinity",
    href: "/giochi/axie-infinity",
  },
  {
    title: "The Sandbox",
    icon: sandboxLogo,
    description: "Mondo virtuale dove utenti creano, possiedono e monetizzano esperienze di gioco.",
    descriptionEn: "Virtual world where users create, own, and monetize gaming experiences.",
    genre: "metaverse",
    website: "https://www.sandbox.game/",
    xProfile: "https://x.com/TheSandboxGame",
    href: "/giochi/the-sandbox",
  },
  {
    title: "Decentraland",
    icon: decentralandLogo,
    description: "Metaverso decentralizzato con proprieta digitali, eventi e contenuti social.",
    descriptionEn: "Decentralized metaverse with digital ownership, events, and social content.",
    genre: "metaverse",
    website: "https://decentraland.org/",
    xProfile: "https://x.com/decentraland",
    href: "/giochi/decentraland",
  },
];

export default function GiochiPage() {
  const { language } = useLanguage();
  const isEnglish = language === "en";
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [introOpen, setIntroOpen] = useState(false);
  const filters = isEnglish
    ? [
        { id: "all", label: "All" },
        { id: "metaverse", label: "Metaverse" },
        { id: "strategy", label: "Strategy" },
      ]
    : FILTERS;
  const games = useMemo(
    () =>
      GAMES.map((game) => ({
        ...game,
        description: isEnglish ? game.descriptionEn : game.description,
      })),
    [isEnglish]
  );

  const filteredGames = useMemo(() => {
    const q = search.trim().toLowerCase();
    return games.filter((game) => {
      const matchesFilter = activeFilter === "all" ? true : game.genre === activeFilter;
      const matchesSearch =
        q.length === 0 ||
        game.title.toLowerCase().includes(q) ||
        game.description.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [search, activeFilter, games]);

  return (
    <div className="relative z-10">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{isEnglish ? "Games" : "Giochi"}</h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            {isEnglish ? "Web3 gaming ecosystem, Play-to-Earn and digital ownership" : "Ecosistema gaming Web3, Play-to-Earn e ownership digitale"}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setIntroOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors shrink-0 border-white/20 bg-white/5 hover:bg-white/10 text-white"
          >
            <span>🎮</span>
            <span>{isEnglish ? "Web3 Gaming Introduction" : "Intro ai Giochi Web3"}</span>
          </button>
          <Link
            href="/news/gaming"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-amber-400 hover:bg-amber-500 text-slate-900 transition-colors"
          >
            <span>📰</span>
            <span>{isEnglish ? "News" : "Notizie"}</span>
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeFilter === filter.id
                ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900"
                : "bg-white dark:bg-indigo-900/40 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-indigo-800/50 border border-slate-200 dark:border-indigo-500/20"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="relative mb-8 max-w-2xl">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
        <input
          type="search"
          placeholder={isEnglish ? "Search Web3 games" : "Cerca giochi Web3"}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-indigo-500/30 bg-white dark:bg-indigo-900/40 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <main className="flex-1 min-w-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredGames.map((game) => (
            <div
              key={game.title}
              className="rounded-2xl border border-slate-200 dark:border-indigo-500/20 bg-white dark:bg-indigo-900/25 p-5 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
            >
              <Link href={game.href} className="block">
                <div className="flex items-start justify-between gap-2 mb-2 min-w-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-indigo-800/40 flex items-center justify-center overflow-hidden shrink-0">
                      <Image src={game.icon} alt={game.title} width={32} height={32} className="object-contain" />
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white truncate">{game.title}</span>
                  </div>
                  <span className="shrink-0 px-2 py-1 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-[11px] font-medium whitespace-nowrap">
                    {isEnglish ? "Web3 game" : "Web3 Game"}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-3 line-clamp-3">{game.description}</p>
              </Link>
              <div className="flex items-center gap-2 pt-3 mt-3 border-t border-slate-200 dark:border-slate-600">
                <a
                  href={game.xProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-indigo-800/50 transition-colors"
                  title="X (Twitter)"
                  aria-label="X (Twitter)"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
                <a
                  href={game.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-indigo-800/50 transition-colors"
                  title={isEnglish ? "Website" : "Sito web"}
                  aria-label={isEnglish ? "Website" : "Sito web"}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                </a>
                <BookmarkButton
                  url={game.href}
                  title={`${game.title} - ${isEnglish ? "Web3 game" : "Gioco Web3"}`}
                  type="page"
                  projectId={game.href.replace("/giochi/", "")}
                  className="ml-auto"
                />
              </div>
            </div>
          ))}
        </div>
        {filteredGames.length === 0 && (
          <p className="text-center py-12 text-slate-500 dark:text-slate-400">
            {isEnglish ? "No games found for selected filters." : "Nessun gioco trovato per i filtri selezionati."}
          </p>
        )}
      </main>

      <IntroduzioneGiochiModal isOpen={introOpen} onClose={() => setIntroOpen(false)} />
    </div>
  );
}

