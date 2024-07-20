"use client";
import {useState} from "react";
import {CardWithForm} from "../../components/CardWithForm";
import {CalenderComponent} from "@/components/CalenderComponent";

export default function Iitinerary() {
  const [data, setdata] = useState([]);
  console.log("d;lfmldsnnklnnlknsn", data);
  return (
    <div>
      <div className="flex pt-24  max-w-7xl justify-center items-center mx-auto">
        <CardWithForm setdata={setdata} />
      </div>
      <CalenderComponent />
      <div className=" max-w-7xl justify-center items-center mx-auto">
        {data.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-bold">Nearby Destinations</h2>
            <ul className="list-disc list-inside">
              {data.map((destination) => (
                <li key={destination.name}>{destination.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
