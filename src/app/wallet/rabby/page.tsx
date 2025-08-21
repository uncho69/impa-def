
import Image from "next/image";
import rabbyIcon from "@/assets/rabby-icon.png";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";

export default function RabbyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-background">
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Image src={rabbyIcon} alt="Rabby" width={96} height={96} />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-neutral-900">Rabby</h1>
            <p className="text-xl text-neutral-600">
              Il wallet più sicuro per DeFi e trading
            </p>
          </div>

          {/* Contenuto principale */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
              <h2 className="text-2xl font-bold mb-4 text-neutral-900">Cos'è Rabby?</h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                Rabby è un wallet non-custodial progettato specificamente per gli utenti DeFi e trading. Offre funzionalità avanzate di sicurezza e analisi delle transazioni per proteggere gli utenti da truffe e errori.
              </p>
              <p className="text-neutral-700 leading-relaxed">
                Disponibile come estensione per browser, Rabby si integra perfettamente con MetaMask e altri wallet esistenti.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
              <h2 className="text-2xl font-bold mb-4 text-neutral-900">Caratteristiche principali</h2>
              <ul className="space-y-3 text-neutral-700">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Analisi avanzata delle transazioni</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Rilevamento automatico di truffe</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Supporto multi-chain</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Integrazione con MetaMask</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Interfaccia per esperti DeFi</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
              <h2 className="text-2xl font-bold mb-4 text-neutral-900">Come iniziare</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Scarica l'estensione</h3>
                    <p className="text-neutral-700">Vai su rabby.io e scarica l'estensione per il tuo browser</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Importa il wallet</h3>
                    <p className="text-neutral-700">Importa il tuo wallet esistente o creane uno nuovo</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Configura le impostazioni</h3>
                    <p className="text-neutral-700">Personalizza le impostazioni di sicurezza e notifiche</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Inizia a usare</h3>
                    <p className="text-neutral-700">Ora puoi usare DeFi in modo più sicuro</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
              <h2 className="text-2xl font-bold mb-4 text-neutral-900">Vantaggi di Rabby</h2>
              <div className="space-y-4 text-neutral-700">
                <p>
                  <strong>Sicurezza:</strong> Rabby analizza ogni transazione per rilevare potenziali rischi e truffe.
                </p>
                <p>
                  <strong>Compatibilità:</strong> Funziona con MetaMask e altri wallet esistenti senza perdere le tue configurazioni.
                </p>
                <p>
                  <strong>Analisi:</strong> Fornisce informazioni dettagliate su ogni transazione prima dell'esecuzione.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
