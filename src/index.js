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

  let newCity = document.querySelector("#new_city");
  let city = document.querySelector("#city_choose");

  city.innerHTML = newCity.value.trim();

  if (temperature.innerHTML == 29) {
    temperature.innerHTML = 20;
  } else if (temperature.innerHTML == 84.2) {
    temperature.innerHTML = 68;
  }
}

let inputCity = document.querySelector("#input_city");
inputCity.addEventListener("submit", changeCity);

// Change temperature scale
let scale = document.querySelectorAll(".scale");

function changeToFahrenheit(event) {
  event.preventDefault();

  currentCityTemperature.innerHTML = 84.2;
  if (temperature.innerHTML == 29) {
    temperature.innerHTML = 84.2;
  } else if (temperature.innerHTML == 20) {
    temperature.innerHTML = 68;
  }

  scale[0].innerHTML = "F";
  scale[1].innerHTML = "F";
}

function changeToCelsius(event) {
  event.preventDefault();

  currentCityTemperature.innerHTML = 29;

  if (temperature.innerHTML == 84.2) {
    temperature.innerHTML = 29;
  } else if (temperature.innerHTML == 68) {
    temperature.innerHTML = 20;
  }

  scale[0].innerHTML = "C";
  scale[1].innerHTML = "C";
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeToFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeToCelsius);
