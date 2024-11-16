"use client";
import {useState, useEffect} from "react";
import supabase from "@/config/supabaseClient";
import {Button} from "@/components/ui/button";
import logHelper from "@/utils/logHelper";
import AccordionDemo from "@/components/AccordionComponent";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import {useSearchParams} from "next/navigation";
import {ScrollArea} from "@/components/ui/scroll-area";

export default function Create({}) {
  const params = useSearchParams();
  const startLocation = params.get("selectedDistance");
  const exactDays = params.get("exactDays");
  const perDayTravelTime = parseInt(params.get("numberOfDays")) * 60;
  const selectedLocation = "purulia";

  const [sourceLocation, setSourceLocation] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

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

  const fetchedData = data;

  const selectedSourceCoords = [23.342257, 86.362839];
  // const selectedSourceCoords = [23.09363782099861, 86.21183582601076];

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const {data, error} = await supabase
          .from("destinations")
          .select("*,categories(category_name),routes(*),priority(*)")
          .order(orderr, {ascending: true});

        if (error) {
          throw error;
        }
        setData(data || []);

        // createItianearyHandler(startLocation, data || []);
      } catch (error) {
        console.error("Error fetching destinations:", error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchStartingPoint = async () => {
      try {
        const {data: locations, error} = await supabase
          .from("starting_locations")
          .select("*");

        if (error) {
          throw error;
        }
        setSourceLocation(locations || []);
        setIsLoading(false);
        console.log("Final Locations", locations);
      } catch (error) {
        console.error("Error fetching images:", error.message);
      }
    };

    fetchStartingPoint();

    fetchDestinations();
  }, [startLocation]);

  function haversineDistance(coord1, coord2) {
    const R = 6371.0; // Radius of the Earth in km
    const lat1 = coord1[0];
    const lon1 = coord1[1];
    const lat2 = coord2[0];
    const lon2 = coord2[1];

    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  }

  function filterAndSortNearby(masterCoord, fetchedData, maxDistance) {
    const nearbyWithDistances = fetchedData
      ?.map((item) => {
        return {
          ...item,
          distance: haversineDistance(masterCoord, [item?.latitude, item?.longitude]),
        };
      })
      .filter((item) => item.distance <= maxDistance);
    nearbyWithDistances.sort((a, b) => a.distance - b.distance);
    return nearbyWithDistances.map((item) => item);
  }

  function distributeLocationsByDays(locations, maxMinutesPerDay = 480) {
    const days = [];
    let currentDay = [];
    let currentTime = 0;

    locations.forEach((location) => {
      const spendTime = location.expected_spend_time || 0;

      if (currentTime + spendTime > maxMinutesPerDay) {
        days.push(currentDay);
        currentDay = [];
        currentTime = 0;
      }

      currentDay.push(location);
      currentTime += spendTime;
    });

    if (currentDay.length > 0) {
      days.push(currentDay);
    }

    return days;
  }

  function filterAndSortLocations(locations) {
    // Filter out locations based on priority
    // Sort the filtered locations by priority in ascending order
    const sortedLocations = locations.sort(
      (a, b) => a?.priority?.value - b?.priority?.value,
    );

    return sortedLocations;
  }

  //sort filter locaiton by close distance
  const distanceFromSource = 40;
  const nearbySourceLocation = filterAndSortNearby(
    selectedSourceCoords,
    sourceLocation,
    distanceFromSource,
  );
  const locationOrderMap = new Map(
    nearbySourceLocation.map((item, index) => [item?.location_name, index]),
  );

  const maxDistance = 60; // kilometers
  const nearbyLocation = filterAndSortNearby(
    selectedSourceCoords,
    fetchedData,
    maxDistance,
  );
  const destinationByPriority = filterAndSortLocations(nearbyLocation);

  const getLocationOrderIndex = (name) =>
    locationOrderMap.get(name) !== undefined ? locationOrderMap.get(name) : Infinity;

  // Sort the destinations by the specified order
  const sortedDestinations = destinationByPriority.sort((a, b) => {
    const aIndex = getLocationOrderIndex(a.routes.name);
    const bIndex = getLocationOrderIndex(b.routes.name);
    return aIndex - bIndex;
  });

  // const distributedLocations = distributeLocationsByDays(sortedDestinations);

  // console.log(organizedData);

  //   const destinationByRoutes = destinationByPriority?.map();

  console.log("hello", sortedDestinations);

  return (
    <div className="pt-24 w-full">
      <div className="max-w-7xl mx-auto pb-6">
        {!loading && (
          <div className="font-DMSans font-bold text-3xl tracking-tighter">
            Your Trip to Purulia for {exactDays} days starting from {startLocation}
          </div>
        )}
      </div>
    </div>
  );
}
