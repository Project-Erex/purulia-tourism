import {styles} from "@/app/styles";
import HowToReachCard from "@/components/elements/home-page/how-to-reach/HowToReach";
import {SectionHeading} from "@/components/ui/text-components/SectionHeading";
import {SubHeading} from "@/components/ui/text-components/SubHeading";
import Image from "next/image";
import React from "react";

export default function HowToReach() {
  return (
    <div
      className="w-full bg-transparent bg-fixed bg-cover bg-[url('/How-To-Reach-Bg.jpg')]
  h-[750px] md:h-[600px] lg:h-[550px] bg-bottom relative ">
      <Image
        src="/border-image.png"
        alt="How-To-Reach-Bg"
        width={2080}
        height={2080}
        className="w-full absolute -top-3 rotate-180"
      />
      <Image
        src="/border-image.png"
        alt="How-To-Reach-Bg"
        width={2080}
        height={2080}
        className="w-full absolute -bottom-3"
      />

      <div
        className={`${styles.bPadding} ${styles.xPadding} w-full h-full absolute top-0  flex flex-col justify-center items-center `}>
        <div className="flex flex-col items-center justify-center w-full gap-8 lg:gap-14  max-w-screen-xl">
          <div className="flex gap-4  relative w-full flex-col items-center">
            <SectionHeading type="large">How to reach Purulia</SectionHeading>
            <div className="max-w-3xl text-center">
              <SubHeading className="xl:leading-tight" type="large">
                {`  Easy access to Purulia’s wonders.`}
              </SubHeading>
            </div>
          </div>
          <div className="relative w-full">
            <HowToReachCard />
          </div>
        </div>
      </div>
    </div>
  );
}
