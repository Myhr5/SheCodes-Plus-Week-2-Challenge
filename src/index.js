let headerCities = ["Lisbon", "Paris", "Sydney", "San Francisco", "Fortaleza"];

let currentCityTemperature = document.querySelector(
  "#current_temperature_number"
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

// Update city name
function changeCity(event) {
  event.preventDefault();

  let newCity = document.querySelector("#new_city").value;
  let city = document.querySelector("#city_choose");

  let cityCorreted = (newCity.trim())[0].toUpperCase() + (newCity.trim()).substring(1);
  
  city.innerHTML = cityCorreted;
}

let inputCity = document.querySelector("#input_city");
inputCity.addEventListener("submit", changeCity);

// Get current temperature
function currentWeather (response){
  let currentCity = document.querySelector("#current_city");
  let temperature = Math.round(response.data.main.temp);

  let cityElement = document.querySelector("#city_choose");
  let temperatureElement = document.querySelector("#temperature_number");

  console.log((response.data.name), temperature);

  currentCity.innerHTML = `${response.data.name} ${temperature}°C`;
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = temperature;
  
 }

// Get current location
function getUrlPosition(position){
  let apiKey = "b35c686ba9565ba0ab254c2230937552";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(url).then(currentWeather);
}


navigator.geolocation.getCurrentPosition(getUrlPosition);

// Get current city weather informations
function searchCurrentCity (event){
  event.preventDefault();

 navigator.geolocation.getCurrentPosition(getUrlPosition);
}

let currentButton = document.querySelector("#button_current");
currentButton.addEventListener("click", searchCurrentCity);



