const axios = require("axios");
const key = "AIzaSyB9qaNzvpNBy-fFRSdbm7FEUHgkVEhvmvw";

const fetchGeoCode = async () => {
  const address = "10 teably avenue";
  const city = "Manchester";
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${
    address + city
  }&key=${key}`;

  const position = await axios.get(url);
  return position.data;
};

export default fetchGeoCode;
