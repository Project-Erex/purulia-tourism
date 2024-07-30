"use client";
import {useState, useEffect} from "react";
import supabase from "@/config/supabaseClient";
import {Button} from "@/components/ui/button";
import logHelper from "@/utils/logHelper";
import AccordionDemo from "@/components/AccordionComponent";
import MapComponent from "@/components/MapComponent";
import {useSearchParams} from "next/navigation";
import {ScrollArea} from "@/components/ui/scroll-area";

export default function Create({}) {
  const params = useSearchParams();
  const startLocation = params.get("selectedDistance");
  const exactDays = params.get("exactDays");

  const orderr =
    startLocation === "adra"
      ? "dist_from_adra"
      : "purulia"
      ? "dist_from_purulia"
      : "barabhum"
      ? "dist_from_barabhum"
      : null;

  const [data, setData] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  const perDayTravelTime = parseInt(params.get("numberOfDays")) * 60;

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const {data, error} = await supabase
          .from("destinations")
          .select("*,categories(category_name)")
          .order(orderr, {ascending: true});

        if (error) {
          throw error;
        }
        setData(data || []);
        createItianearyHandler(startLocation, data || []);
      } catch (error) {
        console.error("Error fetching destinations:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, [startLocation]);

  const createItianearyHandler = (starting_location, fetchedData) => {
    const journeyLocation =
      starting_location === "adra"
        ? "dist_from_adra"
        : starting_location === "purulia"
        ? "dist_from_purulia"
        : starting_location === "barabhum"
        ? "dist_from_barabhum"
        : null;
    const journeyTime =
      starting_location === "adra"
        ? "time_taken_from_adra"
        : starting_location === "purulia"
        ? "time_taken_from_purulia"
        : starting_location === "barabhum"
        ? "time_taken_from_barabhum"
        : null;

    const filteredDestinations = fetchedData.reduce(
      (acc, destination) => {
        const stayTimeMinutes = destination.stay_time;
        const distance = destination[journeyLocation];
        const timeTaken = destination[journeyTime];
        if (stayTimeMinutes === null || distance === null) {
          return acc;
        }
        if (acc.accumulatedTime + stayTimeMinutes + timeTaken <= perDayTravelTime) {
          acc.filtered.push(destination);
          acc.accumulatedTime += stayTimeMinutes + timeTaken;
          acc.visitedPlaces.push({
            ...destination,
            distance: distance,
            timeTaken: timeTaken,
          });
          acc.totalStayTime += stayTimeMinutes;
          acc.totalTravelTime += timeTaken;
        }
        return acc;
      },
      {
        filtered: [],
        accumulatedTime: 0,
        visitedPlaces: [],
        totalStayTime: 0,
        totalTravelTime: 0,
      },
    );

    filteredDestinations.visitedPlaces.sort((a, b) => a.distance - b.distance);
    const result = {
      numberOfVisitedPlaces: filteredDestinations.filtered.length,
      totalTimeTakenInTravel: `${Math.floor(
        filteredDestinations.totalTravelTime / 60,
      )} Hours - ${filteredDestinations.totalTravelTime % 60} Minutes`,
      totalTimeTakenInPlaces: `${Math.floor(
        filteredDestinations.totalStayTime / 60,
      )} Hours - ${filteredDestinations.totalStayTime % 60} Minutes`,
      totalTimeTaken: `${Math.floor(
        (filteredDestinations.totalStayTime + filteredDestinations.totalTravelTime) / 60,
      )} Hours - ${
        (filteredDestinations.totalStayTime + filteredDestinations.totalTravelTime) % 60
      } Minutes`,
      visitedPlaces: filteredDestinations.visitedPlaces,
    };
    setResult(result);
    return result;
  };

  const handleMouseEnter = (event, place) => {
    // Add your custom logic here
    setHoveredPlace(place);
  };

  const handleMouseLeave = (event, place) => {
    setHoveredPlace(null);
    // Add your custom logic here
  };
  const [hoveredPlace, setHoveredPlace] = useState(null);

  return (
    <div className="pt-24 w-full">
      <div className="max-w-7xl mx-auto pb-6">
        {!loading && (
          <div className="font-DMSans font-bold text-3xl tracking-tighter">
            Your Trip to Purulia for {exactDays} days starting from {startLocation}
          </div>
        )}
        {loading ? (
          <p>Loading.......</p>
        ) : (
          result && (
            <div className="flex w-full pt-8">
              <div className="w-1/2 pr-2">
                <ScrollArea className="h-screen ">
                  <AccordionDemo
                    startLocation={startLocation}
                    result={result}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseLeave={handleMouseLeave}
                    perDayTravelTime={perDayTravelTime}
                    exactDays={exactDays}
                  />
                </ScrollArea>
              </div>
              <div className="w-1/2 pl-2">
                {/* <MapComponent
                  result={result}
                  startLocation={startLocation}
                  hoveredPlace={hoveredPlace}
                /> */}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
