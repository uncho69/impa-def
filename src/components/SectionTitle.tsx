import { ReactNode } from "react";
import { ModalMenu } from "./ModalMenu";

const sectionStyle =
  "lg:bg-[#94C0CC]/30 lg:shadow-md font-oxygen text-2xl lg:text-4xl lg:rounded-md flex items-center w-full h-full lg:px-5 lg:py-2";

export function SectionTitle({
  children,
  main = false,
}: {
  children?: ReactNode;
  main?: boolean;
}) {
  return (
    <div className="flex lg:mt-7 w-full justify-between gap-7 lg:h-16">
      <div className={sectionStyle}>{children}</div>
      {main && <ModalMenu />}
    </div>
  );
}
