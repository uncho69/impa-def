
import Image from "next/image";
import trezorIcon from "@/assets/trezor-icon.png";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";

export default function TrezorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-background">
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Image src={trezorIcon} alt="Trezor" width={96} height={96} />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-neutral-900">Trezor</h1>
            <p className="text-xl text-neutral-600">
              Il primo e più sicuro hardware wallet al mondo
            </p>
          </div>

          {/* Contenuto principale */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
              <h2 className="text-2xl font-bold mb-4 text-neutral-900">Cos'è Trezor?</h2>
              <p className="text-neutral-700 leading-relaxed mb-4">
                Trezor è il primo hardware wallet mai creato, sviluppato da SatoshiLabs nel 2014. È un dispositivo fisico che mantiene le tue chiavi private offline, offrendo il massimo livello di sicurezza per i tuoi asset digitali.
              </p>
              <p className="text-neutral-700 leading-relaxed">
                Disponibile in due modelli principali: Trezor One e Trezor Model T, entrambi offrono sicurezza di livello militare per le tue criptovalute.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
              <h2 className="text-2xl font-bold mb-4 text-neutral-900">Caratteristiche principali</h2>
              <ul className="space-y-3 text-neutral-700">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Sicurezza offline delle chiavi private</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Supporto per oltre 1.800 criptovalute</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Interfaccia web intuitiva</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Backup con seed phrase</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Integrazione con software wallet</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
              <h2 className="text-2xl font-bold mb-4 text-neutral-900">Come iniziare</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Acquista il dispositivo</h3>
                    <p className="text-neutral-700">Acquista Trezor dal sito ufficiale trezor.io</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Configura il wallet</h3>
                    <p className="text-neutral-700">Segui la procedura guidata per inizializzare il dispositivo</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Salva la seed phrase</h3>
                    <p className="text-neutral-700">Scrivi e conserva in sicurezza le 12 o 24 parole di recupero</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">Inizia a usare</h3>
                    <p className="text-neutral-700">Ora puoi ricevere, inviare e gestire i tuoi asset in sicurezza</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
              <h2 className="text-2xl font-bold mb-4 text-neutral-900">Vantaggi di Trezor</h2>
              <div className="space-y-4 text-neutral-700">
                <p>
                  <strong>Sicurezza massima:</strong> Le chiavi private rimangono sempre offline sul dispositivo fisico.
                </p>
                <p>
                  <strong>Affidabilità:</strong> Trezor è stato testato e utilizzato da milioni di utenti in tutto il mondo.
                </p>
                <p>
                  <strong>Supporto:</strong> Compatibile con la maggior parte dei software wallet e dApp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
