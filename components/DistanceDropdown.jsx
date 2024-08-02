"use client";
import {useState, useEffect} from "react";
import supabase from "@/config/supabaseClient";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DistanceDropdown({onSelectCategory}) {
  const [locations, setLocations] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStartingPoint = async () => {
      try {
        const {data: locations, error} = await supabase
          .from("starting_locations")
          .select("*");

        if (error) {
          throw error;
        }
        setLocations(locations || []);
        setIsLoading(false);
        console.log("Final Locations", locations);
      } catch (error) {
        console.error("Error fetching images:", error.message);
      }
    };
    fetchStartingPoint();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!locations || locations.length === 0) {
    return <div>No categories found</div>;
  }

  return (
    <div className="w-full">
      <Select onValueChange={onSelectCategory}>
        <SelectTrigger>
          <SelectValue placeholder="Select your starting point" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>
            <SelectItem value={null}>All</SelectItem>
            {locations.map((item) => (
              <SelectItem key={item.id} value={item.location_name}>
                {item.location_name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
