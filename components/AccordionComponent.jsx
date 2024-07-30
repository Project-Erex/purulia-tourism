import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {Badge} from "./ui/badge";
import {cn} from "@/utils/cn";
import Image from "next/image";
import "./AccordionDemo.css"; // Make sure to import your CSS file
import {useRouter} from "next/navigation";
import logHelper from "@/utils/logHelper";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

export default function AccordionDemo({
  result,
  handleMouseEnter,
  handleMouseLeave,
  startLocation,
  perDayTravelTime,
  exactDays,
}) {
  const router = useRouter();
  const handleItemClick = (id) => {
    router.push(`/destination/${id}`);
  };
  console.log("djbfdfbdjf", perDayTravelTime / 60);
  logHelper("djbfdfbdjf", parseInt(exactDays));

  const totalAllowedTimePerDay = 8 * 60; // 8 hours in minutes

  // Split places based on days
  const days = [];
  if (result) {
    let currentDay = [];
    let accumulatedTime = 0;

    result.visitedPlaces.forEach((place) => {
      const totalTimeForPlace = place.timeTaken + place.stay_time;
      if (accumulatedTime + totalTimeForPlace > totalAllowedTimePerDay) {
        days.push(currentDay);
        currentDay = [];
        accumulatedTime = 0;
      }
      currentDay.push(place);
      accumulatedTime += totalTimeForPlace;
    });

    if (currentDay.length > 0) {
      days.push(currentDay);
    }
  }

  // Create defaultOpenItems to keep all items open by default
  const defaultOpenItems = ["summary"];
  days.forEach((day, dayIndex) => {
    day.forEach((_, placeIndex) => {
      defaultOpenItems.push(`place-${dayIndex}-${placeIndex}`);
    });
  });
  const getGridColsClass = () => {
    const dayCount = days.length;
    if (dayCount === 1) return "grid-cols-2";
    if (dayCount === 2) return "grid-cols-3";
    if (dayCount === 3) return "grid-cols-4";
    return `grid-cols-${dayCount + 1}`;
  };

  return (
    <Tabs defaultValue="day-0" className="w-full">
      <TabsList className={`grid w-full ${getGridColsClass()}`}>
        {days.map((_, dayIndex) => (
          <TabsTrigger key={dayIndex} value={`day-${dayIndex}`} className="tab-trigger">
            Day {dayIndex + 1}
          </TabsTrigger>
        ))}
        <TabsTrigger value="summary" className="tab-trigger">
          Summary
        </TabsTrigger>
      </TabsList>
      {days.map((day, dayIndex) => (
        <TabsContent key={dayIndex} value={`day-${dayIndex}`} className="tab-content">
          <div className="font-DMSans font-bold text-3xl tracking-tighter">
            Day {dayIndex + 1}
          </div>
          {day.map((place, index) => (
            <Accordion
              key={index}
              type="multiple"
              collapsible
              className="w-full"
              defaultValue={defaultOpenItems}>
              <AccordionItem
                value={`place-${dayIndex}-${index}`}
                key={index}
                data-number={index + 1}
                onMouseEnter={(event) => handleMouseEnter(event, place)}
                onMouseLeave={(event) => handleMouseLeave(event, place)}
                className="accordion-item">
                <AccordionTrigger>
                  {" "}
                  {"   "}Place no {index + 1}
                </AccordionTrigger>
                <AccordionContent className="accordion-content">
                  <BentoGridItem
                    key={place.id}
                    title={place.name}
                    description={place.description}
                    description2={`Time Took from ${startLocation} - ${place.timeTaken} minutes`}
                    onClick={() => handleItemClick(place.id)}
                    header={
                      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
                        <Image
                          src={place.image}
                          width={0}
                          alt="d"
                          height={0}
                          sizes="100vw"
                          style={{
                            width: "100%",
                            height: "200px",
                            borderRadius: "10px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    }
                    icon={place.categories.category_name}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </TabsContent>
      ))}
      <TabsContent value="summary" className="tab-content">
        <Accordion
          type="multiple"
          collapsible
          className="w-full"
          defaultValue={defaultOpenItems}>
          <AccordionItem value="summary" className="accordion-item">
            <AccordionTrigger>Itinerary Summary</AccordionTrigger>
            <AccordionContent className="accordion-content">
              <p>Number of Travel Days: {exactDays}</p>
              <p>Number of Visited Places: {result.numberOfVisitedPlaces}</p>
              <p>Total Travel Time: {result.totalTimeTakenInTravel}</p>
              <p>Total Stay Time: {result.totalTimeTakenInPlaces}</p>
              <p>Total Time Taken: {result.totalTimeTaken}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </TabsContent>
    </Tabs>
  );
}

export const BentoGridItem = ({
  className,
  title,
  description2,
  description,
  header,
  icon,
  onClick, // corrected prop name
}) => {
  function truncateString(str, maxLength) {
    if (str.length > maxLength) {
      return str.substring(0, maxLength - 3) + "...";
    }
    return str;
  }
  return (
    <div
      onClick={onClick} // corrected prop name
      className={cn(
        "row-span-1 rounded-xl  justify-between flex flex-col space-y-4 pb-6",
        className,
      )}>
      {header}
      <div className="flex items-center justify-between">
        <div className=" duration-200 font-DMSans font-semibold text-xl ">{title}</div>
        <Badge variant="outline" className="line-clamp-1">
          {icon}
        </Badge>
      </div>
      <div className="font-sans font-normal text-neutral-600 text-sm dark:text-neutral-300">
        {/* {truncateString(description, 50)} */}
        {description2}
      </div>
      <div className="font-sans font-normal text-neutral-600 text-sm dark:text-neutral-300">
        {/* {truncateString(description, 50)} */}
        {description}
      </div>
    </div>
  );
};

// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import {Badge} from "./ui/badge";
// import {cn} from "@/utils/cn";
// import Image from "next/image";
// import "./AccordionDemo.css"; // Make sure to import your CSS file
// import {useRouter} from "next/navigation";
// import logHelper from "@/utils/logHelper";
// import {useRef} from "react";

// export default function AccordionDemo({
//   result,
//   handleMouseEnter,
//   handleMouseLeave,
//   startLocation,
//   perDayTravelTime,
//   exactDays,
// }) {
//   const router = useRouter();
//   const dayRefs = useRef([]); // Initialize refs for each day section

//   const handleItemClick = (id) => {
//     router.push(`/destination/${id}`);
//   };
//   console.log("djbfdfbdjf", perDayTravelTime / 60);
//   logHelper("djbfdfbdjf", parseInt(exactDays));

//   const totalAllowedTimePerDay = 8 * 60; // 8 hours in minutes

//   // Split places based on days
//   const days = [];
//   if (result) {
//     let currentDay = [];
//     let accumulatedTime = 0;

//     result.visitedPlaces.forEach((place) => {
//       const totalTimeForPlace = place.timeTaken + place.stay_time;
//       if (accumulatedTime + totalTimeForPlace > totalAllowedTimePerDay) {
//         days.push(currentDay);
//         currentDay = [];
//         accumulatedTime = 0;
//       }
//       currentDay.push(place);
//       accumulatedTime += totalTimeForPlace;
//     });

//     if (currentDay.length > 0) {
//       days.push(currentDay);
//     }
//   }

//   // Create defaultOpenItems to keep all items open by default
//   const defaultOpenItems = ["summary"];
//   days.forEach((day, dayIndex) => {
//     day.forEach((_, placeIndex) => {
//       defaultOpenItems.push(`place-${dayIndex}-${placeIndex}`);
//     });
//   });

//   const scrollToDay = (dayIndex) => {
//     if (dayRefs.current[dayIndex]) {
//       dayRefs.current[dayIndex].scrollIntoView({behavior: "smooth"});
//     }
//   };

//   return (
//     <div>
//       <div className="bg-white sticky top-0 w-full items-center justify-around  flex flex-wrap z-10 border-b-2">
//         {days.map((_, dayIndex) => (
//           <div
//             key={dayIndex}
//             className=" text-center font-DMSans font-bold text-2xl tracking-tighter cursor-pointer  border-2 border-slate-800 px-4 py-1 rounded-3xl mb-4 "
//             onClick={() => scrollToDay(dayIndex)}>
//             Day {dayIndex + 1}
//           </div>
//         ))}
//       </div>

//       <Accordion
//         type="multiple"
//         collapsible
//         className="w-full"
//         defaultValue={defaultOpenItems}>
//         {days.map((day, dayIndex) => (
//           <div key={dayIndex} ref={(el) => (dayRefs.current[dayIndex] = el)}>
//             <div className="font-DMSans font-bold text-3xl tracking-tighter">
//               Day {dayIndex + 1}
//             </div>
//             {day.map((place, index) => (
//               <AccordionItem
//                 value={`place-${dayIndex}-${index}`}
//                 key={index}
//                 data-number={index + 1}
//                 onMouseEnter={(event) => handleMouseEnter(event, place)}
//                 onMouseLeave={(event) => handleMouseLeave(event, place)}
//                 className="accordion-item">
//                 <AccordionTrigger>
//                   {" "}
//                   {"   "}Place no {index + 1}
//                 </AccordionTrigger>
//                 <AccordionContent className="accordion-content">
//                   <BentoGridItem
//                     key={place.id}
//                     title={place.name}
//                     description={place.description}
//                     description2={`Time Took from ${startLocation} - ${place.timeTaken} minutes`}
//                     onClick={() => handleItemClick(place.id)}
//                     header={
//                       <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
//                         <Image
//                           src={place.image}
//                           width={0}
//                           alt="d"
//                           height={0}
//                           sizes="100vw"
//                           style={{
//                             width: "100%",
//                             height: "200px",
//                             borderRadius: "10px",
//                             objectFit: "cover",
//                           }}
//                         />
//                       </div>
//                     }
//                     icon={place.categories.category_name}
//                   />
//                 </AccordionContent>
//               </AccordionItem>
//             ))}
//           </div>
//         ))}
//         <AccordionItem value="summary" className="accordion-item">
//           <AccordionTrigger>Itinerary Summary</AccordionTrigger>
//           <AccordionContent className="accordion-content">
//             <p>Number of Travel Days: {exactDays}</p>
//             <p>Number of Visited Places: {result.numberOfVisitedPlaces}</p>
//             <p>Total Travel Time: {result.totalTimeTakenInTravel}</p>
//             <p>Total Stay Time: {result.totalTimeTakenInPlaces}</p>
//             <p>Total Time Taken: {result.totalTimeTaken}</p>
//           </AccordionContent>
//         </AccordionItem>
//       </Accordion>
//     </div>
//   );
// }

// export const BentoGridItem = ({
//   className,
//   title,
//   description2,
//   description,
//   header,
//   icon,
//   onClick, // corrected prop name
// }) => {
//   function truncateString(str, maxLength) {
//     if (str.length > maxLength) {
//       return str.substring(0, maxLength - 3) + "...";
//     }
//     return str;
//   }
//   return (
//     <div
//       onClick={onClick} // corrected prop name
//       className={cn(
//         "row-span-1 rounded-xl  justify-between flex flex-col space-y-4 pb-6",
//         className,
//       )}>
//       {header}
//       <div className="flex items-center justify-between">
//         <div className=" duration-200 font-DMSans font-semibold text-xl ">{title}</div>
//         <Badge variant="outline" className="line-clamp-1">
//           {icon}
//         </Badge>
//       </div>
//       <div className="font-sans font-normal text-neutral-600 text-sm dark:text-neutral-300">
//         {/* {truncateString(description, 50)} */}
//         {description2}
//       </div>
//       <div className="font-sans font-normal text-neutral-600 text-sm dark:text-neutral-300">
//         {/* {truncateString(description, 50)} */}
//         {description}
//       </div>
//     </div>
//   );
// };
