// "use client";
// import {useState, useEffect} from "react";
// import {CardWithForm} from "../../components/CardWithForm";
// import {CalenderComponent} from "@/components/CalenderComponent";
// import supabase from "@/config/supabaseClient";

// export default function Iitinerary() {
//   const [data, setdata] = useState([]);
//   const [dateNumber, setDateNumber] = useState(null);
//   const [isData, setIsData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         let {data: destinations, error} = await supabase
//           .from("destinations")
//           .select("stay_time, distance_from_purulia");

//         if (error) {
//           throw error;
//         }
//         setIsData(destinations || []);
//         console.log("INITIAL LOCATION", destinations);
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching starting locations:", error.message);
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);
//   return (
//     <div>
//       <div className="flex pt-24  max-w-7xl justify-center items-center mx-auto">
//         {/* <CardWithForm setdata={setdata} /> */}
//       </div>
//       {/* <div className=" max-w-7xl justify-center items-center mx-auto">
//         {data.length > 0 && (
//           <div className="mt-4">
//             <h2 className="text-lg font-bold">Nearby Destinations</h2>
//             <ul className="list-disc list-inside">
//               {data.map((destination) => (
//                 <li key={destination.name}>{destination.name}</li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div> */}
//       <CalenderComponent setDateNumber={setDateNumber} />
//     </div>
//   );
// }

"use client";
import {useState, useEffect} from "react";
import {CalenderComponent} from "@/components/CalenderComponent";
import supabase from "@/config/supabaseClient";

export default function Itinerary() {
  const [data, setData] = useState([]);
  const [dateNumber, setDateNumber] = useState(null);
  const [isData, setIsData] = useState([]);
  const [totalStayTime, setTotalStayTime] = useState(0);
  const [totalTravelTime, setTotalTravelTime] = useState(0);
  const [finalTime, setFinalTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const perDayTravelTime = 8 * 60; // 8 hours in minutes

  useEffect(() => {
    const fetchData = async () => {
      try {
        let {data: destinations, error} = await supabase
          .from("destinations")
          .select("stay_time, distance_from_purulia, name")
          .gte("distance_from_purulia", 10)
          .order("distance_from_purulia", {ascending: true});

        if (error) {
          throw error;
        }
        let accumulatedTime = 0;
        const filteredDestinations = [];

        for (const destination of destinations) {
          const stayTimeMinutes = destination.stay_time;
          const name = destination.name;
          const travelTimeMinutes = estimateTravelTimeInMinutes(
            destination.distance_from_purulia,
          );

          if (accumulatedTime + stayTimeMinutes + travelTimeMinutes <= perDayTravelTime) {
            filteredDestinations.push(destination);
            accumulatedTime += stayTimeMinutes + travelTimeMinutes;
          } else {
            break;
          }
        }

        // Calculate total times for filtered destinations
        const totalFilteredStayTimeMinutes = filteredDestinations.reduce(
          (acc, destination) => acc + destination.stay_time,
          0,
        );
        const totalFilteredTravelTimeMinutes = filteredDestinations.reduce(
          (acc, destination) =>
            acc + estimateTravelTimeInMinutes(destination.distance_from_purulia),
          0,
        );

        setIsData(filteredDestinations || []);
        setTotalStayTime(convertToHoursAndMinutes(totalFilteredStayTimeMinutes));
        setTotalTravelTime(convertToHoursAndMinutes(totalFilteredTravelTimeMinutes));
        setFinalTime(
          convertToHoursAndMinutes(
            totalFilteredStayTimeMinutes + totalFilteredTravelTimeMinutes,
          ),
        );
        console.log("INITIAL LOCATION", filteredDestinations);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching starting locations:", error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const convertToHoursAndMinutes = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const estimateTravelTime = (distance) => {
    const speed = 30; // assuming 30 km/h
    const hours = distance / speed;
    const minutes = (hours * 60).toFixed(0);
    return parseFloat(minutes);
  };

  const estimateTravelTimeInMinutes = (distance) => {
    return parseFloat(estimateTravelTime(distance));
  };

  return (
    <div>
      <div className="flex pt-24 max-w-7xl justify-center items-center mx-auto">
        {/* <CardWithForm setdata={setdata} /> */}
      </div>
      <div className="max-w-7xl justify-center items-center mx-auto">
        {isData.length > 0 && (
          <div className="mt-4">
            <h2 className="text-2xl font-bold">Nearby Destinations</h2>
            <ul className="list-disc list-inside">
              {isData.map((destination, index) => (
                <li key={index}>
                  <h1 className="text-lg font-bold">Name: {destination.name}</h1>
                  <p>Stay Time: {destination.stay_time}</p>
                  <p>Travel Time: {destination.travel_time}</p>
                  <p>Distance: {destination.distance_from_purulia} km</p>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <h2 className="text-xl font-bold">Total Times</h2>
              <p>Total Stay Time: {totalStayTime}</p>
              <p>Total Travel Time: {totalTravelTime}</p>
              <p>Combined Total Time (Stay + Travel): {finalTime}</p>
            </div>
          </div>
        )}
      </div>
      <CalenderComponent setDateNumber={setDateNumber} />
    </div>
  );
}
