import { ReactNode } from "react";

const sectionStyle =
  "bg-[#94C0CC]/30 lg:bg-transparent lg:shadow-none lg:rounded-none lg:p-0 shadow-md text-xs rounded-md p-4 w-full flex flex-col gap-4 lg:gap-7";

export function MobileContainer({ children }: { children?: ReactNode }) {
  return <div className={sectionStyle}>{children}</div>;
}
