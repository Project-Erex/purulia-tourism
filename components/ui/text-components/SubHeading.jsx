import React from "react";
import clsx from "clsx";

export const SubHeading = ({children, className, type}) => {
  const typeClasses = clsx(
    "font-DMSans  text-heading-dark/75  dark:text-heading-dark/75 ",
    type === "extraLarge" && "font-normal text-[16px] md:text-[24px] leading-8",
    type === "large" && "font-normal text-[16px] md:text-[18px]  leading-8",
    type === "medium" && "text-[12px] md:text-[16px] font-normal md:leading-8 leading-6",
    type === "small" && "text-[12px] md:text-[14px] font-normal leading-8",
    className,
  );
  return <h3 className={typeClasses}>{children}</h3>;
};
