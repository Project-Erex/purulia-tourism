"use client";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import {Badge} from "@/components/ui/badge";
import supabase from "@/config/supabaseClient";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {TbTrain, TbPlaneInflight, TbRoad} from "react-icons/tb";
import {} from "react-icons/tb";
import {AspectRatio} from "@/components/ui/aspect-ratio";

const images = [
  {
    src: "https://images.unsplash.com/photo-1464822759023c3b?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Cabin 1",
  },
  {
    src: "https://res.cloudinary.com/dzigf3fcv/image/upload/v172079/purulia-tourism/jvbus0srrdeb0jdrep8u.jpg",
    alt: "Cabin 2",
  },
  {
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?aurmat&fit=crop&q=80&w&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Cabin 3",
  },
  {
    src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=form&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Cabin 4",
  },
];

const Page = ({params}) => {
  const [mainImage, setMainImage] = useState(images[0]);
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
  return (
    <div className="min-h-screen pt-24 mb-10">
      <div className=" max-w-7xl mx-auto  mx-autoshadow-md overflow-hidden">
        <div className="">
          <AspectRatio ratio={16 / 6} className="bg-muted mb-5">
            <Image
              src={isData[0].image}
              alt={mainImage.alt}
              width={700}
              height={500}
              className="object-cover w-full h-full p-3"
              style={{
                objectFit: "cover",
                borderRadius: "30px", //👈 and here you can select border radius
              }}
            />
          </AspectRatio>

          <div className=" p-8">
            <h2 className="text-3xl font-bold mb-4">{isData[0].name}</h2>
            <p className="font-sans font-normal text-neutral-600  dark:text-neutral-300">
              Bora,kungdi
            </p>
            <p className="text-green-600 font-semibold mb-4">$120.00/Night</p>
            <div className="flex space-x-2 mt-2 p-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setMainImage(image)}
                  className="focus:outline-none">
                  <Image
                    src={isData[0].image}
                    alt={image.alt}
                    width={100}
                    height={100}
                    className={`object-cover w-20 h-20 rounded-lg ${
                      mainImage.src === image.src ? "ring-2 ring-green-500" : ""
                    }`}
                  />
                </button>
              ))}
            </div>
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
            <div className="mb-4 border p-4 border-gray-300 rounded-2xl pt-4">
              <div className="flex items-center justify-center">
                <div className="mr-5">
                  <TbRoad size={50} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">By Road</h3>
                  <p className="font-sans font-normal text-neutral-600  dark:text-neutral-300">
                    The nearest Airport to Purulia is Netaji Subhas Chandra Bose
                    International Airport, Kolkata which is about 250 km to Purulia. From
                    there, you can take bus or train to Purulia.
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
                    International Airport, Kolkata which is about 250 km to Purulia. From
                    there, you can take bus or train to Purulia.
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
                    International Airport, Kolkata which is about 250 km to Purulia. From
                    there, you can take bus or train to Purulia.
                  </p>
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
