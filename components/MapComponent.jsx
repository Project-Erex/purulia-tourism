"use client";
import React, {useState, useEffect} from "react";
import {GoogleMap, LoadScript, Marker, InfoWindow} from "@react-google-maps/api";
import supabase from "@/config/supabaseClient";

const MapComponent = ({result, startLocation, hoveredPlace}) => {
  const data = result.visitedPlaces;
  const [mapCenter, setMapCenter] = useState({
    lat: data[0]?.latitude || 0,
    lng: data[0]?.longitude || 0,
  });
  const [activeMarker, setActiveMarker] = useState(null); // State to track the active marker

  const containerStyle = {
    width: "100%",
    height: "80%",
    borderRadius: "10px",
    overflow: "hidden",
  };

  const customInfoWindowStyle = {
    background: "white",
    borderRadius: "10px",
    padding: "10px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
  };

  // Update the activeMarker when hoveredPlace from props changes
  useEffect(() => {
    if (hoveredPlace) {
      setActiveMarker(hoveredPlace.id);
    } else {
      setActiveMarker(null);
    }
  }, [hoveredPlace]);
  const customMarkerIcon = {
    url: "/mapMarker.png", // Path to your local marker image
    scaledSize: new window.google.maps.Size(40, 40), // Size of the marker
  };
  return (
    <LoadScript googleMapsApiKey="AIzaSyDbxdM_pA81YqlheJSleL2wG2-5-64j9NQ">
      <GoogleMap mapContainerStyle={containerStyle} zoom={12} center={mapCenter}>
        {data.map((place, index) => (
          <Marker
            key={place.id}
            position={{lat: parseFloat(place.latitude), lng: parseFloat(place.longitude)}}
            label={{
              text: (index + 1).toString(),
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
            }}
            title={place.name}
            icon={customMarkerIcon}
            onMouseOver={() => setActiveMarker(place.id)}
            onMouseOut={() => setActiveMarker(null)}>
            {activeMarker === place.id && (
              <InfoWindow
                position={{
                  lat: parseFloat(place.latitude),
                  lng: parseFloat(place.longitude),
                }}
                options={{
                  pixelOffset: new window.google.maps.Size(0, -30),
                }}>
                <div
                  style={customInfoWindowStyle}
                  className="font-DMSans font-bold text-xl tracking-tighter">
                  {place.name}
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;

// "use client";
// import React, {useState, useMemo, useEffect} from "react";
// import {GoogleMap, LoadScript, Marker, InfoWindow} from "@react-google-maps/api";
// import supabase from "@/config/supabaseClient";

// const MapComponent = ({result, startLocation}) => {
//   const data = result.visitedPlaces;
//   const [locations, setLocations] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [mapCenter, setMapCenter] = useState({
//     lat: data[0]?.latitude || 0,
//     lng: data[0]?.longitude || 0,
//   });
//   const [hoveredMarker, setHoveredMarker] = useState(null);

//   useEffect(() => {
//     const fetchStartingPoint = async () => {
//       try {
//         const {data: locations, error} = await supabase
//           .from("starting_locations")
//           .select("*");

//         if (error) {
//           throw error;
//         }

//         setLocations(locations || []);
//         setIsLoading(false);

//         // Filter the locations array to find the matching startLocation
//         const startingPoint = locations.find(
//           (location) => location.name.toLowerCase() === startLocation.toLowerCase(),
//         );

//         if (startingPoint) {
//           setMapCenter({
//             lat: parseFloat(startingPoint.latitude),
//             lng: parseFloat(startingPoint.longitude),
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching starting points:", error.message);
//       }
//     };

//     fetchStartingPoint();
//   }, [startLocation]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }
//   const containerStyle = {
//     width: "100%",
//     borderWidth: "2px",
//     borderColor: "red",
//     height: "500px",
//     borderRadius: "15px",
//     overflow: "hidden",
//   };
//   return (
//     <LoadScript googleMapsApiKey="AIzaSyDbxdM_pA81YqlheJSleL2wG2-5-64j9NQ">
//       <GoogleMap mapContainerStyle={containerStyle} zoom={12} center={mapCenter}>
//         {data.map((place) => (
//           <Marker
//             key={place.id}
//             position={{lat: parseFloat(place.latitude), lng: parseFloat(place.longitude)}}
//             title={place.name}
//             onMouseOver={() => setHoveredMarker(place.id)}
//             onMouseOut={() => setHoveredMarker(null)}>
//             {hoveredMarker === place.id && (
//               <InfoWindow
//                 position={{
//                   lat: parseFloat(place.latitude),
//                   lng: parseFloat(place.longitude),
//                 }}>
//                 <div>{place.name}</div>
//               </InfoWindow>
//             )}
//           </Marker>
//         ))}
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default MapComponent;
