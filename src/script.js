const apiKey = "cc927259dd293f79531abf4c09787aca";
const unit = "metric";

function titleCase(str) {
  return str
    .split(" ")
    .map(function (word) {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(" ");
}

function setWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureDisplay = document.querySelector("#current-temperature");
  temperatureDisplay.innerText = temperature;

  let summary = response.data.weather[0].description;
  let weather = document.querySelector("#current-weather");
  weather.innerText = titleCase(summary);

  let city = response.data.name;
  let locationHeader = document.querySelector("#city-name");
  locationHeader.innerHTML = titleCase(city);
}

// Update weather from search
function searchLocation(event) {
  event.preventDefault();
  let city = document.querySelector("#location-input").value;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  console.log("Querying weather API...");
  axios.get(apiURL).then(setWeather);
}

// Update weather from current location
function useCurrentLocation() {
  console.log("Getting current location...");
  navigator.geolocation.getCurrentPosition(setCurrentLocation);
}

function setCurrentLocation(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  console.log("Querying weather API...");
  axios.get(apiURL).then(setWeather);
}

function getDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let now = new Date();
  let day = days[now.getDay()];
  let hour = now.getHours().toString().padStart(2, "0");
  let minute = now.getMinutes().toString().padStart(2, "0");

  return `${day} ${hour}:${minute}`;
}

function switchUnit(event) {
  let currentTemp = document.querySelector("#current-temperature");
  let unit = event.target.innerText;

  if (unit === "Celsius") {
    event.target.innerText = "Fahrenheit";
    currentTemp.innerText = "27°c";
  } else {
    event.target.innerText = "Celsius";
    currentTemp.innerText = "80°f";
  }
}

let dateTime = document.querySelector("#date");
dateTime.innerHTML = getDate();

let locationSearch = document.querySelector("#location-form");
locationSearch.addEventListener("submit", searchLocation);

let unitButton = document.querySelector("#unit-button");
unitButton.addEventListener("click", switchUnit);

let currentLocation = document.querySelector("#use-current-location");
currentLocation.addEventListener("click", useCurrentLocation);
