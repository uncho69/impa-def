"use client";

import { useMemo, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import metamaskIcon from "@/assets/metamask-icon.svg";
import phantomIcon from "@/assets/phantom-icon.png";
import rainbowIcon from "@/assets/rainbow-icon.png";
import rabbyIcon from "@/assets/rabby-icon.png";
import trezorIcon from "@/assets/trezor-icon.png";
import ledgerIcon from "@/assets/ledger-icon.png";
import { IntroduzionePortafogliModal } from "@/components/IntroduzionePortafogliModal";

type WalletType = "software" | "hardware";

type WalletItem = {
  title: string;
  href: string;
  icon: StaticImageData;
  description: string;
  type: WalletType;
  website: string;
  xProfile: string;
};

const WALLETS: WalletItem[] = [
  {
    title: "MetaMask",
    href: "/wallet/metamask",
    icon: metamaskIcon,
    description: "Wallet EVM piu diffuso per DeFi, bridge e interazione con dApp.",
    type: "software",
    website: "https://metamask.io/",
    xProfile: "https://x.com/MetaMask",
  },
  {
    title: "Phantom",
    href: "/wallet/phantom",
    icon: phantomIcon,
    description: "Wallet intuitivo nato su Solana, oggi multi-chain e molto user-friendly.",
    type: "software",
    website: "https://phantom.app/",
    xProfile: "https://x.com/phantom",
  },
  {
    title: "Rainbow",
    href: "/wallet/rainbow",
    icon: rainbowIcon,
    description: "Wallet mobile curato per Ethereum e Layer 2, ideale per onboarding rapido.",
    type: "software",
    website: "https://rainbow.me/",
    xProfile: "https://x.com/rainbowdotme",
  },
  {
    title: "Rabby",
    href: "/wallet/rabby",
    icon: rabbyIcon,
    description: "Wallet EVM avanzato con focus su sicurezza transazioni e multi-chain.",
    type: "software",
    website: "https://rabby.io/",
    xProfile: "https://x.com/Rabby_io",
  },
  {
    title: "Trezor",
    href: "/wallet/trezor",
    icon: trezorIcon,
    description: "Hardware wallet per cold storage e protezione offline delle chiavi.",
    type: "hardware",
    website: "https://trezor.io/",
    xProfile: "https://x.com/Trezor",
  },
  {
    title: "Ledger",
    href: "/wallet/ledger",
    icon: ledgerIcon,
    description: "Hardware wallet molto diffuso con ampio supporto asset e app dedicate.",
    type: "hardware",
    website: "https://shop.ledger.com/",
    xProfile: "https://x.com/Ledger",
  },
];

const FILTERS = [
  { id: "all", label: "Tutti" },
  { id: "software", label: "Software Wallet" },
  { id: "hardware", label: "Hardware Wallet" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

export default function WalletPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [introOpen, setIntroOpen] = useState(false);

  const filteredWallets = useMemo(() => {
    const q = search.trim().toLowerCase();
    return WALLETS.filter((wallet) => {
      const matchesFilter = activeFilter === "all" ? true : wallet.type === activeFilter;
      const matchesSearch =
        q.length === 0 ||
        wallet.title.toLowerCase().includes(q) ||
        wallet.description.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [search, activeFilter]);

  return (
    <div className="relative z-10">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Portafogli Non-Custodial</h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Scopri i migliori wallet per gestire le tue criptovalute in modo sicuro e decentralizzato
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setIntroOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors shrink-0 border-white/20 bg-white/5 hover:bg-white/10 text-white"
          >
            <span>👛</span>
            <span>Introduzione ai Portafogli Crypto</span>
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
          placeholder="Cerca wallet"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-indigo-500/30 bg-white dark:bg-indigo-900/40 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <main className="flex-1 min-w-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredWallets.map((wallet) => (
            <div
              key={wallet.href + wallet.title}
              className="rounded-2xl border border-slate-200 dark:border-indigo-500/20 bg-white dark:bg-indigo-900/25 p-5 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
            >
              <Link href={wallet.href} className="block">
                <div className="flex items-start justify-between gap-2 mb-2 min-w-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-indigo-800/40 flex items-center justify-center overflow-hidden shrink-0">
                      <Image src={wallet.icon} alt={wallet.title} width={32} height={32} className="object-contain" />
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white truncate">{wallet.title}</span>
                  </div>
                  <span
                    className={`shrink-0 px-2 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap ${
                      wallet.type === "software"
                        ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
                        : "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300"
                    }`}
                  >
                    {wallet.type === "software" ? "Software" : "Hardware"}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-3 line-clamp-3">{wallet.description}</p>
              </Link>
              <div className="flex items-center gap-2 pt-3 mt-3 border-t border-slate-200 dark:border-slate-600">
                <a
                  href={wallet.xProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-indigo-800/50 transition-colors"
                  title="X (Twitter)"
                  aria-label="X (Twitter)"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
                <a
                  href={wallet.website}
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
        {filteredWallets.length === 0 && (
          <p className="text-center py-12 text-slate-500 dark:text-slate-400">
            Nessun wallet trovato per i filtri selezionati.
          </p>
        )}
      </main>

      <IntroduzionePortafogliModal isOpen={introOpen} onClose={() => setIntroOpen(false)} />
    </div>
  );
}
