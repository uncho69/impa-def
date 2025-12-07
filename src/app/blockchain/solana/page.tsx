"use client";

import { MobileContainer } from "@/components/MobileContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import Image from "next/image";
import solanaIcon from "@/assets/solana-sol-logo.svg";
import { useState, useEffect } from "react";

export default function Solana() {
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
        const response = await fetch('/api/coin/solana');
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
    <ProtectedRoute title="Solana">
      <MobileContainer>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Image src={solanaIcon} alt="Solana" width={64} height={64} />
            <div>
              <SectionTitle>Solana</SectionTitle>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                  Blockchain
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  PoH
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  High Performance
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
              <span className="text-sm text-gray-500">SOL</span>
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
          <strong>Solana</strong> è una blockchain ad alte prestazioni progettata per supportare applicazioni 
          decentralizzate (dApp) e criptovalute. Fondata da Anatoly Yakovenko nel 2017, Solana utilizza 
          un meccanismo di consenso innovativo chiamato Proof of History (PoH) combinato con Proof of Stake 
          (PoS) per raggiungere velocità di transazione estremamente elevate e commissioni molto basse.
        </SectionBody>

        <SectionTitle>Caratteristiche Principali</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Cos'è la Blockchain di Solana?">
            <p>Contenuto da aggiungere...</p>
          </Accordion>

          <Accordion buttonText="Proof of History (PoH)">
            <p>Contenuto da aggiungere...</p>
          </Accordion>

          <Accordion buttonText="Architettura ad Alta Velocità">
            <p>Contenuto da aggiungere...</p>
          </Accordion>

          <Accordion buttonText="Commissioni Ultra-Basse">
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

        <SectionTitle>Ecosistema Solana</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Introduzione a Solana">
            <Accordion buttonText="Cos'è la Blockchain di Solana?">
              <p>Contenuto da aggiungere...</p>
            </Accordion>
            <Accordion buttonText="Proof of History (PoH)">
              <p>Contenuto da aggiungere...</p>
            </Accordion>
            <Accordion buttonText="Architettura ad Alta Velocità">
              <p>Contenuto da aggiungere...</p>
            </Accordion>
            <Accordion buttonText="Commissioni Ultra-Basse">
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

          <Accordion buttonText="Applicazioni su Solana">
            <Accordion buttonText="DeFi e DEX">
              <p>Contenuto da aggiungere...</p>
            </Accordion>
            <Accordion buttonText="NFT e Marketplace">
              <p>Contenuto da aggiungere...</p>
            </Accordion>
            <Accordion buttonText="Gaming e Metaverse">
              <p>Contenuto da aggiungere...</p>
            </Accordion>
            <Accordion buttonText="Staking e Validazione">
              <p>Contenuto da aggiungere...</p>
            </Accordion>
            <Accordion buttonText="Smart Contracts">
              <p>Contenuto da aggiungere...</p>
            </Accordion>
            <Accordion buttonText="Token e Meme Coins">
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
                title="Solana Tutorial"
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
                  Solana opera sulla sua blockchain nativa ad alta velocità e basso costo.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Image 
                    src={solanaIcon} 
                    alt="Solana" 
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
                      href="https://solana.com/" 
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
                      href="https://x.com/solana" 
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
                      href="https://coinmarketcap.com/currencies/solana/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline text-sm"
                    >
                      Token SOL
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