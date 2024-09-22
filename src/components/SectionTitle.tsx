import { ReactNode } from "react";
import { Button } from "./Button";

const btnStyle =
  "bg-accent leading-7 shadow-md text-3xl text-[#DDDCDC] h-full font-oxygen items-center justify-center rounded text-center no-underline max-w-fit px-14 hidden lg:flex ";

const sectionStyle =
  "lg:bg-[#94C0CC]/30 lg:shadow-md font-oxygen text-2xl lg:text-4xl lg:rounded-md flex items-center w-full h-full lg:px-5 lg:py-2";

export function SectionTitle({ children }: { children?: ReactNode }) {
  return (
    <div className="flex lg:mt-7 w-full justify-between gap-7 lg:h-16">
      <div className={sectionStyle}>{children}</div>
      <Button className={btnStyle}>Menu</Button>
    </div>
  );
}
