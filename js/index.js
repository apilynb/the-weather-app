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

function getTime (sunTime) {
  let time = new Date (sunTime);
console.log(time);
  let hour = time.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  };

  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  };
  return `${hour}:${minutes}`;
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
  console.log(response);
  let mainTemp = document.querySelector(".mainTemp");
  let temp = Math.round(response.data.main.temp);
  let windSpeed = document.querySelector(".windSpeed");
  let todayLow = document.querySelector(".todayLow");
  let todayHigh = document.querySelector(".high");
  let description = document.querySelector(".todayWeather");
  let humidity = document.querySelector(".humidity");
  let dateTime = document.querySelector(".dateAndTime");
  let sunrise = document.querySelector(".sunriseTime");
  let sunset = document.querySelector(".sunsetTime");
  let iconId = response.data.weather[0].id;
  console.log(response.data.weather[0].id);
  updateIcons(response.data.weather[0].id);
  sunrise.innerHTML = `${getTime(response.data.sys.sunrise * 1000)}`;
  console.log(sunrise);
  sunset.innerHTML = `${getTime(response.data.sys.sunset * 1000)}`;
  dateTime.innerHTML = `Last Updated: ${getDayAndTime(response.data.dt * 1000)}`;
  windSpeed.innerHTML = `${Math.round(response.data.wind.speed)} mph`;
  todayLow.innerHTML = `${Math.round(response.data.main.temp_min)}°`;
  todayHigh.innerHTML = `${Math.round(response.data.main.temp_max)}°`;
  humidity.innerHTML = `${response.data.main.humidity}%`;
  description.innerHTML = response.data.weather[0].main;
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
  console.log(locationUrl);
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


function updateIcons (response) {
  let icons = document.querySelector(".icons");
  let image = response.data.weather[0].id;
  console.log(image);

// Weather Mains

let thunderstorm = [
200, 201, 202, 210, 211, 212, 221, 230, 231, 232
];

let drizzleFour =[
  300, 301, 302, 310, 311
];
let drizzleFive = [
  312, 313, 314, 321
];
let rainTwo = [
  500, 501, 521
];
let rainThree = [
502, 503, 521
];
let rainSix = [
  504, 511, 531, 522
];
let snowFour = [
  600, 612, 611, 620
];
let snowFive = [
  601, 613, 615, 616, 621
];
let snowSix = [
  602, 622
];
let clearDay = 800;


if (icons = thunderstorm) {
 image.setAttribute("src", animated/thunder.svg);
};
if (image = drizzleFour) {
   image.setAttribute("src", "animated/rainy-4.svg");
};
if (image = drizzleFive) {
   image.setAttribute("src", "animated/rainy-5.svg");
}
if (image = rainTwo) {
  image.setAttribute("src", "animated/rainy-2.svg");
}
if (image = rainThree) {
  image.setAttribute("src", "animated/rainy-3.svg");
}
if (image = rainSix) {
  image.setAttribute("src", "animated/rainy-6.svg");
}
if (image = snowFour) {
  image.setAttribute("src", "animated/snowy-4.svg");
}
if (image = snowFive) {
  image.setAttribute("src", "animated/snowy-5.svg");
}
if (image = snowSix) {
  image.setAttribute("src", "animated/snowy-6.svg");
}
if (image = clearDay) {
    image.setAttribute("src", "animated/day.svg");
}
if (image = 801) {
  image.setAttribute("src", "animated/cloudy-day-1.svg");
}
if (image = 802) {
    image.setAttribute("src", "animated/cloudy-day-2.svg");
}
if (image = 803) {
  image.setAttribute("src", "animated/cloudy-day-3.svg");
}
if (image = 804) {
  image.setAttribute("src", "animated/cloudy.svg");
}
}

