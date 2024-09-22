import Link from "next/link";
import { ReactNode } from "react";

export function Button({
  className,
  href,
  children,
  onClick,
  local,
  target,
}: {
  className?: string;
  href?: string;
  children?: ReactNode;
  onClick?: () => void;
  local?: boolean;
  target?: string;
}) {
  if (href && local) {
    return (
      <Link
        href={href}
        target={target}
        className={className || "btn !bg-accent"}
      >
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target={target} className={className || "btn !bg-accent"}>
        {children}
      </a>
    );
  }

  return (
    <button className={className || "btn !bg-accent"} onClick={onClick}>
      {children}
    </button>
  );
}
