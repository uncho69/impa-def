
import Image from "next/image";
import rainbowIcon from "@/assets/rainbow-icon.png";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";

export default function RainbowPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-background">
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Image src={rainbowIcon} alt="Rainbow" width={96} height={96} />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-neutral-900">Rainbow</h1>
            <p className="text-xl text-neutral-600">
              Il wallet più colorato e user-friendly per Ethereum
            </p>
          </div>

          {/* Contenuto principale */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
              <h2 className="text-2xl font-bold mb-4 text-neutral-900">Cos'è Rainbow?</h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                Rainbow è un wallet mobile non-custodial progettato per offrire la migliore esperienza utente possibile nell'ecosistema Ethereum. Con la sua interfaccia colorata e intuitiva, rende l'uso delle criptovalute accessibile a tutti.
              </p>
              <p className="text-neutral-700 leading-relaxed">
                Disponibile solo per iOS e Android, Rainbow si concentra sulla semplicità d'uso senza compromettere la sicurezza.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
              <h2 className="text-2xl font-bold mb-4 text-neutral-900">Caratteristiche principali</h2>
              <ul className="space-y-3 text-neutral-700">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Interfaccia colorata e moderna</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Supporto completo per Ethereum e token ERC-20</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Gestione NFT integrata</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Integrazione con dApp Ethereum</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Design mobile-first</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
              <h2 className="text-2xl font-bold mb-4 text-neutral-900">Come iniziare</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Scarica l'app</h3>
                    <p className="text-neutral-700">Scarica Rainbow dall'App Store o Google Play</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Crea un wallet</h3>
                    <p className="text-neutral-700">Segui la procedura guidata per creare un nuovo wallet</p>
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
                    <p className="text-neutral-700">Ora puoi ricevere, inviare e gestire i tuoi asset Ethereum</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
              <h2 className="text-2xl font-bold mb-4 text-neutral-900">Vantaggi di Rainbow</h2>
              <div className="space-y-4 text-neutral-700">
                <p>
                  <strong>Semplicità:</strong> Rainbow è progettato per essere il più semplice possibile da usare, perfetto per principianti.
                </p>
                <p>
                  <strong>Bellezza:</strong> L'interfaccia è curata nei minimi dettagli, rendendo l'esperienza piacevole e coinvolgente.
                </p>
                <p>
                  <strong>Performance:</strong> Ottimizzato per dispositivi mobili, offre transazioni veloci e responsive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
