"use client";

import React, {useRef} from "react";
import {motion, useScroll, useTransform} from "framer-motion";

import axios from "axios";
import {useEffect, useState} from "react";
import {useJsApiLoader} from "@react-google-maps/api";
import Image from "next/image";
import {MapPin} from "lucide-react";

import BorderImageTop from "@/components/section/BorderImage";
import {SectionHeading} from "@/components/ui/text-components/SectionHeading";
import {Heading} from "@/components/ui/text-components/Heading";
import {SubHeading} from "@/components/ui/text-components/SubHeading";
import {Button} from "@/components/ui/button";
import {styles} from "@/app/styles";
import {Bars, ThreeDots} from "react-loader-spinner";

import {FaRoute} from "react-icons/fa";

export default function MultiLayerParallax() {
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
  console.log("weather", weather);

  const capitalizeFirstWord = (text) => {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const capitalizedDescription = capitalizeFirstWord(
    `${weather?.weather[0].description}`,
  );

  const ref = useRef(null);
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);

  return (
    <div
      ref={ref}
      className="w-full h-screen overflow-hidden relative  place-items-center">
      <div className="z-50 absolute top-24 w-full ">
        {/*  */}
        <div
          className={` flex justify-between flex-col md:flex-row items-center w-full gap-2 ${styles.xPadding}`}>
          {/* ************* */}
          <div className=" bg-white-03 backdrop-blur-custom border border-white-015  w-56 h-24 flex flex-col items-center justify-center rounded-lg">
            {isInsidePurulia ? (
              `You are in ${youAreIn}`
            ) : (
              <div className="font-OpenSans font-normal lg:text-base flex-col gap-1  flex items-center sm:text-xl text-lg text-subheading dark:text-heading-dark">
                Distance from Purulia
                <span className="text-2xl font-semibold flex gap-2 items-center text-primary  uppercase">
                  <FaRoute size={20} />{" "}
                  {locationData?.rows?.[0]?.elements?.[0]?.distance?.text || (
                    <ThreeDots
                      visible={true}
                      height="32"
                      width="65"
                      color="#2563EB"
                      radius="8"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  )}
                </span>
              </div>
            )}
          </div>

          <div className=" bg-white-03 backdrop-blur-custom border border-white-015   w-56 h-24 flex flex-col items-center justify-center rounded-lg">
            <p className="font-OpenSans font-normal lg:text-base  gap-1  flex items-center sm:text-xl text-lg text-subheading dark:text-heading-dark">
              {/* <MapPin size={20} /> */}
              {weather?.name}
            </p>
            <div className="font-OpenSans  text-2xl font-semibold flex gap-1 items-center text-primary  uppercase">
              <Image
                width={200}
                height={200}
                src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
                alt={weather?.weather[0].main}
                className="w-10 h-10 "
              />
              {weatherr}°C
            </div>
            <SubHeading type="small">{weather?.weather[0].description}</SubHeading>
          </div>
        </div>
        {/* /// */}
      </div>
      <motion.h2
        style={{y: textY}}
        className="font-bold text-red-500 z-[999] text-center text-6xl font-OpenSans">
        Discover Purulia’s Nature
        <br /> Beauty & Culture!
      </motion.h2>

      <motion.div
        className="absolute inset-0 z-0 "
        style={{
          backgroundImage: `url('/images/home-page/backgroundImage.png')`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
          y: backgroundY,
        }}></motion.div>
      <div
        className="absolute inset-0 z-20 "
        style={{
          backgroundImage: `url(/images/home-page/hill.png)`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
        }}
      />
    </div>
  );
}
