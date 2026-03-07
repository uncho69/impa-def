"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Accordion } from "@/components/Accordion";

interface IntroduzioneBlockchainModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_FACTS = [
  {
    title: "Tipo di rete",
    value: "Layer 1 + Layer 2",
    text: "Le L1 garantiscono sicurezza, le L2 migliorano velocita e costi.",
    color: "from-sky-500/20 to-sky-400/5",
  },
  {
    title: "Disponibilita",
    value: "24/7",
    text: "Transazioni e applicazioni attive in modo continuo.",
    color: "from-indigo-500/20 to-indigo-400/5",
  },
  {
    title: "Verificabilita",
    value: "On-chain",
    text: "Dati e transazioni pubblici e controllabili da chiunque.",
    color: "from-emerald-500/20 to-emerald-400/5",
  },
] as const;

const BLOCKCHAIN_TRACKS = [
  {
    id: "bitcoin",
    icon: "🟠",
    title: "Bitcoin e settlement layer",
    summary: "Focus su sicurezza, immutabilita e trasferimento di valore.",
    strengths: "Elevata robustezza, politica monetaria trasparente.",
    limits: "Programmabilita limitata e throughput ridotto.",
    examples: "Bitcoin, Lightning Network",
  },
  {
    id: "smart-contract",
    icon: "🔷",
    title: "Smart contract platform",
    summary: "Reti general purpose per dApp, DeFi, NFT e governance.",
    strengths: "Ecosistema sviluppatori ampio e forte composabilita.",
    limits: "Fee variabili e complessita tecnica maggiore.",
    examples: "Ethereum, Solana, Avalanche",
  },
  {
    id: "layer2",
    icon: "⚡",
    title: "Layer 2 e scalabilita",
    summary: "Esecuzione off-chain con sicurezza ancorata alla mainnet.",
    strengths: "Commissioni ridotte e maggiore capacita transazionale.",
    limits: "Bridge risk, UX frammentata, differenze tra stack.",
    examples: "Arbitrum, Optimism, Base, zkSync, Linea",
  },
] as const;

const WALLET_SECURITY_RULES = [
  "La private key o seed phrase non va mai condivisa in chat, email o screenshot.",
  "L'address pubblico si puo condividere per ricevere fondi, non da accesso al wallet.",
  "Conferma sempre rete e address prima di inviare: una transazione errata e irreversibile.",
  "Per importi elevati usa hardware wallet e backup offline della seed phrase.",
] as const;

export function IntroduzioneBlockchainModal({ isOpen, onClose }: IntroduzioneBlockchainModalProps) {
  const [activeTrackId, setActiveTrackId] = useState<(typeof BLOCKCHAIN_TRACKS)[number]["id"]>("bitcoin");
  const activeTrack = useMemo(
    () => BLOCKCHAIN_TRACKS.find((t) => t.id === activeTrackId) ?? BLOCKCHAIN_TRACKS[0],
    [activeTrackId]
  );

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
            Introduzione alle Blockchain
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
            La blockchain e un registro digitale condiviso tra migliaia di nodi, progettato per essere
            resistente alla manomissione e verificabile pubblicamente. Nata con Bitcoin, oggi e la base
            di ecosistemi completi: pagamenti, DeFi, NFT, identita digitale e applicazioni decentralizzate.
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
            buttonText={<span className="text-[1.05rem] font-semibold text-slate-900 dark:text-white">Cos'e una Blockchain?</span>}
            defaultOpen
            className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-indigo-50/30 dark:bg-indigo-900/20 p-4"
          >
            <div className="text-slate-700 dark:text-slate-200 space-y-3 pl-9 pt-1 text-[0.96rem] leading-relaxed">
              <p>
                Una blockchain registra transazioni in blocchi collegati in ordine cronologico tramite hash
                crittografici. Ogni blocco confermato diventa parte della storia della rete.
              </p>
              <p>
                L'assenza di un ente centrale riduce i punti singoli di fallimento e rende il sistema piu trasparente:
                chiunque puo verificare lo stato della rete senza chiedere autorizzazioni.
              </p>
            </div>
          </Accordion>

          <Accordion
            buttonText={<span className="text-[1.05rem] font-semibold text-slate-900 dark:text-white">Come funziona in pratica</span>}
            className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-sky-50/30 dark:bg-sky-900/10 p-4"
          >
            <ol className="space-y-1.5 pl-14 pt-1 list-decimal text-[0.96rem] leading-relaxed">
              <li className="text-slate-700 dark:text-slate-200"><b>Invio:</b> un utente firma una transazione con la propria chiave privata.</li>
              <li className="text-slate-700 dark:text-slate-200"><b>Propagazione:</b> la transazione viene distribuita ai nodi della rete.</li>
              <li className="text-slate-700 dark:text-slate-200"><b>Consenso:</b> validatori/miner verificano regole e stato.</li>
              <li className="text-slate-700 dark:text-slate-200"><b>Finalizzazione:</b> la transazione entra in blocco e diventa parte del ledger.</li>
            </ol>
          </Accordion>

          <Accordion
            buttonText={<span className="text-[1.05rem] font-semibold text-slate-900 dark:text-white">Vantaggi e limiti</span>}
            className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-emerald-50/20 dark:bg-emerald-900/10 p-4"
          >
            <div className="grid grid-cols-1 gap-2 pl-9 pt-1">
              <div className="rounded-lg border-l-4 border-emerald-400 bg-emerald-500/10 px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200">
                <b>Vantaggi:</b> trasparenza, auditabilita, resistenza alla censura, accesso globale.
              </div>
              <div className="rounded-lg border-l-4 border-amber-400 bg-amber-500/10 px-3 py-2.5 text-sm text-slate-700 dark:text-slate-200">
                <b>Limiti:</b> UX ancora complessa, errori irreversibili, rischio smart contract e bridge.
              </div>
            </div>
          </Accordion>

          <Accordion
            buttonText={<span className="text-[1.05rem] font-semibold text-slate-900 dark:text-white">Applicazioni e casi d'uso</span>}
            className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-violet-50/20 dark:bg-violet-900/10 p-4"
          >
            <ul className="space-y-1.5 pl-14 pt-1 list-disc text-[0.96rem] leading-relaxed">
              <li className="text-slate-700 dark:text-slate-200"><b>Pagamenti:</b> trasferimenti globali e settlement trasparente.</li>
              <li className="text-slate-700 dark:text-slate-200"><b>DeFi:</b> lending, trading, derivati e gestione della liquidita.</li>
              <li className="text-slate-700 dark:text-slate-200"><b>Identita e certificati:</b> attestazioni verificabili e anti-tamper.</li>
              <li className="text-slate-700 dark:text-slate-200"><b>Supply chain:</b> tracciabilita end-to-end di processi e merci.</li>
            </ul>
          </Accordion>

          <Accordion
            buttonText={<span className="text-[1.05rem] font-semibold text-slate-900 dark:text-white">Layer 2: perche sono importanti</span>}
            className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-rose-50/20 dark:bg-rose-900/10 p-4"
          >
            <div className="text-slate-700 dark:text-slate-200 space-y-2 pl-9 pt-1 text-[0.96rem] leading-relaxed">
              <p>
                Le Layer 2 eseguono le transazioni fuori dalla chain principale e pubblicano prove o dati
                compressi sulla Layer 1, riducendo i costi senza rinunciare alla sicurezza di base.
              </p>
              <p>
                Le famiglie principali sono <b>Optimistic Rollup</b> e <b>ZK Rollup</b>. Le prime puntano su semplicita
                ed ecosistema maturo, le seconde su finalita rapida e validazione crittografica.
              </p>
            </div>
          </Accordion>

          <Accordion
            buttonText={<span className="text-[1.05rem] font-semibold text-slate-900 dark:text-white">Wallet: address pubblico e chiave privata</span>}
            className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-amber-50/20 dark:bg-amber-900/10 p-4"
          >
            <div className="space-y-3 pl-9 pt-1">
              <p className="text-[0.96rem] leading-relaxed text-slate-700 dark:text-slate-200">
                Un wallet non custodial non conserva "monete dentro l'app": conserva le chiavi che ti permettono
                di firmare operazioni sulla blockchain e dimostrare che controlli un certo address.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="rounded-lg border border-emerald-300/60 bg-emerald-500/10 px-3 py-2.5">
                  <p className="text-xs uppercase tracking-wide text-emerald-700 dark:text-emerald-300">Address pubblico</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1">Come un IBAN pubblico</p>
                  <p className="text-xs text-slate-700 dark:text-slate-200 mt-1">
                    Serve per ricevere fondi e puo essere condiviso. E visibile on-chain e non e segreto.
                  </p>
                </div>
                <div className="rounded-lg border border-rose-300/60 bg-rose-500/10 px-3 py-2.5">
                  <p className="text-xs uppercase tracking-wide text-rose-700 dark:text-rose-300">Private key / seed phrase</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1">La password reale dei fondi</p>
                  <p className="text-xs text-slate-700 dark:text-slate-200 mt-1">
                    Chi la possiede controlla il wallet. Se la perdi o la esponi, puoi perdere l'accesso ai fondi.
                  </p>
                </div>
              </div>
              <ul className="space-y-1.5 list-disc pl-5">
                {WALLET_SECURITY_RULES.map((rule) => (
                  <li key={rule} className="text-[0.9rem] text-slate-700 dark:text-slate-200 leading-relaxed">
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </Accordion>

          <section className="rounded-xl border border-slate-200 dark:border-indigo-500/20 bg-indigo-50/20 dark:bg-indigo-900/10 p-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">Panoramica ecosistemi blockchain</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
              {BLOCKCHAIN_TRACKS.map((track) => {
                const active = track.id === activeTrackId;
                return (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => setActiveTrackId(track.id)}
                    className={`text-left rounded-lg border px-3 py-2 transition-colors ${
                      active
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700 dark:border-indigo-400 dark:bg-indigo-500/20 dark:text-indigo-200"
                        : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700 dark:border-indigo-500/20 dark:bg-indigo-950/50 dark:text-slate-200 dark:hover:bg-indigo-900/40"
                    }`}
                  >
                    <span className="text-sm font-semibold flex items-center gap-2">
                      <span>{track.icon}</span>
                      <span>{track.title}</span>
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="rounded-lg border border-slate-200 dark:border-indigo-500/30 bg-slate-50 dark:bg-indigo-950/50 p-3 space-y-2">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>{activeTrack.icon}</span>
                <span>{activeTrack.title}</span>
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-200">{activeTrack.summary}</p>
              <p className="text-xs text-emerald-700 dark:text-emerald-300"><b>Punti forti:</b> {activeTrack.strengths}</p>
              <p className="text-xs text-rose-700 dark:text-rose-300"><b>Limiti:</b> {activeTrack.limits}</p>
              <p className="text-xs text-slate-600 dark:text-slate-300"><b>Esempi:</b> {activeTrack.examples}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
