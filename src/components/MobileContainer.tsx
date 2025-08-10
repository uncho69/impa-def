import { ReactNode } from "react";

const containerStyle =
  "container-custom w-full flex flex-col gap-8 md:gap-10 py-6 md:py-8";

export function MobileContainer({ children }: { children?: ReactNode }) {
  return <div className={containerStyle}>{children}</div>;
}
