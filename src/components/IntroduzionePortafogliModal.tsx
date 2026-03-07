"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";

interface IntroduzionePortafogliModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_FACTS = [
  {
    title: "Controllo fondi",
    value: "Self-custody",
    text: "Hai pieno controllo delle chiavi private e quindi degli asset.",
    color: "from-indigo-500/20 to-indigo-400/5",
  },
  {
    title: "Formato",
    value: "App, extension, device",
    text: "Wallet software su app/browser o hardware wallet fisico.",
    color: "from-sky-500/20 to-sky-400/5",
  },
  {
    title: "Responsabilita",
    value: "Seed phrase",
    text: "Perdere seed/private key significa perdere l'accesso ai fondi.",
    color: "from-emerald-500/20 to-emerald-400/5",
  },
] as const;

export function IntroduzionePortafogliModal({ isOpen, onClose }: IntroduzionePortafogliModalProps) {
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
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Introduzione ai Portafogli Crypto</h2>
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
            Il wallet non-custodial (self-custody wallet) e il tuo strumento per ricevere, inviare e
            conservare crypto mantenendo il controllo diretto delle chiavi private. A differenza di banca
            o exchange custodial, nessun intermediario puo bloccare l'accesso ai tuoi fondi.
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
            buttonText={<span className="text-[1.05rem] font-semibold text-slate-900 dark:text-white">Cos'e un wallet non-custodial</span>}
            defaultOpen
            className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-indigo-50/30 dark:bg-indigo-900/20 p-4"
          >
            <div className="space-y-3 pl-9 pt-1 text-[0.96rem] leading-relaxed text-slate-700 dark:text-slate-200">
              <p>
                Un wallet non-custodial non custodisce "monete dentro l'app", ma le credenziali crittografiche
                che autorizzano operazioni sulla blockchain associate al tuo address.
              </p>
              <p>
                Puoi usarlo come app mobile, estensione browser o dispositivo hardware dedicato.
              </p>
            </div>
          </Accordion>

          <Accordion
            buttonText={<span className="text-[1.05rem] font-semibold text-slate-900 dark:text-white">Vantaggi principali</span>}
            className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-sky-50/30 dark:bg-sky-900/10 p-4"
          >
            <div className="grid grid-cols-1 gap-2 pl-9 pt-1">
              <div className="rounded-lg border-l-4 border-emerald-400 bg-emerald-500/10 px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200">
                Pieno controllo di chiavi private e fondi, senza dipendere da terze parti.
              </div>
              <div className="rounded-lg border-l-4 border-indigo-400 bg-indigo-500/10 px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200">
                Accesso diretto a dApp, DeFi, bridge, NFT e strumenti on-chain.
              </div>
              <div className="rounded-lg border-l-4 border-sky-400 bg-sky-500/10 px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200">
                Maggiore portabilita: puoi ripristinare il wallet con seed phrase su altro device.
              </div>
            </div>
          </Accordion>

          <Accordion
            buttonText={<span className="text-[1.05rem] font-semibold text-slate-900 dark:text-white">Address pubblico, private key e seed phrase</span>}
            className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-violet-50/20 dark:bg-violet-900/10 p-4"
          >
            <div className="space-y-3 pl-9 pt-1">
              <p className="text-[0.96rem] text-slate-700 dark:text-slate-200">
                <b>Address pubblico:</b> puoi condividerlo per ricevere fondi.
              </p>
              <p className="text-[0.96rem] text-slate-700 dark:text-slate-200">
                <b>Private key / seed phrase:</b> dati segreti che danno controllo totale del wallet.
              </p>
              <p className="text-[0.96rem] text-slate-700 dark:text-slate-200">
                Se perdi seed/private key o la condividi con terzi, rischi la perdita definitiva dei fondi.
              </p>
            </div>
          </Accordion>

          <Accordion
            buttonText={<span className="text-[1.05rem] font-semibold text-slate-900 dark:text-white">Software vs Hardware wallet</span>}
            className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-emerald-50/20 dark:bg-emerald-900/10 p-4"
          >
            <div className="pl-9 pt-1 text-[0.96rem] leading-relaxed text-slate-700 dark:text-slate-200">
              <List>
                <li><b>Software wallet:</b> piu rapido per uso quotidiano e interazione con dApp.</li>
                <li><b>Hardware wallet:</b> chiavi offline, migliore protezione per capitali elevati.</li>
                <li><b>Approccio consigliato:</b> hot wallet per operativita, hardware wallet per riserva.</li>
              </List>
            </div>
          </Accordion>

          <Accordion
            buttonText={<span className="text-[1.05rem] font-semibold text-slate-900 dark:text-white">Best practice di sicurezza</span>}
            className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-rose-50/20 dark:bg-rose-900/10 p-4"
          >
            <div className="pl-9 pt-1 text-[0.96rem] leading-relaxed text-slate-700 dark:text-slate-200">
              <List>
                <li>Conserva seed phrase offline, mai in cloud o screenshot.</li>
                <li>Verifica sempre URL e permessi prima di firmare transazioni.</li>
                <li>Tieni separati wallet "operativo" e wallet "cassaforte".</li>
                <li>Diffida da DM/supporto falso che chiede chiavi o seed phrase.</li>
              </List>
            </div>
          </Accordion>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

