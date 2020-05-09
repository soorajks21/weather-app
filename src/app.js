const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const forecast = require("../src/utils/forecast");
const geocode = require("../src/utils/geocode");

console.log(__dirname);
console.log(__filename);

//Define path for express configure
const dirPathName = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//set up static directory to serve
app.use(express.static(dirPathName));

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Sooraj",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    helpText: "A Hand for you",
    title: "About Me",
    name: "Sooraj",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Sooraj",
  });
});

// app.get("", (req, res) => {
//   res.send("Hello sooraj");
// });

// app.get("/help", (req, res) => {
//   res.send({
//     name: "sooraj",
//     age: 27,
//   });
// });

// app.get("/about", (req, res) => {
//   res.send("<h1>About Page</h1>");
// });

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an adddress",
    });
  } else {
    geocode(
      req.query.address,
      (error, { latitude, longititude, country } = {}) => {
        if (error) {
          return res.send({
            error: error,
          });
        } else {
          forecast(latitude, longititude, (error, data) => {
            if (error) {
              res.send({
                error: error,
              });
            } else {
              console.log("data forecast" + data);
              res.send({
                forecast: data,
                location: country,
              });
            }
          });
          // res.send({
          //   latitude: latitude,
          //   longititude: longititude,
          // });
        }
      }
    );
  }
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Page Not Found",
  });
});

app.listen(3000, () => {
  console.log("server running on the port 30000");
});
