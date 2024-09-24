"use client";
import { Button } from "./Button";
import { useState, useRef, useEffect } from "react";

export function ModalMenu() {
  const [open, setOpen] = useState(false);
  const modalRef = useRef<null | HTMLDivElement>(null);

  const btnStyle =
    "grow bg-accent leading-7 shrink shadow text-2xl text-[#DDDCDC] font-oxygen hidden lg:flex items-center justify-center px-6 h-16 rounded text-center no-underline";
  const btnModalStyle =
    "bg-accent leading-7 text-3xl text-[#DDDCDC] h-[70px] font-oxygen items-center justify-center rounded text-center no-underline flex flex-grow";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        event.target instanceof HTMLElement &&
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <Button onClick={() => setOpen(!open)} className={`${btnStyle}`}>
        Menu
      </Button>
      {open && (
        <div
          ref={modalRef}
          className="absolute top-20 right-0 bg-foreground/75 border border-accent p-4 shadow-lg rounded-lg min-w-[500px]"
        >
          <div className="flex flex-wrap gap-2 justify-between">
            <Button href="/blockchain" local={true} className={btnModalStyle}>
              Blockchains
            </Button>
            <Button href="/portafogli" local={true} className={btnModalStyle}>
              Portafogli
              <br />
              (wallets)
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
            <Button href="/carte" local={true} className={btnModalStyle}>
              Carte
              <br />
              Crypto
            </Button>
            <Button href="/strumenti" local={true} className={btnModalStyle}>
              Strumenti
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
