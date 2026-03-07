"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";

const APPLICATIONS = [
  {
    id: "dex",
    icon: "🔄",
    title: "Exchange decentralizzati (DEX)",
    summary: "Scambio spot direttamente da wallet, senza intermediari custodial.",
    offers: "Swap spot, AMM, pool di liquidita e composabilita con altri protocolli.",
    risks: "Slippage, impermanent loss, front-running e bug nei contratti.",
    examples: "Uniswap, Curve, Balancer, Raydium",
  },
  {
    id: "perp",
    icon: "📈",
    title: "Exchange di derivati decentralizzati (PERP DEX)",
    summary: "Trading su contratti perpetui on-chain con long/short e leva.",
    offers: "Hedging del portafoglio, gestione del rischio e strategie market-neutral.",
    risks: "Liquidazioni rapide, funding rate variabile e alta volatilita.",
    examples: "Hyperliquid, dYdX, GMX",
  },
  {
    id: "lending",
    icon: "🏦",
    title: "Prestiti",
    summary: "Mercati monetari on-chain per depositare asset o prenderli in prestito.",
    offers: "Borrow/lend permissionless, tassi dinamici e uso del collateral.",
    risks: "Liquidazioni del collateral, variazione tassi, rischio oracoli.",
    examples: "Aave, Compound, Morpho",
  },
  {
    id: "yield",
    icon: "💰",
    title: "Rendimenti",
    summary: "Strategie per ottimizzare APY/APR tramite vault e staking.",
    offers: "Auto-compounding, allocazione automatica e diversificazione.",
    risks: "Smart contract risk, depeg, reward instabili e rischio strategia.",
    examples: "Yearn, Convex, Lido",
  },
  {
    id: "bridge",
    icon: "🌉",
    title: "Bridge",
    summary: "Trasferimento di asset e messaggi tra chain diverse.",
    offers: "Interoperabilita tra Ethereum, L2 e altre blockchain.",
    risks: "Exploit bridge, finalizzazione lenta e fee variabili.",
    examples: "Stargate, deBridge, Orbiter",
  },
  {
    id: "stablecoin",
    icon: "🪙",
    title: "Stablecoin",
    summary: "Token con valore stabile usati come base della DeFi.",
    offers: "Trading, collateral, pagamenti on-chain e parcheggio liquidita.",
    risks: "Depeg, rischio controparte e rischio regolamentare.",
    examples: "USDC, DAI, USDT, FRAX",
  },
  {
    id: "options",
    icon: "🧠",
    title: "Opzioni",
    summary: "Strumenti avanzati per copertura del rischio e strategie direzionali.",
    offers: "Put/call on-chain, copertura portafoglio e strutture di rendimento.",
    risks: "Complessita elevata, liquidita ridotta e pricing inefficiente.",
    examples: "Lyra, Dopex, Ribbon",
  },
] as const;

const QUICK_FACTS = [
  {
    title: "Accesso aperto",
    value: "24/7",
    text: "Chiunque puo usare la DeFi con un wallet e connessione internet.",
    color: "from-indigo-500/20 to-indigo-400/5",
  },
  {
    title: "Trasparenza",
    value: "On-chain",
    text: "Transazioni e logiche dei contratti sono verificabili pubblicamente.",
    color: "from-sky-500/20 to-sky-400/5",
  },
  {
    title: "Custodia",
    value: "Self-custody",
    text: "Mantieni il controllo diretto degli asset senza banca custode.",
    color: "from-emerald-500/20 to-emerald-400/5",
  },
] as const;

export default function BasiDefiPage() {
  const [activeAppId, setActiveAppId] = useState<(typeof APPLICATIONS)[number]["id"]>("dex");
  const activeApp = useMemo(
    () => APPLICATIONS.find((app) => app.id === activeAppId) ?? APPLICATIONS[0],
    [activeAppId]
  );

  return (
    <div className="relative z-10 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/defi"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Torna a DeFi
        </Link>
      </div>
      <div className="rounded-2xl border border-slate-200 dark:border-indigo-500/20 bg-white dark:bg-indigo-950 shadow-xl overflow-hidden">
        <div className="border-b border-slate-200 dark:border-indigo-500/20 bg-white dark:bg-indigo-950 px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Basi DeFi</h1>
            <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-200">
              Guida pratica
            </span>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
            La finanza decentralizzata, o <strong>DeFi</strong>, è un sistema finanziario che funziona su blockchain, principalmente grazie agli smart contract e quindi su Ethereum e le sue Layer2. A differenza del sistema finanziario tradizionale, DeFi è aperto a tutti e non richiede intermediari come banche o broker. I prodotti DeFi permettono agli utenti di prestare o prendere in prestito fondi, guadagnare interessi, fare trading di asset digitali e assicurarsi contro i rischi, il tutto in modo trasparente e senza un ente centrale.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {QUICK_FACTS.map((fact) => (
              <div
                key={fact.title}
                className={`rounded-xl border border-slate-200 dark:border-indigo-500/20 p-3.5 bg-gradient-to-br ${fact.color} bg-slate-50/60 dark:bg-indigo-950/40`}
              >
                <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">{fact.title}</p>
                <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5">{fact.value}</p>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">{fact.text}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-slate-50/70 dark:bg-indigo-900/20 p-4">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-3">Indice rapido</p>
            <div className="flex flex-wrap gap-2">
              <a href="#caratteristiche" className="px-3 py-1.5 rounded-full text-xs font-medium bg-white text-slate-700 border border-slate-200 hover:border-indigo-300 dark:bg-indigo-950/50 dark:text-slate-200 dark:border-indigo-500/30">Caratteristiche</a>
              <a href="#componenti" className="px-3 py-1.5 rounded-full text-xs font-medium bg-white text-slate-700 border border-slate-200 hover:border-indigo-300 dark:bg-indigo-950/50 dark:text-slate-200 dark:border-indigo-500/30">Componenti</a>
              <a href="#vantaggi" className="px-3 py-1.5 rounded-full text-xs font-medium bg-white text-slate-700 border border-slate-200 hover:border-indigo-300 dark:bg-indigo-950/50 dark:text-slate-200 dark:border-indigo-500/30">Vantaggi</a>
              <a href="#rischi" className="px-3 py-1.5 rounded-full text-xs font-medium bg-white text-slate-700 border border-slate-200 hover:border-indigo-300 dark:bg-indigo-950/50 dark:text-slate-200 dark:border-indigo-500/30">Rischi</a>
              <a href="#applicazioni" className="px-3 py-1.5 rounded-full text-xs font-medium bg-white text-slate-700 border border-slate-200 hover:border-indigo-300 dark:bg-indigo-950/50 dark:text-slate-200 dark:border-indigo-500/30">Applicazioni</a>
            </div>
          </div>

          <section id="caratteristiche" className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-indigo-50/30 dark:bg-indigo-900/20 p-4 hover:border-indigo-300 dark:hover:border-indigo-400/40 transition-colors">
            <Accordion buttonText="Caratteristiche principali della DeFi" defaultOpen>
              <div className="text-slate-700 dark:text-slate-200 space-y-3">
                <div className="rounded-lg border-l-4 border-indigo-400 bg-indigo-500/10 px-3 py-2 text-sm">
                  Queste caratteristiche sono la base del vantaggio competitivo della DeFi rispetto alla finanza tradizionale.
                </div>
                <p className="mb-2">Le applicazioni DeFi operano su blockchain senza un unico punto di controllo. Ecco le caratteristiche principali:</p>
                <List ordered>
                  <li className="text-slate-700 dark:text-slate-200"><b>Decentralizzazione:</b> le app DeFi funzionano su blockchain senza un ente centrale che le controlla.</li>
                  <li className="text-slate-700 dark:text-slate-200"><b>Trasparenza:</b> transazioni e contratti sono pubblicamente visibili on-chain.</li>
                  <li className="text-slate-700 dark:text-slate-200"><b>Accessibilità:</b> chiunque abbia internet può accedere ai servizi DeFi senza requisiti restrittivi.</li>
                  <li className="text-slate-700 dark:text-slate-200"><b>Interoperabilità:</b> le applicazioni DeFi sono progettate per essere compatibili e creare soluzioni finanziarie personalizzate.</li>
                </List>
                <p className="mt-2">In sintesi: accesso aperto e senza permessi, trasparenza on-chain, interoperabilità tra protocolli, automazione tramite smart contract e assenza di un intermediario centralizzato.</p>
              </div>
            </Accordion>
          </section>

          <section id="componenti" className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-sky-50/30 dark:bg-sky-900/10 p-4 hover:border-indigo-300 dark:hover:border-indigo-400/40 transition-colors">
            <Accordion buttonText="Principali componenti della DeFi">
              <div className="space-y-3">
                <div className="rounded-lg border-l-4 border-sky-400 bg-sky-500/10 px-3 py-2 text-sm text-slate-700 dark:text-slate-200">
                  Pensa ai componenti DeFi come mattoni modulari: possono combinarsi tra loro per creare strategie complete.
                </div>
                <List>
                  <li className="text-slate-700 dark:text-slate-200"><b>DEX (Exchange decentralizzati):</b> scambio di token peer-to-peer.</li>
                  <li className="text-slate-700 dark:text-slate-200"><b>Lending e borrowing:</b> prestiti e prestiti in prestito senza banca.</li>
                  <li className="text-slate-700 dark:text-slate-200"><b>Stablecoin:</b> valute digitali ancorate a un riferimento (es. dollaro).</li>
                  <li className="text-slate-700 dark:text-slate-200"><b>Yield farming e liquidità:</b> fornire liquidità in cambio di reward.</li>
                  <li className="text-slate-700 dark:text-slate-200"><b>Derivati e assicurazioni on-chain:</b> prodotti finanziari avanzati.</li>
                </List>
              </div>
            </Accordion>
          </section>

          <section id="vantaggi" className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-emerald-50/30 dark:bg-emerald-900/10 p-4 hover:border-indigo-300 dark:hover:border-indigo-400/40 transition-colors">
            <Accordion buttonText="Vantaggi della DeFi">
              <div className="space-y-3">
                <div className="rounded-lg border-l-4 border-emerald-400 bg-emerald-500/10 px-3 py-2 text-sm text-slate-700 dark:text-slate-200">
                  Se usata bene, la DeFi aumenta accessibilita e controllo, riducendo la dipendenza da intermediari.
                </div>
                <List>
                  <li className="text-slate-700 dark:text-slate-200"><b>Inclusione finanziaria:</b> accesso senza richiesta di conto bancario.</li>
                  <li className="text-slate-700 dark:text-slate-200"><b>Trasparenza:</b> contratti e dati verificabili on-chain.</li>
                  <li className="text-slate-700 dark:text-slate-200"><b>Autocustodia:</b> controllo diretto dei propri asset.</li>
                  <li className="text-slate-700 dark:text-slate-200"><b>Innovazione:</b> nuovi prodotti e composabilità tra protocolli.</li>
                </List>
              </div>
            </Accordion>
          </section>

          <section id="rischi" className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-rose-50/30 dark:bg-rose-900/10 p-4 hover:border-indigo-300 dark:hover:border-indigo-400/40 transition-colors">
            <Accordion buttonText="Sfide e rischi della DeFi">
              <div className="space-y-3">
                <div className="rounded-lg border-l-4 border-rose-400 bg-rose-500/10 px-3 py-2 text-sm text-slate-700 dark:text-slate-200">
                  Regola base: prima la sicurezza, poi il rendimento. In DeFi il rischio operativo conta quanto il rischio di mercato.
                </div>
                <List>
                  <li className="text-slate-700 dark:text-slate-200"><b>Rischi smart contract:</b> bug e exploit.</li>
                  <li className="text-slate-700 dark:text-slate-200"><b>Volatilità e rischio di impermanent loss:</b> nei pool di liquidità.</li>
                  <li className="text-slate-700 dark:text-slate-200"><b>Regolamentazione:</b> quadro normativo in evoluzione.</li>
                  <li className="text-slate-700 dark:text-slate-200"><b>UX e sicurezza:</b> responsabilità dell&apos;utente nella gestione di chiavi e wallet.</li>
                </List>
              </div>
            </Accordion>
          </section>

          <section id="applicazioni" className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-violet-50/30 dark:bg-violet-900/10 p-4 sm:p-5">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Applicazioni DeFi</h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Seleziona una categoria per vedere focus operativo, vantaggi e rischi.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              {APPLICATIONS.map((app) => {
                const isActive = app.id === activeAppId;
                return (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => setActiveAppId(app.id)}
                    className={`text-left rounded-lg border px-3 py-2.5 transition-colors ${
                      isActive
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700 dark:border-indigo-400 dark:bg-indigo-500/20 dark:text-indigo-200"
                        : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700 dark:border-indigo-500/20 dark:bg-indigo-950/50 dark:text-slate-200 dark:hover:bg-indigo-900/40"
                    }`}
                  >
                    <span className="text-sm font-semibold flex items-center gap-2">
                      <span>{app.icon}</span>
                      <span>{app.title}</span>
                    </span>
                    <span className="block mt-1 text-xs text-slate-500 dark:text-slate-300 line-clamp-2">{app.summary}</span>
                  </button>
                );
              })}
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-indigo-500/30 bg-slate-50 dark:bg-indigo-950/50 p-4 space-y-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>{activeApp.icon}</span>
                <span>{activeApp.title}</span>
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-200">{activeApp.summary}</p>
              <div className="grid grid-cols-1 gap-2">
                <div className="rounded-lg bg-white dark:bg-indigo-900/40 border border-slate-200 dark:border-indigo-500/20 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300 mb-1">Cosa offre</p>
                  <p className="text-sm text-slate-700 dark:text-slate-200">{activeApp.offers}</p>
                </div>
                <div className="rounded-lg bg-white dark:bg-indigo-900/40 border border-slate-200 dark:border-indigo-500/20 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-rose-700 dark:text-rose-300 mb-1">Rischi principali</p>
                  <p className="text-sm text-slate-700 dark:text-slate-200">{activeApp.risks}</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300"><b>Esempi:</b> {activeApp.examples}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
