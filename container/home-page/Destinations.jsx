import DestinationSlider from "@/components/elements/home-page/destinations/DestinationSlider";
import Section from "@/components/section/Section";
import {Heading} from "@/components/ui/text-components/Heading";
import {SectionHeading} from "@/components/ui/text-components/SectionHeading";
import {SubHeading} from "@/components/ui/text-components/SubHeading";
import React from "react";

export default function Destinations() {
  return (
    <Section className="!bg-white" type="paddingXY">
      <div className="flex gap-4 relative w-full h-full flex-col items-center">
        <SectionHeading type="large">Top Destinations</SectionHeading>
        <div className="max-w-3xl text-center">
          <SubHeading className="xl:leading-tight" type="large">
            {` Planning for a trip? We will organize your trip with the best places and within best budget!`}
          </SubHeading>
        </div>
      </div>
      <div className="pt-10 relative w-full h-full">
        <DestinationSlider />
      </div>
    </Section>
  );
}
