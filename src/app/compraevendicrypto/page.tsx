"use client";

import { useMemo, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { GuidaCompraVenditaModal } from "@/components/GuidaCompraVenditaModal";
import coinbaseIcon from "@/assets/coinbasecex.png";
import krakenIcon from "@/assets/krakencex.png";
import binanceIcon from "@/assets/binancecex.png";
import cryptoIcon from "@/assets/cryptocomex.png";
import holyheldIcon from "@/assets/holyheldcex.png";
import wirexIcon from "@/assets/wirexcex.png";
import youngIcon from "@/assets/youngplatformcex.png";
import transakIcon from "@/assets/transakcex.png";

type ExchangeType = "cex" | "onramp";

type ExchangeItem = {
  title: string;
  href: string;
  icon: StaticImageData;
  description: string;
  type: ExchangeType;
  website: string;
  xProfile: string;
};

const EXCHANGES: ExchangeItem[] = [
  {
    title: "Coinbase",
    href: "/compraevendicrypto/coinbase",
    icon: coinbaseIcon,
    description: "Exchange regolamentata, adatta ai principianti e con ampia liquidita.",
    type: "cex",
    website: "https://www.coinbase.com/",
    xProfile: "https://x.com/coinbase",
  },
  {
    title: "Kraken",
    href: "/compraevendicrypto/kraken",
    icon: krakenIcon,
    description: "Una delle piattaforme piu solide per sicurezza, KYC e operativita spot.",
    type: "cex",
    website: "https://www.kraken.com/",
    xProfile: "https://x.com/krakenfx",
  },
  {
    title: "Binance",
    href: "/compraevendicrypto/binance",
    icon: binanceIcon,
    description: "Exchange con molti mercati e strumenti, utile per utenti piu avanzati.",
    type: "cex",
    website: "https://www.binance.com",
    xProfile: "https://x.com/binance",
  },
  {
    title: "Crypto.com",
    href: "/compraevendicrypto/crypto",
    icon: cryptoIcon,
    description: "Piattaforma completa con app, carta e accesso a servizi crypto principali.",
    type: "cex",
    website: "https://crypto.com/",
    xProfile: "https://x.com/cryptocom",
  },
  {
    title: "Young Platform",
    href: "/compraevendicrypto/young",
    icon: youngIcon,
    description: "Exchange italiana orientata a onboarding semplice e percorso educativo.",
    type: "cex",
    website: "https://exchange.youngplatform.com/",
    xProfile: "https://x.com/youngplatform",
  },
  {
    title: "Holyheld",
    href: "/compraevendicrypto/holyheld",
    icon: holyheldIcon,
    description: "On-ramp Web3 con carta e flusso diretto verso wallet non-custodial.",
    type: "onramp",
    website: "https://holyheld.com/",
    xProfile: "https://x.com/holyheld",
  },
  {
    title: "Wirex",
    href: "/compraevendicrypto/wirex",
    icon: wirexIcon,
    description: "On-ramp con strumenti di pagamento e conversione fiat/crypto rapida.",
    type: "onramp",
    website: "https://wirexapp.com/",
    xProfile: "https://x.com/wirexapp",
  },
  {
    title: "Transak",
    href: "/compraevendicrypto/transak",
    icon: transakIcon,
    description: "Fiat on-ramp integrato in molte dApp per acquisto diretto con carta.",
    type: "onramp",
    website: "https://transak.com/",
    xProfile: "https://x.com/Transak",
  },
];

const FILTERS = [
  { id: "all", label: "Tutti" },
  { id: "cex", label: "CEX" },
  { id: "onramp", label: "On/Off-Ramp" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

export default function ExchangePage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [guidaOpen, setGuidaOpen] = useState(false);

  const filteredExchanges = useMemo(() => {
    const q = search.trim().toLowerCase();
    return EXCHANGES.filter((item) => {
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
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Compra e Vendi Crypto</h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Scopri come acquistare e vendere criptovalute in modo sicuro e conveniente
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setGuidaOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors shrink-0 border-white/20 bg-white/5 hover:bg-white/10 text-white"
          >
            <span>📘</span>
            <span>Come Comprare e Vendere Crypto</span>
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
          placeholder="Cerca exchange o on-ramp"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-indigo-500/30 bg-white dark:bg-indigo-900/40 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <main className="flex-1 min-w-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredExchanges.map((exchange) => (
            <div
              key={exchange.href + exchange.title}
              className="rounded-2xl border border-slate-200 dark:border-indigo-500/20 bg-white dark:bg-indigo-900/25 p-5 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
            >
              <Link href={exchange.href} className="block">
                <div className="flex items-start justify-between gap-2 mb-2 min-w-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-indigo-800/40 flex items-center justify-center overflow-hidden shrink-0">
                      <Image src={exchange.icon} alt={exchange.title} width={32} height={32} className="object-contain" />
                    </div>
                    <span className="font-bold text-slate-900 dark:text-white truncate">{exchange.title}</span>
                  </div>
                  <span
                    className={`shrink-0 px-2 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap ${
                      exchange.type === "cex"
                        ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
                        : "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300"
                    }`}
                  >
                    {exchange.type === "cex" ? "CEX" : "On-ramp"}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-3 line-clamp-3">{exchange.description}</p>
              </Link>
              <div className="flex items-center gap-2 pt-3 mt-3 border-t border-slate-200 dark:border-slate-600">
                <a
                  href={exchange.xProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-indigo-800/50 transition-colors"
                  title="X (Twitter)"
                  aria-label="X (Twitter)"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
                <a
                  href={exchange.website}
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

        {filteredExchanges.length === 0 && (
          <p className="text-center py-12 text-slate-500 dark:text-slate-400">
            Nessuna piattaforma trovata per i filtri selezionati.
          </p>
        )}
      </main>

      <GuidaCompraVenditaModal isOpen={guidaOpen} onClose={() => setGuidaOpen(false)} />
    </div>
  );
}
