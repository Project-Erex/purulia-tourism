import Link from "next/link";
import React from "react";
import {twMerge} from "tailwind-merge";

export default function NormalLink({
  children,
  className,
  path = "/",
  openInNewTab = false,
}) {
  return (
    <Link
      className={twMerge(
        " text-heading dark:text-heading-dark text-[16px] font-Unbounded font-normal ",
        className,
      )}
      target={openInNewTab ? "_blank" : ""}
      rel={openInNewTab ? "noopener noreferrer" : ""}
      href={path}>
      <span className="hover-underline-animation">{children}</span>
    </Link>
  );
}
