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

function formatDay (timestamp) {
let date = new Date(timestamp * 1000);

 let days = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",]

let day = days[date.getDay()];
return day
}


function displayForcast (response){
  let forcast = response.data.daily;
  let forcastElement = document.querySelector(".weekForcast");
  
  let forcastHTML = `<div class="row">`;
 
  forcast.forEach(function(forcastDay, index) {
    if (index < 6) {
     forcastHTML =
       forcastHTML +
       `<div class="col-2">
    <div class="day">${formatDay(forcastDay.dt)}</div> 
      <img class = "fIcons" src="http://openweathermap.org/img/wn/${
        forcastDay.weather[0].icon}@2x.png" alt="cloudy" />
    <div class="temp"> <span class="low">${Math.round(
      forcastDay.temp.min
    )}</span>°/ <span class="high"> ${Math.round(
         forcastDay.temp.max
       )}</span>°</div>
  `;
   forcastHTML = forcastHTML + `</div>`;
    }
  })
  
  forcastElement.innerHTML = forcastHTML;
}

function getForcast (coords){
  console.log(coords);
  let apiKey = `8ca7dd4e61360b90fb66918853670e48`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=hourly,minutely&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForcast);
};

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

  getForcast(response.data.coord);
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

search("New York City");