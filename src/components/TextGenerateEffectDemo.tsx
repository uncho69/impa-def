"use client";
import { TextGenerateEffect } from "./ui/text-generate-effect";
 
const words = `Blockchain, DeFi, NFTs, memecoins, metaversi: tutto questo è Web3. Le opportunità sono infinite, ma anche le trappole. ImparoDeFi è la tua guida sicura per navigare questo nuovo mondo.`;
 
export function TextGenerateEffectDemo() {
  return <TextGenerateEffect words={words} />;
}
