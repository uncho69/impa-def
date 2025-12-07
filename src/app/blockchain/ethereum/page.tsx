"use client";

import { MobileContainer } from "@/components/MobileContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import Image from "next/image";
import ethereumIcon from "@/assets/ethereum-icon.svg";
import { useState, useEffect } from "react";
// Loghi delle reti supportate
import arbitrumIcon from "@/assets/arbitrum-arb-logo.svg";
import optimismIcon from "@/assets/optimism-ethereum-op-logo.svg";
import polygonIcon from "@/assets/polygon-matic-logo.svg";
import baseIcon from "@/assets/base-logo.svg";

export default function Ethereum() {
  const [priceData, setPriceData] = useState({
    price: 0,
    volume_24h: 0,
    price_change_percentage_24h: 0,
    market_cap: 0,
    image: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        const response = await fetch('/api/coin/ethereum');
        const data = await response.json();
        setPriceData(data);
        setLoading(false);
      } catch (error) {
        console.error('Errore nel caricamento dei dati:', error);
        setLoading(false);
      }
    };

    fetchPriceData();
    
    // Aggiorna i dati ogni 30 secondi
    const interval = setInterval(fetchPriceData, 30000);
    
    return () => clearInterval(interval);
  }, []);
  return (
    <ProtectedRoute title="Ethereum">
    <MobileContainer>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
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
          {/* Live Price Box */}
          <div className="bg-gray-100 rounded-xl p-3 shadow-sm min-w-[180px]">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Prezzo Live</div>
            
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-xl font-bold text-gray-900">
                {loading ? '...' : `$${priceData.price?.toLocaleString('en-US', { maximumFractionDigits: 2 }) || '0.00'}`}
              </span>
              <span className="text-sm text-gray-500">ETH</span>
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              {priceData.price_change_percentage_24h >= 0 ? (
                <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 14l5-5 5 5z"/>
                </svg>
              ) : (
                <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 10l5 5 5-5z"/>
                </svg>
              )}
              <span className={`text-sm font-medium ${priceData.price_change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {loading ? '...' : `${priceData.price_change_percentage_24h >= 0 ? '+' : ''}${priceData.price_change_percentage_24h?.toFixed(2) || '0.00'}%`}
              </span>
              <span className="text-xs text-gray-400">24h</span>
            </div>
            
            <div className="space-y-1 text-xs">
              <div className="text-gray-600">
                Volume 24h ${priceData.volume_24h ? (priceData.volume_24h / 1e9).toFixed(1) + 'B' : '...'}
              </div>
              <div className="text-gray-600">
                Market Cap ${priceData.market_cap ? (priceData.market_cap / 1e9).toFixed(1) + 'B' : '...'}
              </div>
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