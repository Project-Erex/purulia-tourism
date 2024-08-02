"use client";

import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import supabase from "@/config/supabaseClient";

export function CardWithForm({setdata}) {
  const [isData, setIsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStartingPoint, setSelectedStartingPoint] = useState("");
  const [destinationInput, setDestinationInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [nearbyDestinations, setNearbyDestinations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let {data: starting_locations, error} = await supabase
          .from("starting_locations")
          .select("*");

        if (error) {
          throw error;
        }
        setIsData(starting_locations || []);
        // console.log("INITIAL LOCATION", starting_locations);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching starting locations:", error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const [isData2, setIsData2] = useState([]);
  const [isLoading2, setIsLoading2] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data, error} = await supabase.from("destinations").select("*");

        if (error) {
          throw error;
        }
        setIsData2(data || []);
        // console.log("DESTINATIONS", data);
        setIsLoading2(false);
      } catch (error) {
        console.error("Error fetching destinations:", error.message);
        setIsLoading2(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const input = e.target.value;
    setDestinationInput(input);

    if (input.length > 0) {
      const filteredSuggestions = isData2.filter((item) =>
        item.name.toLowerCase().includes(input.toLowerCase()),
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };
  const handleSuggestionClick = (suggestion) => {
    setDestinationInput(suggestion.name);
    setSuggestions([]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const showDistanceFrom =
      selectedStartingPoint === "purulia"
        ? "distance_from_purulia"
        : selectedStartingPoint === "adra"
        ? "distance_from_adra"
        : selectedStartingPoint === "barabhum"
        ? "distance_from_barabhum"
        : null;

    if (!showDistanceFrom) {
      console.error("Invalid starting point");
      return;
    }

    try {
      const {data: heyy, error} = await supabase
        .from("destinations")
        .select(showDistanceFrom)
        .eq("name", destinationInput);

      if (error) {
        throw error;
      }

      if (heyy.length === 0) {
        console.error("No data found for the selected destination");
        return;
      }

      const distanceValue = heyy[0][showDistanceFrom];

      // Query for nearby destinations
      const maxDistance = distanceValue + 10;
      const {data: nearbyDestinations, error: nearbyError} = await supabase
        .from("destinations")
        .select("name, " + showDistanceFrom)
        .lte(showDistanceFrom, maxDistance);

      if (nearbyError) {
        throw nearbyError;
      }

      // Log the nearby destinations
      // console.log("Nearby destinations within 60km range:", nearbyDestinations);
      setNearbyDestinations(nearbyDestinations);
      setdata(nearbyDestinations);
    } catch (error) {
      console.error("Error fetching destinations:", error.message);
    }
  };

  if (isLoading || isLoading2) {
    return <div>Loading...</div>;
  }

  if (!isData || isData.length === 0 || !isData2 || isData2.length === 0) {
    return <div>No data found</div>;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create your Travel Itinerary</CardTitle>
        <CardDescription>Some Description</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="starting-point">Select Your Starting Point</Label>
              <Select onValueChange={setSelectedStartingPoint}>
                <SelectTrigger id="starting-point">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {isData.map((location) => (
                    <SelectItem key={location.id} value={location.location_name}>
                      {location.location_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5 relative">
              <Label htmlFor="destination">Write down your destination</Label>
              <Input
                id="destination"
                placeholder="Name of your Destination"
                value={destinationInput}
                onChange={handleInputChange}
              />
              {suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 z-10">
                  {suggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => handleSuggestionClick(suggestion)}>
                      {suggestion.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <CardFooter className="flex justify-center pt-4">
            <Button className="w-full" type="submit">
              Create Itinerary
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
