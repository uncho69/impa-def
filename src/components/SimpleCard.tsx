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
  compact = false,
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
  compact?: boolean;
}) {
  return (
    <div className="relative card dark:bg-indigo-900/30 dark:border-indigo-500/20 dark:shadow-none flex-none w-full max-w-[360px] h-full">
      <Link href={href} className="absolute inset-0 z-10" />
      <div className={`card-content pointer-events-none items-start text-left h-full flex flex-col ${compact ? "gap-2 p-4" : "gap-4 md:gap-6 p-6"}`}>
        <div className={`flex flex-row flex-wrap w-full items-start ${compact ? "gap-2" : "gap-3 md:gap-4"}`}>
          <div className={`flex items-center min-w-0 ${compact ? "gap-2" : "gap-3 md:gap-4"}`}>
            {image ? (
              <Image 
                src={typeof image === 'string' ? (image.startsWith('/') ? image : `/${image}`) : image} 
                alt={title} 
                className={compact ? "w-8 h-8 shrink-0" : "w-10 h-10 md:w-12 md:h-12 shrink-0"} 
                width={compact ? 32 : 48}
                height={compact ? 32 : 48}
              />
            ) : (
              <Image 
                src={icon} 
                alt={title} 
                className={compact ? "w-8 h-8 shrink-0" : "w-10 h-10 md:w-12 md:h-12 shrink-0"} 
                width={compact ? 32 : 48}
                height={compact ? 32 : 48}
              />
            )}
            <div className="flex flex-col gap-0.5 min-w-0">
              <p className={`font-semibold text-slate-900 dark:text-white ${compact ? "text-base" : "text-xl md:text-2xl"}`}>{title}</p>
              {badgeText && (
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full w-fit ${
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
          </div>
          {subArray && subArray.length > 0 && !subArray.every(item => typeof item === 'object' && (!item.text || item.text === '')) && subArrayTitle ? (
            <div className={`flex flex-col ml-auto shrink-0 ${compact ? "gap-0.5 text-xs" : "gap-1.5 text-sm"}`}>
              {subArrayTitle.split('\n').map((line, index) => (
                <div key={index} className="flex items-baseline gap-2">
                  <span className="text-slate-600 dark:text-slate-300 shrink-0">{line}</span>
                  <span className={`font-semibold text-slate-900 dark:text-slate-100 truncate ${compact ? "text-xs" : "text-base"}`}>
                    {typeof subArray[index] === 'string' ? subArray[index] : subArray[index]?.text || ''}
                  </span>
                </div>
              ))}
            </div>
          ) : subArray && subArray.length > 0 && subArray.every(item => typeof item === 'object' && (!item.text || item.text === '')) ? (
            <div className="flex flex-wrap gap-2">
              {subArray.map((item, index) => (
                <div key={index} className="flex items-center justify-center w-8 h-8">
                  <Image 
                    src={typeof item === 'object' ? item.icon : Placeholder} 
                    alt="" 
                    className="w-8 h-8" 
                    width={32}
                    height={32}
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>
        {description && (
          <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed flex-1">
            {description}
          </div>
        )}
        <div className={`flex justify-between items-center gap-2 w-full ${compact ? "mt-2" : "mt-4"}`}>
          {(website || externalLink) && (
            <Button
              href={website || externalLink || "#"}
              onLinkClick={(e) => e.stopPropagation()}
              target="_blank"
              className={`pointer-events-auto btn bg-white dark:bg-indigo-950/50 border border-neutral-200 dark:border-indigo-500/30 text-neutral-900 dark:text-slate-100 relative z-20 shrink-0 ${compact ? "px-2.5 py-1.5 text-sm" : "px-3 py-2 text-sm justify-center gap-1.5"}`}
            >
              {compact ? (
                <>
                  <span className="whitespace-nowrap">Sito</span>
                  <Image src={externalLinkIcon} alt="" className="w-4 ml-1" />
                </>
              ) : (
                <>
                  <span className="whitespace-nowrap">Website</span>
                  <Image src={externalLinkIcon} alt="" className="w-4" />
                </>
              )}
            </Button>
          )}
          {(xProfile || xPage) && (
            <Button
              href={xProfile || xPage || "#"}
              onLinkClick={(e) => e.stopPropagation()}
              target="_blank"
              className={`pointer-events-auto btn bg-white dark:bg-indigo-950/50 border border-neutral-200 dark:border-indigo-500/30 relative z-20 ${compact ? "p-1.5" : "px-4 py-3"}`}
            >
              <Image src={xLogo} alt="" className={compact ? "w-4" : "w-5 md:w-6"} />
            </Button>
          )}
          {tokenNFT && (
            <Button
              href={tokenNFT}
              onLinkClick={(e) => e.stopPropagation()}
              target="_blank"
              className={`pointer-events-auto btn bg-white dark:bg-indigo-950/50 border border-neutral-200 dark:border-indigo-500/30 text-neutral-900 dark:text-slate-100 relative z-20 ${compact ? "px-2.5 py-1.5 text-sm" : "px-4 py-3"}`}
            >
              Token
              <Image src={externalLinkIcon} alt="" className={compact ? "w-4 ml-1" : "w-5 md:w-6"} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
