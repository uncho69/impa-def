"use client";

import { useState } from "react";
import Image from "next/image";
import { MobileContainer } from "@/components/MobileContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Accordion } from "@/components/Accordion";
import { List } from "@/components/List";
import { SimpleCard } from "@/components/SimpleCard";
import { ExploreWeb3 } from "@/components/ExploreWeb3";

// Import delle immagini dei memecoins
import floppaIcon from "@/assets/floppa-icon.png";
import dogwifhatIcon from "@/assets/dogwifhat-icon.png";
import sharkcatIcon from "@/assets/sharkcat-icon.png";
import kenidyIcon from "@/assets/kenidy-icon.png";
import bodenIcon from "@/assets/boden-icon.png";
import trempIcon from "@/assets/tremp-icon.png";
import higherIcon from "@/assets/higher-icon.png";
import tn100xIcon from "@/assets/tn100x-icon.png";
import degenIcon from "@/assets/degen-icon.png";
import retardioIcon from "@/assets/retardio-icon.png";
import apuIcon from "@/assets/apu-icon.png";
import pepeIcon from "@/assets/pepe-icon.png";
import dogecoinIcon from "@/assets/dogecoin-icon.png";

// Import delle immagini del tutorial
import mem1 from "@/assets/mem1.png";
import mem2 from "@/assets/mem2.png";
import mem3 from "@/assets/mem3.png";
import mem4 from "@/assets/mem4.png";
import mem5 from "@/assets/mem5.png";
import mem6 from "@/assets/mem6.png";

export default function Memecoins() {
  const [showAllMemecoins, setShowAllMemecoins] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  const allMemecoins = [
    {
      title: "Floppa",
      image: floppaIcon,
      website: "https://floppa.wtf/",
      xProfile: "https://x.com/floppa/",
      tokenNFT: "https://dexscreener.com/base/0x6caa62e48a2d9f3a8eacaadca2462ed5dfe0c685"
    },
    {
      title: "Dogwifhat (WIF)",
      image: dogwifhatIcon,
      website: "https://dogwifcoin.org",
      xProfile: "https://x.com/dogwifcoin",
      tokenNFT: "https://www.coingecko.com/en/coins/dogwifhat"
    },
    {
      title: "Shark Cat",
      image: sharkcatIcon,
      website: "https://sharkcatsolana.com",
      xProfile: "https://x.com/SharkCatSolana",
      tokenNFT: "https://www.coingecko.com/en/coins/shark-cat"
    },
    {
      title: "Kenidy",
      image: kenidyIcon,
      website: "https://kenidy.io",
      xProfile: "https://x.com/kenidy_on_sol",
      tokenNFT: "https://www.coingecko.com/en/coins/ruburt-f-kenidy-jr"
    },
    {
      title: "Boden",
      image: bodenIcon,
      website: "https://boden4pres.com",
      xProfile: "https://x.com/boden4pres",
      tokenNFT: "https://www.coingecko.com/en/coins/jeo-boden"
    },
    {
      title: "Tremp",
      image: trempIcon,
      website: "https://tremp.xyz",
      xProfile: "https://x.com/dolandtremp_sol",
      tokenNFT: "https://www.coingecko.com/en/coins/doland-tremp"
    },
    {
      title: "Higher",
      image: higherIcon,
      website: "https://www.aimhigher.net/",
      xProfile: "https://x.com/higheronchain",
      tokenNFT: "https://www.coingecko.com/en/coins/higher"
    },
    {
      title: "TN100X",
      image: tn100xIcon,
      website: "https://ham.fun/",
      xProfile: "https://x.com/HamOnWarpcast",
      tokenNFT: "https://www.coingecko.com/en/coins/tn100x"
    },
    {
      title: "Degen",
      image: degenIcon,
      website: "https://degen.tips",
      xProfile: "https://x.com/degenbase",
      tokenNFT: "https://www.coingecko.com/en/coins/degen-base"
    },
    {
      title: "Retardio",
      image: retardioIcon,
      website: "https://retardio.xyz/",
      xProfile: "https://x.com/retardiosolana",
      tokenNFT: "https://www.coingecko.com/en/coins/retardio"
    },
    {
      title: "Apu",
      image: apuIcon,
      website: "https://apu.com/",
      xProfile: "https://x.com/ApusCoin",
      tokenNFT: "https://www.coingecko.com/en/coins/apu-apustaja"
    },
    {
      title: "Pepe (PEPE)",
      image: pepeIcon,
      website: "https://www.pepe.vip/",
      xProfile: "https://x.com/pepecoineth",
      tokenNFT: "https://www.coingecko.com/en/coins/pepe"
    },
    {
      title: "Dogecoin",
      image: dogecoinIcon,
      website: "https://dogecoin.com/",
      xProfile: "https://x.com/dogecoin",
      tokenNFT: "https://www.coingecko.com/en/coins/dogecoin"
    }
  ];
  
  const displayedMemecoins = showAllMemecoins ? allMemecoins : allMemecoins.slice(0, 3);
  
  return (
    <ProtectedRoute title="Memecoins">
      <PageTitle description="Criptovalute basate su meme e cultura internet">
        Memecoins
      </PageTitle>
      <MobileContainer>

        <SectionBody>
          <div>I <strong>memecoin</strong> sono un tipo di criptovaluta che nasce come scherzo o meme su internet, ma che può guadagnare valore e popolarità grazie alla comunità che li supporta. A differenza delle criptovalute come Bitcoin o Ethereum, che sono progettate per avere utilità specifiche o innovazioni tecniche, i memecoin sono spesso creati senza uno scopo particolare oltre a essere divertenti o virali.</div>
          
          <Accordion buttonText="Cosa sono i Memecoin?">
            I memecoin sono criptovalute basate su meme di internet o personaggi di cultura popolare. Un esempio famoso è Dogecoin, che è nato come parodia del boom delle criptovalute e si basa su un meme di un cane Shiba Inu. Nonostante le origini scherzose, alcuni memecoin hanno catturato l'attenzione significativa nel mondo crypto, guidati da tendenze sui social media, hype guidato dalla comunità e un senso di divertimento.
          </Accordion>
        </SectionBody>

        <SectionTitle>Caratteristiche Principali</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Origine e Tematica">
            I memecoin sono generalmente basati su meme di internet o personaggi di cultura popolare. Un esempio famoso è Dogecoin, che è nato come parodia del boom delle criptovalute e si basa su un meme di un cane Shiba Inu.
          </Accordion>
          
          <Accordion buttonText="Comunità">
            La forza dei memecoin risiede spesso nella loro comunità. Gli utenti e gli investitori di memecoin tendono ad essere molto attivi sui social media, creando un forte senso di comunità e partecipazione.
          </Accordion>
          
          <Accordion buttonText="Volatilità">
            I memecoin tendono ad essere estremamente volatili. Il loro valore può aumentare rapidamente grazie a campagne virali o endorsement da parte di figure pubbliche, ma può anche diminuire altrettanto velocemente.
          </Accordion>
          
          <Accordion buttonText="Speculazione">
            Molti investitori acquistano memecoin con l'aspettativa di rapidi guadagni, spesso motivati da hype piuttosto che da fondamentali tecnici o economici.
          </Accordion>
        </SectionBody>

        <SectionTitle>Memecoin Popolari</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {displayedMemecoins.map((memecoin, index) => (
              <SimpleCard
                key={index}
                title={memecoin.title}
                image={memecoin.image}
                website={memecoin.website}
                xProfile={memecoin.xProfile}
                tokenNFT={memecoin.tokenNFT}
              />
            ))}
          </div>
          
          {/* Mostra più contenuti button */}
          <div className="flex justify-center">
            <button 
              onClick={() => setShowAllMemecoins(!showAllMemecoins)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <span className="font-medium">
                {showAllMemecoins ? "Mostra meno" : "Mostra più contenuti"}
              </span>
              <svg 
                className={`w-5 h-5 transition-transform duration-200 ${showAllMemecoins ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </SectionBody>

        <SectionTitle>Come Comprare e Vendere</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Solana">
            <List ordered={true}>
              <li>Copiare il contract address del token desiderato (si può fare tramite Dexscreener o Coingecko)</li>
              <li>Aprire l&apos;exchange decentralizzato che si vuole utilizzare per effettuare lo scambio (in questo esempio useremo Jupiter)</li>
              <li>Cliccare sotto a dove c&apos;è scritto &quot;to receive&quot;</li>
              <li>Inserire il contract address del token che si vuole acquistare</li>
              <li>Selezionare il token</li>
              <li>Premere "swap"</li>
            </List>
          </Accordion>
          
          <Accordion buttonText="Ethereum e Layer2">
            <List ordered={true}>
              <li>Utilizzare exchange come Uniswap, 1inch o aggregatori simili</li>
              <li>Collegare il wallet (MetaMask, Rainbow, etc.)</li>
              <li>Selezionare il token di partenza (ETH, USDC, etc.)</li>
              <li>Inserire l'indirizzo del contratto del memecoin</li>
              <li>Confermare la transazione</li>
            </List>
          </Accordion>
        </SectionBody>

        <SectionTitle>Problemi Tecnici e Soluzioni</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Transazione Bloccata">
            <List>
              <li>Confermare la transazione firmando tramite il wallet non-custodial (Phantom, MetaMask, etc.)</li>
              <li>Verificare di avere sufficienti fondi per le gas fees</li>
              <li>Controllare che la transazione non sia in pending</li>
              <li>Riprova con un gas price più alto se necessario</li>
            </List>
          </Accordion>
          
          <Accordion buttonText="Transazione Fallita">
            <List>
              <li>Verificare di avere sufficienti fondi</li>
              <li>Controllare i parametri della transazione</li>
              <li>Assicurarsi che il token sia supportato dalla piattaforma</li>
              <li>Verificare che il slippage sia impostato correttamente</li>
            </List>
          </Accordion>
          
          <Accordion buttonText="Token Non Trovato">
            <List>
              <li>Verificare che l&apos;indirizzo del contratto sia corretto</li>
              <li>Controllare che il token sia supportato dalla piattaforma</li>
              <li>Assicurarsi che la blockchain sia corretta</li>
              <li>Prova ad aggiungere manualmente il token al wallet</li>
            </List>
          </Accordion>
        </SectionBody>

                        <SectionTitle>⚠️ Avvertenze Importanti</SectionTitle>
                <SectionBody>
                  <Accordion buttonText="Attenzione ai Rischi">
                    <List>
                      <li>I memecoin sono estremamente volatili e rischiosi</li>
                      <li>Molti progetti sono scam o <span className="relative inline-block">
                        <span 
                          className="underline cursor-help text-blue-600 hover:text-blue-800"
                          onMouseEnter={() => setShowTooltip(true)}
                          onMouseLeave={() => setShowTooltip(false)}
                        >
                          pump & dump
                        </span>
                        {showTooltip && (
                          <div className="absolute top-0 left-full ml-2 px-4 py-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-50 w-80">
                            <div className="space-y-2">
                              <div className="font-semibold text-blue-300">Pump & Dump:</div>
                              <div className="leading-relaxed">
                                Schema fraudolento in cui il prezzo di un asset (es. criptovaluta o token) viene artificialmente gonfiato ("pump") tramite promozioni ingannevoli o false informazioni, per poi essere venduto ("dump") a prezzi elevati, causando perdite agli investitori ignari quando il valore crolla.
                              </div>
                            </div>
                            <div className="absolute top-4 -left-2 border-4 border-transparent border-r-gray-900"></div>
                          </div>
                        )}
                      </span></li>
                      <li>Investi solo quello che puoi permetterti di perdere</li>
                      <li>Fai sempre ricerche approfondite prima di investire</li>
                      <li>Non investire basandoti solo su hype o FOMO</li>
                    </List>
                  </Accordion>
                </SectionBody>

                <SectionTitle>Tutorial</SectionTitle>
                <SectionBody>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 mb-4">Tutorial Scritti</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-neutral-900 mb-2">Comprare e Vendere Memecoin</h4>
                          <p className="text-neutral-600 mb-3">Seleziona la blockchain dove si trova il memecoin da acquistare/vendere 👉</p>
                          
                          <div className="ml-4 space-y-4">
                            <div>
                              <h5 className="font-medium text-neutral-900 mb-2">Solana</h5>
                              <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                  <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-medium flex-shrink-0">1</span>
                                  <p className="text-neutral-600 text-sm">Copiare il contract address del token desiderato (si può fare tramite Dexscreener o Coingecko)</p>
                                </div>
                                <Image src={mem1} alt="Dexscreener screenshot" className="w-3/4 mx-auto rounded-lg border border-neutral-200" />
                                
                                <div className="flex items-start gap-3">
                                  <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-medium flex-shrink-0">2</span>
                                  <p className="text-neutral-600 text-sm">Aprire l&apos;exchange decentralizzato che si vuole utilizzare per effettuare lo scambio (in questo esempio useremo Jupiter)</p>
                                </div>

                                
                                <div className="flex items-start gap-3">
                                  <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-medium flex-shrink-0">3</span>
                                  <p className="text-neutral-600 text-sm">Cliccare sotto a dove c'è scritto "to receive"</p>
                                </div>
                                <Image src={mem2} alt="Jupiter to receive section" className="w-3/4 mx-auto rounded-lg border border-neutral-200" />
                                <div className="flex items-start gap-3">
                                  <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-medium flex-shrink-0">4</span>
                                  <p className="text-neutral-600 text-sm">Inserire il contract address del token che si vuole acquistare</p>
                                </div>
                                <Image src={mem3} alt="Jupiter token selection" className="w-3/4 mx-auto rounded-lg border border-neutral-200" />
                                <div className="flex items-start gap-3">
                                  <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-medium flex-shrink-0">5</span>
                                  <p className="text-neutral-600 text-sm">Selezionare il token</p>
                                </div>
                                <Image src={mem4} alt="Token selection confirmation" className="w-3/4 mx-auto rounded-lg border border-neutral-200" />
                                <div className="flex items-start gap-3">
                                  <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-medium flex-shrink-0">6</span>
                                  <p className="text-neutral-600 text-sm">Premere &quot;swap&quot;</p>
                                </div>
                                <Image src={mem5} alt="Jupiter swap confirmation" className="w-3/4 mx-auto rounded-lg border border-neutral-200" />
                                
                                <div className="flex items-start gap-3">
                                  <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-medium flex-shrink-0">7</span>
                                  <p className="text-neutral-600 text-sm">Confermare la transazione firmando tramite il wallet non-custodial (phantom)</p>
                                </div>
                                <Image src={mem6} alt="Wallet confirmation" className="w-3/4 mx-auto rounded-lg border border-neutral-200" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SectionBody>
              </MobileContainer>
              
              <ExploreWeb3 />
            </ProtectedRoute>
          );
        }
