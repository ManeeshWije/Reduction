function clock() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;

    document.getElementById('clock').textContent = strTime;

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
    window.addEventListener('load', () => {
        let long;
        let lat;
        let temperatureDescription = document.querySelector(
            '.temperature-description'
        );
        let temperatureDegree = document.querySelector('.temperature-degree');
        let locationTimezone = document.querySelector('.location-timezone');
        let temperatureSection = document.querySelector('.degree-section');
        let temperatureSpan = document.querySelector('.temperature span');
        //let weatherOption = document.querySelector(".weatherCheckbox");

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                long = position.coords.longitude;
                lat = position.coords.latitude;
                const api = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${long}?key=${WEATHER_API_KEY}`;
                fetch(api)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        const { temp, conditions, icon } =
                            data.currentConditions;

                        let tempC = (temp - 32) * (5 / 9);

                        temperatureDegree.textContent = Math.floor(tempC);
                        temperatureSpan.textContent = '°C';
                        temperatureDescription.textContent = conditions;
                        locationTimezone.textContent = data.timezone;

                        setIcons(icon, document.querySelector('.icon'));

                        temperatureSection.addEventListener('click', () => {
                            if (temperatureSpan.textContent === '°C') {
                                temperatureSpan.textContent = '°F';
                                temperatureDegree.textContent = temp;
                            } else if (temperatureSpan.textContent === '°F') {
                                temperatureSpan.textContent = '°C';
                                temperatureDegree.textContent =
                                    Math.floor(tempC);
                            }
                        });
                    });
            });
        }
        function setIcons(icon, iconID) {
            const skycons = new Skycons({ color: 'white' });
            let currentIcon = icon.replace(/-/g, '_').toUpperCase();
            skycons.play();
            return skycons.set(iconID, Skycons[currentIcon]);
        }
    });
}
weather();

let quote;
function quotes() {
    fetch('https://api.quotable.io/random')
        .then((response) => response.json())
        .then((data) => {
            quote = `${data.content} -${data.author}`;
            document.getElementById('quoteblock').textContent = quote;
        });
}
quotes();

fetch(
    'https://api.unsplash.com/search/photos/?query=landscapes&orientation=landscape&order_by=popular&per_page=20&client_id=WQeGSnwU4L1Z2bIRlSWOAlgazKegU7qG_lTbLcoJKMI'
)
    .then((response) => response.json())
    .then((data) => {
        let randNum = Math.floor(Math.random() * 20);
        let images = document.querySelector('#image');
        let credits = document.querySelector('#credits');
        images.appendChild(document.createElement('img')).src =
            data.results[randNum].urls.regular;

        let userLink = document.createElement('a');
        userLink.href = data.results[randNum].user.links.html;
        userLink.textContent = data.results[randNum].user.name;

        let unsplashLink = document.createElement('a');
        unsplashLink.href = 'https://unsplash.com/';
        unsplashLink.textContent = 'Unsplash';

        credits.appendChild(userLink);
        credits.appendChild(unsplashLink);
    });
