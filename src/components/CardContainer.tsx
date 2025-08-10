"use client";
import { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import caretDown from "@/assets/CaretDown.png";

export function CardContainer({
  children,
  gateOnExpand = false,
}: {
  children: ReactNode[];
  gateOnExpand?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="lg:mx-auto -mx-5">
      <div className="flex flex-col items-center w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full place-items-center">
          {children.slice(0, open ? children.length : 3)}
        </div>

        <div className="lg:hover:animate-pulse mx-auto">
          <p
            className="flex items-center lg:text-3xl text-2xl cursor-pointer"
            onClick={() => {
              if (gateOnExpand && !open) {
                router.push("/abbonamento");
                return;
              }
              setOpen(!open);
            }}
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
    </div>
  );
}
