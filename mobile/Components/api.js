const axios = require("axios");
const key = "AIzaSyB9qaNzvpNBy-fFRSdbm7FEUHgkVEhvmvw";

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
