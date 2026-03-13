"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import AutoTranslateText from "@/components/AutoTranslateText";

interface IntroduzioneNFTModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_FACTS = [
  {
    title: "Standard comuni",
    value: "ERC-721 / ERC-1155",
    text: "Gli standard principali per NFT su Ethereum e chain compatibili.",
    color: "from-indigo-500/20 to-indigo-400/5",
  },
  {
    title: "Uso principale",
    value: "Ownership digitale",
    text: "Prova verificabile di proprieta e autenticita on-chain.",
    color: "from-sky-500/20 to-sky-400/5",
  },
  {
    title: "Attenzione",
    value: "Scam & fake links",
    text: "Verifica sempre collezione ufficiale e contract address.",
    color: "from-rose-500/20 to-rose-400/5",
  },
] as const;

export function IntroduzioneNFTModal({ isOpen, onClose }: IntroduzioneNFTModalProps) {
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
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Intro ai NFTs</h2>
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
            Gli NFT (Non-Fungible Token) sono asset digitali unici registrati su blockchain.
            A differenza di token fungibili come BTC o ETH, ogni NFT e distinto e rappresenta
            ownership o autenticita di un contenuto: arte, collezionabili, musica, video,
            identita digitali e altro.
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
            buttonText={<span className="text-[1.05rem] font-semibold text-slate-900 dark:text-white">Caratteristiche principali</span>}
            defaultOpen
            className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-indigo-50/30 dark:bg-indigo-900/20 p-4"
          >
            <div className="pl-9 pt-1 text-[0.96rem] leading-relaxed text-slate-700 dark:text-slate-200">
              <List>
                <li><b>Unicita:</b> ogni NFT e unico o appartenente a una serie limitata.</li>
                <li><b>Proprieta:</b> la blockchain certifica in modo pubblico il possesso.</li>
                <li><b>Immutabilita:</b> il record on-chain non e alterabile a piacere.</li>
                <li><b>Interoperabilita:</b> trasferibile tra piattaforme che supportano lo standard.</li>
              </List>
            </div>
          </Accordion>

          <Accordion
            buttonText={<span className="text-[1.05rem] font-semibold text-slate-900 dark:text-white">Utilizzi comuni</span>}
            className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-sky-50/30 dark:bg-sky-900/10 p-4"
          >
            <div className="pl-9 pt-1 text-[0.96rem] leading-relaxed text-slate-700 dark:text-slate-200">
              <List>
                <li><b>Arte digitale:</b> opere verificabili e vendibili on-chain.</li>
                <li><b>Collezionabili:</b> profile picture collections e oggetti rari.</li>
                <li><b>Gaming:</b> item in-game, skin e asset trasferibili.</li>
                <li><b>Media:</b> accessi esclusivi per musica, video e contenuti premium.</li>
                <li><b>Mondi virtuali:</b> terreni digitali e asset metaverso.</li>
              </List>
            </div>
          </Accordion>

          <Accordion
            buttonText={<span className="text-[1.05rem] font-semibold text-slate-900 dark:text-white">Come funzionano</span>}
            className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-violet-50/20 dark:bg-violet-900/10 p-4"
          >
            <div className="pl-9 pt-1 text-[0.96rem] leading-relaxed text-slate-700 dark:text-slate-200">
              <List>
                <li><b>Minting:</b> creazione NFT e registrazione su blockchain.</li>
                <li><b>Marketplace:</b> acquisto/vendita tramite listing, offerte o aste.</li>
                <li><b>Wallet:</b> conservazione in wallet compatibili (es. MetaMask, Ledger).</li>
                <li><b>Verifica:</b> proprieta e storico consultabili pubblicamente on-chain.</li>
              </List>
            </div>
          </Accordion>

          <Accordion
            buttonText={<span className="text-[1.05rem] font-semibold text-slate-900 dark:text-white">Ethereum Name Service (ENS) NFTs</span>}
            className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-emerald-50/20 dark:bg-emerald-900/10 p-4"
          >
            <div className="space-y-2 pl-9 pt-1 text-[0.96rem] leading-relaxed text-slate-700 dark:text-slate-200">
              <p>
                ENS assegna nomi leggibili (es. `nome.eth`) ad address e contenuti decentralizzati.
                Ogni dominio ENS e un NFT unico, trasferibile e rinnovabile periodicamente.
              </p>
            </div>
          </Accordion>

          <Accordion
            buttonText={<span className="text-[1.05rem] font-semibold text-slate-900 dark:text-white">Marketplace principali e sicurezza</span>}
            className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-rose-50/20 dark:bg-rose-900/10 p-4"
          >
            <div className="space-y-3 pl-9 pt-1 text-[0.96rem] leading-relaxed text-slate-700 dark:text-slate-200">
              <p>Marketplace comuni: OpenSea, Blur, Magic Eden, SuperRare, Zora.</p>
              <p>
                Verifica sempre collezione ufficiale, contract address e link reali.
                Attenzione a phishing, bot e siti clone.
              </p>
            </div>
          </Accordion>
        </div>
      </div>
    </div>
    </AutoTranslateText>
  );

  return createPortal(modalContent, document.body);
}

