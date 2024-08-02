"use client";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import DistanceDropdown from "@/components/DistanceDropdown";
import NumberOfDays from "@/components/NumberOfDays";

import Link from "next/link";

export default function Itinerary() {
  const [numberOfDays, setNumberOfDays] = useState(null);
  const [selectedDistance, setSelectedDistance] = useState(null);

  const handleSelectDistance = (categoryId) => {
    // console.log("Selected distance category:", categoryId);
    setSelectedDistance(categoryId);
  };

  const handleSelectDays = (categoryId) => {
    // console.log("Selected number of days:", categoryId);
    setNumberOfDays(categoryId);
  };
  const isButtonDisabled = selectedDistance === null && numberOfDays === null;
  const linkPath = `/itinerary/create?exactDays=${numberOfDays}&numberOfDays=${
    numberOfDays === 1 ? 8 : numberOfDays === 2 ? 16 : numberOfDays === 3 ? 24 : null
  }&selectedDistance=${selectedDistance}`;

  return (
    <div className="overflow-hidden  pt-40">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative mx-auto max-w-4xl grid space-y-5 sm:space-y-10">
          <div className="text-center">
            <h1 className="text-3xl text-gray-800 font-bold sm:text-5xl lg:text-6xl lg:leading-tight dark:text-neutral-200">
              Create Your Perfect <span className="text-blue-500">Purulia</span> Itinerary
            </h1>
          </div>

          <div>
            <div className="mx-auto max-w-2xl sm:flex sm:space-x-3 p-3 bg-white border rounded-lg shadow-lg shadow-gray-100 dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-gray-900/20">
              <div className="w-full pb-2 sm:pb-0">
                <DistanceDropdown onSelectCategory={handleSelectDistance} />
              </div>
              <div className="pt-2 sm:pt-0 sm:ps-3 border-t border-gray-200 sm:border-t-0 sm:border-s w-full dark:border-neutral-700">
                <NumberOfDays onSelectDays={handleSelectDays} />
              </div>
              <div className="whitespace-nowrap pt-2 sm:pt-0 grid sm:block">
                {!isButtonDisabled ? (
                  <Link href={linkPath}>
                    <Button className="float-right ml-4">Next</Button>
                  </Link>
                ) : (
                  <Button className="float-right ml-4" disabled>
                    Next
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
