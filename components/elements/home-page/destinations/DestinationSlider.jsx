"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {ImageCarousel} from "@/data/Home-page";
import Image from "next/image";

export default function DestinationSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    pauseOnHover: false,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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
    <div className="w-full h-full ">
      <Slider {...settings}>
        {ImageCarousel.map((item, index) => {
          return (
            <div key={index} className="px-2">
              <Image
                width={0}
                height={0}
                className="w-full h-full rounded-lg object-contain"
                src={item.image}
                alt={item.title}
              />
              {/* <Heading type="small">{item.title}</Heading> */}
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
