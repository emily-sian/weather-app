function titleCase(str) {
  return str
    .split(" ")
    .map(function (word) {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(" ");
}

function setWeather(response) {
  let temperatureDisplay = document.querySelector("#current-temperature");
  currentTempInCelsius = response.data.main.temp;
  temperatureDisplay.innerText = Math.round(currentTempInCelsius);

  let weather = document.querySelector("#current-weather");
  weather.innerText = titleCase(response.data.weather[0].description);

  let locationHeader = document.querySelector("#city-name");
  locationHeader.innerHTML = titleCase(response.data.name);

  let humidity = document.querySelector("#humidity");
  humidity.innerText = response.data.main.humidity;

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerText = response.data.wind.speed;

  let dateTime = document.querySelector("#date-time");
  dateTime.innerHTML = formatDate(response.data.dt * 1000);

  let currentWeatherIcon = document.querySelector("#current-weather-icon");
  currentWeatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

// Update weather from current location
function onCurrentCityClick() {
  console.log("Getting current location...");
  navigator.geolocation.getCurrentPosition(setCurrentCity);
}

function setCurrentCity(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  console.log("Querying weather API...");
  axios.get(apiURL).then(setWeather);
}

function formatDate(timestamp) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let date = new Date(timestamp);
  let day = days[date.getDay()];
  let hour = date.getHours().toString().padStart(2, "0");
  let minute = date.getMinutes().toString().padStart(2, "0");

  return `${day} ${hour}:${minute}`;
}

function getCityWeather(city) {
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  console.log("Querying weather API...");
  axios.get(apiURL).then(setWeather);
}

function onSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#location-input").value;
  getCityWeather(city);
}

function onCelsiusClick(event) {
  event.preventDefault();
  farenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureDisplay = document.querySelector("#current-temperature");
  temperatureDisplay.innerText = Math.round(currentTempInCelsius);
}

function onFarenheitClick(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  currentTempInFarenheit = (currentTempInCelsius * 9) / 5 + 32;
  let temperatureDisplay = document.querySelector("#current-temperature");
  temperatureDisplay.innerText = Math.round(currentTempInFarenheit);
}

const apiKey = "cc927259dd293f79531abf4c09787aca";
const unit = "metric";
const defaultCity = "New York";

let currentTempInCelsius;

getCityWeather(defaultCity);

let locationSearch = document.querySelector("#location-form");
locationSearch.addEventListener("submit", onSubmit);

let currentCity = document.querySelector("#current-city-btn");
currentCity.addEventListener("click", onCurrentCityClick);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", onCelsiusClick);

let farenheitLink = document.querySelector("#farenheit");
farenheitLink.addEventListener("click", onFarenheitClick);
