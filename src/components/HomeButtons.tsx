import { Button } from "./Button";

const btnStyle =
  "grow bg-accent leading-7 shrink shadow text-2xl text-[#DDDCDC] font-oxygen flex items-center justify-center px-6 h-16 rounded text-center no-underline";

export function HomeButtons() {
  return (
    <div className="flex gap-2 justify-stretch">
      <Button href="/blockchain" local={true} className={btnStyle}>
        Blockchains
      </Button>
      <Button href="/portafogli" local={true} className={btnStyle}>
        Portafogli
        <br />
        (wallets)
      </Button>
      <Button
        href="/compravendi"
        local={true}
        className={`${btnStyle} !shrink-0`}
      >
        Compra e<br />
        Vendi Crypto
      </Button>
      <Button href="/defi" local={true} className={btnStyle}>
        DeFi
      </Button>
      <Button href="/nft" local={true} className={btnStyle}>
        NFTs
      </Button>
      <Button href="/giochi" local={true} className={btnStyle}>
        Giochi
      </Button>
      <Button href="/carte" local={true} className={btnStyle}>
        Carte
        <br />
        Crypto
      </Button>
      <Button href="/strumenti" local={true} className={btnStyle}>
        Strumenti
      </Button>
    </div>
  );
}
