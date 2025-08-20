

export default function TrezorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-background">
      <div className="container-custom py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center border-2 border-neutral-200">
              <span className="text-red-500 text-4xl font-bold">🔒</span>
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            Trezor
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
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    Portafoglio Non-custodial (Hardware Wallet)
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-neutral-200 rounded flex items-center justify-center">
                  <span className="text-neutral-600 text-sm">🔗</span>
                </div>
                <span className="text-neutral-600 font-medium">Profilo Twitter/X:</span>
                <a href="https://x.com/Trezor" target="_blank" rel="noopener noreferrer" className="text-primary-600 underline">
                  x.com/Trezor
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-neutral-200 rounded flex items-center justify-center">
                  <span className="text-neutral-600 text-sm">🔗</span>
                </div>
                <span className="text-neutral-600 font-medium">Sito Web:</span>
                <a href="https://trezor.io/" target="_blank" rel="noopener noreferrer" className="text-primary-600 underline">
                  trezor.io/
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
                <span className="text-neutral-900">June 8, 2024</span>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-neutral-200 rounded flex items-center justify-center mt-1">
                  <span className="text-neutral-600 text-sm">📋</span>
                </div>
                <div>
                  <span className="text-neutral-600 font-medium block mb-2">Blockchain Supported:</span>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">Bitcoin</span>
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">Ethereum</span>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Solana</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Cosmos</span>
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Dogechain</span>
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">Optimism</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Arbitrum</span>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Polygon</span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Base</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Descrizione */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200 mb-8">
          <p className="text-neutral-600 leading-relaxed text-lg">
            Trezor è uno dei pionieri nel settore degli hardware wallet per criptovalute, progettato per fornire una sicurezza avanzata per la gestione delle criptovalute. Fondato da SatoshiLabs nel 2013, Trezor è diventato uno dei nomi più rispettati nel campo della sicurezza delle criptovalute, grazie alla sua affidabilità e alle sue caratteristiche avanzate.
          </p>
        </div>

        {/* Sezioni Espandibili */}
        <div className="space-y-6">
          {/* Trezor One */}
          <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden">
            <div className="p-6 border-b border-neutral-200">
              <h3 className="text-xl font-semibold text-neutral-900 flex items-center gap-3">
                <span className="text-primary-600">▼</span>
                Trezor One
              </h3>
            </div>
            <div className="p-6">
              <p className="text-neutral-600 mb-4">
                Il Trezor One è uno dei primi hardware wallet disponibili sul mercato e rimane uno dei più popolari grazie al suo equilibrio tra sicurezza e prezzo accessibile.
              </p>
              <h4 className="text-lg font-semibold text-neutral-900 mb-3">Caratteristiche:</h4>
              <ul className="space-y-2 text-neutral-600">
                <li className="flex items-start gap-3">
                  <span className="text-neutral-900 mt-1">•</span>
                  <span>Supporta oltre 1.000 criptovalute e token.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neutral-900 mt-1">•</span>
                  <span>Schermo OLED per la verifica delle transazioni.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neutral-900 mt-1">•</span>
                  <span>Protezione tramite un PIN e la frase di recupero (seed phrase) di 24 parole.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neutral-900 mt-1">•</span>
                  <span>Connessione tramite cavo USB.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neutral-900 mt-1">•</span>
                  <span>Funzionalità di autenticazione a due fattori (U2F).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neutral-900 mt-1">•</span>
                  <span>Facile da usare con l&apos;interfaccia Trezor Wallet su web.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Trezor Model T */}
          <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden">
            <div className="p-6 border-b border-neutral-200">
              <h3 className="text-xl font-semibold text-neutral-900 flex items-center gap-3">
                <span className="text-primary-600">▼</span>
                Trezor Model T
              </h3>
            </div>
            <div className="p-6">
              <p className="text-neutral-600 mb-4">
                Il Trezor Model T è la versione più avanzata del Trezor One, con funzionalità aggiuntive e una maggiore capacità di memoria. È ideale per utenti che gestiscono un portafoglio di criptovalute più diversificato.
              </p>
              <h4 className="text-lg font-semibold text-neutral-900 mb-3">Caratteristiche:</h4>
              <ul className="space-y-2 text-neutral-600">
                <li className="flex items-start gap-3">
                  <span className="text-neutral-900 mt-1">•</span>
                  <span>Supporta oltre 1.000 criptovalute e token.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neutral-900 mt-1">•</span>
                  <span>Schermo touchscreen a colori per una navigazione e verifica delle transazioni più intuitiva.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neutral-900 mt-1">•</span>
                  <span>Protezione tramite un PIN e la frase di recupero (seed phrase) di 12 o 24 parole.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neutral-900 mt-1">•</span>
                  <span>Connessione tramite cavo USB-C.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neutral-900 mt-1">•</span>
                  <span>Funzionalità di autenticazione a due fattori (U2F).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neutral-900 mt-1">•</span>
                  <span>Supporto per Shamir Backup, una tecnica di backup delle chiavi di sicurezza migliorata.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neutral-900 mt-1">•</span>
                  <span>Facilità di integrazione con applicazioni di terze parti come password manager.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Trezor Suite */}
          <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden">
            <div className="p-6 border-b border-neutral-200">
              <h3 className="text-xl font-semibold text-neutral-900 flex items-center gap-3">
                <span className="text-primary-600">▼</span>
                Trezor Suite
              </h3>
            </div>
            <div className="p-6">
              <p className="text-neutral-600 mb-4">
                Trezor Suite è un&apos;applicazione software sviluppata da SatoshiLabs per gestire le criptovalute sui dispositivi Trezor. È disponibile sia come applicazione desktop (Windows, macOS, Linux) che come applicazione web.
              </p>
              <h4 className="text-lg font-semibold text-neutral-900 mb-3">Caratteristiche:</h4>
              <ul className="space-y-2 text-neutral-600">
                <li className="flex items-start gap-3">
                  <span className="text-neutral-900 mt-1">•</span>
                  <span>Interfaccia user-friendly per la gestione e il monitoraggio delle criptovalute.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neutral-900 mt-1">•</span>
                  <span>Funzionalità di acquisto, vendita e scambio di criptovalute integrate.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neutral-900 mt-1">•</span>
                  <span>Supporto per l&apos;installazione e l&apos;aggiornamento delle applicazioni crittografiche sui dispositivi Trezor.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-neutral-900 mt-1">•</span>
                  <span>Funzionalità avanzate di sicurezza e privacy.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Sicurezza e Vantaggi */}
          <div className="bg-white rounded-2xl shadow-lg border border-neutral-200 overflow-hidden">
            <div className="p-6 border-b border-neutral-200">
              <h3 className="text-xl font-semibold text-neutral-900 flex items-center gap-3">
                <span className="text-primary-600 border border-primary-600 rounded px-2">▼</span>
                Sicurezza e Vantaggi
              </h3>
            </div>
            <div className="p-6">
              <ul className="space-y-3 text-neutral-600">
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 mt-1">•</span>
                  <div>
                    <strong>Protezione delle Chiavi Private:</strong> Le chiavi private sono memorizzate in modo sicuro all&apos;interno del dispositivo Trezor e non lasciano mai il dispositivo, proteggendo gli utenti anche se il computer o il telefono sono compromessi.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 mt-1">•</span>
                  <div>
                    <strong>Autenticazione a Due Fattori:</strong> Trezor supporta l&apos;autenticazione a due fattori per proteggere ulteriormente gli account online.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 mt-1">•</span>
                  <div>
                    <strong>Supporto Multivaluta:</strong> Trezor supporta una vasta gamma di criptovalute, rendendolo una scelta versatile per la gestione di diversi asset digitali.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 mt-1">•</span>
                  <div>
                    <strong>Shamir Backup:</strong> Disponibile sul Trezor Model T, Shamir Backup offre un metodo sicuro per il backup delle chiavi private, suddividendole in più parti che possono essere conservate separatamente.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
