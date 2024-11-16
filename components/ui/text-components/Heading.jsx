import React from "react";
import clsx from "clsx";

export const Heading = ({children, className, type}) => {
  const typeClasses = clsx(
    "font-OpenSans leading-normal text-heading dark:text-heading-dark",
    type === "large" &&
      "text-[30px] md:text-[42px] leading-[45px] lg:text-[45px] md:leading-[54px] lg:leading-[60px] font-bold",
    type === "xlarge" && "text-[44px] md:text-[56px] font-medium",
    type === "medium" &&
      "text-[30px] xl:text-[44px] font-bold leading-[56px] xl:leading-[72px]",
    type === "small" &&
      "font-medium text-[20px] md:text-[24px] lg:text-[28px] xl:text-[32px] ",
    className,
  );
  return <h2 className={typeClasses}>{children}</h2>;
};
