let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours > 10){
  hours=`0${hours}`;
} 
let minute = now.getMinutes();
if (minute > 10) {
  minute= `0${minute}`;
}

let dayTime = document.querySelector("h3");
dayTime.innerHTML = `${day} ${hours}:${minute}`;

//City Search and change
function cityChange(event) {
  event.preventDefault();
  let input = document.querySelector("#search-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${input.value}`;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=e411a3752881f98038e4e57881b9b78f&units=imperial`;

  function showWeather(response) {
    let dayTemp = Math.round(response.data.main.temp);
    let headTemp = `${dayTemp}°F`;
    let h2 = document.querySelector("h2");
    h2.innerHTML = headTemp;

    let maxTemp = Math.round(response.data.main.temp_max);
    let minTemp = Math.round(response.data.main.temp_min);
    let highLow = ` H:${maxTemp}° L:${minTemp}°`;
    let hl = document.querySelector(".topHighLow");
    hl.innerHTML = highLow;
    
    let description =(response.data.weather[0].description);
    let weatherDescription = document.querySelector(".weather-description");
    weatherDescription.innerHTML = `${description}`;

    let windSpeed = Math.round(response.data.wind.speed);
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

  } 
  axios.get(apiUrl).then(showWeather);
 console.log(apiUrl);
  
}

let city = document.querySelector("#search-city");
city.addEventListener("submit", cityChange);

//Search by location
function showCurrentWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let headTemp = `${temperature}°F`;
  let h2 = document.querySelector("h2");
  h2.innerHTML = headTemp;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `My Location`;

  let description =(response.data.weather[0].description);
    let weatherDescription = document.querySelector(".weather-description");
    weatherDescription.innerHTML = `${description}`;

    let windSpeed = Math.round(response.data.wind.speed);
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
}

function displayPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = `e411a3752881f98038e4e57881b9b78f`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showCurrentWeather);
}

function getLocation(place) {
  navigator.geolocation.getCurrentPosition(displayPosition);
}

let place = document.querySelector("#local");
place.addEventListener("click", getLocation);
