"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import AutoTranslateText from "@/components/AutoTranslateText";

interface IntroduzioneMemecoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_FACTS = [
  {
    title: "Origine",
    value: "Meme + community",
    text: "Nascono da trend internet e cultura pop, spinte dalla comunita.",
    color: "from-violet-500/20 to-violet-400/5",
  },
  {
    title: "Driver principale",
    value: "Hype sociale",
    text: "Social, narrativa e sentiment influenzano molto il prezzo.",
    color: "from-sky-500/20 to-sky-400/5",
  },
  {
    title: "Rischio",
    value: "Molto alto",
    text: "Volatilita estrema, liquidita variabile e rischio scam/pump-dump.",
    color: "from-rose-500/20 to-rose-400/5",
  },
] as const;

export function IntroduzioneMemecoinModal({ isOpen, onClose }: IntroduzioneMemecoinModalProps) {
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
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Intro ai Memecoin</h2>
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
            I memecoin sono criptovalute nate come meme o contenuto virale, che possono acquisire valore
            grazie alla comunita che li sostiene. A differenza di progetti come Bitcoin o Ethereum, spesso
            non nascono da una forte innovazione tecnica ma da narrativa, intrattenimento e momentum sociale.
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
            buttonText={<span className="text-[1.05rem] font-semibold text-slate-900 dark:text-white">Cosa sono i Memecoin</span>}
            defaultOpen
            className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-indigo-50/30 dark:bg-indigo-900/20 p-4"
          >
            <div className="space-y-3 pl-9 pt-1 text-[0.96rem] leading-relaxed text-slate-700 dark:text-slate-200">
              <p>
                Sono token legati a meme internet o personaggi popolari, spesso guidati da comunita online.
                Dogecoin e l'esempio storico: nato come parodia, poi diventato un fenomeno globale.
              </p>
              <p>
                Il loro comportamento di mercato tende ad essere piu speculativo, con forti movimenti
                legati a trend social e sentiment.
              </p>
            </div>
          </Accordion>

          <Accordion
            buttonText={<span className="text-[1.05rem] font-semibold text-slate-900 dark:text-white">Caratteristiche principali</span>}
            className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-sky-50/30 dark:bg-sky-900/10 p-4"
          >
            <div className="grid grid-cols-1 gap-2 pl-9 pt-1">
              <div className="rounded-lg border-l-4 border-indigo-400 bg-indigo-500/10 px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200">
                <b>Origine e tematica:</b> meme/cultura pop e branding virale.
              </div>
              <div className="rounded-lg border-l-4 border-emerald-400 bg-emerald-500/10 px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200">
                <b>Comunita:</b> la partecipazione social e spesso il motore principale.
              </div>
              <div className="rounded-lg border-l-4 border-amber-400 bg-amber-500/10 px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200">
                <b>Volatilita e speculazione:</b> movimenti rapidi, pump e dump frequenti.
              </div>
            </div>
          </Accordion>

          <Accordion
            buttonText={<span className="text-[1.05rem] font-semibold text-slate-900 dark:text-white">Come comprare e vendere</span>}
            className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-violet-50/20 dark:bg-violet-900/10 p-4"
          >
            <div className="space-y-3 pl-9 pt-1 text-[0.96rem] leading-relaxed text-slate-700 dark:text-slate-200">
              <p><b>Su Solana:</b> usa DEX come Jupiter, inserisci contract address, conferma lo swap dal wallet.</p>
              <p><b>Su Ethereum/L2:</b> usa Uniswap o aggregatori, collega wallet, verifica contract address e slippage.</p>
            </div>
          </Accordion>

          <Accordion
            buttonText={<span className="text-[1.05rem] font-semibold text-slate-900 dark:text-white">Problemi tecnici comuni</span>}
            className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-emerald-50/20 dark:bg-emerald-900/10 p-4"
          >
            <div className="pl-9 pt-1 text-[0.96rem] leading-relaxed text-slate-700 dark:text-slate-200">
              <List>
                <li><b>Transazione bloccata:</b> controlla firma wallet, gas fee e stato pending.</li>
                <li><b>Transazione fallita:</b> verifica fondi, token corretto e slippage.</li>
                <li><b>Token non trovato:</b> ricontrolla contract address e chain selezionata.</li>
              </List>
            </div>
          </Accordion>

          <Accordion
            buttonText={<span className="text-[1.05rem] font-semibold text-slate-900 dark:text-white">Avvertenze importanti</span>}
            className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-rose-50/20 dark:bg-rose-900/10 p-4"
          >
            <div className="pl-9 pt-1 text-[0.96rem] leading-relaxed text-slate-700 dark:text-slate-200">
              <List>
                <li>I memecoin sono strumenti ad alto rischio e altissima volatilita.</li>
                <li>Molti progetti possono essere scam o schemi pump & dump.</li>
                <li>Investi solo capitale che puoi permetterti di perdere.</li>
                <li>Evita decisioni basate solo su hype, FOMO o influencer.</li>
              </List>
            </div>
          </Accordion>
        </div>
      </div>
    </div>
    </AutoTranslateText>
  );

  return createPortal(modalContent, document.body);
}

