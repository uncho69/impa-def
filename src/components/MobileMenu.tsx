"use client";

import { Button } from "./Button";
import BurgerIcon from "@/assets/Burger-Icon.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const btnModalStyle =
  "bg-[#0D2F5A] leading-7 text-xl text-[#DDDCDC] h-[60px] font-oxygen items-center justify-center w-full rounded shadow-md text-center no-underline flex flex-grow";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="lg:hidden relative">
      <Button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-center size-12"
      >
        <Image src={BurgerIcon} alt="" />
      </Button>
      {open && (
        <div className="absolute px-4 -right-7 top-20 w-[100vw] z-30">
          <div className=" bg-[#0D2F5A]/90 flex w-full rounded-lg">
            <div className="grid grid-cols-2 gap-2 p-5 w-full">
              <Button href="/manuale" local={true} className={btnModalStyle}>
                Strumenti
              </Button>
              <Button href="/wallets" local={true} className={btnModalStyle}>
                Portafogli
                <br />
                (Wallets)
              </Button>
              <Button href="/blockchain" local={true} className={btnModalStyle}>
                Blockchains
              </Button>
              <Button
                href="/compravendi"
                local={true}
                className={`${btnModalStyle} !shrink-0`}
              >
                Compra e<br />
                Vendi Crypto
              </Button>
              <Button href="/defi" local={true} className={btnModalStyle}>
                DeFi
              </Button>
              <Button href="/defi" local={true} className={btnModalStyle}>
                Airdrops
              </Button>
              <Button href="/nft" local={true} className={btnModalStyle}>
                NFTs
              </Button>
              <Button href="/giochi" local={true} className={btnModalStyle}>
                Giochi
              </Button>
              <Button href="/strumenti" local={true} className={btnModalStyle}>
                Strumenti
              </Button>
              <Button href="/carte" local={true} className={btnModalStyle}>
                Carte
                <br />
                Crypto
              </Button>
              <Button href="/aggiornami" local={true} className={btnModalStyle}>
                Tieniti
                <br />
                Aggiornato
              </Button>
              <Button href="/strumenti" local={true} className={btnModalStyle}>
                Lavora in
                <br />
                Web3
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
