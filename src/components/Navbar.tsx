import Link from "next/link";
import { Button } from "./Button";
import Burger_Icon from "@/assets/Burger-Icon.png";
import Image from "next/image";

const btnStyle =
  "bg-[#2E466E47]/30 border-white/50 border leading-7 shadow text-2xl text-[#DDDCDC] font-oxygen flex items-center justify-center max-w-44 p-3 h-full !rounded text-center no-underline";

export function Navbar() {
  return (
    <div className="w-full p-5 lg:p-0">
      <nav className="bg-gradient-to-b from-[#184278] to-[#A7CFBE] h-16 lg:h-28 w-full flex justify-center rounded-[20px] lg:rounded-none shadow-xl lg:!shadow">
        <div className="flex items-center justify-between h-full w-full px-4 py-3 max-w-screen-2xl text-[#08213F]">
          <Link href="/" className="no-underline text-[#08213F]">
            <h1 className="font-roboto lg:text-5xl text-4xl font-bold lg:font-extrabold">
              ImparoDeFi
            </h1>
          </Link>
          <div className="hidden lg:flex justify-center gap-3 h-full">
            <Button href="/blockchain" local={true} className={btnStyle}>
              Manuale <br /> A-Z
            </Button>
            <Button className={btnStyle}>
              Tieniti
              <br />
              Aggiornato
            </Button>
            <Button className={btnStyle}>
              Lavora
              <br />
              in Web3
            </Button>
          </div>
          <Button className="lg:hidden">
            <Image src={Burger_Icon} alt="" />
          </Button>
        </div>
      </nav>
    </div>
  );
}
