function clock() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strTime = hours + ":" + minutes + " " + ampm;

  document.getElementById("clock").textContent = strTime;

  setTimeout(clock, 1000);
}
clock();

//function play() {
//document.getElementById("hat-id").addEventListener("click", () => {
//let myAudio = new Audio("real-jingle.mp3");
//myAudio.play();
//});
//}
//play();

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
    //let weatherOption = document.querySelector(".weatherCheckbox");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        long = position.coords.longitude;
        lat = position.coords.latitude;
        const api = `https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
        // const api2 = `http://api.weatherapi.com/v1/current.json?key=e0d6eaff354547fbb76235310222002&q=${lat},${long}&aqi=no`;
        fetch(api)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            // console.log(data);
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
      let currentIcon = icon.replace(/-/g, "_").toUpperCase();
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
      quote = `${data.content} -${data.author}`;
      document.getElementById("quoteblock").textContent = quote;
    });
}
quotes();

fetch(
  "https://api.unsplash.com/search/photos/?query=scenery&orientation=landscape&order_by=popular&per_page=20&client_id=WQeGSnwU4L1Z2bIRlSWOAlgazKegU7qG_lTbLcoJKMI"
)
  .then((response) => response.json())
  .then((data) => {
    let randNum = Math.floor(Math.random() * 20);
    let images = document.querySelector("#image");
    let credits = document.querySelector("#credits");
    images.appendChild(document.createElement("img")).src =
      data.results[randNum].urls.regular;

    let userLink = document.createElement("a");
    userLink.href = data.results[randNum].user.links.html;
    userLink.textContent = data.results[randNum].user.name;

    let unsplashLink = document.createElement("a");
    unsplashLink.href = "https://unsplash.com/";
    unsplashLink.textContent = "Unsplash";

    credits.appendChild(userLink);
    credits.appendChild(unsplashLink);
  });
