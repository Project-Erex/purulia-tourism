import {Heading} from "@/components/ui/text-components/Heading";
import {SubHeading} from "@/components/ui/text-components/SubHeading";
import {HowToReachData} from "@/data/Home-page";
import Image from "next/image";
import React from "react";
import {BsArrowRight} from "react-icons/bs";

export default function HowToReachCard() {
  return (
    <div className="w-full h-full">
      <Image
        src="/Step-Arrow.png"
        alt="Step-Arrow"
        width={2080}
        height={2080}
        className="w-full h-full object-contain hidden lg:block z-10 absolute top-5"
      />
      <div className="grid md:grid-cols-2 grid-cols-1 cursor-pointer lg:grid-cols-3 xl:gap-28 gap-5  lg:gap-20 w-full h-full">
        {HowToReachData.map((item, index) => (
          <div
            key={index}
            className={`w-full h-[140px] lg:h-full flex flex-col gap-2 rounded-lg py-6 bg-background z-50 shadow-lg transition-transform duration-300 ease-in-out transform lg:hover:-translate-y-[20px]   items-center justify-center  ${
              index === 1 && "lg:mt-8 "
            }`}>
            <Image
              width={0}
              height={0}
              src={item.icon}
              alt={item.title}
              className="w-32 h-full"
            />
            <div className="flex gap-3 items-center justify-center w-full">
              <Heading className="text-center text-heading-light " type="small">
                {item.title}
              </Heading>
              <div className=" flex pt-2 items-center gap-2">
                <BsArrowRight />
                <SubHeading className="text-heading-light" type="medium">
                  {item.subtitle}
                </SubHeading>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
