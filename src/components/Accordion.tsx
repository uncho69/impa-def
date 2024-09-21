"use client";
import { ReactNode, useState } from "react";

export function Accordion({
  buttonText,
  children,
  className,
}: {
  buttonText: string;
  children: ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={className}>
      <button onClick={() => setOpen((prev) => !prev)}>{buttonText}</button>
      {open && <div>{children}</div>}
    </div>
  );
}
