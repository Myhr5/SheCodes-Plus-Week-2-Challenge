let weather = {
  lisbon: {
    temp: 14,
    humidity: 28,
  },
  paris: {
    temp: -10,
    humidity: 20,
  },
  sydney: {
    temp: 17.3,
    humidity: 50,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  fortaleza: {
    temp: 26,
    humidity: 89,
  },
};

function convertTemp(temp) {
  return temp * 1.8 + 32;
}

function lookForCity(city) {
  let find = false;

  for (const key in weather) {
    if (key === city) {
      find = true;
      let cityWeather = weather[key];

      let f = convertTemp(cityWeather.temp);
      f = Math.round(f);

      return alert(
        `It is currently ${cityWeather.temp}°C (${f}°F) in Paris with a humidity of ${cityWeather.humidity}%`
      );
    }
  }

  if (!find) {
    alert(
      `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
    );
  }
}

let city = prompt("Enter a city: ");
lookForCity(city.toLowerCase().trim());
