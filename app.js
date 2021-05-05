// clock
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
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
  return `${day} ${hours}:${minutes}`;
}
//Display weather in top box
function showWeather(response) {
  fahrenheit = response.data.main.temp;
  let temperature = Math.round(fahrenheit);
  let headTemp = `${temperature}°`;
  let h2 = document.querySelector("h2");
  h2.innerHTML = headTemp;

  maxTemp = response.data.main.temp_max;
  minTemp = response.data.main.temp_min;
  let highLow = ` H:${Math.round(maxTemp)}° L:${Math.round(minTemp)}°`;
  let hl = document.querySelector(".topHighLow");
  hl.innerHTML = highLow;

  let time = document.querySelector(".time");
  time.innerHTML = `Last updated: ${formatDate(response.data.dt * 1000)}`;
  
  let description =(response.data.weather[0].description);
  let weatherDescription = document.querySelector(".weather-description");
  weatherDescription.innerHTML = `Description: ${description}`;

  mph = response.data.wind.speed;
  let windSpeed = Math.round(mph);
  let speed = document.querySelector(".wind");
  speed.innerHTML = `Wind Speed: ${windSpeed} mph`;
    
  let humidity =(response.data.main.humidity);
  let humid = document.querySelector(".humidity");
  humid.innerHTML = `Humidity: ${humidity}%`;

//icon changer
 let weather= (response.data.weather[0].icon);

  let icon =document.querySelector(".topIcon");
if (weather === `01d`){
    icon.innerHTML =(`<i class="fas fa-sun"></i>`);}
if (weather === `01n`){
    icon.innerHTML =(`<i class="fas fa-moon"></i>`);}
if (weather === `02d`||weather === "04d"){
    icon.innerHTML =(`<i class="fas fa-cloud-sun"></i>`);}
if (weather === "02n"||weather === "04n"){
    icon.innerHTML =(`<i class="fas fa-cloud-moon"></i>`);}
if (weather === "03d" || weather === "03n"){
    icon.innerHTML =(`<i class="fas fa-cloud"></i>`);}  
if (weather === "09d"|| weather === "09n"){
    icon.innerHTML =(`<i class="fas fa-cloud-rain"></i>`);}
if (weather === "10d"|| weather === "10n"){
   icon.innerHTML =(`<i class="fas fa-cloud-showers-heavy"></i>`);}
if (weather === "11d"|| weather === "11n"){
   icon.innerHTML =(`<i class="fas fa-bolt"></i>`);}
if (weather === "13d"|| weather === "13n"){
    icon.innerHTML =(`<i class="far fa-snowflake"></i>`);}
if (weather === "50d"|| weather === "50n"){
    icon.innerHTML =(`<i class="fas fa-smog"></i>`);}

    //forecast
    getForecast(response.data);
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

//Unit conversion
function displayMetric (event){
  event.preventDefault();
  let celsiusTemp= (fahrenheit -32)* 5/9;
  let tempElement =document.querySelector("h2");
  tempElement.innerHTML=Math.round(celsiusTemp)+`°`;
  let kph= mph* 1.609;
  let kilometer =document.querySelector(".wind");
  kilometer.innerHTML=`Wind speed: ${Math.round(kph)} kph`;
  fahrenheitLink.innerHTML=`°F`;
  celsius.innerHTML=`<strong>°C</strong>`;
  let max= (maxTemp-32)* 5/9;
  let min= (minTemp-32)* 5/9;
  let highLow = ` H:${Math.round(max)}° L:${Math.round(min)}°`;
  let hl = document.querySelector(".topHighLow");
  hl.innerHTML = highLow;
}
function displayImperial (event){
  event.preventDefault();
  let tempElement =document.querySelector("h2");
  tempElement.innerHTML=Math.round(fahrenheit)+`°`;
  
  let mile=document.querySelector(".wind");
  mile.innerHTML=`Wind speed: ${Math.round(mph)} mph`;
  fahrenheitLink.innerHTML=`<strong>°F</strong>`
  celsius.innerHTML=`°C`;
  
  let highLow = ` H:${Math.round(maxTemp)}° L:${Math.round(minTemp)}°`;
  let hl = document.querySelector(".topHighLow");
  hl.innerHTML = highLow;
}
// forcast
function getForecast (coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.coord.lat}&lon=${coordinates.coord.lon}&exclude=minutely,hourly,alerts&appid=${key}&units=Imperial`;
  axios.get(apiUrl).then(showForecast);
  console.log(apiUrl);
}

function showForecast(event) {
  let element = document.querySelector(".weekForcast");
  
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  let html = `<div class="row">`;
  days.forEach(function (day) {
  html= html+
  `<div class="col">
    <p class="day">
    ${day}
    <br />
    <p>
    <div class="icon">
    <i class="fas fa-cloud"></i>
    </div>
            
    <p class="temp">
      48°
    </p>
    <p class="dayHighLow">
      H:48° <br />L:36°
    </p>
    </div>`;
  });               
    html = html +`</div>`;
    element.innerHTML= html;
}

//universal
let city = document.querySelector("#search-city");
city.addEventListener("submit", cityChange);

let place = document.querySelector("#local");
place.addEventListener("click", getLocation);

let fahrenheitLink= document.querySelector(".fahrenheit");
fahrenheitLink.addEventListener("click", displayImperial);
let celsius= document.querySelector(".celsius");
celsius.addEventListener("click", displayMetric);

let key = `e411a3752881f98038e4e57881b9b78f`;

let fahrenheit = null;
let mph = null;
let maxTemp = null;
let minTemp = null;
