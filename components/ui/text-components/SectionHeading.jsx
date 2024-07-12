import React from "react";
import clsx from "clsx";

export const SectionHeading = ({children, className, type}) => {
  const typeClasses = clsx(
    "font-DancingScript text-heading dark:text-heading-dark  ",

    type === "large" && "font-normal text-2xl md:text-3xl lg:text-4xl xl:text-4xl",
    type === "small" && "text-lg md:text-xl  font-normal ",
    className,
  );
  return <h4 className={typeClasses}>{children}</h4>;
};
