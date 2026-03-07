"use client";

import { useMemo, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { IntroduzioneNFTModal } from "@/components/IntroduzioneNFTModal";

import openseaIcon from "@/assets/opensea-icon.png";
import blurIcon from "@/assets/blur-icon.png";
import magicedenIcon from "@/assets/magiceden-icon.png";
import cpunksIcon from "@/assets/cpunks-icon.png";
import miladyIcon from "@/assets/milady-icon.png";
import pudgypenguinsIcon from "@/assets/pudgypenguins-icon.png";
import remilioIcon from "@/assets/remilio-icon.png";
import tubbycatsIcon from "@/assets/tubbycats-icon.png";

type NftItem = {
  title: string;
  icon: StaticImageData;
  description: string;
  type: "marketplace" | "collection";
  website: string;
  xProfile: string;
};

const FILTERS = [
  { id: "all", label: "Tutti" },
  { id: "marketplace", label: "Marketplace" },
  { id: "collection", label: "Collezioni" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

const NFT_ITEMS: NftItem[] = [
  {
    title: "OpenSea",
    icon: openseaIcon,
    description: "Marketplace NFT leader per acquisto, vendita e scoperta collezioni.",
    type: "marketplace",
    website: "https://opensea.io/",
    xProfile: "https://x.com/opensea",
  },
  {
    title: "Blur",
    icon: blurIcon,
    description: "Marketplace focalizzato su trader NFT avanzati e liquidita rapida.",
    type: "marketplace",
    website: "https://blur.io/",
    xProfile: "https://x.com/blur_io",
  },
  {
    title: "Magic Eden",
    icon: magicedenIcon,
    description: "Marketplace multichain molto usato per NFT su Solana e altre chain.",
    type: "marketplace",
    website: "https://magiceden.io/",
    xProfile: "https://x.com/MagicEden",
  },
  {
    title: "CryptoPunks",
    icon: cpunksIcon,
    description: "Collezione storica NFT, considerata tra le piu iconiche su Ethereum.",
    type: "collection",
    website: "https://www.larvalabs.com/cryptopunks",
    xProfile: "https://x.com/cryptopunksnfts",
  },
  {
    title: "Milady",
    icon: miladyIcon,
    description: "Collezione NFT community-driven con estetica riconoscibile e narrativa forte.",
    type: "collection",
    website: "https://miladymaker.net/",
    xProfile: "https://x.com/miladymaker",
  },
  {
    title: "Pudgy Penguins",
    icon: pudgypenguinsIcon,
    description: "Brand NFT mainstream con forte presenza social e sviluppo IP.",
    type: "collection",
    website: "https://www.pudgypenguins.com/",
    xProfile: "https://x.com/pudgypenguins",
  },
  {
    title: "Redacted Remilio Babies",
    icon: remilioIcon,
    description: "Collezione NFT nota per community attiva e cultura internet.",
    type: "collection",
    website: "https://remilio.org/",
    xProfile: "https://x.com/remiliobabies",
  },
  {
    title: "Tubby Cats",
    icon: tubbycatsIcon,
    description: "Collezione NFT a tema cartoon, orientata a community e identita on-chain.",
    type: "collection",
    website: "https://tubbycats.xyz/",
    xProfile: "https://x.com/tubbycatsxyz",
  },
];

export default function NftPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [introOpen, setIntroOpen] = useState(false);

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    return NFT_ITEMS.filter((item) => {
      const matchesFilter = activeFilter === "all" ? true : item.type === activeFilter;
      const matchesSearch =
        q.length === 0 ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [search, activeFilter]);

  return (
    <div className="relative z-10">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">NFTs</h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Scopri il mondo dei token non fungibili e le loro applicazioni
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setIntroOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors shrink-0 border-white/20 bg-white/5 hover:bg-white/10 text-white"
          >
            <span>🖼️</span>
            <span>Intro ai NFTs</span>
          </button>
          <Link
            href="/news"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-amber-400 hover:bg-amber-500 text-slate-900 transition-colors"
          >
            <span>📰</span>
            <span>Notizie</span>
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {FILTERS.map((filter) => (
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
          placeholder="Cerca marketplace o collezioni NFT"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-indigo-500/30 bg-white dark:bg-indigo-900/40 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <main className="flex-1 min-w-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 dark:border-indigo-500/20 bg-white dark:bg-indigo-900/25 p-5 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-2 min-w-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-indigo-800/40 flex items-center justify-center overflow-hidden shrink-0">
                    <Image src={item.icon} alt={item.title} width={32} height={32} className="object-contain" />
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white truncate">{item.title}</span>
                </div>
                <span
                  className={`shrink-0 px-2 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap ${
                    item.type === "marketplace"
                      ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
                      : "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300"
                  }`}
                >
                  {item.type === "marketplace" ? "Marketplace" : "Collection"}
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-3 line-clamp-3">{item.description}</p>
              <div className="flex items-center gap-2 pt-3 mt-3 border-t border-slate-200 dark:border-slate-600">
                <a
                  href={item.xProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-indigo-800/50 transition-colors"
                  title="X (Twitter)"
                  aria-label="X (Twitter)"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
                <a
                  href={item.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-indigo-800/50 transition-colors"
                  title="Sito web"
                  aria-label="Sito web"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                </a>
              </div>
            </div>
          ))}
        </div>
        {filteredItems.length === 0 && (
          <p className="text-center py-12 text-slate-500 dark:text-slate-400">
            Nessun risultato trovato per i filtri selezionati.
          </p>
        )}
      </main>

      <IntroduzioneNFTModal isOpen={introOpen} onClose={() => setIntroOpen(false)} />
    </div>
  );
}

