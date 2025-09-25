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
  description,
  badgeText,
  badgeColor = "blue",
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
  description?: string;
  badgeText?: string;
  badgeColor?: "blue" | "green" | "red" | "yellow" | "purple" | "gray";
}) {
  return (
    <div className="relative card flex-none w-full max-w-[360px] h-full">
      <Link href={href} className="absolute inset-0 z-10" />
      <div className="card-content pointer-events-none items-start text-left gap-4 md:gap-6 p-6 h-full flex flex-col">
        <div className="flex gap-3 md:gap-4 items-center justify-between w-full">
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
          {badgeText && (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              badgeColor === 'blue' ? 'bg-blue-100 text-blue-800' :
              badgeColor === 'green' ? 'bg-green-100 text-green-800' :
              badgeColor === 'red' ? 'bg-red-100 text-red-800' :
              badgeColor === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
              badgeColor === 'purple' ? 'bg-purple-100 text-purple-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {badgeText}
            </span>
          )}
        </div>
        {description && (
          <div className="text-sm gradient-text leading-relaxed flex-1">
            {description}
          </div>
        )}
        {subArray && subArray.length > 0 ? (
          <div className="flex flex-col gap-3">
            {subArrayTitle && (
              <span className="text-sm text-neutral-600">{subArrayTitle}</span>
            )}
            {/* Se tutti gli elementi hanno solo icone senza testo, mostra una griglia di loghi */}
            {subArray.every(item => typeof item === 'object' && (!item.text || item.text === '')) ? (
              <div className="flex flex-wrap gap-2">
                {subArray.map((item, index) => (
                  <div key={index} className="flex items-center justify-center w-8 h-8 bg-white rounded-lg shadow-sm border border-neutral-200 p-1">
                    <Image 
                      src={typeof item === 'object' ? item.icon : Placeholder} 
                      alt="" 
                      className="w-6 h-6" 
                      width={24}
                      height={24}
                    />
                  </div>
                ))}
              </div>
            ) : (
              /* Layout originale per elementi con testo */
              subArrayTitle && subArrayTitle.split('\n').map((line, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <span className="text-sm text-neutral-600">{line}</span>
                  <span className="text-base font-semibold text-neutral-900">
                    {typeof subArray[index] === 'string' ? subArray[index] : subArray[index]?.text || ''}
                  </span>
                </div>
              ))
            )}
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
