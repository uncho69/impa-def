"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Accordion } from "@/components/Accordion";

type Era = "foundations" | "expansion" | "mainstream" | "institutional";

type EventLink = {
  label: string;
  href: string;
};

type HistoricalEvent = {
  id: number;
  title: string;
  yearLabel: string;
  yearStart: number;
  era: Era;
  description: string;
  impact: string;
  tags: string[];
  links?: EventLink[];
};

const ERA_FILTERS = [
  { id: "all", label: "Tutti" },
  { id: "foundations", label: "2009-2016" },
  { id: "expansion", label: "2017-2020" },
  { id: "mainstream", label: "2021-2022" },
  { id: "institutional", label: "2023-2024" },
] as const;

type EraFilterId = (typeof ERA_FILTERS)[number]["id"];

const HISTORICAL_EVENTS: HistoricalEvent[] = [
  {
    id: 1,
    title: "Lancio di Bitcoin",
    yearLabel: "2009",
    yearStart: 2009,
    era: "foundations",
    description:
      "Bitcoin, creato sotto lo pseudonimo di Satoshi Nakamoto, introduce la prima criptovaluta decentralizzata basata su blockchain.",
    impact:
      "Nasce l intero settore crypto e si pongono le basi tecniche e culturali del Web3.",
    tags: ["Bitcoin", "Blockchain", "Origini"],
    links: [
      {
        label: "Forum post storico su Bitcoin",
        href: "https://news.bitcoin.com/13-years-ago-today-satoshi-nakamoto-published-the-first-forum-post-introducing-bitcoin/",
      },
    ],
  },
  {
    id: 2,
    title: "Creazione di Ethereum",
    yearLabel: "2015",
    yearStart: 2015,
    era: "foundations",
    description:
      "Ethereum introduce smart contract e una piattaforma programmabile per dApp.",
    impact:
      "Espande radicalmente i casi d uso blockchain e abilita DeFi, NFT e nuovi protocolli.",
    tags: ["Ethereum", "Smart Contract", "dApp"],
    links: [
      {
        label: "Ethereum Launches (blog ufficiale)",
        href: "https://blog.ethereum.org/2015/07/30/ethereum-launches",
      },
      {
        label: "Cointelegraph - launch date",
        href: "https://cointelegraph.com/news/ethereum-announces-official-launch-date",
      },
    ],
  },
  {
    id: 3,
    title: "ICO Boom",
    yearLabel: "2017",
    yearStart: 2017,
    era: "expansion",
    description:
      "Le ICO diventano il principale strumento di fundraising per nuovi progetti blockchain.",
    impact:
      "Crescita esplosiva dell ecosistema, ma anche molti fallimenti e truffe che spingono verso piu regolamentazione.",
    tags: ["ICO", "Fundraising", "Regolamentazione"],
  },
  {
    id: 4,
    title: "DeFi Summer",
    yearLabel: "2020",
    yearStart: 2020,
    era: "expansion",
    description:
      "Protocoli come Uniswap, Compound e Aave rendono la finanza on-chain accessibile su larga scala.",
    impact:
      "La DeFi diventa una verticale centrale del Web3 con lending, trading e yield in modo permissionless.",
    tags: ["DeFi", "Uniswap", "Aave"],
  },
  {
    id: 5,
    title: "NFT Boom",
    yearLabel: "2021",
    yearStart: 2021,
    era: "mainstream",
    description:
      "Gli NFT entrano nel mainstream con vendite record e ampia adozione culturale.",
    impact:
      "Nuovi modelli di ownership digitale per creator, brand e comunita.",
    tags: ["NFT", "Creator Economy", "Mainstream"],
  },
  {
    id: 6,
    title: "El Salvador adotta Bitcoin",
    yearLabel: "2021",
    yearStart: 2021,
    era: "mainstream",
    description:
      "El Salvador diventa il primo paese ad adottare Bitcoin come moneta legale.",
    impact:
      "Passaggio simbolico importante verso l adozione statale delle criptovalute.",
    tags: ["Adozione", "Bitcoin", "Stati"],
  },
  {
    id: 7,
    title: "Ethereum The Merge",
    yearLabel: "2022",
    yearStart: 2022,
    era: "mainstream",
    description:
      "Ethereum passa da Proof-of-Work a Proof-of-Stake con The Merge.",
    impact:
      "Riduzione drastica dei consumi energetici e base piu solida per la scalabilita futura.",
    tags: ["Ethereum", "PoS", "Scalabilita"],
  },
  {
    id: 8,
    title: "Crescita ecosistemi Layer 2",
    yearLabel: "2022-2023",
    yearStart: 2022,
    era: "mainstream",
    description:
      "Arbitrum, Optimism e zk-rollup accelerano adozione e usabilita dell ecosistema Ethereum.",
    impact:
      "Fee piu basse e maggiore throughput rendono possibili use case consumer su larga scala.",
    tags: ["Layer 2", "Arbitrum", "Optimism"],
  },
  {
    id: 9,
    title: "Crollo di FTX",
    yearLabel: "Nov 2022",
    yearStart: 2022,
    era: "mainstream",
    description:
      "FTX dichiara bancarotta dopo gravi problemi di liquidita e governance.",
    impact:
      "Shock di fiducia nel mercato e forte pressione verso trasparenza, proof-of-reserves e compliance.",
    tags: ["FTX", "Risk", "Compliance"],
  },
  {
    id: 10,
    title: "Social decentralizzati (Lens)",
    yearLabel: "2023",
    yearStart: 2023,
    era: "institutional",
    description:
      "Piattaforme come Lens introducono nuovi modelli social basati su ownership dei contenuti.",
    impact:
      "Inizia la sfida ai modelli Web2 centralizzati in favore di identita e graph portabili.",
    tags: ["SocialFi", "Lens", "Identity"],
  },
  {
    id: 11,
    title: "Interoperabilita cross-chain",
    yearLabel: "2023",
    yearStart: 2023,
    era: "institutional",
    description:
      "Soluzioni come LayerZero facilitano comunicazione e trasferimento asset tra chain.",
    impact:
      "Maggiore integrazione tra ecosistemi prima isolati e UX multi-chain in crescita.",
    tags: ["Interoperabilita", "LayerZero", "Cross-chain"],
  },
  {
    id: 12,
    title: "Approvazione Bitcoin ETF spot",
    yearLabel: "Gen 2024",
    yearStart: 2024,
    era: "institutional",
    description:
      "La SEC approva i primi ETF spot su Bitcoin negli Stati Uniti.",
    impact:
      "Ingresso strutturale di capitale istituzionale e ulteriore legittimazione del settore.",
    tags: ["ETF", "Bitcoin", "Istituzionali"],
  },
  {
    id: 13,
    title: "Celebrita e token narrativi",
    yearLabel: "2023-2024",
    yearStart: 2023,
    era: "institutional",
    description:
      "Celebrita e personaggi pubblici promuovono o lanciano token e collezioni.",
    impact:
      "Aumenta la visibilita retail ma emergono rischi elevati di hype, manipolazione e scam.",
    tags: ["Meme", "Retail", "Rischio"],
  },
];

export default function EventiStoriciPage() {
  const [search, setSearch] = useState("");
  const [activeEra, setActiveEra] = useState<EraFilterId>("all");
  const [activeEventId, setActiveEventId] = useState<number | null>(null);

  const filteredEvents = useMemo(() => {
    const q = search.trim().toLowerCase();
    return HISTORICAL_EVENTS.filter((event) => {
      const matchesEra = activeEra === "all" ? true : event.era === activeEra;
      const matchesSearch =
        q.length === 0 ||
        event.title.toLowerCase().includes(q) ||
        event.description.toLowerCase().includes(q) ||
        event.impact.toLowerCase().includes(q) ||
        event.tags.join(" ").toLowerCase().includes(q);
      return matchesEra && matchesSearch;
    }).sort((a, b) => b.yearStart - a.yearStart || b.id - a.id);
  }, [search, activeEra]);

  const timelineEvents = useMemo(
    () => [...filteredEvents].sort((a, b) => a.yearStart - b.yearStart || a.id - b.id),
    [filteredEvents]
  );

  useEffect(() => {
    if (timelineEvents.length === 0) {
      setActiveEventId(null);
      return;
    }
    const hasCurrent = activeEventId != null && timelineEvents.some((event) => event.id === activeEventId);
    if (!hasCurrent) {
      setActiveEventId(timelineEvents[timelineEvents.length - 1]?.id ?? null);
    }
  }, [timelineEvents, activeEventId]);

  return (
    <div className="relative z-10">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Eventi Storici</h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            I momenti chiave che hanno definito l evoluzione del Web3
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/manuale"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors border-white/20 bg-white/5 hover:bg-white/10 text-white"
          >
            <span>📘</span>
            <span>Manuale</span>
          </Link>
          <Link
            href="/news"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-amber-400 hover:bg-amber-500 text-slate-900 transition-colors"
          >
            <span>📰</span>
            <span>Notizie</span>
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-indigo-500/20 bg-white/90 dark:bg-indigo-900/25 p-4 sm:p-5 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">Timeline Web3</p>
          <p className="text-xs text-slate-500 dark:text-slate-300">
            {timelineEvents.length} eventi • 2009-2024
          </p>
        </div>
        <div className="overflow-x-auto pb-1">
          <div className="relative min-w-[920px] h-28">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[3px] rounded-full bg-slate-300 dark:bg-slate-600" />
            {timelineEvents.map((event, index) => {
              const isActive = activeEventId === event.id;
              const ratio =
                timelineEvents.length <= 1 ? 0.5 : index / (timelineEvents.length - 1);
              const left = `${ratio * 100}%`;
              const labelTop = index % 2 === 0;
              return (
                <div
                  key={event.id}
                  className="absolute top-1/2 -translate-y-1/2"
                  style={{ left, transform: "translate(-50%, -50%)" }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setActiveEventId(event.id);
                      const el = document.getElementById(`event-${event.id}`);
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className={`relative w-5 h-5 rounded-full border-2 transition-all ${
                      isActive
                        ? "bg-indigo-500 border-indigo-300 shadow-[0_0_0_6px_rgba(99,102,241,0.22)]"
                        : "bg-indigo-300 dark:bg-indigo-600 border-indigo-500 dark:border-indigo-400 hover:scale-110"
                    }`}
                    aria-label={`${event.title} (${event.yearLabel})`}
                    title={`${event.title} (${event.yearLabel})`}
                  />
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[12px] font-medium ${
                      isActive ? "text-indigo-600 dark:text-indigo-300" : "text-slate-600 dark:text-slate-300"
                    } ${labelTop ? "-top-7" : "top-6"}`}
                  >
                    {event.yearLabel}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {ERA_FILTERS.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => setActiveEra(filter.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeEra === filter.id
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
          placeholder="Cerca evento, impatto o tag"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-indigo-500/30 bg-white dark:bg-indigo-900/40 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <div className="space-y-3">
        {filteredEvents.map((event, index) => {
          const isActive = activeEventId === event.id;
          return (
            <div
              key={event.id}
              id={`event-${event.id}`}
              className={`rounded-xl transition-colors ${
                isActive ? "ring-1 ring-indigo-400/70 dark:ring-indigo-500/70" : ""
              }`}
            >
              <Accordion
                className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-white dark:bg-indigo-900/25 p-4"
                defaultOpen={index === 0}
                buttonText={
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
                      {event.id}
                    </span>
                    <span className="text-base md:text-lg font-semibold text-slate-900 dark:text-white">{event.title}</span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium">
                      {event.yearLabel}
                    </span>
                  </div>
                }
              >
                <div className="pl-9 space-y-4">
                  <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-900/30 p-3">
                    <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">Descrizione</p>
                    <p className="text-slate-700 dark:text-slate-200">{event.description}</p>
                  </div>

                  <div className="rounded-lg border border-emerald-200 dark:border-emerald-700/40 bg-emerald-50/80 dark:bg-emerald-900/20 p-3">
                    <p className="text-xs uppercase tracking-wide text-emerald-700 dark:text-emerald-300 mb-1">Impatto</p>
                    <p className="text-emerald-900 dark:text-emerald-100">{event.impact}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {event.links && event.links.length > 0 && (
                    <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/30 p-3">
                      <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">Fonti utili</p>
                      <ul className="space-y-2">
                        {event.links.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-indigo-600 dark:text-indigo-300 hover:underline"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Accordion>
            </div>
          );
        })}
      </div>

      {filteredEvents.length === 0 && (
        <p className="text-center py-12 text-slate-500 dark:text-slate-400">
          Nessun evento trovato per i filtri selezionati.
        </p>
      )}
    </div>
  );
}
