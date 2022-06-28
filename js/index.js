// Get The Time & Day

let now = new Date();
console.log(now);
let today = document.querySelector(".dateAndTime");

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
let minutes = now.getMinutes();

if (hour < 10) {
  hour = `0${hour}`;
}

if (minutes < 10) {
  minutes = `0${minutes}`;
}

today.innerHTML = `${weekday} ${hour}:${minutes}`;

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
  let temp = Math.round(response.data.main.temp);
  h1.innerHTML = response.data.name;
  mainTemp.innerHTML = temp;
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
  console.log(cWeatherUrl);
  let locationUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${apiKey}&units=${units}`;
  axios.get(cWeatherUrl).then(retrieveCTemp);
  axios.get(locationUrl).then(retrieveCityName);
}
function retrieveCTemp (response) {
  let main = document.querySelector(".mainTemp");
  main.innerHTML = Math.round(response.data.main.temp);
  console.log(response);
}

function retrieveCityName (response) {
let h1 = document.querySelector("#city-name");
let currentCityName = response.data[0].name;
h1.innerHTML = currentCityName;
}

search("New York City");