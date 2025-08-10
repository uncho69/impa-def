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
        className="w-full flex items-center gap-2 text-left font-semibold text-neutral-900"
      >
        <Image
          src={caretDown}
          alt=""
          className={`${open ? "" : "-rotate-90"} transition lg:w-6 w-5 opacity-70`}
        />
        <span className="text-lg md:text-xl">{buttonText}</span>
      </button>
      {open && <div className="mt-3 text-neutral-700">{children}</div>}
    </div>
  );
}
