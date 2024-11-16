"use client";

import {useState} from "react";
import AboutTopBanner from "@/components/elements/about/AboutTopBanner";
import {styles} from "../styles";
import {
  AboutHeader,
  AccordionData,
  Exclusion,
  HighlightData,
  InclusionData,
} from "@/data/About-Page//index";
import {SubHeading} from "@/components/ui/text-components/SubHeading";
import {Heading} from "@/components/ui/text-components/Heading";
import {Square} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {Input} from "@/components/ui/input";

export default function page() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <>
      <div className={`${styles.yPadding} w-full h-full`}>
        <AboutTopBanner />
        <div className={`w-full flex  gap-5 ${styles.xPadding} ${styles.yPadding}`}>
          <div className={`w-[70%]  flex-col flex`}>
            <div className="w-full border-border border rounded-lg p-5 flex  justify-between">
              {AboutHeader?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`relative cursor-pointer group`}>
                  <h3
                    className={`text-base uppercase font-OpenSans font-semibold  ${
                      activeIndex === index ? "text-blue-500" : "text-black"
                    }`}>
                    {item.title}
                  </h3>
                  <span
                    className={`absolute left-0 -bottom-5 w-full h-[2px] transition-transform transform ${
                      activeIndex === index
                        ? "scale-x-100 bg-blue-500"
                        : "scale-x-0 bg-transparent group-hover:bg-primary duration-300 group-hover:scale-x-100"
                    }`}></span>
                </div>
              ))}
            </div>
            <div className="my-5 p-5 border-border border rounded-lg w-full h-full">
              <SubHeading type="medium">
                Hola Espana! The vibrant country of Spain beckons for an adventure that
                lets us explore the sights 'n' sounds of this remarkable destination.
                Visit architechturally brilliant and culture-rich cities of Madrid,
                Seville, Barcelona, Cordoba, Valencia on this tour and have the experience
                of a lifetime!
              </SubHeading>
              <div className="w-full grid grid-cols-2 pt-5">
                <div>
                  <Heading className="text-2xl font-semibold">Inclusion</Heading>
                  <div className="flex flex-col gap-2 py-2">
                    {InclusionData?.map((item, index) => (
                      <div key={index} className="flex items-center  gap-2">
                        <Square size={8} />
                        <h3 className="font-OpenSans text-sm">{item.title}</h3>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Heading className="text-2xl font-semibold">Exclusion</Heading>
                  <div className="flex flex-col gap-2 py-2">
                    {Exclusion?.map((item, index) => (
                      <div key={index} className="flex  items-center font-OpenSans gap-2">
                        <Square size={8} />
                        <h3 className="font-OpenSans text-sm">{item.title}</h3>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="py-5">
                <AboutTopBanner />
              </div>
              <div className="w-full h-full flex flex-col gap-5">
                {HighlightData.map((item, index) => (
                  <div className="flex flex-col gap-2" key={index}>
                    <Heading className="text-lg font-semibold capitalize">
                      {item.title}
                    </Heading>
                    <SubHeading className="leading-loose" type="small">
                      {item.discretion}
                    </SubHeading>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full h-full relative">
              <Heading type="small" className="uppercase">
                itinerary
              </Heading>
              <div className="w-full h-full border-border border overflow-hidden rounded-lg p-5 flex my-5">
                <Accordion type="single" collapsible>
                  {AccordionData.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{item.title}</AccordionTrigger>
                      <AccordionContent>
                        Welcome to Madrid - the capital city of Spain. On arrival we enjoy
                        the city orientation tour which includes the Plaza de Espana,
                        Sabatini Garden, Cervantes Statue, Cibeles fountain, Parliament,
                        Puerto del sol. Then visit the Royal Palace and Prado Museum – one
                        of the world's greatest art galleries. From inside.
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
          <div className="w-[30%] flex  items-start h-full">
            <div className="w-full border-border border rounded-lg p-5 flex  flex-col gap-2 justify-between">
              <Heading className="text-lg font-semibold capitalize">
                book this journey
              </Heading>
              <Input type="text" id="hs-tac-input-phone"></Input>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// <div className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto pt-20">
// <div className="lg:w-3/4">
//   <h2 className="text-3xl text-gray-800 font-bold lg:text-4xl dark:text-white font-DMSans">
//     About Us
//   </h2>
//   <p className="mt-3 text-gray-800 dark:text-neutral-400 font-DMSans">
//     We help businesses bring ideas to life in the digital world, by designing
//     and implementing the technology tools that they need to win.
//   </p>
//   <p className="mt-5">
//     <a
//       className="font-DMSans inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
//       href="#">
//       Contact us for more
//       <svg
//         className="shrink-0 size-4 transition ease-in-out group-hover:translate-x-1 group-focus:translate-x-1"
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round">
//         <path d="m9 18 6-6-6-6" />
//       </svg>
//     </a>
//   </p>
// </div>

// <div className="space-y-6 lg:space-y-10">
//   <div className="flex gap-x-5 sm:gap-x-8">
//     <span className="shrink-0 inline-flex justify-center items-center size-[46px] rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm mx-auto dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200">
//       <svg
//         className="shrink-0 size-5"
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round">
//         <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
//         <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
//       </svg>
//     </span>
//     <div className="grow">
//       <h3 className="font-DMSans text-base sm:text-lg font-semibold text-gray-800 dark:text-neutral-200">
//         Industry-leading Softwares
//       </h3>
//       <p className="mt-1 text-gray-600 dark:text-neutral-400 font-DMSans">
//         Our documentation and extensive Client libraries contain everything a
//         business needs to build a custom integration in a fraction of the time.
//       </p>
//     </div>
//   </div>

//   <div className="flex gap-x-5 sm:gap-x-8">
//     <span className="shrink-0 inline-flex justify-center items-center size-[46px] rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm mx-auto dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200">
//       <svg
//         className="shrink-0 size-5"
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round">
//         <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
//         <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
//       </svg>
//     </span>
//     <div className="grow">
//       <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-neutral-200 font-DMSans">
//         Developer community support
//       </h3>
//       <p className="mt-1 text-gray-600 dark:text-neutral-400 font-DMSans">
//         We actively contribute to open-source projects—giving back to the
//         community through development, patches, and sponsorships.
//       </p>
//     </div>
//   </div>

//   <div className="flex gap-x-5 sm:gap-x-8">
//     <span className="shrink-0 inline-flex justify-center items-center size-[46px] rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm mx-auto dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200">
//       <svg
//         className="shrink-0 size-5"
//         xmlns="http://www.w3.org/2000/svg"
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round">
//         <path d="M7 10v12" />
//         <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
//       </svg>
//     </span>
//     <div className="grow">
//       <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-neutral-200 font-DMSans">
//         Simple and affordable
//       </h3>
//       <p className="mt-1 text-gray-600 dark:text-neutral-400 font-DMSans">
//         {`From boarding passes to movie tickets, there's pretty much nothing you
//       can't store with Preline.`}
//       </p>
//     </div>
//   </div>
// </div>
// </div>
// <div className="max-w-7xl mx-auto items-center justify-center pt-20 font-DMSans text-lg">
// At Erex Studio, our mission is to empower businesses by bridging the gap between
// their current capabilities and their highest potential. We believe in a
// collaborative approach, working closely with our clients to understand their
// goals and deliver results that exceed expectations. Join us at Erex Studio,
// where technology meets business ingenuity, and together, we can achieve
// extraordinary success. At Erex Studio, our mission is to empower businesses by
// bridging the gap between their current capabilities and their highest potential.
// We believe in a collaborative approach, working closely with our clients to
// understand their goals and deliver results that exceed expectations. Join us at
// Erex Studio, where technology meets business ingenuity, and together, we can
// achieve extraordinary success. At Erex Studio, our mission is to empower
// businesses by bridging the gap between their current capabilities and their
// highest potential. We believe in a collaborative approach, working closely with
// our clients to understand their goals and deliver results that exceed
// expectations. Join us at Erex Studio, where technology meets business ingenuity,
// and together, we can achieve extraordinary success. At Erex Studio, our mission
// is to empower businesses by bridging the gap between their current capabilities
// and their highest potential. We believe in a collaborative approach, working
// closely with our clients to understand their goals and deliver results that
// exceed expectations. Join us at Erex Studio, where technology meets business
// ingenuity, and together, we can achieve extraordinary success.
// </div>
