"use client";
import { ReactNode, useState } from "react";
import Image from "next/image";
import caretDown from "@/assets/CaretDown.png";

export function CardContainer({ children }: { children: ReactNode[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col lg:items-start items-center w-full">
      <div className="flex flex-wrap gap-2 w-full">
        {children.slice(0, 3)}
        <div
          className={`${
            open ? "flex" : "hidden"
          } flex-wrap gap-2  transition-all`}
        >
          {children.slice(3, children.length)}
        </div>
      </div>
      <div className="hover:animate-pulse">
        <p
          className="flex items-center text-3xl cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {open ? "Nascondi" : "Mostra tutte"}{" "}
          <Image
            src={caretDown}
            alt=""
            className={`${
              open ? "-rotate-180" : ""
            } transition lg:w-10 w-5 py-5`}
          />
        </p>
      </div>
    </div>
  );
}
