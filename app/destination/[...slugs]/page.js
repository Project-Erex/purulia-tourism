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

const Page = ({params}) => {
  const [isData, setIsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data, error} = await supabase
          .from("destinations")
          .select("*")
          .eq("id", params.slugs[0]);
        if (error) {
          throw error;
        }
        setIsData(data || []);
        console.log("first,da", data[0]);
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
    <div className="min-h-screen pt-24 mb-10">
      <div className=" max-w-7xl mx-auto  mx-autoshadow-md overflow-hidden">
        <div className="">
          <div className="">
            <div className="grid grid-cols-3 gap-4">
              {dataa.slice(0, 2).map((imageData, index) => (
                <Image
                  key={index}
                  src={isData[0].image}
                  alt={`Image ${index + 1}`}
                  width={700}
                  height={500}
                  className={`object-cover w-full ${
                    index === 0 ? "h-[400px] col-span-2 row-span-2" : "h-[190px]"
                  }`}
                  style={{
                    objectFit: "cover",
                    borderRadius: "10px", // You can select border radius here
                  }}
                />
              ))}

              {extraImagesCount > 0 && (
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative h-[190px] w-full ">
                      <Image
                        src={isData[0].image}
                        alt={`Image 3`}
                        width={700}
                        height={500}
                        className="object-cover w-full h-full"
                        style={{
                          objectFit: "cover",
                          borderRadius: "10px", // You can select border radius here
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-2xl rounded-xl">
                        +{extraImagesCount}
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogPortal>
                    <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50" />
                    <DialogContent className="fixed top-1/2 left-1/2 w-11/12 max-w-3xl max-h-3/4 overflow-auto bg-white p-4 rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2">
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
            </div>
          </div>
          <div className="flex items-center justify-center pt-8">
            <div>
              <div className=" p-8">
                <h2 className="text-3xl font-bold mb-4">{isData[0].name}</h2>
                <p className="font-sans font-normal text-neutral-600  dark:text-neutral-300">
                  Bora,kungdi
                </p>
                <p className="text-green-600 font-semibold mb-4">$120.00/Night</p>

                <div className="mb-4">
                  <div className="space-x-2 space-y-2">
                    <Badge>nayan </Badge>
                    <Badge>nayan </Badge>
                    <Badge>nayan </Badge>
                    <Badge>nayan </Badge>
                    <Badge>nayan </Badge>
                    <Badge>nayan </Badge>
                    <Badge>nayan </Badge>
                    <Badge>nayan </Badge>
                    <Badge>nayan </Badge>
                    <Badge>nayan </Badge>
                    <Badge>nayan </Badge>
                    <Badge>nayan </Badge>
                  </div>
                </div>

                <div className="mb-4 border p-4 border-gray-300 rounded-2xl pt-4">
                  <h3 className="text-xl font-semibold mb-2">Overview</h3>
                  <p className="font-sans font-normal text-neutral-600  dark:text-neutral-300">
                    {isData[0].description}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="mb-4 border p-4 border-gray-300 rounded-2xl pt-4">
                <div className="flex items-center justify-center">
                  <div className="mr-5">
                    <TbRoad size={50} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">By Road</h3>
                    <p className="font-sans font-normal text-neutral-600  dark:text-neutral-300">
                      The nearest Airport to Purulia is Netaji Subhas Chandra Bose
                      International Airport, Kolkata which is about 250 km to Purulia.
                      From there, you can take bus or train to Purulia.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-4 border p-4 border-gray-300 rounded-2xl pt-4">
                <div className="flex items-center justify-center">
                  <div className="mr-5">
                    <TbTrain size={50} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">By Train</h3>
                    <p className="font-sans font-normal text-neutral-600  dark:text-neutral-300">
                      The nearest Airport to Purulia is Netaji Subhas Chandra Bose
                      International Airport, Kolkata which is about 250 km to Purulia.
                      From there, you can take bus or train to Purulia.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-4 border p-4 border-gray-300 rounded-2xl pt-4">
                <div className="flex items-center justify-center">
                  <div className="mr-5">
                    <TbPlaneInflight size={50} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">By Flight</h3>
                    <p className="font-sans font-normal text-neutral-600  dark:text-neutral-300">
                      The nearest Airport to Purulia is Netaji Subhas Chandra Bose
                      International Airport, Kolkata which is about 250 km to Purulia.
                      From there, you can take bus or train to Purulia.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold ">Locations</h3>
          <p className="font-sans font-normal text-neutral-600 dark:text-neutral-300">
            105km from Amsterdam, Calculate with a travel time of 1:30 h
          </p>
          <div className="mt-2 bg-black w-full h-48 rounded-xl">
            <iframe
              title="OpenStreetMap"
              width="600"
              height="450"
              className="w-full h-48 rounded-xl"
              loading="lazy"
              allowFullScreen
              src={mapSrc}></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
