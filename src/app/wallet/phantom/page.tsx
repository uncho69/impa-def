
import Image from "next/image";
import phantomIcon from "@/assets/phantom-icon.png";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";


export default function PhantomPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-background">
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Image src={phantomIcon} alt="Phantom" width={96} height={96} />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-neutral-900">Phantom</h1>
            <p className="text-xl text-neutral-600">
              Il wallet più popolare per l'ecosistema Solana
            </p>
          </div>

          {/* Contenuto principale */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
              <h2 className="text-2xl font-bold mb-4 text-neutral-900">Cos'è Phantom?</h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                Phantom è un wallet non-custodial progettato specificamente per l'ecosistema Solana. Offre un'esperienza utente intuitiva e moderna per gestire SOL, token SPL e NFT.
              </p>
              <p className="text-neutral-700 leading-relaxed">
                Disponibile come estensione per browser e app mobile, Phantom è diventato il wallet di riferimento per gli utenti Solana.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
              <h2 className="text-2xl font-bold mb-4 text-neutral-900">Caratteristiche principali</h2>
              <ul className="space-y-3 text-neutral-700">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Interfaccia elegante e moderna</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Supporto completo per Solana e token SPL</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Gestione NFT integrata</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Staking diretto di SOL</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Integrazione con dApp Solana</span>
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
                    <p className="text-neutral-700">Vai su phantom.app e scarica l'estensione per il tuo browser</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Crea un wallet</h3>
                    <p className="text-neutral-700">Segui la procedura guidata per creare un nuovo wallet Solana</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Salva la seed phrase</h3>
                    <p className="text-neutral-700">Scrivi e conserva in sicurezza le 12 parole di recupero</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Inizia a usare</h3>
                    <p className="text-neutral-700">Ora puoi ricevere, inviare e gestire i tuoi asset Solana</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
              <h2 className="text-2xl font-bold mb-4 text-neutral-900">Vantaggi di Solana</h2>
              <div className="space-y-4 text-neutral-700">
                <p>
                  <strong>Velocità:</strong> Solana può processare fino a 65.000 transazioni al secondo, rendendo le operazioni istantanee.
                </p>
                <p>
                  <strong>Costi bassi:</strong> Le commissioni di transazione sono estremamente basse, spesso meno di $0.01.
                </p>
                <p>
                  <strong>Ecosistema ricco:</strong> Solana ospita numerose dApp, DeFi protocols e marketplace NFT.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
