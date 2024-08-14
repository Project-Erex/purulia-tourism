import clsx from "clsx";
import Image from "next/image";
import React from "react";

export default function BorderImage({className, type}) {
  const parentClasses = clsx(
    "w-full absolute overflow-hidden z-50 ",
    type === "top" && "top-0 rotate-180",
    type === "bottom" && "bottom-0",
    className,
  );

  return (
    <div>
      <Image
        src="/border-image.png"
        alt="How-To-Reach-Bg"
        width={2080}
        height={2080}
        className={parentClasses}
      />
    </div>
  );
}
