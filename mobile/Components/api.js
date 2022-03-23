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

const searchLocation = async (text) => {
  axios
    .request({
      method: "get",
      url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Manchester&types=geocode&key=${key}`,
    })
    .then((response) => {
      response.data.predictions.forEach((suggestion) => {
        console.log(suggestion.description);
      });
    })
    .catch((e) => {
      console.log(e.response);
    });
};

export default searchLocation;
