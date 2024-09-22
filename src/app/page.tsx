import { HomeButtons } from "@/components/HomeButtons";
import Image from "next/image";
import VideoImage from "@/assets/Video.png";

export default function Home() {
  return (
    <div className="lg:py-7 py-5 flex flex-col gap-7 lg:gap-14">
      <div className="hidden lg:block w-full">
        <HomeButtons />
      </div>
      <div className="flex gap-7 lg:gap-14 lg:px-14 px-1 flex-col items-center w-full">
        <div className="flex flex-col lg:flex-row gap-7 lg:gap-16 items-start">
          <div className="lg:bg-foreground lg:w-1/2 rounded-2xl lg:py-5 lg:px-8 text-lg lg:text-4xl lg:font-bold lg:pb-12 lg:shadow-md font-oxygen lg:font-overpass">
            Blockchains, Finanza Decentralizzata (DeFi), NFTs, memecoins,
            metaversi.
            <br />
            <br />
            Tutto questo è Web3. Le opportunità sono infinite, ma purtroppo
            anche le trappole.
            <br />
            <br />
            ImparoDeFi è stata costruita dai migliori esperti del settore per
            aiutarti a navigare questo nuovo mondo pieno di opportunità.
          </div>
          <div className="lg:w-1/2 w-full">
            <Image
              src={VideoImage}
              alt=""
              className="w-full object-cover rounded-2xl"
            />
          </div>
        </div>
        <div className="flex flex-col gap-10 lg:justify-center lg:items-center w-full">
          <div className="w-full lg:text-center font-oxygen lg:text-[40px] lg:leading-normal text-lg">
            Inserisci la tua email per ottenere accesso gratuito all’intera
            piattaforma
          </div>

          <input
            type="text"
            className="font-oxygen text-black bg-[#1668D0]/50 placeholder-black placeholder:text-xl p-2 lg:min-w-96 shadow-md max-w-48 lg:placeholder:text-3xl lg:text-3xl lg:px-4 lg:py-5 rounded-md"
            placeholder="Email"
          />
        </div>
      </div>
    </div>
  );
}
