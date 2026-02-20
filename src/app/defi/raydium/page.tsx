import { MobileContainer } from "@/components/MobileContainer";
import { SectionTitle } from "@/components/SectionTitle";
import { SectionBody } from "@/components/SectionBody";
import { Accordion } from "@/components/Accordion";

import Image from "next/image";
import Placeholder from "@/assets/placeholder.svg";
import raydiumIcon from "@/assets/raydium-logo.svg";
// Loghi delle reti supportate
import solanaIcon from "@/assets/solana-sol-logo.svg";

export default function Raydium() {
  return (
    <MobileContainer>
        <div className="flex items-center gap-4 mb-6">
          <Image src={raydiumIcon} alt="Raydium" width={64} height={64} />
          <div>
            <SectionTitle>Raydium</SectionTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                DEX
              </span>
              <span className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium">
                AMM
              </span>
              <span className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm font-medium">
                Solana
              </span>
            </div>
          </div>
        </div>

        <SectionBody>
          <strong>Raydium</strong> è un Automated Market Maker (AMM) e fornitore di liquidità costruito sulla blockchain di Solana, progettato per operare con il Serum Decentralized Exchange (DEX). Lanciato nel 2021, Raydium è stato uno dei primi AMM a utilizzare l&apos;order book on-chain di Serum, permettendo l&apos;accesso alla liquidità condivisa e l&apos;esecuzione di ordini estremamente veloce e a basso costo.
        </SectionBody>

        <SectionTitle>Caratteristiche Principali</SectionTitle>
        <SectionBody>
          <Accordion buttonText="Trading di Token" defaultOpen={true}>
            Raydium permette agli utenti di scambiare token utilizzando un motore di routing bidirezionale che determina il miglior percorso di swap tra i pool di liquidità o l&apos;order book di Serum per ottenere il miglior prezzo.
          </Accordion>

          <Accordion buttonText="Fornitura di Liquidità">
            Gli utenti possono fornire liquidità ai pool di Raydium per guadagnare commissioni di trading. Raydium supporta sia Concentrated Liquidity Market Maker (CLMM) che liquidità Constant Product, offrendo diverse strategie per massimizzare i rendimenti.
          </Accordion>

          <Accordion buttonText="Staking e Farming">
            Gli utenti possono mettere in staking i token RAY per guadagnare ricompense aggiuntive e partecipare a programmi di farming che incentivano la fornitura di liquidità con ricompense extra di token.
          </Accordion>

          <Accordion buttonText="AcceleRaytor">
            Una piattaforma di lancio per nuovi progetti che permette fundraising e fornitura immediata di liquidità. AcceleRaytor aiuta i progetti a stabilire mercati di trading e ottenere supporto dalla comunità fin dal lancio.
          </Accordion>

          <Accordion buttonText="Governance Decentralizzata">
            La comunità di Raydium può partecipare alla governance del protocollo attraverso proposte e votazioni, influenzando decisioni chiave come l&apos;emissione di token e l&apos;allocazione delle commissioni.
          </Accordion>
        </SectionBody>

        <SectionTitle>Informazioni Aggiuntive</SectionTitle>
        <SectionBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h3 className="font-bold text-lg mb-3 text-neutral-800">Reti Supportate</h3>
              <p className="text-neutral-600 mb-4 text-sm">
                Raydium è il principale DEX su Solana, offrendo trading, farming e staking per l'ecosistema Solana.
              </p>
              <div className="flex flex-wrap gap-4">
                <Image src={solanaIcon} alt="Solana" className="w-8 h-8 hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <h3 className="font-bold text-lg mb-3 text-neutral-800">Link Utili</h3>
              <div className="space-y-2">
                <a href="https://raydium.io/" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
                  🌐 Sito Web
                </a>
                <a href="https://x.com/RaydiumProtocol" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
                  🐦 Twitter/X
                </a>
                <a href="https://www.coingecko.com/en/coins/raydium" target="_blank" rel="noopener noreferrer" className="block text-primary-600 hover:text-primary-700 underline">
                  📊 Token RAY
                </a>
              </div>
            </div>
          </div>
        </SectionBody>
      </MobileContainer>
  );
}