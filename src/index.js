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
}

let inputCity = document.querySelector("#input_city");
inputCity.addEventListener("submit", changeCity);

