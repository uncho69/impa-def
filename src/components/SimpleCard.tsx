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
  subArrayTitle = "Reti",
  externalLink,
  xPage,
  href = "/",
}: {
  icon?: StaticImageData;
  title: string;
  subArray?: { icon: StaticImageData; text: string }[];
  subArrayTitle?: string;
  externalLink?: string;
  xPage?: string;
  href?: string;
}) {
  return (
    <div className="relative card flex-none w-full max-w-[360px]">
      <Link href={href} className="absolute inset-0 z-10" />
      <div className="card-content pointer-events-none items-start text-left gap-4 md:gap-6 p-6">
        <div className="flex gap-3 md:gap-4 items-center">
          <Image src={icon} alt={title} className="w-10 h-10 md:w-12 md:h-12" />
          <p className="text-xl md:text-2xl font-semibold text-neutral-900">{title}</p>
        </div>
        {subArray?.length ? (
          <div className="flex flex-col gap-2">
            {subArrayTitle && (
              <p className="text-sm md:text-base text-neutral-600">{subArrayTitle}</p>
            )}
            <div className="flex gap-2 items-center">
              {subArray.map((item, i) => (
                <Image
                  key={`subArray-${i}`}
                  src={item.icon}
                  alt={item.text}
                  className="w-5 md:w-6"
                />
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="flex justify-between gap-3 mt-4 w-full">
          {externalLink && (
            <Button
              href={externalLink}
              onLinkClick={(e) => e.stopPropagation()}
              target="_blank"
              className="pointer-events-auto btn bg-white border border-neutral-200 text-neutral-900 px-4 py-3 grow justify-between"
            >
              Website
              <Image src={externalLinkIcon} alt="" className="w-5 md:w-6" />
            </Button>
          )}
          {xPage && (
            <Button
              href={xPage}
              onLinkClick={(e) => e.stopPropagation()}
              target="_blank"
              className="pointer-events-auto btn bg-white border border-neutral-200 px-4 py-3"
            >
              <Image src={xLogo} alt="" className="w-5 md:w-6" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
