"use client";
import { ReactNode, useState } from "react";
import Image from "next/image";
import caretDown from "@/assets/CaretDown.png";

export function CardContainer({ children }: { children: ReactNode[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col lg:items-start items-center w-full">
      <div className="flex flex-wrap lg:gap-5 gap-1 w-full">
        <div className="flex lg:hidden flex-wrap gap-1 w-full">
          {children.slice(0, 2)}
        </div>
        <div className="hidden lg:flex flex-wrap gap-5 w-full">
          {children.slice(0, 3)}
        </div>
        <div
          className={`${
            open ? "lg:flex hidden" : "hidden"
          } flex-wrap lg:gap-5 gap-1 transition-all w-full`}
        >
          {children.slice(3, children.length)}
        </div>
        <div
          className={`${
            open ? "flex lg:hidden" : "hidden"
          } flex-wrap lg:gap-5 gap-1 transition-all w-full`}
        >
          {children.slice(2, children.length)}
        </div>
      </div>

      <div className="lg:hover:animate-pulse mx-auto">
        <p
          className="flex items-center lg:text-3xl text-2xl cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {open ? "Nascondi" : "Mostra tutte"}{" "}
          <Image
            src={caretDown}
            alt="Toggle"
            className={`${
              open ? "-rotate-180" : ""
            } transition lg:w-10 w-5 py-5`}
          />
        </p>
      </div>
    </div>
  );
}
