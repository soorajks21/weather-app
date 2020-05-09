const request = require("request");
const geocoding = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?limit=2&access_token=pk.eyJ1Ijoic29vcmFqa3M3NyIsImEiOiJjazlyaXYydzcwa3JmM2xtcmk2aW5qbXg0In0.-NwOCZmb_PRKpTOuYRiNOg";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to fetch the request", undefined);
    } else if (body.features.length == 0) {
      callback("unable to find the location, Try another search", undefined);
    } else {
      console.log(body.features[0].center[0]);
      callback(undefined, {
        latitude: body.features[0].center[0],
        longititude: body.features[0].center[1],
        country: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocoding;
