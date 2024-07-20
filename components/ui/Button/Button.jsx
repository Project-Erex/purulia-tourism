import React from "react";
import clsx from "clsx";
import Link from "next/link";
import {Bars} from "react-loader-spinner";

export default function Button({
  className,
  type = "button",
  color = "primary",
  onClick,
  href,
  newTab = false,
  loading = false,
  title = "Learn More",
  ...props
}) {
  const parentClasses = clsx(
    "flex w-40 h-12 relative justify-center  rounded-full gap-2 items-center bg-background  font-DmSans text-[16px] font-normal text-white transition-all duration-500 delay-75 ease-in-out",
    color === "primary" && "hover:bg-primary hover:dark:bg-primary",
    loading && "pointer-events-none bg-primary",
    className,
  );

  const spanClasses = clsx(
    " px-6 h-full w-40 rounded-full items-center flex bg-background   transition-all duration-500 delay-75 ease-in-out",
    color === "primary" && "bg-primary",
    loading && "invisible",
  );

  if (type === "button") {
    return (
      <button onClick={onClick} className={parentClasses} {...props}>
        {loading ? (
          <Bars width="30" color="#ffffff" />
        ) : (
          <span className={spanClasses}>{title}</span>
        )}
      </button>
    );
  } else if (type === "link") {
    return (
      <Link
        href={href}
        target={newTab ? "_blank" : ""}
        className={parentClasses}
        {...props}>
        {loading ? (
          <Bars width="30" color="#ffffff" />
        ) : (
          <span className={spanClasses}>{title}</span>
        )}
      </Link>
    );
  }
}
