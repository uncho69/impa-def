"use client";

import { StaticImageData } from "next/image";
import Image from "next/image";
import Placeholder from "@/assets/placeholder.svg";
import xLogo from "@/assets/x.svg";
import exernalLinkIcon from "@/assets/external-link.svg";
import { Button } from "./Button";
import Link from "next/link";
import { useTokenDetails } from "@/hooks/useTokenDetails";

export function TokenCard({
  icon = Placeholder,
  tokenId,
  href = "#",
  externalLink,
  xPage,
  year,
}: {
  icon?: StaticImageData;
  tokenId: string;
  href?: string;
  externalLink?: string;
  xPage?: string;
  year?: number;
}) {
  const data = useTokenDetails(tokenId);
  const formatCurrency = ({
    value,
    decimals,
  }: {
    value: number;
    decimals?: number;
  }) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: decimals,
    }).format(value);
  };

  return (
    <div className="cursor-pointer relative lg:w-[400px] lg:h-auto w-1/2 bg-slate-200 ">
      <Link href={href} className="absolute w-full h-full" />
      {!data?.data ? (
        <div className="w-full h-full flex items-center justify-center text-xl">
          Loading
        </div>
      ) : (
        <div className="relative h-full min-w-full pointer-events-none font-oxygen border-solid border-[1px] shadow-md border-slate-300 lg:p-6 lg:gap-5 px-4 py-3 gap-5  flex flex-col rounded-md">
          <div className="flex items-center justify-between">
            <div className="text-2xl">{data.data.name}</div>
            <Image
              src={icon}
              alt={data.data.name}
              className="lg:w-10 w-6 text-lg lg:hidden"
            />
          </div>
          <div className="flex gap-4 lg:justify-evenly justify-between items-center lg:flex-row-reverse">
            <p className="lg:text-3xl text-lg">
              {formatCurrency({
                value: +data.data.priceUsd,
                decimals: +data.data.priceUsd > 100 ? 0 : 2,
              })}
            </p>
            <p className="lg:text-3xl text-lg hidden lg:block">=</p>
            <p className="lg:text-3xl text-lg">{data.data.symbol || "TOKEN"}</p>
            <Image
              src={icon}
              alt={data.data.name}
              className="lg:w-10 w-6 text-lg hidden lg:block"
            />
          </div>
          <div className="hidden lg:flex items-center justify-between text-sm">
            <p>CAP. DI MERCATO</p>
            <p>
              {formatCurrency({
                value: +data.data.marketCapUsd,
                decimals: +data.data.marketCapUsd > 100 ? 0 : 2,
              })}
            </p>
          </div>
          {year ? (
            <div className="hidden lg:flex items-center justify-between text-sm">
              <p>ANNO DI LANCIO</p>
              <p>{year}</p>
            </div>
          ) : (
            ""
          )}
          <div className="lg:hidden flex justify-between lg:gap-5 gap-2 mt-auto">
            {externalLink && (
              <Button
                href={externalLink}
                onLinkClick={(e) => e.stopPropagation()}
                target="_blank"
                className="pointer-events-auto flex items-center justify-between grow lg:text-3xl text-base bg-white rounded-md lg:p-5 p-2 font-bold"
              >
                Website
                <Image src={exernalLinkIcon} alt="" className="lg:w-10 w-5" />
              </Button>
            )}
            {xPage && (
              <Button
                href={xPage}
                onLinkClick={(e) => e.stopPropagation()}
                target="_blank"
                className="pointer-events-auto bg-white rounded-md lg:p-5 p-2 lg:size-auto size-10 flex items-center justify-center"
              >
                <Image src={xLogo} alt="" className="lg:w-10 w-5" />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
