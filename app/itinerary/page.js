"use client";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import DistanceDropdown from "@/components/DistanceDropdown";
import NumberOfDays from "@/components/NumberOfDays";

import Link from "next/link";

export default function Itinerary() {
  const [numberOfDays, setNumberOfDays] = useState(1);
  const [selectedDistance, setSelectedDistance] = useState(null);

  const handleSelectDistance = (categoryId) => {
    console.log("Selected distance category:", categoryId);
    setSelectedDistance(categoryId);
  };

  const handleSelectDays = (categoryId) => {
    console.log("Selected number of days:", categoryId);
    setNumberOfDays(categoryId);
  };

  return (
    <div className="pt-24 w-full ">
      <div className="max-w-7xl mx-auto pb-6">
        <div className="font-DMSans font-bold text-3xl tracking-tighter">
          Create Your Itinerary
        </div>
        <div className="font-DMSans font-thin text-sm tracking-tighter text-gray-500 pt-4">
          Choose a days range or length of stay, up to 3 days and your journey's starting
          location.
        </div>
        <div className="flex items-center justify-start mt-5">
          <DistanceDropdown onSelectCategory={handleSelectDistance} />
          <NumberOfDays onSelectDays={handleSelectDays} />
          <Link
            href={{
              pathname: "/itinerary/create",
              query: {
                exactDays: numberOfDays,
                numberOfDays:
                  numberOfDays === 1
                    ? 8
                    : numberOfDays === 2
                    ? 16
                    : numberOfDays === 3
                    ? 24
                    : null,
                selectedDistance: selectedDistance,
              },
            }}>
            <Button className="float-right ml-4">Next</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
