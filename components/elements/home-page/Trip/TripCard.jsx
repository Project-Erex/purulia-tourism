import React from "react";

import {TripCardData} from "@/data/Home-page";
import Image from "next/image";

export default function TripCard() {
  return (
    <div className="w-full h-full rounded-lg border-border border bg-backgroundlite ">
      <div className="grid grid-cols-2 md:grid-cols-3 shadow-lg lg:grid-cols-4 xl:grid-cols-4  p-5 gap-5  w-full h-full ">
        {TripCardData.map((item, inedx) => (
          <div
            key={inedx}
            className="flex flex-col items-center p-5 gap-2 rounded-lg border-border hover:border-primary hover:border border">
            <Image
              width={0}
              height={0}
              src={item.icon}
              alt={item.title}
              className="md:w-20 md:h-20 w-16 h-16 "
            />
            <p className="line-clamp-1 font-OpenSans font-semibold text-heading text-base md:text-lg">
              {item.title}
            </p>
            <p className="text-center">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit elit
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
