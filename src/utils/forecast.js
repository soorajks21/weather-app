const request = require("request");

const forecast = (lat, long, callback) => {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    long +
    "&appid=22395f4c7d0141fcbfe52695d591b7c8";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to fetch the request", undefined);
    } else if (body.cod == "404") {
      callback("unable to find the location", undefined);
    } else {
      callback(undefined, body.weather[0]);
    }
  });
};

module.exports = forecast;
