import React from "react";
import clsx from "clsx";
import {styles} from "@/app/styles";

export default function Section({children, id, className, type, Padding}) {
  const sectionClasses = clsx(
    "w-full  h-full flex items-center justify-center bg-background-light dark:bg-background-dark overflow-hidden",
    type === "paddingX" && styles.xPadding,
    type === "paddingY" && styles.yPadding,
    type === "paddingXT" && [styles.xPadding, styles.tPadding],
    type === "paddingXY" && [styles.xPadding, styles.yPadding],
    type === "paddingXB" && [styles.xPadding, styles.bPadding],
    className,
  );

  return (
    <section id={id} className={sectionClasses}>
      <div
        className={`flex flex-col items-center justify-center w-full  max-w-screen-xl`}>
        {children}
      </div>
    </section>
  );
}
