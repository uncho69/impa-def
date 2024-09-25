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
    <div className="lg:w-[450px] relative lg:h-96 w-[175px] bg-slate-200">
      <Link
        href={href}
        className="absolute w-full cursor-pointer h-full z-10"
      />
      <div className="z-20 pointer-events-none  relative w-full h-full  border-solid border-[1px] shadow-md border-slate-300 lg:p-8 lg:gap-10 px-4 py-3 gap-5  flex flex-col rounded-md">
        <div className="flex gap-4 items-center">
          <Image src={icon} alt={title} className="lg:w-20 w-6" />
          <p className="font-oxygen lg:text-3xl text-lg">{title}</p>
        </div>
        {subArray?.length ? (
          <div className="flex flex-col gap-2">
            {subArrayTitle && (
              <p className="font-oxygen lg:text-xl text-sm">{subArrayTitle}</p>
            )}
            <div className="flex lg:gap-2 gap-1 items-center">
              {subArray.map((item, i) => (
                <Image
                  key={`subArray-${i}`}
                  src={item.icon}
                  alt={item.text}
                  className="lg:w-10 w-4"
                />
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="flex justify-between lg:gap-5 gap-1  mt-auto">
          {externalLink && (
            <Button
              href={externalLink}
              onLinkClick={(e) => e.stopPropagation()}
              target="_blank"
              className="pointer-events-auto flex items-center justify-between grow lg:text-3xl text-base bg-white rounded-md lg:p-5 p-2 font-bold"
            >
              Website
              <Image src={externalLinkIcon} alt="" className="lg:w-10 w-5" />
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
    </div>
  );
}
