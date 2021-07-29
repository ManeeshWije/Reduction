let clock = () => {
  let date = new Date();
  let hrs = date.getHours();
  let mins = date.getMinutes();
  let secs = date.getSeconds();
  let period = " AM";
  if (hrs == 0) {
    hrs = 12;
  } else if (hrs >= 12) {
    hrs = hrs - 12;
    period = " PM";
  }
  hrs = hrs < 10 ? "0" + hrs : hrs;
  mins = mins < 10 ? "0" + mins : mins;
  secs = secs < 10 ? "0" + secs : secs;

  let time = `${hrs}:${mins}:${secs}${period}`;
  let time1 = `${hrs}:${mins}${period}`;
  let TIME = document.querySelector(".time");

  document.getElementById("clock").innerText = time1;
  setTimeout(clock, 1000);
};
clock();

function weather() {
  window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(
      ".temperature-description"
    );
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".degree-section");
    let temperatureSpan = document.querySelector(".temperature span");
    let weatherOption = document.querySelector(".weatherCheckbox");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        long = position.coords.longitude;
        lat = position.coords.latitude;
        const api = `https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
        fetch(api)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            //console.log(data);
            const { temperature, summary, icon } = data.currently;
            let celsius = (temperature - 32) * (5 / 9);
            let fahrenheit = temperature * (9 / 5) + 32;

            temperatureDegree.textContent = Math.floor(celsius);
            temperatureSpan.textContent = "°C";
            temperatureDescription.textContent = summary;
            locationTimezone.textContent = data.timezone;

            setIcons(icon, document.querySelector(".icon"));

            temperatureSection.addEventListener("click", () => {
              if (temperatureSpan.textContent === "°C") {
                temperatureSpan.textContent = "°F";
                temperatureDegree.textContent = temperature;
              } else if (temperatureSpan.textContent === "°F") {
                temperatureSpan.textContent = "°C";
                temperatureDegree.textContent = Math.floor(celsius);
              }
            });
          });
      });
    }
    function setIcons(icon, iconID) {
      const skycons = new Skycons({ color: "white" });
      const currentIcon = icon.replace(/-/g, "_").toUpperCase();
      skycons.play();
      return skycons.set(iconID, Skycons[currentIcon]);
    }
  });
}
weather();

let quote;
function quotes() {
  fetch("https://api.quotable.io/random")
    .then((response) => response.json())
    .then((data) => {
      //console.log(`${data.content} —${data.author}`);
      quote = `${data.content} -${data.author}`;
      document.getElementById("quoteblock").innerHTML = quote;
    });
}
quotes();

var images = "";
var user = "";

fetch(
  "https://api.unsplash.com/search/photos/?query=landscape&orientation=landscape&order_by=relevant&client_id=WQeGSnwU4L1Z2bIRlSWOAlgazKegU7qG_lTbLcoJKMI"
)
  .then((response) => response.json())
  .then((data) => {
    var randNum = Math.floor(Math.random() * 10);
    images = $("#image").append(
      `<img src=${data.results[randNum].urls.regular}/>`
    );
    user = $("#credits").append(
      // `<h3>Photo Credits: ${data.results[randNum].user.name}</h3>
      `
<a href="${data.results[randNum].user.links.html}">${data.results[randNum].user.name}</a>
<a href="https://unsplash.com/">Unsplash</a>
`
    );
  });
