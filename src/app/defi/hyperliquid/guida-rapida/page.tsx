"use client";

import Link from "next/link";
import Image from "next/image";
import { MobileContainer } from "@/components/MobileContainer";
import hyperliquidIcon from "@/assets/hyperliquid-icon.png";

const SECTIONS = [
  {
    icon: "📈",
    title: "Come iniziare a fare trading",
    content: (
      <>
        <p className="text-slate-600 dark:text-slate-400 mb-3">
          Per iniziare a tradare su Hyperliquid ti servono un wallet compatibile e fondi sulla L1 (es. USDC).
        </p>
        <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600 dark:text-slate-400">
          <li>Vai su <strong className="text-slate-800 dark:text-slate-200">app.hyperliquid.xyz</strong> e connetti il wallet (MetaMask, Rabby o altro).</li>
          <li>Usa il <strong className="text-slate-800 dark:text-slate-200">bridge</strong> per trasferire fondi da Ethereum o Arbitrum alla L1 di Hyperliquid (USDC è il collaterale principale).</li>
          <li>Dopo il deposito, scegli il mercato (es. BTC-PERP, ETH-PERP), la direzione (Long/Short) e la leva.</li>
          <li>Inserisci size e tipo di ordine (Market o Limit), poi conferma. Puoi gestire posizioni, stop loss e take profit dalla dashboard.</li>
        </ol>
      </>
    ),
  },
  {
    icon: "⚡",
    title: "Come usare HyperEVM",
    content: (
      <>
        <p className="text-slate-600 dark:text-slate-400 mb-3">
          HyperEVM è l’ambiente EVM sulla L1 di Hyperliquid: puoi usare dApp e contratti compatibili con Ethereum senza cambiare chain.
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
          <li>In portafogli come <strong className="text-slate-800 dark:text-slate-200">Rabby</strong> la rete HyperEVM è spesso già visibile e aggiungibile in automatico.</li>
          <li>Se non compare, i parametri (chain ID, RPC, block explorer) si trovano su{" "}
            <a href="https://chainlist.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">ChainList</a>.
          </li>
          <li>Trasferisci fondi sulla L1 di Hyperliquid e seleziona HyperEVM per le transazioni EVM; poi collega il wallet alle dApp che la supportano.</li>
        </ul>
      </>
    ),
  },
  {
    icon: "🔒",
    title: "Come fare staking di HYPE",
    content: (
      <>
        <p className="text-slate-600 dark:text-slate-400 mb-3">
          Lo staking di HYPE contribuisce alla sicurezza della rete e può dare diritto a ricompense.
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
          <li>Accedi all’app Hyperliquid e vai alla sezione <strong className="text-slate-800 dark:text-slate-200">Staking</strong> (o equivalente nella UI).</li>
          <li>Delega i tuoi HYPE a uno o più validatori. Controlla commissioni e APY prima di scegliere.</li>
          <li>Il periodo di unbonding e le condizioni di slashing sono descritti nella documentazione ufficiale: verifica sempre le regole aggiornate.</li>
        </ul>
      </>
    ),
  },
  {
    icon: "📱",
    title: "Connetti da mobile con QR code",
    content: (
      <>
        <p className="text-slate-600 dark:text-slate-400 mb-3">
          Puoi collegare l’app Hyperliquid sul telefono al wallet su desktop tramite codice QR, per approvare operazioni dal telefono.
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
          <li>Su desktop, apri l’app Hyperliquid e avvia l’opzione <strong className="text-slate-800 dark:text-slate-200">Connetti / Login con QR</strong>.</li>
          <li>Apri l’app Hyperliquid sul telefono e seleziona <strong className="text-slate-800 dark:text-slate-200">Scansiona QR</strong>.</li>
          <li>Inquadra il QR mostrato sul desktop: la sessione verrà associata e potrai confermare le operazioni dal mobile.</li>
        </ul>
      </>
    ),
  },
  {
    icon: "📧",
    title: "Esporta il tuo email wallet",
    content: (
      <>
        <p className="text-slate-600 dark:text-slate-400 mb-3">
          Se hai creato un wallet con email (social login), è importante esportare e custodire le credenziali per non perdere l’accesso ai fondi.
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
          <li>Nell’app Hyperliquid, apri <strong className="text-slate-800 dark:text-slate-200">Impostazioni / Account</strong> e cerca l’opzione di export o backup del wallet.</li>
          <li>Segui il flusso per esportare la chiave privata o il seed phrase in modo sicuro. Non condividere mai questi dati e non inviarli via email o chat.</li>
          <li>Conserva il backup in un luogo sicuro (es. hardware wallet o supporto offline). In questo modo potrai recuperare l’accesso anche da un altro dispositivo.</li>
        </ul>
      </>
    ),
  },
  {
    icon: "🚰",
    title: "Testnet faucet",
    content: (
      <>
        <p className="text-slate-600 dark:text-slate-400 mb-3">
          Sulla testnet di Hyperliquid puoi provare la piattaforma senza usare fondi reali.
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
          <li>Accedi alla <strong className="text-slate-800 dark:text-slate-200">testnet</strong> di Hyperliquid (link disponibile nella documentazione ufficiale).</li>
          <li>Cerca la sezione <strong className="text-slate-800 dark:text-slate-200">Faucet</strong>: inserisci il tuo indirizzo wallet della testnet e richiedi token di test.</li>
          <li>Usa i token ricevuti per depositare, aprire posizioni e testare le funzioni senza rischi. I fondi di testnet non hanno valore reale.</li>
        </ul>
      </>
    ),
  },
];

/** ID video YouTube per il tutorial (vuoto = placeholder). Sostituire con ID reale quando disponibile. */
const TUTORIAL_VIDEO_ID = "";

export default function HyperliquidGuidaRapidaPage() {
  return (
    <MobileContainer>
      <div className="max-w-3xl mx-auto">
      <nav className="mb-6">
        <Link
          href="/defi/hyperliquid"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Torna a Hyperliquid
        </Link>
      </nav>

      <header className="flex items-start justify-between gap-4 mb-8 pb-6 border-b border-slate-200 dark:border-indigo-500/30">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700/80 flex items-center justify-center shrink-0">
            <Image src={hyperliquidIcon} alt="" width={44} height={44} className="object-contain" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">Guida rapida Hyperliquid</h1>
        </div>
        <div className="aspect-video w-40 shrink-0 rounded-lg border border-slate-200/80 dark:border-indigo-500/30 bg-slate-50 dark:bg-indigo-900/30 overflow-hidden flex items-center justify-center">
          {TUTORIAL_VIDEO_ID ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${TUTORIAL_VIDEO_ID}`}
              title="Tutorial Hyperliquid"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-1 p-3 text-center text-slate-400 dark:text-slate-500">
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600/50 flex items-center justify-center">
                <svg className="w-4 h-4 text-slate-500 dark:text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-[10px] font-medium">Video in arrivo</p>
            </div>
          )}
        </div>
      </header>

      {/* Guide */}
      <section>
        <h2 className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">Guide passo-passo</h2>
        <div className="space-y-4">
          {SECTIONS.map((section, i) => (
            <article
              key={i}
              className="rounded-lg border border-slate-200/80 dark:border-indigo-500/30 bg-white dark:bg-indigo-900/25 px-4 py-3.5"
            >
              <div className="flex items-start gap-3">
                <span className="text-lg shrink-0 leading-none mt-0.5 opacity-90" aria-hidden>{section.icon}</span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1.5">{section.title}</h3>
                  <div className="text-[13px] leading-relaxed text-slate-600 dark:text-slate-400">{section.content}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      </div>
    </MobileContainer>
  );
}
