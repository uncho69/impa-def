import { ReactNode } from "react";

const sectionStyle =
  "lg:bg-[#94C0CC]/30 lg:shadow-md font-oxygen lg:font-overpass text-base lg:text-2xl lg:rounded-md flex flex-col gap-4 lg:p-5 w-full";

export function SectionBody({ children }: { children?: ReactNode }) {
  return <div className={sectionStyle}>{children}</div>;
}
