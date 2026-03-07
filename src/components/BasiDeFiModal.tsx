"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Accordion } from "@/components/Accordion";

interface BasiDeFiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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
  { title: "Accesso aperto", value: "24/7", text: "Chiunque puo usare la DeFi con un wallet.", color: "from-indigo-500/20 to-indigo-400/5" },
  { title: "Trasparenza", value: "On-chain", text: "Contratti e transazioni verificabili pubblicamente.", color: "from-sky-500/20 to-sky-400/5" },
  { title: "Custodia", value: "Self-custody", text: "Controllo diretto degli asset senza banca custode.", color: "from-emerald-500/20 to-emerald-400/5" },
] as const;

export function BasiDeFiModal({ isOpen, onClose }: BasiDeFiModalProps) {
  const [activeAppId, setActiveAppId] = useState<(typeof APPLICATIONS)[number]["id"]>("dex");
  const activeApp = useMemo(() => APPLICATIONS.find((a) => a.id === activeAppId) ?? APPLICATIONS[0], [activeAppId]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;
  if (typeof document === "undefined" || !document.body) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-indigo-500/20 bg-white dark:bg-indigo-950 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 dark:border-indigo-500/20 bg-white dark:bg-indigo-950 px-6 py-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Basi DeFi
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            aria-label="Chiudi"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-6 space-y-6">
          <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
            La finanza decentralizzata, o <strong>DeFi</strong>, è un sistema finanziario che funziona su blockchain, principalmente grazie agli smart contract e quindi su Ethereum e le sue Layer2. A differenza del sistema finanziario tradizionale, DeFi è aperto a tutti e non richiede intermediari come banche o broker. I prodotti DeFi permettono agli utenti di prestare o prendere in prestito fondi, guadagnare interessi, fare trading di asset digitali e assicurarsi contro i rischi, il tutto in modo trasparente e senza un ente centrale.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {QUICK_FACTS.map((fact) => (
              <div key={fact.title} className={`rounded-xl border border-slate-200 dark:border-indigo-500/20 p-3 bg-gradient-to-br ${fact.color} bg-slate-50/60 dark:bg-indigo-950/40`}>
                <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">{fact.title}</p>
                <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5">{fact.value}</p>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">{fact.text}</p>
              </div>
            ))}
          </div>

          <Accordion
            buttonText={<span className="text-[1.05rem] font-semibold text-slate-900 dark:text-white">Caratteristiche principali della DeFi</span>}
            defaultOpen
            className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-indigo-50/30 dark:bg-indigo-900/20 p-4"
          >
            <div className="text-slate-700 dark:text-slate-200 space-y-2 pl-9 pt-1 text-[0.96rem] leading-relaxed">
              <p>Decentralizzazione, trasparenza on-chain, accessibilita e interoperabilita tra protocolli.</p>
            </div>
          </Accordion>
          <Accordion
            buttonText={<span className="text-[1.05rem] font-semibold text-slate-900 dark:text-white">Principali componenti della DeFi</span>}
            className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-sky-50/30 dark:bg-sky-900/10 p-4"
          >
            <ul className="space-y-1.5 pl-14 pt-1 list-disc text-[0.96rem] leading-relaxed">
              <li className="text-slate-700 dark:text-slate-200"><b>DEX:</b> scambio token peer-to-peer.</li>
              <li className="text-slate-700 dark:text-slate-200"><b>Lending:</b> prestiti e borrow permissionless.</li>
              <li className="text-slate-700 dark:text-slate-200"><b>Stablecoin:</b> base liquida a volatilita ridotta.</li>
              <li className="text-slate-700 dark:text-slate-200"><b>Yield:</b> strategie di rendimento.</li>
            </ul>
          </Accordion>
          <Accordion
            buttonText={<span className="text-[1.05rem] font-semibold text-slate-900 dark:text-white">Vantaggi e rischi</span>}
            className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-rose-50/20 dark:bg-rose-900/10 p-4"
          >
            <div className="grid grid-cols-1 gap-2 pl-9 pt-1">
              <div className="rounded-lg border-l-4 border-emerald-400 bg-emerald-500/10 px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200">
                Vantaggi: inclusione, trasparenza, autocustodia e innovazione rapida.
              </div>
              <div className="rounded-lg border-l-4 border-rose-400 bg-rose-500/10 px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200">
                Rischi: bug smart contract, volatilita, impermanent loss e phishing.
              </div>
            </div>
          </Accordion>

          <section className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-violet-50/30 dark:bg-violet-900/10 p-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">Applicazioni DeFi interattive</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
              {APPLICATIONS.map((app) => {
                const active = app.id === activeAppId;
                return (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => setActiveAppId(app.id)}
                    className={`text-left rounded-lg border px-3 py-2.5 transition-colors ${
                      active
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700 dark:border-indigo-400 dark:bg-indigo-500/20 dark:text-indigo-200"
                        : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700 dark:border-indigo-500/20 dark:bg-indigo-950/50 dark:text-slate-200 dark:hover:bg-indigo-900/40"
                    }`}
                  >
                    <span className="text-sm font-semibold flex items-center gap-2"><span>{app.icon}</span><span>{app.title}</span></span>
                  </button>
                );
              })}
            </div>
            <div className="rounded-lg border border-slate-200 dark:border-indigo-500/30 bg-slate-50 dark:bg-indigo-950/50 p-3 space-y-2">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2"><span>{activeApp.icon}</span><span>{activeApp.title}</span></h4>
              <p className="text-sm text-slate-700 dark:text-slate-200">{activeApp.summary}</p>
              <p className="text-xs text-emerald-700 dark:text-emerald-300"><b>Cosa offre:</b> {activeApp.offers}</p>
              <p className="text-xs text-rose-700 dark:text-rose-300"><b>Rischi:</b> {activeApp.risks}</p>
              <p className="text-xs text-slate-600 dark:text-slate-300"><b>Esempi:</b> {activeApp.examples}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
