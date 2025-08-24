import { ReactNode } from "react";
import { ModalMenu } from "./ModalMenu";

const titleClass =
  "text-2xl md:text-3xl font-bold tracking-tight gradient-text";

export function SectionTitle({
  children,
  main = false,
}: {
  children?: ReactNode;
  main?: boolean;
}) {
  return (
    <div className="flex items-center justify-between w-full">
      <h2 className={titleClass}>{children}</h2>
      {main && <ModalMenu />}
    </div>
  );
}
