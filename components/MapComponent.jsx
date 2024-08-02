"use client";
import React, {useState, useEffect} from "react";
import {GoogleMap, LoadScript, Marker, InfoWindow} from "@react-google-maps/api";
import supabase from "@/config/supabaseClient";
import {useJsApiLoader} from "@react-google-maps/api";

const MapComponent = ({result, startLocation, hoveredPlace}) => {
  const {isLoaded} = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDbxdM_pA81YqlheJSleL2wG2-5-64j9NQ",
  });
  const data = result.visitedPlaces;
  const [mapCenter, setMapCenter] = useState({
    lat: data[0]?.latitude || 0,
    lng: data[0]?.longitude || 0,
  });
  const [activeMarker, setActiveMarker] = useState(null);

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

  useEffect(() => {
    if (hoveredPlace) {
      setActiveMarker(hoveredPlace.id);
    } else {
      setActiveMarker(null);
    }
  }, [hoveredPlace]);
  const customMarkerIcon = {
    url: "/mapMarker.png",
    scaledSize: isLoaded ? new window.google.maps.Size(40, 40) : null,
    // scaledSize: new window.google.maps.Size(40, 40), // Size of the marker
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
                  pixelOffset: isLoaded && new window.google.maps.Size(0, -30),
                }}>
                <div
                  style={customInfoWindowStyle}
                  className="font-DMSans font-bold text-xl tracking-tighter text-slate-900">
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
