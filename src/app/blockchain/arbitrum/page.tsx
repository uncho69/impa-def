import { MobileContainer } from "@/components/MobileContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import Image from "next/image";
import arbitrumIcon from "@/assets/arbitrum-arb-logo.svg";

export default function Arbitrum() {
  return (
    <MobileContainer>
        <div className="flex items-center gap-4 mb-6">
          <Image src={arbitrumIcon} alt="Arbitrum" width={64} height={64} />
          <div>
            <SectionTitle>Arbitrum</SectionTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                Layer 2
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                Optimistic Rollup
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                Low Fees
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                EVM Compatible
              </span>
            </div>
          </div>
        </div>

        <SectionBody>
          <strong>Arbitrum</strong> è una soluzione Layer 2 per Ethereum che utilizza la tecnologia Optimistic Rollup 
          per offrire transazioni più veloci e a basso costo mantenendo la sicurezza di Ethereum. Sviluppata da 
          Offchain Labs, Arbitrum permette agli sviluppatori di eseguire smart contract compatibili con EVM 
          senza modificare il codice, riducendo drasticamente le commissioni di gas.
        </SectionBody>

        <SectionTitle>Caratteristiche Principali</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Cos'è Arbitrum?">
            <p>Contenuto da aggiungere...</p>
          </Accordion>

          <Accordion buttonText="Optimistic Rollup">
            <p>Contenuto da aggiungere...</p>
          </Accordion>

          <Accordion buttonText="Compatibilità EVM">
            <p>Contenuto da aggiungere...</p>
          </Accordion>

          <Accordion buttonText="Commissioni Basse">
            <p>Contenuto da aggiungere...</p>
          </Accordion>

          <Accordion buttonText="Portafogli (Wallet) Supportati">
            <p>Contenuto da aggiungere...</p>
          </Accordion>

          <Accordion buttonText="Sicurezza e Decentralizzazione">
            <p>Contenuto da aggiungere...</p>
          </Accordion>

          <Accordion buttonText="Ecosistema DeFi">
            <p>Contenuto da aggiungere...</p>
          </Accordion>
        </SectionBody>

        <SectionTitle>Ecosistema Arbitrum</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Introduzione ad Arbitrum">
            <Accordion buttonText="Cos'è Arbitrum?">
              <p>Contenuto da aggiungere...</p>
            </Accordion>
            <Accordion buttonText="Optimistic Rollup">
              <p>Contenuto da aggiungere...</p>
            </Accordion>
            <Accordion buttonText="Compatibilità EVM">
              <p>Contenuto da aggiungere...</p>
            </Accordion>
            <Accordion buttonText="Commissioni Basse">
              <p>Contenuto da aggiungere...</p>
            </Accordion>
            <Accordion buttonText="Portafogli (Wallet) Supportati">
              <p>Contenuto da aggiungere...</p>
            </Accordion>
            <Accordion buttonText="Sicurezza e Decentralizzazione">
              <p>Contenuto da aggiungere...</p>
            </Accordion>
            <Accordion buttonText="Ecosistema DeFi">
              <p>Contenuto da aggiungere...</p>
            </Accordion>
          </Accordion>

          <Accordion buttonText="Applicazioni su Arbitrum">
            <Accordion buttonText="DeFi e DEX">
              <p>Contenuto da aggiungere...</p>
            </Accordion>
            <Accordion buttonText="NFT e Marketplace">
              <p>Contenuto da aggiungere...</p>
            </Accordion>
            <Accordion buttonText="Gaming e Metaverse">
              <p>Contenuto da aggiungere...</p>
            </Accordion>
            <Accordion buttonText="Bridge e Interoperabilità">
              <p>Contenuto da aggiungere...</p>
            </Accordion>
            <Accordion buttonText="Smart Contracts">
              <p>Contenuto da aggiungere...</p>
            </Accordion>
            <Accordion buttonText="Token e Governance">
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
                src="https://www.youtube.com/embed/1jzFNzUgZ6Q?si=8vQ7QwKjKjKjKjKj"
                title="Arbitrum Tutorial"
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
                  Arbitrum opera come Layer 2 di Ethereum, offrendo compatibilità completa con EVM.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Image 
                    src={arbitrumIcon} 
                    alt="Arbitrum" 
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
                      href="https://arbitrum.io/" 
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
                      href="https://x.com/arbitrum" 
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
                      href="https://coinmarketcap.com/currencies/arbitrum/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline text-sm"
                    >
                      Token ARB
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
  );
}