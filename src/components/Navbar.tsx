import Link from "next/link";
import { Button } from "./Button";
import Image from "next/image";
import logo from "@/assets/imparodefi-logo-nobg.webp";
import { MobileMenu } from "./MobileMenu";

const btnStyle =
  "bg-[#2E466E47]/30 border-white/50 border leading-7 shadow text-2xl text-[#DDDCDC] font-oxygen flex items-center justify-center max-w-44 p-3 h-full !rounded text-center no-underline";

export function Navbar() {
  return (
    <div className="w-full p-5 lg:p-0">
      <nav className="bg-gradient-to-b from-[#184278] to-[#A7CFBE] h-16 lg:h-28 w-full flex justify-center rounded-[20px] lg:rounded-none shadow-xl lg:!shadow">
        <div className="flex items-center justify-between h-full w-full lg:px-4 px-2 py-3 max-w-screen-2xl text-[#08213F]">
          <Link href="/" className="no-underline text-[#08213F]">
            <h1 className="font-roboto lg:text-5xl text-4xl font-bold lg:font-extrabold flex lg:gap-4 gap-2 items-center">
              <Image src={logo} alt="" className="lg:w-20 w-12" />
              ImparoDeFi
            </h1>
          </Link>
          <div className="hidden lg:flex justify-center gap-3 h-full">
            <Button href="/manuale" local={true} className={btnStyle}>
              Manuale <br /> A-Z
            </Button>
            <Button href="/" local={true} className={btnStyle}>
              Tieniti
              <br />
              Aggiornato
            </Button>
            <Button href="/" local={true} className={btnStyle}>
              Lavora
              <br />
              in Web3
            </Button>
          </div>
          <MobileMenu />
        </div>
      </nav>
    </div>
  );
}
