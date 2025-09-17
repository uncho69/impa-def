"use client";

import { MobileContainer } from "@/components/MobileContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import Image from "next/image";
import hyperliquidIcon from "@/assets/hyperliquid-icon.png";
import { ClientTweetCard } from "@/components/magicui/client-tweet-card";
import { useState, useEffect } from "react";


export default function Hyperliquid() {
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
        const response = await fetch('/api/coin/hyperliquid');
        const data = await response.json();
        setPriceData(data);
        setLoading(false);
      } catch (error) {
        console.error('Errore nel caricamento dei dati:', error);
        setLoading(false);
      }
    };

    fetchPriceData();
  }, []);
  
            const videos = [
            {
              id: "L-SCdSfGztA",
              title: "HyperLiquid Farming: The Next META EXCHANGE",
              creator: "Nastoshi"
            },
            {
              id: "Afi5cf6hya8",
              title: "HyperLiquid Exchange: TIME TO DEX",
              creator: "BinancesClub"
            },
            {
              id: "LU1YSKOCUwY",
              title: "0xTalks - Dentro la Crypto Culture",
              creator: "0xTalks"
            },
            {
              id: "_D-9Mn19J_Y",
              title: "CoinBureau HyperLiquid Analysis",
              creator: "CoinBureau"
            }
          ];

  return (
    <ProtectedRoute title="Hyperliquid">
      <MobileContainer>
        <div className="flex items-center gap-4 mb-6">
          <Image src={hyperliquidIcon} alt="Hyperliquid" width={64} height={64} />
          <div className="flex items-center gap-6">
            <div>
              <SectionTitle>Hyperliquid</SectionTitle>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                  DEX
                </span>
                <span className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium">
                  Perpetuals
                </span>
                <span className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm font-medium">
                  L1
                </span>
              </div>
            </div>
            
            {/* Live Price Box */}
            <div className="bg-gray-100 rounded-xl p-3 shadow-sm min-w-[180px]">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Prezzo Live</div>
              
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-xl font-bold text-gray-900">
                  {loading ? '...' : `$${priceData.price?.toFixed(2) || '0.00'}`}
                </span>
                <span className="text-sm text-gray-500">HYPE</span>
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
                <div className="flex justify-between">
                  <span className="text-gray-500">Volume 24h</span>
                  <span className="font-medium text-gray-700">
                    {loading ? '...' : `$${priceData.volume_24h?.toLocaleString() || '0'}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Market Cap</span>
                  <span className="font-medium text-gray-700">
                    {loading ? '...' : `$${priceData.market_cap?.toLocaleString() || '0'}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <SectionBody>
          <strong>Hyperliquid</strong> è un exchange decentralizzato (DEX) focalizzato sui perpetual futures, operante sulla blockchain Hyperliquid L1. Progettato per combinare le caratteristiche dei principali exchange centralizzati con i vantaggi della decentralizzazione, Hyperliquid offre un trading veloce, trasparente e a basso costo.
        </SectionBody>

        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-2xl font-semibold text-blue-600">Contenuti</h3>
            <div className="relative group">
              <div className="w-5 h-5 border-2 border-blue-400 rounded-full flex items-center justify-center cursor-help hover:border-blue-500 hover:bg-blue-50 transition-all duration-200">
                <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
                </svg>
              </div>
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-3 px-4 py-3 bg-white border border-gray-200 text-gray-800 text-sm rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20 w-80">
                <div className="font-medium text-gray-900 mb-2">💡 Informazioni</div>
                <div className="text-gray-600 leading-relaxed">Testo che spiega come avere il proprio contenuto mostrato qui + spiegazioni sulle rewards etc</div>
                <div className="absolute top-1/2 right-full w-0 h-0 border-r-8 border-t-8 border-b-8 border-transparent border-r-white"></div>
              </div>
            </div>
          </div>
          
          {/* 4 Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {videos.map((video) => (
              <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-video bg-gray-100">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}?autoplay=0&mute=0&controls=1&showinfo=1&rel=0&modestbranding=1`}
                    className="w-full h-full"
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-3">
                  <h4 className="font-medium text-gray-800 text-sm mb-1 line-clamp-2">{video.title}</h4>
                  <p className="text-xs text-gray-600">Creato da {video.creator}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span className="text-xs text-gray-500">Verificato</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Show More Button */}
          <div className="flex justify-center">
            <button className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors duration-200">
              <span className="text-sm font-medium">Mostra più contenuti</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Contenuti X Section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-2xl font-semibold text-blue-600">Contenuti X</h3>
            <div className="relative group">
              <div className="w-5 h-5 border-2 border-blue-400 rounded-full flex items-center justify-center cursor-help hover:border-blue-500 hover:bg-blue-50 transition-all duration-200">
                <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
                </svg>
              </div>
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-3 px-4 py-3 bg-white border border-gray-200 text-gray-800 text-sm rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20 w-80">
                <div className="font-medium text-gray-900 mb-2">💡 Informazioni</div>
                <div className="text-gray-600 leading-relaxed">Contenuti ufficiali da X (Twitter) di Hyperliquid e della community</div>
                <div className="absolute top-1/2 right-full w-0 h-0 border-r-8 border-t-8 border-b-8 border-transparent border-r-white"></div>
              </div>
            </div>
          </div>
          
          {/* Tweet Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <ClientTweetCard id="1959874702056567022" />
            <ClientTweetCard id="1957473371106754579" />
            <ClientTweetCard id="1956187895779176514" />
            <ClientTweetCard id="1947178777244803543" />
          </div>
          
          {/* Show More Button */}
          <div className="flex justify-center">
            <button className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors duration-200">
              <span className="text-sm font-medium">Mostra più contenuti X</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        <SectionTitle>Caratteristiche Principali</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Perpetual Futures" defaultOpen={true}>
            Hyperliquid è specializzato nel trading di perpetual futures, offrendo leverage fino a 50x su una vasta gamma di asset crypto.
          </Accordion>

          <Accordion buttonText="Hyperliquid L1">
            Opera su una propria blockchain L1 ottimizzata per il trading ad alta frequenza, garantendo latenza ultra-bassa e throughput elevato.
          </Accordion>

          <Accordion buttonText="Orderbook On-Chain">
            Utilizza un orderbook completamente on-chain, garantendo trasparenza totale nelle operazioni di trading e nell&apos;esecuzione degli ordini.
          </Accordion>

          <Accordion buttonText="Liquidità Profonda">
            Offre liquidità sostanziale e spread stretti grazie al suo design ottimizzato e al sistema di market making integrato.
          </Accordion>

          <Accordion buttonText="Costi Bassi">
            Le commissioni sono competitive rispetto agli exchange centralizzati, con struttura di fee trasparente e senza costi nascosti.
          </Accordion>
        </SectionBody>

        <SectionTitle>Tutorial</SectionTitle>
        <SectionBody>
          <Accordion buttonText="1. Accesso alla Piattaforma" defaultOpen={true}>
            <List ordered={true}>
              <li>
                Vai su <a href="https://app.hyperliquid.xyz/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 underline">Hyperliquid App</a> per accedere alla piattaforma di trading.
              </li>
              <li>
                Connetti il tuo portafoglio Web3 supportato (MetaMask o altri).
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="2. Deposito di Fondi">
            <List ordered={true}>
              <li>
                Usa il bridge integrato per trasferire fondi da Ethereum o Arbitrum a Hyperliquid L1.
              </li>
              <li>
                I principali asset supportati includono USDC come collaterale principale.
              </li>
              <li>
                Conferma la transazione e attendi la conferma del bridge.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="3. Trading di Perpetuals">
            <List ordered={true}>
              <li>
                Seleziona il perpetual future che vuoi tradare dalla lista disponibile.
              </li>
              <li>
                Scegli il tipo di ordine (Market, Limit, Stop) e la direzione (Long/Short).
              </li>
              <li>
                Imposta la leva finanziaria desiderata (fino a 50x).
              </li>
              <li>
                Inserisci size e prezzo (se limit order) e conferma la transazione.
              </li>
            </List>
          </Accordion>

          <Accordion buttonText="4. Gestione delle Posizioni">
            <List ordered={true}>
              <li>
                Monitora le tue posizioni aperte dalla dashboard trading.
              </li>
              <li>
                Imposta stop loss e take profit per gestire il rischio.
              </li>
              <li>
                Chiudi le posizioni quando desideri realizzare profitti o limitare perdite.
              </li>
            </List>
          </Accordion>
        </SectionBody>

        <SectionTitle>Informazioni Aggiuntive</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h3 className="font-bold text-lg mb-3 text-neutral-800">Asset Supportati</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">BTC-PERP</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">ETH-PERP</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">SOL-PERP</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">AVAX-PERP</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">Altri Perpetuals</span>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h3 className="font-bold text-lg mb-3 text-neutral-800">Link Utili</h3>
              <div className="space-y-2">
                <a href="https://app.hyperliquid.xyz/" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
                  🌐 Trading App
                </a>
                <a href="https://x.com/HyperliquidX" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
                  🐦 Twitter/X
                </a>
              </div>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
    </ProtectedRoute>
  );
}
