const axios = require("axios");

const key = "AIzaSyB9qaNzvpNBy-fFRSdbm7FEUHgkVEhvmvw";
const fetchGeoCode = () => {
  const address = "10 teably avenue";
  const city = "Manchester";
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${
    address + city
  }&key=${key}`;
  axios
    .get(url)
    .then((res) => res.data)
    .then((json) => {
      if (json.results.length === 0) {
        return null;
      }

      const lat = json.results[0].geometry.location.lat;
      const lng = json.results[0].geometry.location.lng;

      return { lat: lat, lng: lng };
    })
    .then((response) => response.data);
};

export default fetchGeoCode;
