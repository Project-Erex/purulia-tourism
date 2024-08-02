import HowToReachCard from "@/components/elements/home-page/how-to-reach/HowToReach";
import Section from "@/components/section/Section";
import {Heading} from "@/components/ui/text-components/Heading";
import {SectionHeading} from "@/components/ui/text-components/SectionHeading";
import React from "react";

export default function HowToReach() {
  return (
    <Section type="paddingXB">
      <div className="flex gap-4 relative w-full h-full flex-col items-center">
        <SectionHeading type="large">How to reach Purulia</SectionHeading>
        <div className="max-w-3xl text-center">
          <Heading className="xl:leading-tight" type="large">
            Easy access to Purulia's wonders.
          </Heading>
        </div>
      </div>
      <div className="pt-10 relative w-full h-full">
        <HowToReachCard />
      </div>
    </Section>
  );
}
