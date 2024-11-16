import React from "react";
import clsx from "clsx";

export const SectionHeading = ({children, className, type}) => {
  const typeClasses = clsx(
    "font-DancingScript text-primary dark:text-heading-dark  ",

    type === "large" && "font-bold text-2xl md:text-3xl lg:text-4xl xl:text-4xl",
    type === "small" && "text-lg md:text-xl  font-bold ",
    className,
  );
  return <h4 className={typeClasses}>{children}</h4>;
};
