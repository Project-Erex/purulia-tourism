import {Heading} from "@/components/ui/text-components/Heading";
import {CategoryData} from "@/data/Home-page";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Category() {
  return (
    <div className="grid  grid-cols-2 lg:grid-cols-3 w-full gap-2 rounded-[10px]  h-fit">
      {CategoryData.map((item, index) => {
        return (
          <Link
            href={item.id}
            key={index}
            className="flex items-center border rounded-md py-2  justify-center flex-col">
            <Image
              src={item.icon}
              alt={item.title}
              width={0}
              height={0}
              className="w-16 h-16"
            />
            <Heading className="text-lg font-DMSans font-normal text-heading-dark">
              {item.title}
            </Heading>
          </Link>
        );
      })}
    </div>
  );
}
