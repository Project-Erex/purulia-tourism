import React from "react";
import Hero from "@/container/home-page/Hero";
import Destinations from "@/container/home-page/Destinations";
import HowToReach from "@/container/home-page/How-to-reach";
import PhotoGallery from "@/container/home-page/Photo-Gallery";
import {BentoGrid} from "@/components/aceternity/bento-grid";

export default function App() {
  return (
    <>
      <Hero />
      <Destinations />
      <HowToReach />
      <PhotoGallery />
      <BentoGrid />
    </>
  );
}
