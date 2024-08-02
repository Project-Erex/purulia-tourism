import DestinationSlider from "@/components/elements/home-page/destinations/DestinationSlider";
import Section from "@/components/section/Section";
import {Heading} from "@/components/ui/text-components/Heading";
import {SectionHeading} from "@/components/ui/text-components/SectionHeading";
import React from "react";

export default function Destinations() {
  return (
    <Section type="paddingXY">
      <div className="flex gap-4 relative w-full h-full flex-col items-center">
        <SectionHeading type="large">Top Destinations</SectionHeading>
        <div className="max-w-3xl text-center">
          <Heading className="xl:leading-tight" type="large">
            {` Discover Purulia's hidden gems.`}
          </Heading>
        </div>
      </div>
      <div className="pt-10 relative w-full h-full">
        <DestinationSlider />
      </div>
    </Section>
  );
}
