// Get The Time & Day

function getDayAndTime (timestamp) {
  let now = new Date(timestamp);
  let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekday = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
return `${weekday} ${hour}:${minutes}`;
}

// Code for Displaying the Forecast

function displayForcast (){
  let forcastElement = document.querySelector(".weekForcast");
  
  let forcastHTML = `<div class="row">`;
  let days = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];
  days.forEach(function(day) {
     forcastHTML = forcastHTML +
   `<div class="col-2">
    <div class="day">${day}</div>
      <img class = "icons" src="animated/cloudy.svg" alt="cloudy" />
    <div class="temp"> <span class="low">44</span>°/ <span class="high"> 58</span>°</div>
  `;
   forcastHTML = forcastHTML + `</div>`;
  })
  
  forcastElement.innerHTML = forcastHTML;
}



// Code for getting City Name

let city = document.querySelector("#city-name");

let searchForm = document.querySelector("#city-search");
searchForm.addEventListener("submit", changeCity);

function search (cityName) {
  let units = "imperial";
  let apiKey = "8ca7dd4e61360b90fb66918853670e48";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(updateInfo)
}

function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  search(cityInput);
}

function updateInfo (response) {
  let h1 = document.querySelector("h1");
  let mainTemp = document.querySelector(".mainTemp");
  let windSpeed = document.querySelector(".windSpeed");
  let todayLow = document.querySelector(".todayLow");
  let todayHigh = document.querySelector(".high");
  let description = document.querySelector(".todayWeather");
  let humidity = document.querySelector(".humidity");
  let dateTime = document.querySelector(".dateAndTime");
  let icons = document.querySelector(".icons");
  let feelLike = document.querySelector(".feelLike");
  
  fTemperature = response.data.main.temp;

 icons.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
 icons.setAttribute("alt", response.data.weather[0].main);
  dateTime.innerHTML = `Last Updated: ${getDayAndTime(response.data.dt * 1000)}`;
  windSpeed.innerHTML = `${Math.round(response.data.wind.speed)} mph`;
  todayLow.innerHTML = `${Math.round(response.data.main.temp_min)}°`;
  todayHigh.innerHTML = `${Math.round(response.data.main.temp_max)}°`;
  humidity.innerHTML = `${response.data.main.humidity}%`;
  description.innerHTML = response.data.weather[0].main;
  h1.innerHTML = response.data.name;
  mainTemp.innerHTML = Math.round(response.data.main.temp);
  feelLike.innerHTML = `${Math.round(response.data.main.feels_like)}°`;
  
}

// Code for Current Button

let currentButton = document.querySelector(".current");
currentButton.addEventListener("click", getCurrentInfo);

function getCurrentInfo (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

function getPosition (position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "imperial";
  let limit = 1;
  let apiKey = "8ca7dd4e61360b90fb66918853670e48";
  let cWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  let locationUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${apiKey}&units=${units}`;
  axios.get(cWeatherUrl).then(retrieveCTemp);
  axios.get(locationUrl).then(retrieveCityName);
}
function retrieveCTemp (response) {
  let main = document.querySelector(".mainTemp");
  main.innerHTML = Math.round(response.data.main.temp);
}

function retrieveCityName (response) {
let h1 = document.querySelector("#city-name");
let currentCityName = response.data[0].name;
h1.innerHTML = currentCityName;
}

// Code for converting Temperature

let fTemperature = null;

let fLink = document.querySelector(".fDegrees");
let cLink = document.querySelector(".cDegrees");

fLink.addEventListener("click", displayFTemp);
cLink.addEventListener("click", displayCTemp);


function displayCTemp (event) {
event.preventDefault();
let tempElement = document.querySelector(".mainTemp");
fLink.classList.remove("active");
cLink.classList.add("active");
let cTemp = (fTemperature - 32) * 5 / 9;
tempElement.innerHTML = Math.round(cTemp);
}

function displayFTemp (event) {
  event.preventDefault();
  let tempElement = document.querySelector(".mainTemp");
  tempElement.innerHTML = Math.round(fTemperature);
 fLink.classList.add("active");
 cLink.classList.remove("active");
  
}

search("New York City");
displayForcast();