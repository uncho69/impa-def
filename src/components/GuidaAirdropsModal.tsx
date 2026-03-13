"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import AutoTranslateText from "@/components/AutoTranslateText";

interface GuidaAirdropsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIRDROP_CATEGORIES = [
  {
    id: "l2",
    icon: "⛓️",
    title: "Layer2 e Infrastructure",
    summary: "Airdrop legati a bridge, L2 e protocolli infrastrutturali.",
    actions: "Bridge, swap, wallet activity e interazioni periodiche.",
    risk: "Link fake, phishing e smart contract non verificati.",
    examples: "Base, Scroll, Linea, zkSync, Blast",
  },
  {
    id: "defi",
    icon: "💹",
    title: "DeFi e Trading",
    summary: "Protocolli trading/lending che premiano utenti attivi.",
    actions: "Volume coerente, uso continuo, varie tipologie di operazioni.",
    risk: "Fee elevate, slippage, volatilita e uso leva eccessiva.",
    examples: "Hyperliquid, Jumper, Marginfi, Syncswap",
  },
  {
    id: "social",
    icon: "🧑‍🤝‍🧑",
    title: "Social e Community",
    summary: "Progetti che valorizzano contributi social e governance.",
    actions: "Attivita social, snapshot, voto governance, task community.",
    risk: "Campagne non ufficiali o task malevoli.",
    examples: "Warpcast, Snapshot, Layer3, DeBank",
  },
] as const;

const QUICK_FACTS = [
  { title: "Range tipico", value: "$100 - $50k", text: "Dipende da criteri, tempistiche e mercato." },
  { title: "Costo principale", value: "Gas fees", text: "Spesso contenute rispetto al premio potenziale." },
  { title: "Fattore chiave", value: "Costanza", text: "Interazioni regolari battono attivita una tantum." },
] as const;

export function GuidaAirdropsModal({ isOpen, onClose }: GuidaAirdropsModalProps) {
  const [mounted, setMounted] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<(typeof AIRDROP_CATEGORIES)[number]["id"]>("l2");
  const activeCategory = useMemo(
    () => AIRDROP_CATEGORIES.find((c) => c.id === activeCategoryId) ?? AIRDROP_CATEGORIES[0],
    [activeCategoryId]
  );

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <AutoTranslateText>
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
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Guida Airdrops</h2>
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
            Un <strong>Airdrop</strong> avviene quando un progetto Web3, fino a quel momento senza token, lancia il proprio token e ne distribuisce una parte agli utenti della piattaforma. Il valore ricevuto puo variare in base alle attivita svolte, ai criteri scelti dal team e al momento di mercato.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {QUICK_FACTS.map((fact) => (
              <div key={fact.title} className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-slate-50 dark:bg-indigo-950/40 p-3">
                <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">{fact.title}</p>
                <p className="text-base font-bold text-slate-900 dark:text-white">{fact.value}</p>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{fact.text}</p>
              </div>
            ))}
          </div>

          <Accordion buttonText="Come funzionano gli Airdrops">
            <div className="text-slate-700 dark:text-slate-200 space-y-2 p-2">
              <p><strong>Alta ricompensa, basso rischio operativo:</strong> usare progetti senza token puo essere molto profittevole se fatto con metodo.</p>
              <p><strong>Costo principale:</strong> gas fees e commissioni di rete, in genere inferiori al potenziale premio.</p>
            </div>
          </Accordion>

          <Accordion buttonText="Criteri di eligibilita piu comuni">
            <div className="grid grid-cols-1 gap-2 p-2">
              <div className="rounded-lg border-l-4 border-indigo-400 bg-indigo-500/10 px-3 py-2 text-sm text-slate-700 dark:text-slate-200"><b>Volume:</b> maggiore volume, maggior peso.</div>
              <div className="rounded-lg border-l-4 border-sky-400 bg-sky-500/10 px-3 py-2 text-sm text-slate-700 dark:text-slate-200"><b>Transazioni:</b> conta la frequenza e la continuita.</div>
              <div className="rounded-lg border-l-4 border-emerald-400 bg-emerald-500/10 px-3 py-2 text-sm text-slate-700 dark:text-slate-200"><b>Periodicita:</b> uso regolare nel tempo.</div>
            </div>
          </Accordion>

          <section className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-violet-50/30 dark:bg-violet-900/10 p-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">Categorie Airdrop interattive</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
              {AIRDROP_CATEGORIES.map((c) => {
                const active = c.id === activeCategoryId;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActiveCategoryId(c.id)}
                    className={`text-left rounded-lg border px-3 py-2 transition-colors ${
                      active
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700 dark:border-indigo-400 dark:bg-indigo-500/20 dark:text-indigo-200"
                        : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700 dark:border-indigo-500/20 dark:bg-indigo-950/50 dark:text-slate-200 dark:hover:bg-indigo-900/40"
                    }`}
                  >
                    <span className="text-sm font-semibold flex items-center gap-2"><span>{c.icon}</span><span>{c.title}</span></span>
                  </button>
                );
              })}
            </div>
            <div className="rounded-lg border border-slate-200 dark:border-indigo-500/30 bg-slate-50 dark:bg-indigo-950/50 p-3 space-y-2">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2"><span>{activeCategory.icon}</span><span>{activeCategory.title}</span></h4>
              <p className="text-sm text-slate-700 dark:text-slate-200">{activeCategory.summary}</p>
              <p className="text-xs text-emerald-700 dark:text-emerald-300"><b>Azioni consigliate:</b> {activeCategory.actions}</p>
              <p className="text-xs text-rose-700 dark:text-rose-300"><b>Rischio:</b> {activeCategory.risk}</p>
              <p className="text-xs text-slate-600 dark:text-slate-300"><b>Esempi:</b> {activeCategory.examples}</p>
            </div>
          </section>

          <Accordion buttonText="Strategie per massimizzare gli Airdrops">
            <div className="space-y-2 p-2 text-slate-700 dark:text-slate-200">
              <p><b>Early adoption:</b> entra presto, testa feature beta e dai feedback.</p>
              <p><b>Attivita costante:</b> usa la piattaforma in modo regolare, non sporadico.</p>
              <p><b>Diversificazione:</b> non puntare su un solo progetto o ecosistema.</p>
            </div>
          </Accordion>

          <Accordion buttonText="Come guadagnarci in pratica">
            <div className="text-slate-700 dark:text-slate-200 space-y-2 p-2">
              <p>Combina attivita semplici ma costanti: swap, bridge, staking, utilizzo wallet e task community.</p>
              <p>La distribuzione dipende dai criteri del team: non esiste garanzia, ma la regolarita aumenta la probabilita di eleggibilita.</p>
            </div>
          </Accordion>

          <Accordion buttonText="Attenzione alle truffe">
            <List>
              <li className="text-slate-700 dark:text-slate-200">Le truffe di fake airdrop sono molto comuni.</li>
              <li className="text-slate-700 dark:text-slate-200">Non condividere mai private key o seed phrase.</li>
              <li className="text-slate-700 dark:text-slate-200">Non firmare transazioni sospette o richieste sconosciute.</li>
              <li className="text-slate-700 dark:text-slate-200">Verifica sempre link e annunci tramite canali ufficiali.</li>
              <li className="text-slate-700 dark:text-slate-200">Diffida di promesse di guadagni facili e immediati.</li>
            </List>
          </Accordion>

          <div className="rounded-xl border border-slate-200 dark:border-indigo-500/20 p-4 space-y-2">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">Risorsa utile</h3>
            <a
              href="https://www.coinbase.com/en-gb/learn/crypto-basics/what-is-a-crypto-airdrop"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Coinbase Guide: What is a Crypto Airdrop
            </a>
            <p className="text-sm text-slate-600 dark:text-slate-300">Segui i canali ufficiali dei progetti e la sezione Notizie Airdrops per aggiornamenti continui.</p>
          </div>
        </div>
      </div>
    </div>
    </AutoTranslateText>,
    document.body
  );
}
