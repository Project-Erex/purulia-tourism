import React from "react";
import {twMerge} from "tailwind-merge";

export default async function GridList({children, className}) {
  return (
    <div
      className={twMerge(
        `grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 w-full`,
        className,
      )}>
      {children}
    </div>
  );
}
