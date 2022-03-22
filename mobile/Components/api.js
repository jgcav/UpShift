const axios = require("axios");
const key = "AIzaSyB9qaNzvpNBy-fFRSdbm7FEUHgkVEhvmvw";
export const fetchgeoCode = () => {
  const address = "1 Hardman St";
  const city = "Manchester";
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${
    address + city
  }&key=${key}`;
  axios
    .get(url)
    .then((res) => res.data)
    .then((test) => {
      console.log(test);
    });
};
