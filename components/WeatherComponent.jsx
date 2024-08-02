"use client";
import React, {useState, useEffect} from "react";
import axios from "axios";
import {useJsApiLoader} from "@react-google-maps/api";

const Weather = () => {
  const [location, setLocation] = useState({lat: null, lon: null});
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [distance, setDistance] = useState(null);
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
    if (location.lat && location.lon) {
      const userLatLng = new google.maps.LatLng(location.lat, location.lon);

      if (bounds.contains(userLatLng)) {
        setInsideBounds(true);
        fetchWeather(location.lat, location.lon);
      } else {
        setInsideBounds(false);
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
  }, [location]);

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

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!weather) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pt-40 w-full">
      <h1>Current Weather</h1>
      {insideBounds ? (
        <div>
          <p>Welcome! You are within the service area.</p>
          <p>Location: {weather.name}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      ) : (
        <div>
          <p>You are outside the service area.</p>
          <p>Distance to service area center: {distance} km</p>
          <p>Weather at service area center:</p>
          <p>Location: {weather.name}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
