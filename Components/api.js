const axios = require("axios");

import { key } from "../config/gMapKey";

export const fetchLatLng = async (place_id) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${place_id}&key=${key}`;
  const latLng = await axios.get(url);
  return latLng.data.results[0].geometry.location;
};

export const searchLocation = async (text) => {
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&components=country:GB&key=${key}`;
  const suggestions = await axios.get(url);
  return suggestions.data.predictions;
};

export const snapToRoad = async (points) => {
  console.log(points);
  const url = `https://roads.googleapis.com/v1/snapToRoads?path=${points}&interpolate=true&key=${key}`;
  try {
    const newPoints = await axios.get(url);
    return newPoints.data.snappedPoints;
  } catch (e) {
    console.log(e);
  }
};
