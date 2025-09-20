"use client";

import { CardContainer } from "./CardContainer";
import { SimpleCard } from "./SimpleCard";
import Placeholder from "@/assets/placeholder.svg";
import btcIcon from "@/assets/bitcoin-icon.svg";
import ethIcon from "@/assets/ethereum-icon.svg";
import solIcon from "@/assets/solana-sol-logo.svg";
import arbIcon from "@/assets/arbitrum-arb-logo.svg";
import polIcon from "@/assets/polygon-matic-logo.svg";
import degIcon from "@/assets/degen-base-degen-logo.svg";
import basIcon from "@/assets/base-logo.svg";
import optIcon from "@/assets/optimism-ethereum-op-logo.svg";
import zorIcon from "@/assets/zora-logo.png";
import hlqIcon from "@/assets/hyperliquid-logo.png";
import sclIcon from "@/assets/Scroll-Logo.svg";
import berIcon from "@/assets/berachain-logo.png";
import zksIcon from "@/assets/zkSync-logo.png";
import linIcon from "@/assets/linea-logo.svg";
import layIcon from "@/assets/layer3-logo.png";
import hlaIcon from "@/assets/hyperlane-logo.svg";
import blaIcon from "@/assets/blast-logo.webp";
import avaIcon from "@/assets/avalanche-avax-logo.svg";
import { useState, useEffect } from "react";

export function BlockchainCardList() {
  const [bitcoinData, setBitcoinData] = useState({
    price: 0,
    market_cap: 0
  });
  const [ethereumData, setEthereumData] = useState({
    price: 0,
    market_cap: 0
  });
  const [solanaData, setSolanaData] = useState({
    price: 0
  });
  const [arbitrumData, setArbitrumData] = useState({
    price: 0
  });
  const [polygonData, setPolygonData] = useState({
    price: 0
  });
  const [baseData, setBaseData] = useState({
    price: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        // Fetch Bitcoin data
        const bitcoinResponse = await fetch('/api/coin/bitcoin');
        const bitcoinData = await bitcoinResponse.json();
        setBitcoinData({
          price: bitcoinData.price || 0,
          market_cap: bitcoinData.market_cap || 0
        });

        // Fetch Ethereum data
        const ethereumResponse = await fetch('/api/coin/ethereum');
        const ethereumData = await ethereumResponse.json();
        setEthereumData({
          price: ethereumData.price || 0,
          market_cap: ethereumData.market_cap || 0
        });

        // Fetch Solana data
        const solanaResponse = await fetch('/api/coin/solana');
        const solanaData = await solanaResponse.json();
        setSolanaData({
          price: solanaData.price || 0
        });

        // Fetch Arbitrum data
        const arbitrumResponse = await fetch('/api/coin/arbitrum-one');
        const arbitrumData = await arbitrumResponse.json();
        setArbitrumData({
          price: arbitrumData.price || 0
        });

        // Fetch Polygon data
        const polygonResponse = await fetch('/api/coin/matic-network');
        const polygonData = await polygonResponse.json();
        setPolygonData({
          price: polygonData.price || 0
        });

        // Fetch Base data - Base non ha token nativo, rimuoviamo per ora
        // const baseResponse = await fetch('/api/coin/base-protocol');
        // const baseData = await baseResponse.json();
        setBaseData({
          price: 0 // Base non ha token nativo
        });

        setLoading(false);
      } catch (error) {
        console.error('Errore nel caricamento dei dati crypto:', error);
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, []);
  return (
    <CardContainer>
      <SimpleCard
        icon={btcIcon}
        title={"Bitcoin"}
        subArray={[
          loading ? "Caricamento..." : `$${bitcoinData.price?.toLocaleString() || '0'}`
        ]}
        subArrayTitle="Prezzo:"
        href={"./blockchain/bitcoin"}
        externalLink="https://bitcoin.org"
        xPage="https://x.com/bitcoin"
      />
      <SimpleCard
        icon={ethIcon}
        title={"Ethereum"}
        subArray={[
          loading ? "Caricamento..." : `$${ethereumData.price?.toLocaleString() || '0'}`,
          loading ? "Caricamento..." : `$ ${(ethereumData.market_cap / 1e9).toFixed(0)}B`
        ]}
        subArrayTitle="Prezzo:\nMarket Cap:"
        href={"./blockchain/ethereum"}
        externalLink="https://ethereum.org/it/"
        xPage="https://x.com/ethereum"
      />
      <SimpleCard
        icon={solIcon}
        title={"Solana"}
        subArray={[
          loading ? "Caricamento..." : `$${solanaData.price?.toLocaleString() || '0'}`
        ]}
        subArrayTitle="Prezzo:"
        href={"./blockchain/solana"}
        externalLink="https://solana.com/"
        xPage="https://x.com/solana"
      />
      <SimpleCard
        icon={arbIcon}
        title={"Arbitrum"}
        subArray={[
          loading ? "Caricamento..." : `$${arbitrumData.price?.toLocaleString() || '0'}`
        ]}
        subArrayTitle="Prezzo:"
        href={"./blockchain/arbitrum"}
        externalLink="https://arbitrum.foundation/"
        xPage="https://x.com/arbitrum"
      />
      <SimpleCard
        icon={polIcon}
        title={"Polygon"}
        subArray={[
          loading ? "Caricamento..." : `$${polygonData.price?.toLocaleString() || '0'}`
        ]}
        subArrayTitle="Prezzo:"
        href={"./blockchain/polygon"}
        externalLink="https://polygon.technology/"
        xPage="https://x.com/0xPolygon"
      />
      <SimpleCard
        icon={basIcon}
        title={"Base"}
        subArray={[
          { icon: Placeholder, text: "Layer 2 Ethereum" }
        ]}
        href={"./blockchain/base"}
        externalLink="https://www.base.org/"
        xPage="https://x.com/base"
      />
      <SimpleCard
        icon={optIcon}
        title={"Optimism"}
        subArray={[
          { icon: Placeholder, text: "" },
          { icon: Placeholder, text: "" },
        ]}
        href={"./blockchain/optimism"}
        externalLink="https://www.optimism.io/"
        xPage="https://twitter.com/Optimism"
      />
      <SimpleCard
        icon={zorIcon}
        title={"Zora"}
        subArray={[
          { icon: Placeholder, text: "" },
          { icon: Placeholder, text: "" },
        ]}
        href={"./blockchain/zora"}
        externalLink="https://zora.co/"
        xPage="https://x.com/ourZORA"
      />
      <SimpleCard
        icon={Placeholder}
        title={"Sanko"}
        subArray={[
          { icon: Placeholder, text: "" },
          { icon: Placeholder, text: "" },
        ]}
        href={"./blockchain/sanko"}
        externalLink="https://sanko.xyz/"
        xPage="https://x.com/SankoGameCorp"
      />
      <SimpleCard
        icon={hlqIcon}
        title={"Hyperliquid"}
        subArray={[
          { icon: Placeholder, text: "" },
          { icon: Placeholder, text: "" },
        ]}
        href={"./blockchain/hyperliquid"}
        externalLink="https://hyperliquid.xyz/"
        xPage="https://twitter.com/HyperliquidX"
      />
      <SimpleCard
        icon={sclIcon}
        title={"Scroll"}
        subArray={[
          { icon: Placeholder, text: "" },
          { icon: Placeholder, text: "" },
        ]}
        href={"./blockchain/scroll"}
        externalLink="https://scroll.io/"
        xPage="https://x.com/Scroll_ZKP"
      />
      <SimpleCard
        icon={berIcon}
        title={"Berachain"}
        subArray={[
          { icon: Placeholder, text: "" },
          { icon: Placeholder, text: "" },
        ]}
        href={"./blockchain/berachain"}
        externalLink="https://www.berachain.com/"
        xPage="https://x.com/berachain"
      />
      <SimpleCard
        icon={zksIcon}
        title={"zkSync"}
        subArray={[
          { icon: Placeholder, text: "" },
          { icon: Placeholder, text: "" },
        ]}
        href={"./blockchain/zksync"}
        externalLink="https://zksync.io/"
        xPage="https://x.com/zksync"
      />
      <SimpleCard
        icon={linIcon}
        title={"Linea"}
        subArray={[
          { icon: Placeholder, text: "" },
          { icon: Placeholder, text: "" },
        ]}
        href={"./blockchain/linea"}
        externalLink="https://linea.build/"
        xPage="https://x.com/LineaBuild"
      />
      <SimpleCard
        icon={layIcon}
        title={"Layer3"}
        subArray={[
          { icon: Placeholder, text: "" },
          { icon: Placeholder, text: "" },
        ]}
        href={"./blockchain/layer3"}
        externalLink="https://layer3.xyz/"
        xPage="https://x.com/layer3xyz"
      />
      <SimpleCard
        icon={hlaIcon}
        title={"Hyperlane"}
        subArray={[
          { icon: Placeholder, text: "" },
          { icon: Placeholder, text: "" },
        ]}
        href={"./blockchain/hyperlane"}
        externalLink="https://www.hyperlane.xyz/"
        xPage="https://x.com/hyperlane"
      />
      <SimpleCard
        icon={polIcon}
        title={"Polygon zkEVM"}
        subArray={[
          { icon: Placeholder, text: "" },
          { icon: Placeholder, text: "" },
        ]}
        href={"./blockchain/polygon_zkEVM"}
        externalLink="https://polygon.technology/"
        xPage="https://x.com/0xpolygondefi"
      />
      <SimpleCard
        icon={degIcon}
        title={"Degen"}
        subArray={[
          { icon: Placeholder, text: "" },
          { icon: Placeholder, text: "" },
        ]}
        href={"./blockchain/degen"}
        externalLink="degen.tips"
        xPage="https://x.com/degentokenbase"
      />
      <SimpleCard
        icon={blaIcon}
        title={"Blast"}
        subArray={[
          { icon: Placeholder, text: "" },
          { icon: Placeholder, text: "" },
        ]}
        href={"./blockchain/blast"}
        externalLink="blast.io"
        xPage="https://x.com/Blast_L2"
      />
      <SimpleCard
        icon={avaIcon}
        title={"Avalanche"}
        subArray={[
          { icon: Placeholder, text: "" },
          { icon: Placeholder, text: "" },
        ]}
        href={"./blockchain/avalanche"}
        externalLink="https://www.avax.network/"
        xPage="https://x.com/avax"
      />
    </CardContainer>
  );
}
