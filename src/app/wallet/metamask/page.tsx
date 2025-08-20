import metamaskIcon from "@/assets/metamask-icon.svg";

export default function MetaMaskPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-background">
      <div className="container-custom py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img src={metamaskIcon} alt="MetaMask" className="w-24 h-24" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            MetaMask
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
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    Airdrop
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-neutral-200 rounded flex items-center justify-center">
                  <span className="text-neutral-600 text-sm">🔗</span>
                </div>
                <span className="text-neutral-600 font-medium">Profilo Twitter/X:</span>
                <a href="https://x.com/MetaMask" target="_blank" rel="noopener noreferrer" className="text-primary-600 underline">
                  twitter.com/MetaMask
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-neutral-200 rounded flex items-center justify-center">
                  <span className="text-neutral-600 text-sm">🔗</span>
                </div>
                <span className="text-neutral-600 font-medium">Sito Web:</span>
                <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer" className="text-primary-600 underline">
                  metamask.io/
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
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Ethereum</span>
                    <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm">Arbitrum</span>
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">Optimism</span>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Polygon</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Base</span>
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">Hyperliquid / HyperEVM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Descrizione */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200 mb-8">
          <p className="text-neutral-600 leading-relaxed text-lg">
            MetaMask è un portafoglio di criptovalute non-custodial e un&apos;estensione del browser che consente agli utenti di interagire con la blockchain di Ethereum e altre reti compatibili. Creato da ConsenSys, MetaMask è diventato uno degli strumenti più popolari per gestire criptovalute, utilizzare applicazioni decentralizzate (dApp) e gestire asset digitali in modo sicuro e intuitivo.
          </p>
        </div>

        {/* Sezioni Espandibili */}
        <div className="space-y-6">
          {/* Portafoglio di Criptovalute */}
          <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden">
            <div className="p-6 border-b border-neutral-200">
              <h3 className="text-xl font-semibold text-neutral-900 flex items-center gap-3">
                <span className="text-primary-600">▼</span>
                Portafoglio di Criptovalute
              </h3>
            </div>
            <div className="p-6">
              <ul className="space-y-3 text-neutral-600">
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 mt-1">•</span>
                  <div>
                    <strong>Supporto Multi-Chain:</strong> Oltre a Ethereum, MetaMask supporta altre blockchain compatibili con Ethereum Virtual Machine (EVM), come Binance Smart Chain, Polygon, Avalanche e altre.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 mt-1">•</span>
                  <div>
                    <strong>Gestione delle Criptovalute:</strong> Consente agli utenti di inviare, ricevere e memorizzare criptovalute come ETH, token ERC-20 e token ERC-721 (NFT).
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Interazione con dApp */}
          <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden">
            <div className="p-6 border-b border-neutral-200">
              <h3 className="text-xl font-semibold text-neutral-900 flex items-center gap-3">
                <span className="text-primary-600 border border-primary-600 rounded px-2">▼</span>
                Interazione con dApp
              </h3>
            </div>
            <div className="p-6">
              <ul className="space-y-3 text-neutral-600">
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 mt-1">•</span>
                  <div>
                    <strong>Integrazione Semplice:</strong> MetaMask facilita l&apos;accesso a una vasta gamma di applicazioni decentralizzate direttamente dal browser, inclusi scambi decentralizzati (DEX), piattaforme DeFi, marketplace NFT e giochi basati su blockchain.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 mt-1">•</span>
                  <div>
                    <strong>Autorizzazione delle Transazioni:</strong> Gli utenti possono autorizzare e gestire le transazioni dApp in modo sicuro direttamente dall&apos;estensione MetaMask.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Sicurezza e Privacy */}
          <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden">
            <div className="p-6 border-b border-neutral-200">
              <h3 className="text-xl font-semibold text-neutral-900 flex items-center gap-3">
                <span className="text-primary-600">▼</span>
                Sicurezza e Privacy
              </h3>
            </div>
            <div className="p-6">
              <ul className="space-y-3 text-neutral-600">
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 mt-1">•</span>
                  <div>
                    <strong>Autocustodia:</strong> Gli utenti mantengono il controllo completo delle loro chiavi private, che sono memorizzate localmente sul dispositivo.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 mt-1">•</span>
                  <div>
                    <strong>Frase di Recupero:</strong> MetaMask fornisce una frase di recupero (seed phrase) di 12 parole per il backup e il ripristino dell&apos;account.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 mt-1">•</span>
                  <div>
                    <strong>Autenticazione:</strong> Protezione tramite password e supporto per l&apos;autenticazione a due fattori (2FA) attraverso estensioni di terze parti.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Compatibilità con Browser e Mobile */}
          <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden">
            <div className="p-6 border-b border-neutral-200">
              <h3 className="text-xl font-semibold text-neutral-900 flex items-center gap-3">
                <span className="text-primary-600">▼</span>
                Compatibilità con Browser e Mobile
              </h3>
            </div>
            <div className="p-6">
              <ul className="space-y-3 text-neutral-600">
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 mt-1">•</span>
                  <div>
                    <strong>Estensione del Browser:</strong> Disponibile per Chrome, Firefox, Brave e Edge.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 mt-1">•</span>
                  <div>
                    <strong>App Mobile:</strong> MetaMask è disponibile anche come app mobile per iOS e Android, offrendo le stesse funzionalità della versione browser.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Integrazione con Hardware Wallet */}
          <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden">
            <div className="p-6 border-b border-neutral-200">
              <h3 className="text-xl font-semibold text-neutral-900 flex items-center gap-3">
                <span className="text-primary-600 border border-primary-600 rounded px-2">▼</span>
                Integrazione con Hardware Wallet
              </h3>
            </div>
            <div className="p-6">
              <p className="text-neutral-600">
                Supporto per Trezor e Ledger: MetaMask può essere utilizzato in combinazione con hardware wallet come Trezor e Ledger per una sicurezza aggiuntiva.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
