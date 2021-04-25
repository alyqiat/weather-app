function formatDay(date) {
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let dayWord = days[date.getDay()];

  let dayString = `${dayWord}`;
  return dayString;
}

function formatTime(date) {
  let timeString = date.toTimeString().substr(0,5);
  return timeString;
}

function setDate(date) {
  let day = formatDay(date);
  let time = formatTime(date);

  let displayedDate = document.querySelector("#todays-date");
  displayedDate.innerHTML = `${day} ${time}`
}

setDate(new Date());

function showTemperature(response) {
  let temperature = document.querySelector("#temperature-number");
  temperature.innerHTML = Math.round(response.data.main.temp);
}

function showCityName(response) {
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name;
}

function search(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-text-input");
    let currentCity = document.querySelector("#current-city");

    // Week 5 homework task

    if(searchInput.value) {   
      let apiKey = "ae232cb6b9d287ad9e266187fb847629"; // get from https://home.openweathermap.org/api_keys
      let city = searchInput.value;
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`; // from https://openweathermap.org/current

      axios.get(apiUrl).then(showCityName);
      axios.get(apiUrl).then(showTemperature);
    } else {
      currentCity.innerHTML = "Auckland";
      alert("Please enter a city");
      }

}

let citySearch = document.querySelector("#search-button");
citySearch.addEventListener("click", search);

function convertToFarenheit(temperature) {
  let temperatureInF = Math.round((temperature * 9/5) + 32);
  return temperatureInF;
}

function convertToCelcius(temperature) {
  let temperatureInC = Math.round((temperature - 32) * 5/9);
  return temperatureInC;
}

function convertUnit(event) {
  event.preventDefault();
  let currentUnit = document.querySelector("#temperature-unit");
  let temperature = document.querySelector("#temperature-number");
  let newUnit = currentUnit;
  let newTemperature = temperature;

  if(currentUnit.innerHTML === "°C") {
    newTemperature = `${convertToFarenheit(temperature.innerHTML)}`;
    newUnit = "°F";
  } else {
    newTemperature = `${convertToCelcius(temperature.innerHTML)}`;
    newUnit = "°C";
  }

  temperature.innerHTML = `${newTemperature}`;
  currentUnit.innerHTML = `${newUnit}`;
}

let temperature = document.querySelector("#todays-temperature");
temperature.addEventListener("click", convertUnit)

// Week 5 homework - Current location
function getWeatherAtCurrentPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let units = "metric";

    let apiKey = "ae232cb6b9d287ad9e266187fb847629";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`
    
    axios.get(apiUrl).then(showCityName);
    axios.get(apiUrl).then(showTemperature);

}

function getCurrentLocationData(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getWeatherAtCurrentPosition);

  let searchInput = document.querySelector("#search-text-input");
  console.log(searchInput);
  searchInput.value = "";
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocationData);


