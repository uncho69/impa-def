"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { MouseEvent } from "react";

const btnStyle = (variant?: string) => {
  switch (variant) {
    case "inline-text-button":
      return "bg-accent leading-7 shadow lg:text-2xl text-base text-[#DDDCDC] font-oxygen inline-flex items-center justify-center lg:px-6 lg:h-16 py-2 px-3 rounded text-center no-underline";
    default:
      return "";
  }
};

export function Button({
  className,
  href,
  children,
  onClick,
  onLinkClick,
  local,
  target,
  variant,
}: {
  className?: string;
  href?: string;
  children?: ReactNode;
  onClick?: () => void;
  onLinkClick?: (e: MouseEvent<HTMLAnchorElement, unknown>) => void;
  local?: boolean;
  target?: string;
  variant?: "inline-text-button";
}) {
  const style = btnStyle(variant);

  if (href && local) {
    return (
      <Link
        href={href}
        target={target}
        onClick={onLinkClick}
        className={`${style} ${className}`}
      >
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        target={target}
        onClick={onLinkClick}
        className={`${style} ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={`${style} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
