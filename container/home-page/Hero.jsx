"use client";

import {styles} from "@/app/styles";
import Category from "@/components/elements/home-page/hero/Category";
import ImageSlider from "@/components/elements/home-page/hero/ImageSlider";
import Button from "@/components/ui/Button/Button";
import {Heading} from "@/components/ui/text-components/Heading";
import {SectionHeading} from "@/components/ui/text-components/SectionHeading";
import {SubHeading} from "@/components/ui/text-components/SubHeading";

export default function Hero() {
  return (
    <div className="w-full h-full  flex items-center  justify-center bg-background dark:bg-background-dark  ">
      <div className="max-w-screen-2xl w-full relative">
        <ImageSlider />
        <div
          className={`absolute w-full h-full bg-black/25 flex justify-center  items-center top-0 pt-10 ${styles.xPadding} `}>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-10 ">
            <div className=" w-full h-full flex-col  justify-center flex  gap-5 ">
              <SectionHeading
                className="text-heading-dark dark:text-heading-dark"
                type="large">
                Find Your Ideal Stay
              </SectionHeading>
              <Heading
                className="text-heading-dark leading-relaxed  dark:text-heading-dark"
                type="large">
                Discover Purulia's natural beauty and culture!
              </Heading>
              <SubHeading type="extraLarge">
                Planning for a trip? We will organize your trip with the best places and
                within best budget!
              </SubHeading>
              <Button type="link" href="/blogs" title="View Packages" />
            </div>
            <div className="w-full h-full flex justify-center items-center">
              <Category />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
