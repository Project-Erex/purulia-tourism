"use client";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import {Badge} from "@/components/ui/badge";
import supabase from "@/config/supabaseClient";
import {TbTrain, TbPlaneInflight, TbRoad} from "react-icons/tb";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
} from "@/components/ui/dialog";
import {GoogleMap, Marker, useJsApiLoader} from "@react-google-maps/api";
import logHelper from "@/utils/logHelper";
import {BentoGrid} from "@/components/aceternity/bento-grid";
import {cn} from "@/utils/cn";

const Page = ({params}) => {
  const [isData, setIsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data, error} = await supabase
          .from("destinations")
          .select("*, categories(category_name)")
          .eq("id", params.slugs[0]);
        if (error) {
          throw error;
        }
        setIsData(data || []);
        // console.log("first,da", data[0]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching images:", error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isData || isData.length === 0) {
    return (
      <>
        <div>No images found</div>
      </>
    );
  }
  logHelper("fhsdfhosdihfids", isData);
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=-0.1354%2C51.5007%2C-0.1171%2C51.5069&layer=mapnik&marker=51.5033%2C-0.1268`;
  const dataa = [
    "https://via.placeholder.com/700x500.png?text=Image+1",
    "https://via.placeholder.com/700x500.png?text=Image+2",
    "https://via.placeholder.com/700x500.png?text=Image+3",
    "https://via.placeholder.com/700x500.png?text=Image+4",
    "https://via.placeholder.com/700x500.png?text=Image+5",
    "https://via.placeholder.com/700x500.png?text=Image+6",
  ];
  const extraImagesCount = dataa.length - 2;

  return (
    <div className="min-h-screen pt-24 mb-10 px-5">
      <div className=" max-w-7xl mx-auto  mx-autoshadow-md overflow-hidden">
        <ImageComponent
          data={dataa}
          isData={isData}
          extraImagesCount={extraImagesCount}
        />

        <BentoGrid className="max-w-7xl mx-auto md:grid md:grid-cols-3 md:grid-rows-2 gap-4 md:auto-rows-[10rem] mt-5">
          <div className="md:col-span-2 md:row-span-2 flex flex-col rounded-xl group/bento p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-gray-200">
            <Details isData={isData} />
            <Distances isData={isData} />
          </div>
          <MapComponent
            isData={isData}
            className="md:col-span-2 md:row-span-2 md:block hidden"
          />
        </BentoGrid>
      </div>
    </div>
  );
};

export default Page;

const ImageComponent = ({data, isData, extraImagesCount}) => {
  return (
    <>
      <BentoGrid className="max-w-7xl mx-auto md:auto-rows-[15rem]">
        {data.slice(0, 2).map((imageData, index) => (
          <BentoGridItem
            key={index}
            imageSrc={isData[0].image}
            className={`${
              index === 0
                ? "md:col-span-3 md:row-span-2"
                : "md:col-span-1 md:row-span-1 hidden md:block"
            }`}
          />
        ))}
        <ImageCounterWrapper
          extraImagesCount={extraImagesCount}
          isData={isData}
          className="md:col-span-1 "
          dataa={data}
        />
      </BentoGrid>
    </>
  );
};

const BentoGridItem = ({imageSrc, className}) => {
  return (
    <div
      className={`row-span-1 rounded-xl group/bento  p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-gray-200 justify-between flex flex-col space-y-4 ${className}`}>
      <Image
        src={imageSrc}
        alt="Image"
        width={0}
        height={0}
        sizes="100vw"
        style={{width: "100%", height: "100%"}}
      />
    </div>
  );
};

const ImageCounterWrapper = ({extraImagesCount, isData, className, dataa}) => {
  return (
    <div
      className={`row-span-1 rounded-xl group/bento p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-gray-200 justify-between flex flex-col space-y-4 ${className}`}>
      <ImageCounter extraImagesCount={extraImagesCount} isData={isData} dataa={dataa} />
    </div>
  );
};

const ImageCounter = ({extraImagesCount, isData, dataa}) => {
  return (
    <>
      {extraImagesCount > 0 && (
        <Dialog>
          <DialogTrigger asChild>
            <div className="relative h-full w-full ">
              <Image
                src={isData[0].image}
                alt={`Image 3`}
                width={0}
                height={0}
                sizes="100vw"
                style={{width: "100%", height: "100%"}}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-2xl">
                +{extraImagesCount}
              </div>
            </div>
          </DialogTrigger>
          <DialogPortal>
            <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50" />
            <DialogContent className="fixed top-1/2 left-1/2  max-w-5xl max-h-3/4 overflow-auto bg-white p-4  shadow-lg transform -translate-x-1/2 -translate-y-1/2">
              <Carousel className="relative w-full h-full">
                <CarouselContent>
                  {dataa.map((imageData, index) => (
                    <CarouselItem key={index} className="w-full h-full">
                      <Image
                        src={isData[0].image}
                        alt={`Image ${index + 1}`}
                        width={700}
                        height={500}
                        className="object-cover w-full h-full"
                        style={{
                          objectFit: "cover",
                          borderRadius: "10px", // You can select border radius here
                        }}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0" />
                <CarouselNext className="right-0" />
              </Carousel>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      )}
    </>
  );
};

const Details = ({isData, className}) => {
  return (
    <div class={`${className} `}>
      <div className="flex items-center justify-start">
        <p className="mb-2font-medium pr-5 font-DMSans text-2xl font-semibold">
          {isData[0].name}
        </p>
        <Badge className="font-DMSans text-sm tracking-tighter font-medium">
          {isData[0].categories.category_name}
        </Badge>
      </div>
      <p className="font-DMSans text-xl tracking-tighter font-normal leading-tight py-4 pb-10">
        {isData[0].description}
      </p>
    </div>
  );
};

const Distances = ({isData, className}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      <div>
        <Badge
          variant="outline"
          className="font-DMSans text-sm tracking-tighter font-medium ">
          Adra . {isData[0].dist_from_adra} KMs away
        </Badge>
      </div>
      <div>
        <Badge
          variant="outline"
          className="font-DMSans text-sm tracking-tighter font-medium">
          Purulia . {isData[0].dist_from_purulia} KMs away
        </Badge>
      </div>
      <div>
        <Badge
          variant="outline"
          className="font-DMSans text-sm tracking-tighter font-medium">
          Barabhum . {isData[0].dist_from_barabhum} KMs away
        </Badge>
      </div>
    </div>
  );
};

function MapComponent({isData, className}) {
  const {isLoaded} = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDbxdM_pA81YqlheJSleL2wG2-5-64j9NQ",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  const containerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    overflow: "hidden",
  };
  const center = {
    lat: isData[0].latitude,
    lng: isData[0].longitude,
  };

  return isLoaded ? (
    <div
      className={`rounded-xl group/bento p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-gray-200  ${className}`}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}>
        <Marker
          key={isData[0].id}
          position={{
            lat: parseFloat(isData[0].latitude),
            lng: parseFloat(isData[0].longitude),
          }}></Marker>
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}
