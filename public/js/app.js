console.log("client side javascript loaded");

// fetch("http://localhost:3000/weather?address=!").then((response) => {
//   response.json().then((data) => {
//     if (data.error) {
//       console.log(data.error);
//     } else {
//       console.log(data);
//     }
//   });
// });

// fetch(
//   "https://api.openweathermap.org/data/2.5/weather?lat=-79.3849&lon=43.6529&appid=22395f4c7d0141fcbfe52695d591b7c8"
// ).then((response) =>
//   response.json().then((data) => {
//     if (data.error) {
//       console.log(data);
//     } else {
//       console.log(data.weather[0].description);
//     }
//   })
// );

const weatherForm = document.querySelector("form");
const searchText = document.querySelector("input");

const messageOne = document.querySelector("#showData");
const messageTwo = document.querySelector("#error");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  messageOne.textContent = "Loading";
  messageTwo.textContent = "";
  fetch("/weather?address=" + searchText.value).then((response) => {
      response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        const temp = Math.round(data.forecast.temp - 273.15);

        messageTwo.textContent = data.location;
        document.getElementById("showData").innerHTML =
          temp + "<sup>o</sup>" + "C" + " " + data.forecast.weather;
      }
    });
  });
});
