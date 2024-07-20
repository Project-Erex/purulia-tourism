import {Heading} from "@/components/ui/text-components/Heading";
import {CategoryData} from "@/data/Home-page";
import Image from "next/image";
import React from "react";

export default function Category() {
  return (
    <div className="grid  grid-cols-2 lg:grid-cols-3 w-full gap-1 bg-background dark:bg-background-dark  rounded-[10px] p-1 h-fit">
      {CategoryData.map((item, index) => {
        return (
          <div
            key={index}
            className="flex items-center border rounded-xl p-2 lg:p-6 justify-center flex-col">
            <Image
              src={item.icon}
              alt={item.title}
              width={0}
              height={0}
              className="w-24 h-24"
            />
            <Heading className="text-lg font-DMSans font-normal text-primary dark:text-heading-dark">
              {item.title}
            </Heading>
          </div>
        );
      })}
    </div>
  );
}
