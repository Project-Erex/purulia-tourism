// pages/api/distance.js

import axios from "axios";

export default async (req, res) => {
  const {origins, destinations} = req.query;

  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/distancematrix/json",
      {
        params: {
          units: "metric",
          origins,
          destinations,
          key: process.env.GOOGLE_MAPS_API_KEY, // Store your API key in an environment variable
        },
      },
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({error: "Error fetching data from Google Maps API"});
  }
};
