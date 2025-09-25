import { MobileContainer } from "@/components/MobileContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import Image from "next/image";
import ethereumIcon from "@/assets/ethereum-icon.svg";
// Loghi delle reti supportate
import arbitrumIcon from "@/assets/arbitrum-arb-logo.svg";
import optimismIcon from "@/assets/optimism-ethereum-op-logo.svg";
import polygonIcon from "@/assets/polygon-matic-logo.svg";
import baseIcon from "@/assets/base-logo.svg";

export default function Ethereum() {
  return (
    <ProtectedRoute title="Ethereum">
      <MobileContainer>
        <div className="flex items-center gap-4 mb-6">
          <Image src={ethereumIcon} alt="Ethereum" width={64} height={64} />
          <div>
            <SectionTitle>Ethereum</SectionTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                Blockchain
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                Smart Contracts
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                PoS
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                DeFi
              </span>
            </div>
          </div>
        </div>

        <SectionBody>
          <strong>Ethereum</strong> è una blockchain che consente la creazione e l'esecuzione di smart contract 
          e applicazioni decentralizzate (dApp) senza alcuna interruzione, frode, controllo o interferenza 
          da parte di terzi. Fondata da Vitalik Buterin nel 2015, Ethereum ha rivoluzionato il mondo delle 
          criptovalute andando oltre il semplice trasferimento di valore per abilitare un'intera economia 
          di applicazioni decentralizzate.
        </SectionBody>

        <SectionTitle>Caratteristiche Principali</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Ether (ETH)">
            <p>Contenuto da aggiungere...</p>
          </Accordion>

          <Accordion buttonText="Smart Contracts">
            <p>Contenuto da aggiungere...</p>
          </Accordion>

          <Accordion buttonText="dApp (Applicazioni Decentralizzate)">
            <p>Contenuto da aggiungere...</p>
          </Accordion>

          <Accordion buttonText="Ethereum Virtual Machine (EVM)">
            <p>Contenuto da aggiungere...</p>
          </Accordion>

          <Accordion buttonText="Decentralizzazione">
            <p>Contenuto da aggiungere...</p>
          </Accordion>

          <Accordion buttonText="Ethereum 2.0 (Eth2)">
            <p>Contenuto da aggiungere...</p>
          </Accordion>

          <Accordion buttonText="Vantaggi di Ethereum">
            <p>Contenuto da aggiungere...</p>
          </Accordion>
        </SectionBody>

        <SectionTitle>Ecosistema Ethereum</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Introduzione ad Ethereum">
            <Accordion buttonText="Ether (ETH)">
              <p>Contenuto da aggiungere...</p>
            </Accordion>
            <Accordion buttonText="Smart Contracts">
              <p>Contenuto da aggiungere...</p>
            </Accordion>
            <Accordion buttonText="dApp (Applicazioni Decentralizzate)">
              <p>Contenuto da aggiungere...</p>
            </Accordion>
            <Accordion buttonText="Ethereum Virtual Machine (EVM)">
              <p>Contenuto da aggiungere...</p>
            </Accordion>
            <Accordion buttonText="Decentralizzazione">
              <p>Contenuto da aggiungere...</p>
            </Accordion>
            <Accordion buttonText="Ethereum 2.0 (Eth2)">
              <p>Contenuto da aggiungere...</p>
            </Accordion>
            <Accordion buttonText="Vantaggi di Ethereum">
              <p>Contenuto da aggiungere...</p>
            </Accordion>
          </Accordion>

          <Accordion buttonText="Applicazioni su Ethereum">
            <Accordion buttonText="Exchange Decentralizzate">
              <p>Contenuto da aggiungere...</p>
            </Accordion>
            <Accordion buttonText="Derivati (margin trading)">
              <p>Contenuto da aggiungere...</p>
            </Accordion>
            <Accordion buttonText="Prestiti">
              <p>Contenuto da aggiungere...</p>
            </Accordion>
            <Accordion buttonText="Rendimenti">
              <p>Contenuto da aggiungere...</p>
            </Accordion>
            <Accordion buttonText="Stablecoins">
              <p>Contenuto da aggiungere...</p>
            </Accordion>
            <Accordion buttonText="Staking liquido (LST)">
              <p>Contenuto da aggiungere...</p>
            </Accordion>
          </Accordion>
        </SectionBody>

        <SectionTitle>Tutorial</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Video Tutorial">
            <div className="w-full max-w-2xl mx-auto">
              <iframe
                width="100%"
                height="200"
                src="https://www.youtube.com/embed/K4TOrB7at0Y?si=vOBf2_Kw_RkdMPph"
                title="Ethereum Tutorial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
          </Accordion>
        </SectionBody>

        <SectionTitle>Informazioni Aggiuntive</SectionTitle>
        <SectionBody>
          <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Reti Supportate */}
              <div className="bg-white rounded-lg p-4 border border-neutral-200 shadow-sm">
                <h3 className="font-semibold text-neutral-900 mb-3">Reti Supportate</h3>
                <p className="text-neutral-600 text-sm mb-4">
                  Ethereum supporta le principali reti EVM, permettendoti di operare su diverse blockchain.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Image 
                    src={ethereumIcon} 
                    alt="Ethereum" 
                    className="w-8 h-8 hover:scale-110 transition-transform duration-300"
                    width={32}
                    height={32}
                  />
                  <Image 
                    src={arbitrumIcon} 
                    alt="Arbitrum" 
                    className="w-8 h-8 hover:scale-110 transition-transform duration-300"
                    width={32}
                    height={32}
                  />
                  <Image 
                    src={optimismIcon} 
                    alt="Optimism" 
                    className="w-8 h-8 hover:scale-110 transition-transform duration-300"
                    width={32}
                    height={32}
                  />
                  <Image 
                    src={polygonIcon} 
                    alt="Polygon" 
                    className="w-8 h-8 hover:scale-110 transition-transform duration-300"
                    width={32}
                    height={32}
                  />
                  <Image 
                    src={baseIcon} 
                    alt="Base" 
                    className="w-8 h-8 hover:scale-110 transition-transform duration-300"
                    width={32}
                    height={32}
                  />
                </div>
              </div>

              {/* Link Utili */}
              <div className="bg-white rounded-lg p-4 border border-neutral-200 shadow-sm">
                <h3 className="font-semibold text-neutral-900 mb-3">Link Utili</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-neutral-600">🌐</span>
                    <a 
                      href="https://ethereum.org/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline text-sm"
                    >
                      Sito Web
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-neutral-600">🐦</span>
                    <a 
                      href="https://x.com/ethereum" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline text-sm"
                    >
                      Twitter/X
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-neutral-600">📊</span>
                    <a 
                      href="https://coinmarketcap.com/currencies/ethereum/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline text-sm"
                    >
                      Token ETH
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
    </ProtectedRoute>
  );
}