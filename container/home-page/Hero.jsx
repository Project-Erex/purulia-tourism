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

export default function Hero() {
  const [location, setLocation] = useState({lat: null, lon: null});
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    if (location.lat && location.lon) {
      const apiKey = "0f669bbcfd95a7d79134fe530ccd5e60";
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${"23.517078604524716"}&lon=${"86.14439673370283"}&units=metric&APPID=${apiKey}`;

      axios
        .get(url)
        .then((response) => {
          setWeather(response.data);
        })
        .catch((error) => {
          setError("Error fetching weather data.");
        });
    }
  }, [location]);
  const getWeatherIcon = (description) => {
    if (description.includes("haze")) {
      return <Cloud className="w-16 h-16 text-white mr-2" />;
    } else if (description.includes("rain")) {
      return <CloudRain className="w-16 h-16 text-white mr-2" />;
    } else if (description.includes("clear")) {
      return <Sun className="w-16 h-16 text-white mr-2" />;
    } else {
      return null; // Fallback icon or null if no match
    }
  };

  return (
    <div className="w-full h-full  flex items-center  justify-center bg-background dark:bg-background-dark  ">
      <div className="max-w-screen-2xl w-full relative">
        <ImageSlider />
        <div className=" absolute top-16 left-56">
          <div className="font-DMSans font-bold text-3xl tracking-tighter text-white">
            {weather?.name}
          </div>
          <div className="flex justify-center items-center">
            <div className="flex items-center text-white">
              {weather && getWeatherIcon(weather.weather[0].description)}
            </div>
            <div
              className="font-DMSans font-bold text-6xl tracking-tighter text-white"
              type="large">
              {weather?.main.temp}°C
            </div>
          </div>
        </div>
        <div
          className={`absolute w-full h-full bg-black/25 flex justify-center  items-center top-0 pt-10 ${styles.xPadding} `}>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-10 ">
            <div className=" w-full h-full flex-col  justify-center flex  gap-5 ">
              <SectionHeading
                className="text-heading-dark dark:text-heading-dark"
                type="large">
                Find Your Ideal Stay
              </SectionHeading>
              <Heading
                className="text-heading-dark leading-relaxed  dark:text-heading-dark"
                type="large">
                Discover Purulia's natural beauty and culture!
              </Heading>
              <SubHeading type="extraLarge">
                Planning for a trip? We will organize your trip with the best places and
                within best budget!
              </SubHeading>
              <Button type="link" href="/blogs" title="View Packages" />
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
