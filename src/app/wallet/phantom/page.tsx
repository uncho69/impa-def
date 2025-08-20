
import phantomIcon from "@/assets/phantom-icon.png";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";


export default function PhantomPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-background">
      <div className="container-custom py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img src={phantomIcon.src} alt="Phantom" className="w-24 h-24" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            Phantom
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
                <a href="https://x.com/phantom" target="_blank" rel="noopener noreferrer" className="text-primary-600 underline">
                  x.com/phantom
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-neutral-200 rounded flex items-center justify-center">
                  <span className="text-neutral-600 text-sm">🔗</span>
                </div>
                <span className="text-neutral-600 font-medium">Sito Web:</span>
                <a href="https://phantom.app/" target="_blank" rel="noopener noreferrer" className="text-primary-600 underline">
                  phantom.app/
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
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">Solana</span>
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">Ethereum</span>
                    <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">Polygon</span>
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">Bitcoin</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Descrizione */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-neutral-200 mb-8">
          <p className="text-neutral-600 leading-relaxed text-lg">
            Phantom Wallet è un portafoglio di criptovalute non-custodial progettato per la gestione sicura di risorse digitali e l&apos;interazione con applicazioni decentralizzate (dApp) su blockchain come Solana, Ethereum e Polygon. Phantom è noto per la sua interfaccia user-friendly e le robuste funzionalità di sicurezza, che lo rendono una scelta popolare tra gli utenti di criptovalute.
          </p>
        </div>

                  {/* Sezioni Espandibili */}
          <div className="space-y-6">
            <Accordion buttonText="Supporto Multichain">
              <List>
                <li>
                  <strong>Blockchain Supportate:</strong> Solana, Ethereum e Polygon.
                </li>
                <li>
                  <strong>Gestione Unificata:</strong> Permette di gestire tutte le criptovalute e gli NFT in un unico portafoglio senza dover cambiare tra diverse reti.
                </li>
              </List>
            </Accordion>

            <Accordion buttonText="Sicurezza Avanzata">
              <List>
                <li>
                  <strong>Autocustodia:</strong> Gli utenti hanno il controllo completo delle loro chiavi private e Phantom non accede ai fondi degli utenti.
                </li>
                <li>
                  <strong>Rilevamento di Scam:</strong> Rileva istantaneamente e segnala transazioni sospette o malevoli.
                </li>
                <li>
                  <strong>Integrazione con Hardware Wallet:</strong> Supporto per l&apos;integrazione con hardware wallet come Ledger per una sicurezza aggiuntiva.
                </li>
              </List>
            </Accordion>

            <Accordion buttonText="Funzionalità per NFT">
              <List>
                <li>
                  <strong>Gestione Completa degli NFT:</strong> Visualizza, elenca, brucia e nasconde NFT direttamente dal portafoglio.
                </li>
                <li>
                  <strong>Mercati NFT:</strong> Accesso integrato ai principali mercati NFT per acquistare e vendere NFT facilmente.
                </li>
              </List>
            </Accordion>

            <Accordion buttonText="Token Swap e Stake">
              <List>
                <li>
                  <strong>Swapping Veloce e Economico:</strong> Permette di scambiare token rapidamente con basse commissioni direttamente dal portafoglio.
                </li>
                <li>
                  <strong>Staking:</strong> Gli utenti possono mettere in staking i loro token per guadagnare ricompense direttamente dal portafoglio.
                </li>
              </List>
            </Accordion>
        </div>
      </div>
    </div>
  );
}
