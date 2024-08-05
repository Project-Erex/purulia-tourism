"use client";

import {styles} from "@/app/styles";
import Category from "@/components/elements/home-page/hero/Category";
import ImageSlider from "@/components/elements/home-page/hero/ImageSlider";
import Button from "@/components/ui/Button/Button";
import {Heading} from "@/components/ui/text-components/Heading";
import {SectionHeading} from "@/components/ui/text-components/SectionHeading";
import {SubHeading} from "@/components/ui/text-components/SubHeading";
import axios from "axios";
import {useEffect, useState} from "react";
import {Cloud, CloudRain, Sun} from "lucide-react";
import {useJsApiLoader} from "@react-google-maps/api";

export default function Hero() {
  const [location, setLocation] = useState({lat: null, lon: null});
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [distance, setDistance] = useState(null);
  const [locationData, setLocationData] = useState({});
  const [insideBounds, setInsideBounds] = useState(null);
  const {isLoaded} = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDbxdM_pA81YqlheJSleL2wG2-5-64j9NQ",
  });
  const bounds = isLoaded
    ? new google.maps.LatLngBounds(
        new google.maps.LatLng(23.303260158226784, 86.34011865871555), // Southwest corner
        new google.maps.LatLng(23.363111960475987, 86.38636555029298), // Northeast corner
      )
    : null;
  const boundsCenter = {
    lat: (23.303260158226784 + 23.363111960475987) / 2,
    lon: (86.34011865871555 + 86.38636555029298) / 2,
  };

  const puruliaCoords = {
    lat: 23.342257,
    lng: 86.362839,
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          setError(error.message);
        },
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);
  const daa = {
    lat: 23.32020418657367,
    lon: 86.3762907681383,
  };
  useEffect(() => {
    if (location.lat && location.lon && isLoaded) {
      const userLatLng = new google.maps.LatLng(location.lat, location.lon);

      if (bounds.contains(userLatLng)) {
        setInsideBounds(true);
        fetchWeather(location.lat, location.lon);
        // fetchDistance(location.lat, location.lon)
      } else {
        setInsideBounds(false);
        fetchDistance(location.lat, location.lon);
        fetchWeather(boundsCenter.lat, boundsCenter.lon);
        const distance = calculateDistance(
          location.lat,
          location.lon,
          boundsCenter.lat,
          boundsCenter.lon,
        );
        setDistance(distance);
      }
    }
  }, [location, isLoaded]);

  const fetchWeather = (lat, lon) => {
    const apiKey = "0f669bbcfd95a7d79134fe530ccd5e60";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKey}`;

    axios
      .get(url)
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        setError("Error fetching weather data.");
      });
  };

  const fetchDistance = async (lat, lon) => {
    const apiKey = "AIzaSyDbxdM_pA81YqlheJSleL2wG2-5-64j9NQ";
    try {
      const response = await fetch(
        `/api/distance?units=metric&origins=${lat},${lon}&destinations=${puruliaCoords.lat},${puruliaCoords.lng}&key=${apiKey}`,
      );
      const data = await response.json();
      console.log(data);
      // serLocationData(data);
      setLocationData(data);
    } catch (error) {
      console.error("Error fetching distance:", error);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance.toFixed(2);
  };

  const weatherr = weather?.main?.temp?.toFixed(1);
  const km = 40000;
  const isInsidePurulia = locationData?.rows?.[0]?.elements?.[0]?.distance?.value < km;
  const youAreIn = locationData?.origin_addresses?.[0]?.split(",")?.[1];
  console.log("dassadsadsadas", youAreIn);

  return (
    <div className="w-full h-full  flex items-center  justify-center bg-background dark:bg-background-dark  pt-16">
      <div className="max-w-screen-2xl w-full relative">
        <ImageSlider />
        <div
          className={`absolute w-full h-full bg-black/25 flex justify-center  items-center top-0 pt-10 ${styles.xPadding} `}>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-10 ">
            <div className=" w-full h-full flex-col  justify-center flex  gap-5 ">
              <div>
                <div>
                  <div className="font-DMSans font-bold lg:text-xl sm:text-xl text-lg tracking-tighter text-heading-dark dark:text-heading-dark">
                    {weather?.name}
                  </div>
                </div>
                <div className="font-DMSans font-bold text-4xl tracking-tighter text-heading-dark dark:text-heading-dark">
                  {weatherr}°C
                </div>
                <p className="font-DMSans font-bold lg:text-2xl sm:text-xl text-lg tracking-tighter text-heading-dark dark:text-heading-dark">
                  Welcome! To Purulia.
                </p>

                <p className="font-DMSans font-bold lg:text-2xl sm:text-xl text-lg tracking-tighter text-heading-dark dark:text-heading-dark">
                  {isInsidePurulia
                    ? `You are in ${youAreIn}`
                    : `Distance from Purulia: ${
                        locationData?.rows?.[0]?.elements?.[0]?.distance?.text ||
                        "Fetching..."
                      }`}
                </p>
              </div>
              <SectionHeading
                className="text-heading-dark dark:text-heading-dark"
                type="large">
                Find Your Ideal Stay
              </SectionHeading>
              <Heading
                className="text-heading-dark leading-relaxed  dark:text-heading-dark"
                type="large">
                {`  Discover Purulia's natural beauty and culture!`}
              </Heading>
              <SubHeading type="extraLarge">
                Planning for a trip? We will organize your trip with the best places and
                within best budget!
              </SubHeading>
              <Button type="link" href="/comingsoon" title="View Packages" />
            </div>
            <div className="w-full h-full flex justify-center items-center">
              <Category />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
