import { Button } from "./Button";

export function ExploreWeb3() {
  return (
    <div className="mt-12 bg-primary-50/30 p-6 rounded-xl">
      <h3 className="text-xl font-bold mb-4 text-center gradient-text">Esplora il mondo Web3</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button href="/manuale" local={true} className="btn btn-outline h-12 flex items-center justify-center">
          Manuale
        </Button>
        <Button href="/blockchain" local={true} className="btn btn-outline h-12 flex items-center justify-center">
          Blockchain
        </Button>
        <Button href="/defi" local={true} className="btn btn-outline h-12 flex items-center justify-center">
          DeFi
        </Button>
        <Button href="/compraevendicrypto" local={true} className="btn btn-outline h-12 flex items-center justify-center">
          Compra e Vendi Crypto
        </Button>
        <Button href="/memecoins" local={true} className="btn btn-outline h-12 flex items-center justify-center">
          Memecoins
        </Button>
        <Button href="/airdrops" local={true} className="btn btn-outline h-12 flex items-center justify-center">
          Airdrops
        </Button>
        <Button href="/nft" local={true} className="btn btn-outline h-12 flex items-center justify-center">
          NFTs
        </Button>
        <Button href="/giochi" local={true} className="btn btn-outline h-12 flex items-center justify-center">
          Giochi & Mercati di Predizione
        </Button>
        <Button href="/wallet" local={true} className="btn btn-outline h-12 flex items-center justify-center">
          Wallet
        </Button>
        <Button href="/strumentiutili" local={true} className="btn btn-outline h-12 flex items-center justify-center">
          Strumenti Utili
        </Button>
        <Button href="/eventi-storici" local={true} className="btn btn-outline h-12 flex items-center justify-center">
          Eventi Storici
        </Button>
      </div>
    </div>
  );
}
