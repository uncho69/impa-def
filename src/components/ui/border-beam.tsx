"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  className?: string;
  style?: React.CSSProperties;
  reverse?: boolean;
  initialOffset?: number;
  borderWidth?: number;
}

/**
 * Fascio animato che percorre SOLO il bordo del contenitore.
 * Usa rotazione continua per un loop fluido senza salti.
 */
export function BorderBeam({
  className,
  size = 50,
  delay = 0,
  duration = 6,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  style,
  reverse = false,
  borderWidth = 2,
}: BorderBeamProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 rounded-[inherit] box-border"
      style={{
        border: `${borderWidth}px solid transparent`,
        WebkitMaskImage: "linear-gradient(#fff,#fff), linear-gradient(#fff,#fff)",
        WebkitMaskSize: "100% 100%",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "0 0",
        WebkitMaskClip: "padding-box, border-box",
        WebkitMaskComposite: "source-out",
        maskImage: "linear-gradient(#fff,#fff), linear-gradient(#fff,#fff)",
        maskSize: "100% 100%",
        maskRepeat: "no-repeat",
        maskPosition: "0 0",
        maskClip: "padding-box, border-box",
        maskComposite: "exclude",
      }}
    >
      <motion.div
        className={cn("absolute inset-[-50%]", className)}
        style={{
          background: `conic-gradient(from 0deg, ${colorFrom}, ${colorTo}, transparent 15%)`,
          ...style,
        }}
        initial={{ rotate: 0 }}
        animate={{ rotate: reverse ? -360 : 360 }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
          delay,
        }}
      />
    </div>
  );
}
