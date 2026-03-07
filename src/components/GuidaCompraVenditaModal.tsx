"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";

interface GuidaCompraVenditaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_FACTS = [
  {
    title: "Metodo classico",
    value: "CEX",
    text: "Depositi euro, compri crypto e poi le invii su wallet personale.",
    color: "from-sky-500/20 to-sky-400/5",
  },
  {
    title: "Metodo diretto",
    value: "On/Off-Ramp",
    text: "Acquisto con carta e arrivo diretto su wallet non-custodial.",
    color: "from-indigo-500/20 to-indigo-400/5",
  },
  {
    title: "Regola base",
    value: "Self-custody",
    text: "Private key e seed phrase sono sempre responsabilita dell'utente.",
    color: "from-emerald-500/20 to-emerald-400/5",
  },
] as const;

export function GuidaCompraVenditaModal({ isOpen, onClose }: GuidaCompraVenditaModalProps) {
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
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Come Comprare e Vendere Crypto</h2>
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
            Per comprare e vendere crypto in modo sicuro puoi seguire due percorsi principali:
            usare una <strong>exchange centralizzata (CEX)</strong> oppure una <strong>on/off-ramp</strong>.
            In entrambi i casi l'obiettivo finale e trasferire i fondi su un wallet non-custodial
            quando vuoi avere controllo diretto degli asset.
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
            buttonText={<span className="text-[1.05rem] font-semibold text-slate-900 dark:text-white">Exchange Centralizzate (CEX)</span>}
            defaultOpen
            className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-indigo-50/30 dark:bg-indigo-900/20 p-4"
          >
            <div className="space-y-3 pl-9 pt-1 text-[0.96rem] leading-relaxed text-slate-700 dark:text-slate-200">
              <p>
                Le CEX ti permettono di depositare fondi da conto bancario o carta e convertire in crypto.
                Sono spesso il punto di ingresso piu semplice per iniziare.
              </p>
              <p>
                Dopo l'acquisto, la pratica consigliata e trasferire gli asset su wallet non-custodial
                (self-custody), soprattutto per hold di medio-lungo periodo.
              </p>
            </div>
          </Accordion>

          <Accordion
            buttonText={<span className="text-[1.05rem] font-semibold text-slate-900 dark:text-white">On/Off-Ramps</span>}
            className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-sky-50/30 dark:bg-sky-900/10 p-4"
          >
            <div className="space-y-3 pl-9 pt-1 text-[0.96rem] leading-relaxed text-slate-700 dark:text-slate-200">
              <p>
                Le on-ramp permettono acquisto diretto da fiat a crypto con accredito sul wallet Web3.
                Le off-ramp fanno il percorso opposto: da crypto a valuta fiat.
              </p>
              <p>
                Sono utili quando vuoi evitare passaggi intermedi e operare direttamente on-chain,
                mantenendo comunque attenzione a fee, spread e rete selezionata.
              </p>
            </div>
          </Accordion>

          <Accordion
            buttonText={<span className="text-[1.05rem] font-semibold text-slate-900 dark:text-white">Piattaforme disponibili</span>}
            className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-violet-50/20 dark:bg-violet-900/10 p-4"
          >
            <div className="pl-9 pt-1 text-[0.96rem] leading-relaxed text-slate-700 dark:text-slate-200">
              <p className="mb-3">Nella sezione sotto alla search trovi le piattaforme principali:</p>
              <List>
                <li><b>CEX:</b> Coinbase, Kraken, Binance, Crypto.com, Young Platform</li>
                <li><b>On/Off-Ramp:</b> Holyheld, Wirex, Transak</li>
              </List>
            </div>
          </Accordion>

          <Accordion
            buttonText={<span className="text-[1.05rem] font-semibold text-slate-900 dark:text-white">Procedura consigliata step-by-step</span>}
            className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-emerald-50/20 dark:bg-emerald-900/10 p-4"
          >
            <ol className="space-y-1.5 pl-14 pt-1 list-decimal text-[0.96rem] leading-relaxed">
              <li className="text-slate-700 dark:text-slate-200">Scegli piattaforma in base a paese, costi e metodi di pagamento.</li>
              <li className="text-slate-700 dark:text-slate-200">Completa KYC dove richiesto e abilita 2FA.</li>
              <li className="text-slate-700 dark:text-slate-200">Acquista la crypto desiderata con importo graduale.</li>
              <li className="text-slate-700 dark:text-slate-200">Verifica rete e address prima di inviare al wallet personale.</li>
              <li className="text-slate-700 dark:text-slate-200">Conserva seed phrase/private key offline e mai condivisa.</li>
            </ol>
          </Accordion>

          <Accordion
            buttonText={<span className="text-[1.05rem] font-semibold text-slate-900 dark:text-white">Sicurezza e best practice</span>}
            className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-rose-50/20 dark:bg-rose-900/10 p-4"
          >
            <div className="grid grid-cols-1 gap-2 pl-9 pt-1">
              <div className="rounded-lg border-l-4 border-emerald-400 bg-emerald-500/10 px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200">
                Usa sempre 2FA, whitelist degli indirizzi e password uniche.
              </div>
              <div className="rounded-lg border-l-4 border-amber-400 bg-amber-500/10 px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200">
                Controlla rete, memo/tag e importo minimo prima dei transfer.
              </div>
              <div className="rounded-lg border-l-4 border-rose-400 bg-rose-500/10 px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200">
                Non condividere mai seed phrase/private key: nessun supporto legittimo la richiede.
              </div>
            </div>
          </Accordion>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

