/**
 * Lista canonica dei progetti/blockchain presenti sulla piattaforma ImparoDeFi.
 * Usata per il dropdown "Progetto" in admin (Crea campagna) e per garantire
 * che i progetti esistano nel DB quando si crea una campagna.
 * id = slug (es. usato in /blockchain/:id), name = etichetta da mostrare.
 */
export const PLATFORM_PROJECTS: {
  id: string;
  name: string;
  tokenConfig?: {
    coingeckoId?: string;
    symbol?: string;
    contractAddress?: string;
    xUrl?: string;
  };
}[] = [
  { id: 'abstract', name: 'Abstract' },
  { id: 'arbitrum', name: 'Arbitrum', tokenConfig: { coingeckoId: 'arbitrum', symbol: 'ARB' } },
  { id: 'avalanche', name: 'Avalanche', tokenConfig: { coingeckoId: 'avalanche-2', symbol: 'AVAX' } },
  { id: 'base', name: 'Base' },
  { id: 'berachain', name: 'Berachain', tokenConfig: { coingeckoId: 'berachain-berachain', symbol: 'BERA' } },
  { id: 'bitcoin', name: 'Bitcoin', tokenConfig: { coingeckoId: 'bitcoin', symbol: 'BTC' } },
  { id: 'blast', name: 'Blast', tokenConfig: { coingeckoId: 'blast', symbol: 'BLAST' } },
  { id: 'degen', name: 'Degen', tokenConfig: { coingeckoId: 'degen-base', symbol: 'DEGEN' } },
  { id: 'derive', name: 'Derive', tokenConfig: { symbol: 'DRV' } },
  { id: 'ethereum', name: 'Ethereum', tokenConfig: { coingeckoId: 'ethereum', symbol: 'ETH' } },
  { id: 'hyperevm', name: 'HyperEVM' },
  { id: 'hyperlane', name: 'Hyperlane' },
  { id: 'hyperliquid', name: 'Hyperliquid', tokenConfig: { coingeckoId: 'hyperliquid', symbol: 'HYPE' } },
  { id: 'ink', name: 'Ink' },
  { id: 'layer3', name: 'Layer3' },
  { id: 'linea', name: 'Linea' },
  { id: 'llamaswap', name: 'LlamaSwap' },
  { id: 'optimism', name: 'Optimism', tokenConfig: { coingeckoId: 'optimism', symbol: 'OP' } },
  { id: 'polygon', name: 'Polygon', tokenConfig: { coingeckoId: 'polygon-ecosystem-token', symbol: 'POL' } },
  { id: 'polygon_zkEVM', name: 'Polygon zkEVM' },
  { id: 'railgun', name: 'RAILGUN', tokenConfig: { coingeckoId: 'railgun', symbol: 'RAIL' } },
  { id: 'sanko', name: 'Sanko' },
  { id: 'scroll', name: 'Scroll', tokenConfig: { coingeckoId: 'scroll', symbol: 'SCR' } },
  { id: 'solana', name: 'Solana', tokenConfig: { coingeckoId: 'solana', symbol: 'SOL' } },
  { id: 'usdc', name: 'USDC', tokenConfig: { coingeckoId: 'usd-coin', symbol: 'USDC' } },
  { id: 'usdt', name: 'USDT', tokenConfig: { coingeckoId: 'tether', symbol: 'USDT' } },
  { id: 'zcash', name: 'Zcash', tokenConfig: { coingeckoId: 'zcash', symbol: 'ZEC' } },
  { id: 'zksync', name: 'zkSync', tokenConfig: { coingeckoId: 'zksync', symbol: 'ZK' } },
  { id: 'zora', name: 'Zora', tokenConfig: { coingeckoId: 'zora', symbol: 'ZORA' } },
];
