"use client";
import React, {useRef} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {ImageCarousel} from "@/data/Home-page";
import Image from "next/image";
import {MoveLeft, MoveRight} from "lucide-react";

export default function DestinationSlider() {
  const slider = useRef(null);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    pauseOnHover: false,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="relative w-full h-full">
      <button
        className="absolute z-50 hidden p-2 text-primary -translate-y-1/2 rounded-full cursor-pointer md:block -right-4 md:text-2xl top-1/2 bg-backgroundlite"
        onClick={() => slider.current.slickNext()}>
        <MoveRight />
      </button>
      <button
        className="absolute z-30 hidden p-2 text-primary -translate-y-1/2 rounded-full cursor-pointer md:block -left-4 md:text-2xl top-1/2 bg-backgroundlite"
        onClick={() => slider.current.slickPrev()}>
        <MoveLeft />
      </button>
      <Slider ref={slider} {...settings}>
        {ImageCarousel.map((item, index) => (
          <div key={index} className="px-2  py-3  ">
            <div className="h-full w-full relative cursor-pointer ">
              <div className="w-full h-full absolute rounded-lg  bg-black/15"></div>
              <Image
                width={500}
                height={300} // These are just examples; you can adjust accordingly
                className="w-full min-h-72 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:rounded-lg lg:min-h-80 xl:min-h-96  object-cover rounded-lg "
                src={item.image}
                alt={item.title}
              />
            </div>
            {/* Uncomment if needed */}
            <div className="absolute bottom-0  flex flex-col gap-1 m-7 z-50">
              <h4 className="text-white font-semibold font-OpenSans text-xl  leading-none">
                {item.title}
              </h4>
              <h4 className="text-white text-sm font-normal font-OpenSans  leading-normal">
                {item.hotels} Hotels
              </h4>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
