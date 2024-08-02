import LayoutGrid from "@/components/aceternity/layout-grid";
import Section from "@/components/section/Section";
import {Heading} from "@/components/ui/text-components/Heading";
import {SectionHeading} from "@/components/ui/text-components/SectionHeading";
import {
  Marvellake,
  Polashphool,
  Purulia,
  Vagabandh,
} from "@/public/images/home-page/Index";
import React from "react";

const cards = [
  {
    id: 1,
    content: "Marvellake",
    className: "md:col-span-2",
    thumbnail: Marvellake,
  },
  {
    id: 2,
    content: "Purulia",
    className: "col-span-1",
    thumbnail: Purulia,
  },
  {
    id: 3,
    content: "Vagabandh",
    className: "col-span-1",
    thumbnail: Vagabandh,
  },
  {
    id: 4,
    content: "Polashphool",
    className: "md:col-span-2",
    thumbnail: Polashphool,
  },
];
export default function PhotoGallery() {
  return (
    <Section type="paddingXB">
      <div className="flex gap-4 relative w-full h-full  flex-col items-center">
        <SectionHeading type="large">Media gallary</SectionHeading>
        <div className="max-w-3xl text-center">
          <Heading className="xl:leading-tight" type="large">
            Immerse yourself in Purulia's beauty.
          </Heading>
        </div>
      </div>
      <div className="md:h-[800px] h-[600px] py-14 w-full">
        <LayoutGrid cards={cards} />
      </div>
    </Section>
  );
}
