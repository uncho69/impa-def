import { ReactNode } from "react";

export function List({
  children,
  ordered = false,
}: {
  children: ReactNode;
  ordered?: boolean;
}) {
  if (ordered) {
    return <ol className="list-decimal lg:pl-14 pl-5">{children}</ol>;
  }
  return <ul className="list-disc lg:pl-14 pl-5">{children}</ul>;
}
