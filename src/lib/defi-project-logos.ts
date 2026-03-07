import type { StaticImageData } from "next/image";
import hyperliquidIcon from "@/assets/hyperliquid-icon.png";
import placeholder from "@/assets/placeholder.svg";

export const DEFI_PROJECT_LOGOS: Record<string, StaticImageData> = {
  hyperliquid: hyperliquidIcon,
};

export function getDefiProjectLogo(slug: string): StaticImageData {
  return DEFI_PROJECT_LOGOS[slug.toLowerCase()] ?? placeholder;
}
