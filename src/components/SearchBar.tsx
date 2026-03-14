"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type IndexedPage = {
  url: string;
  title: string;
  content: string;
};

function normalizeAndDedupeIndex(pages: IndexedPage[]): IndexedPage[] {
  const byUrl = new Map<string, IndexedPage>();
  for (const page of pages) {
    const normalizedUrl = page.url.trim();
    if (!normalizedUrl) continue;
    const previous = byUrl.get(normalizedUrl);
    if (!previous) {
      byUrl.set(normalizedUrl, {
        url: normalizedUrl,
        title: page.title.trim(),
        content: page.content.trim(),
      });
      continue;
    }
    byUrl.set(normalizedUrl, {
      url: normalizedUrl,
      title: previous.title || page.title.trim(),
      content: `${previous.content} ${page.content}`.trim(),
    });
  }
  return Array.from(byUrl.values());
}


export function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<IndexedPage[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isIndexing, setIsIndexing] = useState(false);
  const [indexed, setIndexed] = useState<IndexedPage[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Costruisce l'indice al primo focus/inserimento
  const ensureIndex = async () => {
    if (indexed.length > 0 || isIndexing) return;
    setIsIndexing(true);
    try {
      // Usa indice statico invece di crawling dinamico
      const pages = normalizeAndDedupeIndex(getStaticIndex());
      console.log("Loaded static index:", pages.length, "pages");
      setIndexed(pages);
    } catch (err) {
      console.error("Search indexing error:", err);
    } finally {
      setIsIndexing(false);
    }
  };

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  // Ricerca semplice (case-insensitive) su titolo e contenuto
  const search = useMemo(() => {
    return (q: string): IndexedPage[] => {
      if (!q.trim()) return [];
      const needle = q.toLowerCase().trim();
      const scored = indexed
        .map((p) => {
          const titleLower = p.title.toLowerCase();
          const contentLower = p.content.toLowerCase();
          const urlLower = p.url.toLowerCase();
          
          const titleIdx = titleLower.indexOf(needle);
          const contentIdx = contentLower.indexOf(needle);
          const urlIdx = urlLower.indexOf(needle);
          
          let score = Infinity;
          if (titleIdx !== -1) score = Math.min(score, titleIdx);
          if (contentIdx !== -1) score = Math.min(score, contentIdx + 100);
          if (urlIdx !== -1) score = Math.min(score, urlIdx + 50);
          
          return { page: p, score };
        })
        .filter((s) => s.score !== Infinity)
        .sort((a, b) => a.score - b.score)
        .slice(0, 15)
        .map((s) => s.page);
      return scored;
    };
  }, [indexed]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    const r = search(query);
    setResults(r);
    setIsOpen(true);
  }, [query, search]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(results.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + Math.max(results.length, 1)) % Math.max(results.length, 1));
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && results[selectedIndex]) {
        router.push(results[selectedIndex].url);
        setIsOpen(false);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setSelectedIndex(-1);
      (e.target as HTMLInputElement).blur();
    }
  };

  const highlight = (text: string, q: string) => {
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text.slice(0, 120);
    const start = Math.max(0, idx - 40);
    const end = Math.min(text.length, idx + q.length + 60);
    const before = text.slice(start, idx);
    const match = text.slice(idx, idx + q.length);
    const after = text.slice(idx + q.length, end);
    return (
      <span>
        {start > 0 ? "…" : ""}
        {before}
        <mark className="bg-indigo-400/30 text-indigo-100 px-0.5 rounded">{match}</mark>
        {after}
        {end < text.length ? "…" : ""}
      </span>
    );
  };

  return (
    <div ref={rootRef} className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder={isIndexing ? "Indicizzazione in corso..." : "Cerca"}
          className="w-full min-w-0 px-4 py-2 pl-10 pr-4 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-transparent border-slate-300 bg-white text-slate-900 placeholder-slate-500 dark:border-indigo-400/25 dark:bg-slate-950/40 dark:text-white dark:placeholder-slate-400"
          value={query}
          onFocus={ensureIndex}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 dark:text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {isOpen && query && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white/95 border border-slate-300 rounded-lg shadow-lg z-50 max-h-96 overflow-auto backdrop-blur dark:bg-slate-950/95 dark:border-indigo-400/25">
          {results.length === 0 ? (
            <div className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">Nessun risultato</div>
          ) : (
            results.map((r, idx) => (
              <button
                key={r.url}
                onClick={() => {
                  router.push(r.url);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 border-b border-slate-200 dark:border-indigo-400/15 last:border-b-0 ${
                  selectedIndex === idx ? "bg-indigo-500/20" : "hover:bg-slate-100 dark:hover:bg-white/5"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-semibold text-sm text-slate-900 dark:text-slate-100">{r.title || r.url}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                      {highlight(r.content, query)}
                    </div>
                  </div>
                  <span className="shrink-0 text-[11px] bg-indigo-500/20 text-indigo-200 px-2 py-0.5 rounded">
                    {r.url}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}


// Indice statico con contenuto chiave per ricerca veloce
function getStaticIndex(): IndexedPage[] {
  return [
    // Homepage
    {
      url: "/",
      title: "ImparoDeFi - Il tuo accesso al mondo Web3",
      content: "Blockchain DeFi NFTs memecoins metaversi Web3 criptovalute bitcoin ethereum conservare denaro inviare denaro rendimenti risparmi sicurezza"
    },
    
    // Manuale
    {
      url: "/manuale",
      title: "Manuale A-Z - Guida completa Web3",
      content: "blockchain DeFi applicazioni decentralizzate smart contract wallet non-custodial exchange centralizzati on-ramp criptovalute bitcoin ethereum metamask phantom ledger trezor chiavi private seed phrase truffe phishing scam sicurezza"
    },
    
    // Blockchain
    {
      url: "/blockchain",
      title: "Blockchain - Guida alle reti blockchain",
      content: "ethereum bitcoin arbitrum optimism polygon base solana avalanche linea scroll berachain blast layer1 layer2 sidechain mainnet testnet gas fees"
    },
    {
      url: "/blockchain/ethereum",
      title: "Ethereum - La blockchain programmabile",
      content: "ethereum ETH smart contracts vitalik buterin proof of stake gas fees london upgrade eip-1559 layer2 rollups"
    },
    {
      url: "/blockchain/bitcoin",
      title: "Bitcoin - La prima criptovaluta",
      content: "bitcoin BTC satoshi nakamoto proof of work mining halving lightning network digital gold store of value"
    },
    {
      url: "/blockchain/arbitrum",
      title: "Arbitrum - Layer 2 di Ethereum",
      content: "arbitrum ARB layer2 ethereum rollup optimistic rollup gas fees scaling soluzione scalabilità"
    },
    {
      url: "/blockchain/base",
      title: "Base - Blockchain di Coinbase",
      content: "base coinbase layer2 ethereum optimism superchain scaling blockchain"
    },
    {
      url: "/blockchain/solana",
      title: "Solana - Blockchain ad alta velocità",
      content: "solana SOL proof of history high throughput low fees phantom wallet raydium jupiter"
    },
    {
      url: "/blockchain/railgun",
      title: "RAILGUN - Privacy on-chain",
      content: "railgun privacy protocol shielding private defi zk rail token"
    },
    {
      url: "/blockchain/zcash",
      title: "Zcash - Privacy coin",
      content: "zcash ZEC privacy coin shielded transactions zero knowledge"
    },
    // DeFi
    {
      url: "/defi",
      title: "DeFi - Finanza Decentralizzata",
      content: "defi finanza decentralizzata uniswap aave compound curve balancer lido yearn jupiter raydium traderjoe camelot stargate layerzero orbiter jumper debridge hyperliquid syncswap usdc usdt derive rysk stablecoin derivatives"
    },
    {
      url: "/defi/hyperliquid",
      title: "Hyperliquid - DEX perpetui",
      content: "hyperliquid HYPE perpetual futures trading decentralized exchange derivatives leverage margin trading orderbook"
    },
    {
      url: "/defi/uniswap",
      title: "Uniswap - DEX leader",
      content: "uniswap UNI automated market maker AMM liquidity pools swap token exchange ethereum"
    },
    {
      url: "/defi/usdc",
      title: "USDC - Stablecoin",
      content: "usdc usd coin stablecoin pagamenti tesoreria defi circle fiat collateralized market cap"
    },
    {
      url: "/defi/usdt",
      title: "USDT - Stablecoin",
      content: "usdt tether stablecoin dollaro liquidità trading exchange defi market cap"
    },
    {
      url: "/defi/derive",
      title: "Derive - Derivatives",
      content: "derive derivatives perpetual options on-chain trading defi"
    },
    {
      url: "/defi/rysk",
      title: "Rysk - Options Strategies",
      content: "rysk options premium yield on-chain defi strategies"
    },
    
    // Wallet
    {
      url: "/wallet",
      title: "Wallet - Portafogli crypto",
      content: "wallet portafoglio metamask phantom rainbow rabby ledger trezor hardware wallet software wallet chiavi private seed phrase backup sicurezza"
    },
    {
      url: "/wallet/metamask",
      title: "MetaMask - Wallet Ethereum",
      content: "metamask ethereum wallet browser extension mobile app connect dapp web3 fox"
    },
    {
      url: "/wallet/phantom",
      title: "Phantom - Wallet Solana",
      content: "phantom solana wallet browser extension mobile app connect dapp web3 purple ghost"
    },
    {
      url: "/wallet/ledger",
      title: "Ledger - Hardware Wallet",
      content: "ledger hardware wallet cold storage sicurezza nano s nano x offline private keys"
    },
    
    // Memecoins
    {
      url: "/memecoins",
      title: "Memecoins - Token divertenti",
      content: "memecoins meme token dogecoin doge shiba inu shib pepe pepecoin bonk floki dogwifhat wif floppa sharkcat retardio tremp boden kenedy higher apu bigtime milady remilio tubbycats pudgypenguins cpunks tn100x community viral social media hype speculazione volatilità"
    },
    
    // NFT
    {
      url: "/nft",
      title: "NFT - Token Non Fungibili",
      content: "nft non fungible token cryptopunks bored ape pudgy penguins milady remilio tubbycats opensea blur magic eden looksrare superrare profile pictures pfp arte digitale marketplace collection floor price rarity"
    },
    
    // Airdrops
    {
      url: "/airdrops",
      title: "Airdrops - Token gratuiti",
      content: "airdrops token gratuiti farming points rewards eligibility criteria snapshot claim distribution protocol rewards"
    },
    {
      url: "/defi/hyperliquid",
      title: "Hyperliquid Airdrop",
      content: "hyperliquid airdrop HYPE token farming trading volume points rewards eligibility"
    },
    
    // Exchange
    {
      url: "/exchange",
      title: "Exchange - Piattaforme di trading",
      content: "exchange kraken binance coinbase trading comprare vendere crypto KYC verifica identità"
    },
    {
      url: "/exchange/kraken",
      title: "Kraken - Exchange sicuro",
      content: "kraken exchange sicurezza trading bitcoin ethereum altcoin fiat euro dollaro"
    },
    
    // News
    {
      url: "/news",
      title: "News Crypto & Web3",
      content: "news notizie crypto web3 bitcoin ethereum defi airdrops memecoins gaming stablecoins regolamentazioni ai intelligenza artificiale"
    },
    {
      url: "/news/general",
      title: "General News - Notizie generali",
      content: "bitcoin ethereum adozione crypto web3 social media decentralizzazione mainstream adoption mercati"
    },
    {
      url: "/news/defi",
      title: "DeFi News - Finanza decentralizzata",
      content: "uniswap v4 hook tvl total value locked lending aave compound curve balancer liquid staking"
    },
    {
      url: "/news/airdrops",
      title: "Hot Airdrops - Airdrop promettenti",
      content: "layerzero base ecosystem zksync farming airdrop token gratuiti eligibility criteria rewards"
    },
    {
      url: "/news/crypto-ai",
      title: "Crypto AI - Intelligenza artificiale",
      content: "ai agents blockchain smart contracts automation trading bots machine learning nft generati"
    },
    {
      url: "/news/stablecoins",
      title: "Stablecoins - Monete stabili",
      content: "usdc usdt paypal pyusd mica europa stablecoin europee regolamentazione payments"
    },
    {
      url: "/news/regolamentazioni",
      title: "Regolamentazioni - Normative crypto",
      content: "mica europa sec usa bitcoin etf approvazioni legal enforcement compliance normative"
    },
    {
      url: "/news/gaming",
      title: "Gaming - Giochi & Mercati di Predizione e P2E",
      content: "axie infinity solana gaming nft gaming play to earn gamefi blockchain games"
    },
    {
      url: "/news/memecoins",
      title: "Memecoins - Token meme",
      content: "pepe shib dogecoin doge elon musk base memecoins meme season viral community hype"
    },
    
    // Altri
    {
      url: "/supporto",
      title: "Supporto - Assistenza",
      content: "supporto assistenza aiuto faq domande frequenti contatti support help"
    },
    {
      url: "/leaderboards/global",
      title: "Leaderboard Globale",
      content: "classifica utenti punteggi ranking globale leaderboard engagement twitter campagne"
    },
    {
      url: "/leaderboards/epoch",
      title: "Leaderboard Campagne",
      content: "classifica per campagne epoch progetto reward punteggi attività utenti"
    },
    {
      url: "/percorsi-apprendimento",
      title: "Percorsi di Apprendimento",
      content: "principiante intermedio avanzato percorso guidato moduli studio web3"
    },
    {
      url: "/profilo",
      title: "Profilo Utente",
      content: "profilo wallet indirizzi social impostazioni privacy account"
    },
    {
      url: "/esplora-app",
      title: "Mappa Ecosistema",
      content: "esplora app ecosistema web3 strumenti progetti categorie"
    },
    {
      url: "/strumentiutili",
      title: "Strumenti Utili",
      content: "tool dashboard analisi coingecko defillama debank nansen"
    },
    {
      url: "/strumentiutili/defillama",
      title: "DeFiLlama - Dashboard analytics",
      content: "defillama analytics tvl fees protocols chain dashboard research strumenti utili"
    },
    {
      url: "/giochi",
      title: "Giochi & Mercati di Predizione - Giochi blockchain",
      content: "gamefi giochi blockchain play to earn P2E gaming nft gaming tokens rewards"
    }
  ];
}

export default SearchBar;


