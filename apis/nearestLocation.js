// pages/api/distance.js

import axios from "axios";

export default async (req, res) => {
  const {origin, destination, waypoints} = req.query;

  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/directions/json",
      {
        params: {
          origin,
          destination,
          waypoints,
          mode: "driving",
          units: "metric",
          key: process.env.GOOGLE_MAPS_API_KEY,
        },
      },
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({error: "Error fetching data from Google Maps API"});
  }
};
