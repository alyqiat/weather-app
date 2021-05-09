function formatDay(date) {
  let days = ["Sun",
              "Mon",
              "Tue",
              "Wed",
              "Thu",
              "Fri",
              "Sat"]

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
  console.log(response);
  let temperature = document.querySelector("#temperature-number");
  let low = document.querySelector("#todays-low");
  let high = document.querySelector("#todays-high");
  let todaysWeatherIcon = document.querySelector("#todays-weather-icon");
  let iconCode = response.data.weather[0].icon;
  let iconAlt = response.data.weather[0].description;
  let icon = `http://openweathermap.org/img/wn/${iconCode}@2x.png`
  temperature.innerHTML = Math.round(response.data.main.temp);
  low.innerHTML = Math.round(response.data.main.temp_min);
  high.innerHTML = Math.round(response.data.main.temp_max);
  todaysWeatherIcon.setAttribute("src", icon);
  todaysWeatherIcon.setAttribute("alt", iconAlt);

}

function showCityName(response) {
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name;

}

function selectWeatherIcon(response) {
  let description = document.querySelector("#weather-description");
  let icon = document.querySelector("#todays-weather-icon");

  description.innerHTML = response.data.weather[0].description;
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let time = formatTime(date);
  
  return time;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiKey = "ae232cb6b9d287ad9e266187fb847629";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  console.log(apiUrl);

  axios.get(apiUrl).then(displayForecast);
}

function updateDetail(response) {
  let sunrise = document.querySelector("#sunrise");
  let sunset = document.querySelector("#sunset");
  let chanceOfRain = document.querySelector("#chance-of-rain");
  let visibility = document.querySelector("#visibility");
  let windspeed = document.querySelector("#windspeed");
  let windDirection = document.querySelector("#wind-direction");
  let feelsLike = document.querySelector("#feels-like");
  let precipitation = document.querySelector("#precipitation");
  let pressure = document.querySelector("#pressure");
  let humidity = document.querySelector("#humidity");
  let uvIndex = document.querySelector("#uv-index");

  let sunriseDate =  formatDate(response.data.sys.sunrise * 1000);
  let sunsetDate =  formatDate(response.data.sys.sunset * 1000);

   sunrise.innerHTML = sunriseDate;
   sunset.innerHTML = sunsetDate;
  // chanceOfRain.innerHTML = Math.round(response.data.main.temp_min);
  humidity.innerHTML = Math.round(response.data.main.humidity);
  windspeed.innerHTML = Math.round(response.data.wind.speed);
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  // precipitation.innerHTML = Math.round(response.data.main.temp_max);
  pressure.innerHTML = Math.round(response.data.main.pressure);
  visibility.innerHTML = Math.round(response.data.main.temp_min);
  uvIndex.innerHTML = Math.round(response.data.main.temp_max);

  getForecast(response.data.coord);
}

function search(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-text-input");
    let currentCity = document.querySelector("#current-city");
    console.log(searchInput.value);

    // Week 5 homework task

    if(searchInput.value) {   
      let apiKey = "ae232cb6b9d287ad9e266187fb847629"; // get from https://home.openweathermap.org/api_keys
      let city = searchInput.value;
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`; // from https://openweathermap.org/current

      axios.get(apiUrl).then(showCityName);
      axios.get(apiUrl).then(showTemperature);
      axios.get(apiUrl).then(selectWeatherIcon);
      axios.get(apiUrl).then(updateDetail);
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

function getCurrentUnit() {
  if(units == "metric") {
     
  }
}

function convertUnit(event) {
  event.preventDefault();
  let currentUnit = document.querySelector("#temperature-unit");
  let temperature = document.querySelector("#temperature-number");
  // let windUnit = document.querySelector();

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
// let unitToggle = document.querySelector("#unit-switch");
// unitToggle.addEventListener("click", convertUnit)

// Week 5 homework - Current location
function getWeatherAtCurrentPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let units = "metric";

    let apiKey = "ae232cb6b9d287ad9e266187fb847629";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`
    
    axios.get(apiUrl).then(showCityName);
    axios.get(apiUrl).then(showTemperature);
    axios.get(apiUrl).then(selectWeatherIcon);
    axios.get(apiUrl).then(updateDetail);
}

function getCurrentLocationData(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getWeatherAtCurrentPosition);

  let searchInput = document.querySelector("#search-text-input");
  searchInput.value = "";

}

function changeUnits(event) {

}

function initializePage(event) {
  event.preventDefault();
      let apiKey = "ae232cb6b9d287ad9e266187fb847629"; // get from https://home.openweathermap.org/api_keys
      let city = "Auckland";
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`; // from https://openweathermap.org/current

      axios.get(apiUrl).then(showCityName);
      axios.get(apiUrl).then(showTemperature);
      axios.get(apiUrl).then(selectWeatherIcon);
      axios.get(apiUrl).then(updateDetail);
}

// function displayFarenheitTemperature(event) {
//   event.preventDefault;
  

// }

window.addEventListener('load', initializePage)

let units = "metric";

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocationData);

// let farenheitLink = document.querySelector("#farenheit-link")
// farenheitLink.addEventListener("click", displayFarenheitTemperature)

// let unitToggle = document.getElementById('form-check-input');
// console.log(unitToggle.value);

// function changeUnits() {
//   var toggle = document.getElementById('unit-toggle')

//   if(toggle.checked != true) {
//     alert("not true")
//   }
// }


function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#future-weather")

  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"]

  forecast.forEach(function (forecastDay, index) {
    if(index < 6) {
      let iconCode = forecastDay.weather[0].icon;
      let max = Math.round(forecastDay.temp.max);
      let min = Math.round(forecastDay.temp.min);
      let day = new Date(forecastDay.dt * 1000)

      forecastHTML += ` 
        <div class="col-2">
          <div class="card" style="width: 7rem">
            <div class="card-body">
              <h9 class="future-day">${formatDay(day)}</h9>                                        
              <img id="todays-weather-icon" src="http://openweathermap.org/img/wn/${iconCode}@2x.png" alt="sunny">
              <h9 class="future-temps">
                  <span class="weather-forecast-max"><span id="forecast-max-number">${max}</span>°</span>
                  <span class="weather-forecast-min"><span id="forecast-min-number">${min}</span>°</span>
              </h9>
            </div>
          </div>
        </div>
      `;
    }
      })
    
    forecastHTML += `</div>`;
  
    forecastElement.innerHTML = forecastHTML;
   
}
