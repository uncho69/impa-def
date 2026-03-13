import { Button } from "./Button";

export function ExploreWeb3() {
  return (
    <div className="mt-12 bg-white dark:bg-indigo-950/35 border border-slate-200 dark:border-indigo-500/20 p-6 rounded-2xl shadow-sm">
      <h3 className="text-xl font-bold mb-4 text-center text-slate-900 dark:text-white">Esplora il mondo Web3</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button href="/manuale" local={true} className="btn h-12 flex items-center justify-center border border-slate-200 dark:border-indigo-500/20 bg-slate-50 dark:bg-indigo-900/30 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-indigo-800/45">
          Manuale
        </Button>
        <Button href="/blockchain" local={true} className="btn h-12 flex items-center justify-center border border-slate-200 dark:border-indigo-500/20 bg-slate-50 dark:bg-indigo-900/30 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-indigo-800/45">
          Blockchain
        </Button>
        <Button href="/defi" local={true} className="btn h-12 flex items-center justify-center border border-slate-200 dark:border-indigo-500/20 bg-slate-50 dark:bg-indigo-900/30 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-indigo-800/45">
          DeFi
        </Button>
        <Button href="/compraevendicrypto" local={true} className="btn h-12 flex items-center justify-center border border-slate-200 dark:border-indigo-500/20 bg-slate-50 dark:bg-indigo-900/30 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-indigo-800/45">
          Compra e Vendi Crypto
        </Button>
        <Button href="/memecoins" local={true} className="btn h-12 flex items-center justify-center border border-slate-200 dark:border-indigo-500/20 bg-slate-50 dark:bg-indigo-900/30 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-indigo-800/45">
          Memecoins
        </Button>
        <Button href="/airdrops" local={true} className="btn h-12 flex items-center justify-center border border-slate-200 dark:border-indigo-500/20 bg-slate-50 dark:bg-indigo-900/30 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-indigo-800/45">
          Airdrops
        </Button>
        <Button href="/nft" local={true} className="btn h-12 flex items-center justify-center border border-slate-200 dark:border-indigo-500/20 bg-slate-50 dark:bg-indigo-900/30 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-indigo-800/45">
          NFTs
        </Button>
        <Button href="/giochi" local={true} className="btn h-12 flex items-center justify-center border border-slate-200 dark:border-indigo-500/20 bg-slate-50 dark:bg-indigo-900/30 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-indigo-800/45">
          Giochi & Mercati di Predizione
        </Button>
        <Button href="/wallet" local={true} className="btn h-12 flex items-center justify-center border border-slate-200 dark:border-indigo-500/20 bg-slate-50 dark:bg-indigo-900/30 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-indigo-800/45">
          Wallet
        </Button>
        <Button href="/strumentiutili" local={true} className="btn h-12 flex items-center justify-center border border-slate-200 dark:border-indigo-500/20 bg-slate-50 dark:bg-indigo-900/30 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-indigo-800/45">
          Strumenti Utili
        </Button>
        <Button href="/eventi-storici" local={true} className="btn h-12 flex items-center justify-center border border-slate-200 dark:border-indigo-500/20 bg-slate-50 dark:bg-indigo-900/30 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-indigo-800/45">
          Eventi Storici
        </Button>
      </div>
    </div>
  );
}
