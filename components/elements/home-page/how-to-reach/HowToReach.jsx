import {Heading} from "@/components/ui/text-components/Heading";
import {SectionHeading} from "@/components/ui/text-components/SectionHeading";
import {SubHeading} from "@/components/ui/text-components/SubHeading";
import {HowToReachData} from "@/data/Home-page";
import Image from "next/image";
import React from "react";
import {BsArrowRight} from "react-icons/bs";

export default function HowToReachCard() {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-5    w-full h-full">
      {HowToReachData.map((item, index) => (
        <div
          key={index}
          className="w-full h-full flex flex-col rounded-lg py-5 bg-background-dark bg-opacity-20  dark:bg-background-light  dark:bg-opacity-20   items-center justify-center">
          <Image
            width={0}
            height={0}
            src={item.icon}
            alt={item.title}
            className="w-32 h-full"
          />
          <div className="flex gap-3 items-center justify-center w-full">
            <Heading type="small">{item.title}</Heading>
            <BsArrowRight />
            <div className="pt-1 flex">
              <SubHeading type="medium">{item.subtitle}</SubHeading>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
