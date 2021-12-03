function clock() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strTime = hours + ":" + minutes + " " + ampm;

  document.getElementById("clock").innerText = strTime;

  setTimeout(clock, 1000);
}
clock();

function play() {
  document.getElementById("hat-id").addEventListener("click", () => {
    let myAudio = new Audio("real-jingle.mp3");
    myAudio.play();
  });
}
play();

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

let images = "";
let user = "";

fetch(
  "https://api.unsplash.com/search/photos/?query=christmas&orientation=landscape&order_by=popular&per_page=20&client_id=WQeGSnwU4L1Z2bIRlSWOAlgazKegU7qG_lTbLcoJKMI"
)
  .then((response) => response.json())
  .then((data) => {
    let randNum = Math.floor(Math.random() * 20);
    //console.log(data);
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
