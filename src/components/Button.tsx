"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { MouseEvent } from "react";

const btnStyle = (variant?: string) => {
  switch (variant) {
    case "inline-text-button":
      return "text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center underline-offset-4 hover:underline";
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
