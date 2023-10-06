let apiKey = "b35c686ba9565ba0ab254c2230937552";

let currentCityTemperature = document.querySelector(
  "#current_temperature_number",
);
let temperature = document.querySelector("#temperature_number");

// Update date and time
let curretTime = document.querySelector("#current_time_text");

function formatDate(newDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[newDate.getDay()];

  let hour = newDate.getHours();
  let minute = newDate.getMinutes();

  return `${day} ${hour}:${minute}`;
}

curretTime.innerHTML = formatDate(new Date());

// Get current temperature
function currentWeather(response) {
  let currentCityElement = document.querySelector("#current_city");
  let currentIconElement = document.querySelector("#current_icon");
  let currentTemperature = document.querySelector("#current_temperature");
  let currentUnit = document.querySelector("#current_unit");

  let temperature = Math.round(response.data.main.temp);

  currentCity = response.data.name;

  let cityElement = document.querySelector("#city_choose");

  console.log(response);

  currentCityElement.innerHTML = response.data.name;
  currentTemperature.innerHTML = temperature;
  cityElement.innerHTML = response.data.name;

  if (unit === "metric") currentUnit.innerHTML = " °C";
  else if (unit === "imperial") currentUnit.innerHTML = " °F";

  currentIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
  );
  currentIconElement.setAttribute("alt", response.data.weather[0].description);

  changeWeatherInformations(response);
}

// Get current location
function getUrlPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;

  axios.get(url).then(currentWeather);
}

navigator.geolocation.getCurrentPosition(getUrlPosition);

// Get current city weather informations
function searchCurrentCity(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(getUrlPosition);
}

let currentButton = document.querySelector("#button_current");
currentButton.addEventListener("click", searchCurrentCity);

// Get seached city weather informations
function changeWeatherInformations(response) {
  let temperatureElement = document.querySelector("#temperature_number");

  let iconElement = document.querySelector("#icon");

  let weatherDescription = document.querySelector("#weather_description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let windUnitElement = document.querySelector("#wind_unit");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  weatherDescription.innerHTML =
    response.data.weather[0].description[0].toUpperCase() +
    response.data.weather[0].description.substring(1);
  humidity.innerHTML = response.data.main.humidity;

  if (unit === "metric") {
    wind.innerHTML = Math.round(response.data.wind.speed * 3.6);
    windUnitElement.innerHTML = "km/h";
  } else if (unit === "imperial") {
    wind.innerHTML = Math.round(response.data.wind.speed);
    windUnitElement.innerHTML = "mi/h";
  }

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

// Default city
function defaultCity() {
  let cityElement = document.querySelector("#city_choose");

  let url = `https://api.openweathermap.org/data/2.5/weather?q=caucaia&appid=${apiKey}&units=${unit}`;

  cityElement.innerHTML = "Caucaia";

  axios.get(url).then(changeWeatherInformations);
  axios.get(url).then(currentWeather);
}

function searchCityByName(cityName) {
  let cityElement = document.querySelector("#city_choose");
  let city = cityName.trim()[0].toUpperCase() + cityName.trim().substring(1);

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  cityElement.innerHTML = city;

  axios.get(url).then(changeWeatherInformations);
}

// Update city name
function changeCity(event) {
  event.preventDefault();

  let newCity = document.querySelector("#new_city").value;
  searchedCity = document.querySelector("#new_city").value;

  let cityElement = document.querySelector("#city_choose");
  let city = newCity.trim()[0].toUpperCase() + newCity.trim().substring(1);

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  cityElement.innerHTML = city;

  axios.get(url).then(changeWeatherInformations);
}

let inputCity = document.querySelector("#input_city");
inputCity.addEventListener("submit", changeCity);

// Display Units of Temperature
function displayFahrenheitTemperature(event) {
  event.preventDefault();

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  unit = "imperial";

  defaultCity();
  if (searchedCity !== null) searchCityByName(searchedCity);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();

  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");

  unit = "metric";
  defaultCity();
  if (searchedCity !== null) searchCityByName(searchedCity);
}

let currentCity = null;
let searchedCity = null;
let unit = "metric";
let windUnit = "km/h";

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

defaultCity();
displayForecast();
