import React from "react";
import Section from "@/components/section/Section";
import {SectionHeading} from "@/components/ui/text-components/SectionHeading";
import {SubHeading} from "@/components/ui/text-components/SubHeading";
import TripCard from "@/components/elements/home-page/Trip/TripCard";

export default function Trip() {
  return (
    <Section type="paddingXY">
      <div className="flex gap-5 relative  w-full h-full  flex-col items-center">
        <SectionHeading type="large">Planning for a Trip?</SectionHeading>
        <div className="max-w-3xl text-center">
          <SubHeading className="xl:leading-tight" type="large">
            {` We will organize your trip with the best places and within best budget!`}
          </SubHeading>
        </div>
        <div className="w-full h-full pt-6 pb-4 relative ">
          <TripCard />
        </div>
      </div>
    </Section>
  );
}
