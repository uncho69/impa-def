import { SectionTitle } from "./SectionTitle";
import { Button } from "./Button";
import { ReactNode } from "react";
import Image from "next/image";
import externalLinkIcon from "@/assets/external-link.svg";
import xLogo from "@/assets/x.svg";
import placeholder from "@/assets/placeholder.svg";

export function RichSectionTitle({
  children,
  externalLink,
  xPage,
  icon = placeholder,
}: {
  children: ReactNode;
  externalLink?: string;
  xPage?: string;
  icon?: string;
}) {
  return (
    <div className="bg-foreground lg:bg-inherit rounded-md lg:p-0 p-6 flex flex-col lg:flex-row h-44 lg:h-auto">
      <SectionTitle>
        <div className="flex lg:items-center flex-col lg:flex-row lg:justify-evenly lg:gap-16 gap-6 h-full">
          <div className="flex items-center gap-6">
            <Image src={icon} alt="" className="lg:hidden w-16" />
            <p className="text-3xl lg:text-auto">{children}</p>
          </div>
          <div className="flex gap-3 h-full">
            {externalLink && (
              <Button
                href={externalLink}
                target="_blank"
                className="pointer-events-auto flex items-center lg:text-2xl text-base bg-white rounded-md h-full lg:p-2 p-2 font-bold"
              >
                Website
                <Image src={externalLinkIcon} alt="" className="lg:w-7 w-5" />
              </Button>
            )}
            {xPage && (
              <Button
                href={xPage}
                target="_blank"
                className="pointer-events-auto bg-white rounded-md h-full lg:p-2 p-2 lg:size-auto size-10 flex items-center justify-center"
              >
                <Image src={xLogo} alt="" className="lg:size-6 w-5" />
              </Button>
            )}
          </div>
        </div>
      </SectionTitle>
    </div>
  );
}
