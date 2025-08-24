import { Button } from "./Button";

export function ExploreWeb3() {
  return (
    <div className="mt-12 bg-primary-50/30 p-6 rounded-xl">
      <h3 className="text-xl font-bold mb-4 text-center gradient-text">Esplora il mondo Web3</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Button href="/manuale" local={true} className="btn btn-outline">
          Manuale
        </Button>
        <Button href="/blockchain" local={true} className="btn btn-outline">
          Blockchain
        </Button>
        <Button href="/defi" local={true} className="btn btn-outline">
          DeFi
        </Button>
        <Button href="/nft" local={true} className="btn btn-outline">
          NFTs
        </Button>
        <Button href="/giochi" local={true} className="btn btn-outline">
          GameFi
        </Button>
        <Button href="/wallet" local={true} className="btn btn-outline">
          Wallet
        </Button>
      </div>
    </div>
  );
}
