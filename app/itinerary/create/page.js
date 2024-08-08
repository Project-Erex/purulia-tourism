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
  // const selectedSourceCoords = [23.093398, 86.2117674]; //balarampur
  // const selectedSourceCoords = [23.4954576, 86.6691834]; // adra

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

  function filterAndSortLocationsByPriority(locations) {
    // Filter out locations based on priority
    // Sort the filtered locations by priority in ascending order
    const sortedLocations = locations.sort(
      (a, b) => a?.priority?.value - b?.priority?.value,
    );

    return sortedLocations;
  }

  const filterByTime = (arr) => {
    const MAX_TIME = 480;
    const included = [];
    const excluded = [];

    arr.forEach((subArr) => {
      let totalTime = 0;
      const includedSubArr = [];
      const excludedSubArr = [];

      subArr.forEach((item) => {
        if (totalTime + item.expected_spend_time <= MAX_TIME) {
          totalTime += item.expected_spend_time;
          includedSubArr.push(item);
        } else {
          excludedSubArr.push(item);
        }
      });

      included.push(includedSubArr);
      if (excludedSubArr.length > 0) {
        excluded.push(excludedSubArr);
      }
    });

    return {included, excluded};
  };

  async function getSortedLocationsByNearest(locations, destination) {
    const apiKey = "AIzaSyDbxdM_pA81YqlheJSleL2wG2-5-64j9NQ";
    const origins = `${selectedSourceCoords[0]},${selectedSourceCoords[1]}`;
    const dest = `${destination.latitude},${destination.longitude}`;
    const waypoints = locations
      .map((loc) => `${loc.latitude},${loc.longitude}`)
      .join("|");

    const url = `/api/nearestLocation?units=metric&origin=${origins}&destination=${dest}&waypoints=${waypoints}&mode=driving&key=${apiKey}`;
    console.log(url);

    try {
      const response = await fetch(url);
      const data = await response.json();
      // console.log("sad", data);

      if (data.status !== "OK") {
        console.error("Error with Distance Matrix API:", data);
        return;
      }

      const distances = data.routes[0].legs;
      // console.log("sad", distances[2].distance.value);

      // Attach distance data to each location
      const newLocation = locations.map((location, index) => ({
        ...location,
        accDistanceValue: distances[index].distance.value, // Distance in meters
      }));
      // console.log("dsadasd", x);

      // Sort locations by distanceValue
      newLocation.sort((a, b) => a.accDistanceValue - b.accDistanceValue);

      // console.log("Sorted locations by nearest driving distance:", locations);
      return newLocation;
    } catch (error) {
      console.error("Failed to fetch data from Distance Matrix API:", error);
    }
  }

  //sort filter locaiton by close distance
  const distanceFromSource = 120;
  const nearbySourceLocation = filterAndSortNearby(
    selectedSourceCoords,
    sourceLocation,
    distanceFromSource,
  );
  // console.log("Data", nearbySourceLocation);

  const locationOrderMap = new Map(
    nearbySourceLocation.map((item, index) => [item?.location_name, index]),
  );

  const getLocationOrderIndex = (name) =>
    locationOrderMap.get(name) !== undefined ? locationOrderMap.get(name) : Infinity;

  const maxDistance = 120; // kilometers
  const nearbyLocation = filterAndSortNearby(
    selectedSourceCoords,
    fetchedData,
    maxDistance,
  );
  const destinationByPriority = filterAndSortLocationsByPriority(nearbyLocation);

  // Sort the destinations by the specified order
  const sortedDestinations = destinationByPriority.sort((a, b) => {
    const aIndex = getLocationOrderIndex(a.routes.name);
    const bIndex = getLocationOrderIndex(b.routes.name);
    return aIndex - bIndex;
  });

  const groupedByDays = nearbySourceLocation
    .map((item) => item?.location_name)
    .map((routeName) => {
      return sortedDestinations?.filter((item) => item.routes.name === routeName);
    });

  const {included, excluded} = filterByTime(groupedByDays);

  const dayWiseNearestData =
    included.length > 0 &&
    getSortedLocationsByNearest(included[0], included[0][included[0].length - 1]).then(
      (res) => {
        console.log("Data: dasd", res);
      },
    );

  // console.log("inclide", included);
  // console.log("exclude", excluded);

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
