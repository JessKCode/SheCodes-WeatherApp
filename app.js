// clock
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let mark= `AM`;
  if (hours < 10) {
    hours= `0${hours}`;
  }
  if (hours >12){
    hours = `${hours - 12}`;
    mark = `PM`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thur",
    "Fri",
    "Sat",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes} ${mark}`;
}
function dayFormat (time){
  let date = new Date(time * 1000)
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
 return days[day];
}
//Display weather in top box
function showWeather(response) {
  let fahrenheit = response.data.main.temp;
  let temperature = Math.round(fahrenheit);
  let headTemp = `${temperature}°<small>F</small>`;
  let h2 = document.querySelector("h2");
  h2.innerHTML = headTemp;

  let maxTemp = response.data.main.temp_max;
  let minTemp = response.data.main.temp_min;
  let highLow = ` H:${Math.round(maxTemp)}° L:${Math.round(minTemp)}°`;
  let hl = document.querySelector(".topHighLow");
  hl.innerHTML = highLow;

  let time = document.querySelector(".time");
  time.innerHTML = `Last updated: ${formatDate(response.data.dt * 1000)}`;
  
  let description =(response.data.weather[0].description);
  let weatherDescription = document.querySelector(".weather-description");
  weatherDescription.innerHTML = `Description: ${description}`;

  let mph = response.data.wind.speed;
  let windSpeed = Math.round(mph);
  let speed = document.querySelector(".wind");
  speed.innerHTML = `Wind Speed: ${windSpeed} mph`;
    
  let humidity =(response.data.main.humidity);
  let humid = document.querySelector(".humidity");
  humid.innerHTML = `Humidity: ${humidity}%`;
 
  let icon =document.querySelector(".topIcon");
  icon.innerHTML =`${iconTemplate(response.data.weather[0].icon)}`;
  
  getForecast(response.data);
}
//change icon
function iconTemplate (response){
  let weather= (response);
if (weather === `01d`){
    return `<i class="fas fa-sun"></i>`;}
if (weather === `01n`){
    return `<i class="fas fa-moon"></i>`;}
if (weather === `02d`||weather === "04d"){
    return `<i class="fas fa-cloud-sun"></i>`;}
if (weather === "02n"||weather === "04n"){
    return `<i class="fas fa-cloud-moon"></i>`;}
if (weather === "03d" || weather === "03n"){
    return `<i class="fas fa-cloud"></i>`;}  
if (weather === "09d"|| weather === "09n"){
    return `<i class="fas fa-cloud-rain"></i>`;}
if (weather === "10d"|| weather === "10n"){
   return `<i class="fas fa-cloud-showers-heavy"></i>`;}
if (weather === "11d"|| weather === "11n"){
   return `<i class="fas fa-bolt"></i>`;}
if (weather === "13d"|| weather === "13n"){
    return `<i class="far fa-snowflake"></i>`;}
if (weather === "50d"|| weather === "50n"){
    return `<i class="fas fa-smog"></i>`;
}
}
//Search by City
function cityChange(event) {
  event.preventDefault();
  let input = document.querySelector("#search-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${input.value}`;
  let key = `e411a3752881f98038e4e57881b9b78f`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${key}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
 }
//Search by location
function displayPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `My Location`;
  axios.get(apiUrl).then(showWeather);
}
function getLocation(place) {
  navigator.geolocation.getCurrentPosition(displayPosition);
}

// forcast
function getForecast (coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.coord.lat}&lon=${coordinates.coord.lon}&exclude=
,minutely,hourly,alerts&appid=${key}&units=Imperial`;
  axios.get(apiUrl).then(showForecast);
}

function showForecast(event) {
  
  let element = document.querySelector(".weekForcast");
  
  let forecast = event.data.daily;
  let html = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index <7){
  html= html+
  `<div class="col">
    <p class="day">
    ${dayFormat(forecastDay.dt)}
    <br />
    <p>
    <div class="icon">
        ${iconTemplate(forecastDay.weather[0].icon)}
    </div>
            
    <p class="temp">
      ${Math.round(forecastDay.temp.day)}°
    </p>
    <p class="dayHighLow">
      H:${Math.round(forecastDay.temp.max)}° <br />L:${Math.round(forecastDay.temp.min)}°
    </p>
    </div>`;
  }
  });               
    html = html +`</div>`;
    element.innerHTML= html;
}

//universal
let city = document.querySelector("#search-city");
city.addEventListener("submit", cityChange);

let place = document.querySelector("#local");
place.addEventListener("click", getLocation);

let key = `e411a3752881f98038e4e57881b9b78f`;

