"use client";
import { ReactNode, useState } from "react";
import Image from "next/image";
import caretDown from "@/assets/CaretDown.png";

export function Accordion({
  buttonText,
  children,
  className,
  defaultOpen = false,
  showTooltip = false,
}: {
  buttonText: string | ReactNode;
  children: ReactNode;
  className?: string;
  defaultOpen?: boolean;
  showTooltip?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  
  return (
    <div className={className}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center gap-2 text-left font-semibold text-neutral-900"
      >
        <div className="flex items-center gap-2">
          {showTooltip ? (
            <div 
              className="relative"
              onMouseEnter={() => setIsTooltipVisible(true)}
              onMouseLeave={() => setIsTooltipVisible(false)}
            >
            <svg 
              className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help transition-colors" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
              {isTooltipVisible && (
                <div className="absolute top-0 left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-50 w-48">
                  <div className="text-center">
                    <div className="font-semibold text-yellow-300 mb-1">💡 Suggerimento</div>
                    <div className="leading-relaxed">
                      Clicca sulle > per {open ? 'chiudere' : 'aprire'} le sezioni
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="w-4 h-4"></div>
          )}
          <Image
            src={caretDown}
            alt=""
            className={`${open ? "" : "-rotate-90"} transition lg:w-6 w-5 opacity-70`}
          />
        </div>
        {typeof buttonText === 'string' ? (
          <span className="text-lg md:text-xl">{buttonText}</span>
        ) : (
          buttonText
        )}
      </button>
      {open && <div className="mt-3 text-neutral-900">{children}</div>}
    </div>
  );
}
