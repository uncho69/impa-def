"use client";
import { ReactNode, useState } from "react";
import Image from "next/image";
import caretDown from "@/assets/CaretDown.png";

export function Accordion({
  buttonText,
  children,
  className,
  defaultOpen = false,
}: {
  buttonText: string;
  children: ReactNode;
  className?: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={className}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex font-bold items-center gap-1"
      >
        <Image
          src={caretDown}
          alt=""
          className={`${open ? "" : "-rotate-90"} transition lg:w-10 w-5`}
        />
        <p className="lg:mt-2 mt-1 text-start">{buttonText}</p>
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}
