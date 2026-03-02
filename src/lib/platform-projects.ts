/**
 * Lista canonica dei progetti/blockchain presenti sulla piattaforma ImparoDeFi.
 * Usata per il dropdown "Progetto" in admin (Crea campagna) e per garantire
 * che i progetti esistano nel DB quando si crea una campagna.
 * id = slug (es. usato in /blockchain/:id), name = etichetta da mostrare.
 */
export const PLATFORM_PROJECTS: { id: string; name: string }[] = [
  { id: 'arbitrum', name: 'Arbitrum' },
  { id: 'avalanche', name: 'Avalanche' },
  { id: 'base', name: 'Base' },
  { id: 'berachain', name: 'Berachain' },
  { id: 'bitcoin', name: 'Bitcoin' },
  { id: 'blast', name: 'Blast' },
  { id: 'degen', name: 'Degen' },
  { id: 'ethereum', name: 'Ethereum' },
  { id: 'hyperlane', name: 'Hyperlane' },
  { id: 'hyperliquid', name: 'Hyperliquid' },
  { id: 'imparodefi', name: 'ImparoDefi' },
  { id: 'layer3', name: 'Layer3' },
  { id: 'linea', name: 'Linea' },
  { id: 'optimism', name: 'Optimism' },
  { id: 'polygon', name: 'Polygon' },
  { id: 'polygon_zkEVM', name: 'Polygon zkEVM' },
  { id: 'sanko', name: 'Sanko' },
  { id: 'scroll', name: 'Scroll' },
  { id: 'solana', name: 'Solana' },
  { id: 'zksync', name: 'zkSync' },
  { id: 'zora', name: 'Zora' },
];
