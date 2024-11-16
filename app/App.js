import React from "react";
import Hero from "@/container/home-page/Hero";
import Destinations from "@/container/home-page/Destinations";
import HowToReach from "@/container/home-page/How-to-reach";
import PhotoGallery from "@/container/home-page/Photo-Gallery";
import Trip from "@/container/home-page/Trip";

export default function App() {
  return (
    <>
      <Hero />
      <Trip />
      {/* <PhotoGallery /> */}
      <HowToReach />
      <Destinations />
    </>
  );
}
