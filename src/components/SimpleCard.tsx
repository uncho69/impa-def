"use client";

import { StaticImageData } from "next/image";
import Image from "next/image";
import { Button } from "./Button";
import Placeholder from "@/assets/placeholder.svg";
import xLogo from "@/assets/x.svg";
import externalLinkIcon from "@/assets/external-link.svg";
import Link from "next/link";

export function SimpleCard({
  icon = Placeholder,
  title,
  subArray,
  subArrayTitle = "Prezzo:\nMarket Cap:",
  externalLink,
  xPage,
  href = "/",
  image,
  website,
  xProfile,
  tokenNFT,
}: {
  icon?: StaticImageData;
  title: string;
  subArray?: ({ icon: StaticImageData; text: string } | string)[];
  subArrayTitle?: string;
  externalLink?: string;
  xPage?: string;
  href?: string;
  image?: string | StaticImageData;
  website?: string;
  xProfile?: string;
  tokenNFT?: string;
}) {
  return (
    <div className="relative card flex-none w-full max-w-[360px]">
      <Link href={href} className="absolute inset-0 z-10" />
      <div className="card-content pointer-events-none items-start text-left gap-4 md:gap-6 p-6">
        <div className="flex gap-3 md:gap-4 items-center">
          {image ? (
            <Image 
              src={typeof image === 'string' ? (image.startsWith('/') ? image : `/${image}`) : image} 
              alt={title} 
              className="w-10 h-10 md:w-12 md:h-12" 
              width={48}
              height={48}
            />
          ) : (
            <Image 
              src={icon} 
              alt={title} 
              className="w-10 h-10 md:w-12 md:h-12" 
              width={48}
              height={48}
            />
          )}
          <p className="text-xl md:text-2xl font-semibold text-neutral-900">{title}</p>
        </div>
        {subArray && subArray.length > 0 ? (
          <div className="flex flex-col gap-2">
            {subArrayTitle && (
              <div className="text-sm md:text-base text-neutral-600">
                {subArrayTitle.split('\n').map((line, index) => (
                  <div key={index} className="mb-1">{line}</div>
                ))}
              </div>
            )}
            <div className="flex gap-2 items-center">
              {subArray.map((item, i) => (
                <div key={`subArray-${i}`} className="text-sm text-neutral-700">
                  {typeof item === 'string' ? item : item.text}
                </div>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="flex justify-between gap-3 mt-4 w-full">
          {/* Support for both old and new parameters */}
          {(website || externalLink) && (
            <Button
              href={website || externalLink || "#"}
              onLinkClick={(e) => e.stopPropagation()}
              target="_blank"
              className="pointer-events-auto btn bg-white border border-neutral-200 text-neutral-900 px-4 py-3 grow justify-between relative z-20"
            >
              Website
              <Image src={externalLinkIcon} alt="" className="w-5 md:w-6" />
            </Button>
          )}
          {(xProfile || xPage) && (
            <Button
              href={xProfile || xPage || "#"}
              onLinkClick={(e) => e.stopPropagation()}
              target="_blank"
              className="pointer-events-auto btn bg-white border border-neutral-200 px-4 py-3 relative z-20"
            >
              <Image src={xLogo} alt="" className="w-5 md:w-6" />
            </Button>
          )}
          {tokenNFT && (
            <Button
              href={tokenNFT}
              onLinkClick={(e) => e.stopPropagation()}
              target="_blank"
              className="pointer-events-auto btn bg-white border border-neutral-200 text-neutral-900 px-4 py-3 relative z-20"
            >
              Token
              <Image src={externalLinkIcon} alt="" className="w-5 md:w-6" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
