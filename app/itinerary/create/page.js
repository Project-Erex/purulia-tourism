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
  const [hoveredPlace, setHoveredPlace] = useState(null);

  const handleMouseEnter = (event, place) => {
    // Add your custom logic here
    setHoveredPlace(place);
  };

  const handleMouseLeave = (event, place) => {
    setHoveredPlace(null);
    // Add your custom logic here
  };

  return (
    <div className="pt-24 w-full">
      <div className="max-w-7xl mx-auto pb-6">
        {!loading && (
          <div className="font-DMSans font-bold text-3xl tracking-tighter">
            Your Trip to Purulia for {exactDays} days starting from {startLocation}
          </div>
        )}
        {result && (
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
              <MapComponent
                result={result}
                startLocation={startLocation}
                hoveredPlace={hoveredPlace}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const MapComponent = ({result, startLocation, hoveredPlace}) => {
  const {isLoaded} = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDbxdM_pA81YqlheJSleL2wG2-5-64j9NQ",
  });
  const data = result.visitedPlaces;
  const [mapCenter, setMapCenter] = useState({
    lat: data[0]?.latitude || 0,
    lng: data[0]?.longitude || 0,
  });
  const [activeMarker, setActiveMarker] = useState(null);

  const containerStyle = {
    width: "100%",
    height: "80%",
    borderRadius: "10px",
    overflow: "hidden",
  };

  const customInfoWindowStyle = {
    background: "white",
    borderRadius: "10px",
    padding: "10px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
  };

  useEffect(() => {
    if (hoveredPlace) {
      setActiveMarker(hoveredPlace.id);
    } else {
      setActiveMarker(null);
    }
  }, [hoveredPlace]);
  const customMarkerIcon = {
    url: "/mapMarker.png",
    scaledSize: isLoaded ? new window.google.maps.Size(40, 40) : null,
    // scaledSize: new window.google.maps.Size(40, 40), // Size of the marker
  };
  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} zoom={12} center={mapCenter}>
      {data.map((place, index) => (
        <Marker
          key={place.id}
          position={{lat: parseFloat(place.latitude), lng: parseFloat(place.longitude)}}
          label={{
            text: (index + 1).toString(),
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
          }}
          title={place.name}
          icon={customMarkerIcon}
          onMouseOver={() => setActiveMarker(place.id)}
          onMouseOut={() => setActiveMarker(null)}>
          {activeMarker === place.id && (
            <InfoWindow
              position={{
                lat: parseFloat(place.latitude),
                lng: parseFloat(place.longitude),
              }}
              options={{
                pixelOffset: isLoaded && new window.google.maps.Size(0, -30),
              }}>
              <div
                style={customInfoWindowStyle}
                className="font-DMSans font-bold text-xl tracking-tighter text-slate-900">
                {place.name}
              </div>
            </InfoWindow>
          )}
        </Marker>
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
};
