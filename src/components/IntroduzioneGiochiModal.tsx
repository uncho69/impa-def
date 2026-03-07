"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";

interface IntroduzioneGiochiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_FACTS = [
  {
    title: "Modello",
    value: "Play-to-Earn",
    text: "Possibilita di guadagnare token o NFT attraverso il gameplay.",
    color: "from-violet-500/20 to-violet-400/5",
  },
  {
    title: "Ownership",
    value: "Asset del giocatore",
    text: "Oggetti e personaggi possono essere posseduti e scambiati.",
    color: "from-emerald-500/20 to-emerald-400/5",
  },
  {
    title: "Rischio",
    value: "Alto",
    text: "Economia in-game e token possono essere molto volatili.",
    color: "from-rose-500/20 to-rose-400/5",
  },
] as const;

export function IntroduzioneGiochiModal({ isOpen, onClose }: IntroduzioneGiochiModalProps) {
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;
  if (typeof document === "undefined" || !document.body) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-indigo-500/20 bg-white dark:bg-indigo-950 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 dark:border-indigo-500/20 bg-white dark:bg-indigo-950 px-6 py-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Intro ai Giochi Web3</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            aria-label="Chiudi"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
            I giochi Web3 uniscono meccaniche di gaming con blockchain: i giocatori possono possedere
            asset digitali (NFT), scambiarli e in alcuni casi monetizzare il tempo speso nel gioco.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {QUICK_FACTS.map((fact) => (
              <div
                key={fact.title}
                className={`rounded-xl border border-slate-200 dark:border-indigo-500/20 p-3 bg-gradient-to-br ${fact.color} bg-slate-50/60 dark:bg-indigo-950/40`}
              >
                <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">{fact.title}</p>
                <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5">{fact.value}</p>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">{fact.text}</p>
              </div>
            ))}
          </div>

          <Accordion
            buttonText={<span className="text-[1.05rem] font-semibold text-slate-900 dark:text-white">Come funziona il Play-to-Earn</span>}
            defaultOpen
            className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-indigo-50/30 dark:bg-indigo-900/20 p-4"
          >
            <div className="pl-9 pt-1 text-[0.96rem] leading-relaxed text-slate-700 dark:text-slate-200">
              <List>
                <li><b>Accesso iniziale:</b> acquisto o ottenimento di asset utili per iniziare.</li>
                <li><b>Gameplay:</b> missioni, sfide e progressione nel gioco.</li>
                <li><b>Ricompense:</b> token, NFT o oggetti con valore di mercato.</li>
                <li><b>Liquidita:</b> eventuale vendita su marketplace esterni o interni.</li>
              </List>
            </div>
          </Accordion>

          <Accordion
            buttonText={<span className="text-[1.05rem] font-semibold text-slate-900 dark:text-white">Vantaggi dei giochi Web3</span>}
            className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-emerald-50/20 dark:bg-emerald-900/10 p-4"
          >
            <div className="pl-9 pt-1 text-[0.96rem] leading-relaxed text-slate-700 dark:text-slate-200">
              <List>
                <li><b>Proprieta reale:</b> gli asset sono nel wallet del giocatore.</li>
                <li><b>Trasparenza:</b> transazioni e ownership verificabili on-chain.</li>
                <li><b>Interoperabilita:</b> in alcuni casi asset riutilizzabili tra ecosistemi.</li>
                <li><b>Community:</b> forte componente sociale e governance.</li>
              </List>
            </div>
          </Accordion>

          <Accordion
            buttonText={<span className="text-[1.05rem] font-semibold text-slate-900 dark:text-white">Rischi e best practice</span>}
            className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-rose-50/20 dark:bg-rose-900/10 p-4"
          >
            <div className="pl-9 pt-1 text-[0.96rem] leading-relaxed text-slate-700 dark:text-slate-200">
              <List>
                <li>Controlla sempre il progetto e il team prima di investire.</li>
                <li>Evita di basare scelte solo su hype o promesse di guadagni rapidi.</li>
                <li>Usa wallet sicuri e proteggi seed phrase e chiavi private.</li>
                <li>Considera i costi di rete e la volatilita dell economia di gioco.</li>
              </List>
            </div>
          </Accordion>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

