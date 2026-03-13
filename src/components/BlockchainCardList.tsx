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
import type { StaticImageData } from "next/image";

const METRICS_LABELS = "Ticker:\nPrezzo:\nMarket Cap:\nTVL:";

/** ID CoinGecko per API (https://www.coingecko.com) — null = progetto senza token */
const COINGECKO_IDS = [
  "bitcoin",
  "ethereum",
  "solana",
  "arbitrum",
  "polygon-ecosystem-token",
  null, // Base
  "optimism",
  "zora", // può non esistere, gestito in risposta
  null, // Sanko
  "hyperliquid",
  null, // Scroll
  "berachain-berachain",
  "zksync",
  "linea",
  null, // Layer3
  null, // Hyperlane
  null, // Polygon zkEVM
  "degen-base",
  "blast",
  "avalanche-2",
] as const;

const PROJECTS: Array<{
  title: string;
  icon: StaticImageData;
  ticker: string;
  coingeckoIndex: number;
  href: string;
  externalLink: string;
  xPage: string;
}> = [
  { title: "Bitcoin", icon: btcIcon, ticker: "BTC", coingeckoIndex: 0, href: "./blockchain/bitcoin", externalLink: "https://bitcoin.org", xPage: "https://x.com/bitcoin" },
  { title: "Ethereum", icon: ethIcon, ticker: "ETH", coingeckoIndex: 1, href: "./blockchain/ethereum", externalLink: "https://ethereum.org/it/", xPage: "https://x.com/ethereum" },
  { title: "Solana", icon: solIcon, ticker: "SOL", coingeckoIndex: 2, href: "./blockchain/solana", externalLink: "https://solana.com/", xPage: "https://x.com/solana" },
  { title: "Arbitrum", icon: arbIcon, ticker: "ARB", coingeckoIndex: 3, href: "./blockchain/arbitrum", externalLink: "https://arbitrum.foundation/", xPage: "https://x.com/arbitrum" },
  { title: "Polygon", icon: polIcon, ticker: "POL", coingeckoIndex: 4, href: "./blockchain/polygon", externalLink: "https://polygon.technology/", xPage: "https://x.com/0xPolygon" },
  { title: "Base", icon: basIcon, ticker: "N/A", coingeckoIndex: 5, href: "./blockchain/base", externalLink: "https://www.base.org/", xPage: "https://x.com/base" },
  { title: "Optimism", icon: optIcon, ticker: "OP", coingeckoIndex: 6, href: "./blockchain/optimism", externalLink: "https://www.optimism.io/", xPage: "https://twitter.com/Optimism" },
  { title: "Zora", icon: zorIcon, ticker: "ZORA", coingeckoIndex: 7, href: "./blockchain/zora", externalLink: "https://zora.co/", xPage: "https://x.com/ourZORA" },
  { title: "Sanko", icon: Placeholder, ticker: "N/A", coingeckoIndex: 8, href: "./blockchain/sanko", externalLink: "https://sanko.xyz/", xPage: "https://x.com/SankoGameCorp" },
  { title: "Hyperliquid", icon: hlqIcon, ticker: "HYPE", coingeckoIndex: 9, href: "/defi/hyperliquid", externalLink: "https://hyperliquid.xyz/", xPage: "https://twitter.com/HyperliquidX" },
  { title: "Scroll", icon: sclIcon, ticker: "N/A", coingeckoIndex: 10, href: "./blockchain/scroll", externalLink: "https://scroll.io/", xPage: "https://x.com/Scroll_ZKP" },
  { title: "Berachain", icon: berIcon, ticker: "BERA", coingeckoIndex: 11, href: "./blockchain/berachain", externalLink: "https://www.berachain.com/", xPage: "https://x.com/berachain" },
  { title: "zkSync", icon: zksIcon, ticker: "ZK", coingeckoIndex: 12, href: "./blockchain/zksync", externalLink: "https://zksync.io/", xPage: "https://x.com/zksync" },
  { title: "Linea", icon: linIcon, ticker: "LINEA", coingeckoIndex: 13, href: "./blockchain/linea", externalLink: "https://linea.build/", xPage: "https://x.com/LineaBuild" },
  { title: "Layer3", icon: layIcon, ticker: "N/A", coingeckoIndex: 14, href: "./blockchain/layer3", externalLink: "https://layer3.xyz/", xPage: "https://x.com/layer3xyz" },
  { title: "Hyperlane", icon: hlaIcon, ticker: "N/A", coingeckoIndex: 15, href: "./blockchain/hyperlane", externalLink: "https://www.hyperlane.xyz/", xPage: "https://x.com/hyperlane" },
  { title: "Polygon zkEVM", icon: polIcon, ticker: "N/A", coingeckoIndex: 16, href: "./blockchain/polygon_zkEVM", externalLink: "https://polygon.technology/", xPage: "https://x.com/0xpolygondefi" },
  { title: "Degen", icon: degIcon, ticker: "DEGEN", coingeckoIndex: 17, href: "./blockchain/degen", externalLink: "https://degen.tips", xPage: "https://x.com/degentokenbase" },
  { title: "Blast", icon: blaIcon, ticker: "BLAST", coingeckoIndex: 18, href: "./blockchain/blast", externalLink: "https://blast.io", xPage: "https://x.com/Blast_L2" },
  { title: "Avalanche", icon: avaIcon, ticker: "AVAX", coingeckoIndex: 19, href: "./blockchain/avalanche", externalLink: "https://www.avax.network/", xPage: "https://x.com/avax" },
];

type CoinGeckoRecord = Record<string, { usd?: number; usd_market_cap?: number }>;

export function BlockchainCardList() {
  const [data, setData] = useState<CoinGeckoRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ids = COINGECKO_IDS.filter((id): id is string => id != null);
    if (ids.length === 0) {
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/coingecko?ids=${ids.join(",")}`);
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (e) {
        console.error("Errore caricamento dati CoinGecko:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatPrice = (n: number) =>
    n > 0 ? `$${n.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 0 })}` : "—";
  const formatB = (n: number) => (n >= 1e9 ? `$${(n / 1e9).toFixed(1)}B` : n >= 1e6 ? `$${(n / 1e6).toFixed(1)}M` : n > 0 ? `$${n.toLocaleString()}` : "—");

  const getMetrics = (index: number): [string, string, string, string] => {
    const proj = PROJECTS[index];
    const cgId = COINGECKO_IDS[proj.coingeckoIndex];
    if (cgId == null || proj.ticker === "N/A") {
      return proj.ticker === "N/A" ? ["N/A", "N/A", "N/A", "N/A"] : [proj.ticker, "—", "—", "—"];
    }
    if (loading || !data || !data[cgId]) {
      return [proj.ticker, "—", "—", "—"];
    }
    const d = data[cgId];
    const price = d.usd ?? 0;
    const mcap = d.usd_market_cap ?? 0;
    return [proj.ticker, formatPrice(price), formatB(mcap), "—"];
  };

  return (
    <CardContainer>
      {PROJECTS.map((proj, index) => (
        <SimpleCard
          key={proj.href + proj.title}
          icon={proj.icon}
          title={proj.title}
          subArrayTitle={METRICS_LABELS}
          subArray={getMetrics(index)}
          href={proj.href}
          externalLink={proj.externalLink}
          xPage={proj.xPage}
          compact
        />
      ))}
    </CardContainer>
  );
}
