
import rabbyIcon from "@/assets/rabby-icon.png";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";

export default function RabbyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-background">
      <div className="container-custom py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img src={rabbyIcon.src} alt="Rabby" className="w-24 h-24" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            Rabby
          </h1>
        </div>

        {/* Informazioni Principali */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-neutral-200 rounded flex items-center justify-center">
                  <span className="text-neutral-600 text-sm">📋</span>
                </div>
                <span className="text-neutral-600 font-medium">Tags:</span>
                <div className="flex gap-2">
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                    Portafoglio &apos;Wallet&apos; Non-custodial (Extension)
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-neutral-200 rounded flex items-center justify-center">
                  <span className="text-neutral-600 text-sm">🔗</span>
                </div>
                <span className="text-neutral-600 font-medium">Profilo Twitter/X:</span>
                <a href="https://x.com/Rabby_io" target="_blank" rel="noopener noreferrer" className="text-primary-600 underline">
                  x.com/Rabby_io
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-neutral-200 rounded flex items-center justify-center">
                  <span className="text-neutral-600 text-sm">🔗</span>
                </div>
                <span className="text-neutral-600 font-medium">Sito Web:</span>
                <a href="https://rabby.io/" target="_blank" rel="noopener noreferrer" className="text-primary-600 underline">
                  rabby.io/
                </a>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-neutral-200 rounded flex items-center justify-center">
                  <span className="text-neutral-600 text-sm">🔗</span>
                </div>
                <span className="text-neutral-600 font-medium">Token/NFT:</span>
                <span className="text-neutral-400">Empty</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-neutral-200 rounded flex items-center justify-center">
                  <span className="text-neutral-600 text-sm">📅</span>
                </div>
                <span className="text-neutral-600 font-medium">Last Updated:</span>
                <span className="text-neutral-900">May 28, 2024</span>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-neutral-200 rounded flex items-center justify-center mt-1">
                  <span className="text-neutral-600 text-sm">📋</span>
                </div>
                <div>
                  <span className="text-neutral-600 font-medium block mb-2">Blockchain Supported:</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">Ethereum</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Arbitrum</span>
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">Optimism</span>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Polygon</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Base</span>
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">Hyperliquid / HyperEVM</span>
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">BSC</span>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Avalanche</span>
                    <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">Zora</span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Fantom</span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">zkSync</span>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">Linea</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Gnosis</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Descrizione */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200 mb-8">
          <p className="text-neutral-600 leading-relaxed text-lg">
            Rabby Wallet è un&apos;estensione open-source per browser e un&apos;app companion per smartphone, progettata per gestire criptovalute su Ethereum e tutte le chain EVM in modo semplice, sicuro e intuitivo. Oltre alla versione desktop, l&apos;app Rabby Mobile (disponibile sia su Android che su iOS) consente di monitorare il portafoglio multi-chain, scoprire dApp e gestire transazioni direttamente dal browser.
          </p>
        </div>

        {/* Sezioni Espandibili */}
        <div className="space-y-6">
            <Accordion buttonText="Supporto per Vari Asset">
              <p className="text-neutral-600">
                Rabby Wallet supporta un&apos;ampia gamma di criptovalute, consentendo agli utenti di gestire diverse valute digitali all&apos;interno di un&apos;unica interfaccia user-friendly.
              </p>
            </Accordion>

            <Accordion buttonText="Sicurezza Avanzata">
              <List>
                <li>
                  <strong>Transazioni Simulate:</strong> Rabby Wallet include una funzionalità di simulazione delle transazioni che informa gli utenti sulle possibili implicazioni delle loro operazioni prima di confermarle. Questo aiuta a prevenire errori costosi e a proteggere contro transazioni fraudolente.
                </li>
                <li>
                  <strong>Avvisi di Sicurezza:</strong> Il portafoglio avvisa gli utenti di possibili transazioni di scam, come attacchi di dusting o transazioni di asset falsi, e di altri problemi di sicurezza prima della conferma finale delle transazioni.
                </li>
              </List>
            </Accordion>

            <Accordion buttonText="Interfaccia User-Friendly">
              <p className="text-neutral-600">
                Progettato per essere semplice da utilizzare sia per i principianti che per gli utenti esperti, Rabby Wallet rende la gestione delle criptovalute e le interazioni con le dApp intuitive e senza problemi.
              </p>
            </Accordion>

            <Accordion buttonText="Funzionalità di Swap e Gas Top-Up">
              <List>
                <li>
                  <strong>Token Swap:</strong> Rabby Wallet permette di scambiare token direttamente all&apos;interno del portafoglio, collegandosi a diversi exchange decentralizzati e centralizzati per completare gli swap senza dover uscire dall&apos;app.
                </li>
                <li>
                  <strong>Gas Top-Up:</strong> Gli utenti possono acquistare token gas per una rete specifica utilizzando altri asset sulla stessa rete o su altre reti, rendendo facile ricaricare il proprio wallet senza dover utilizzare exchange esterni.
                </li>
              </List>
            </Accordion>

            <Accordion buttonText="Compatibilità Multi-Piattaforma">
              <List>
                <li>
                  <strong>Estensione del Browser:</strong> Disponibile come estensione per i principali browser come Chrome, Firefox, e Brave.
                </li>
                <li>
                  <strong>Applicazione Mobile:</strong> Rabby Wallet è disponibile anche per dispositivi mobili Android, mentre la versione per iOS è ancora in fase di revisione. È importante verificare di scaricare l&apos;app dal sito ufficiale per evitare versioni false.
                </li>
              </List>
            </Accordion>
        </div>
      </div>
    </div>
  );
}
