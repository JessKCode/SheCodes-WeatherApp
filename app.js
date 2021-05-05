
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

  let description =(response.data.weather[0].description);
  let weatherDescription = document.querySelector(".weather-description");
  weatherDescription.innerHTML = `${description}`;

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
// weekly forcast
  }

//Search by City
function cityChange(event) {
  event.preventDefault();
  let input = document.querySelector("#search-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${input.value}`;
  let key = `e411a3752881f98038e4e57881b9b78f`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${key}&units=imperial`;
  let forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${input.value}&cnt={7}&appid=${key}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
  console.log(forecastApiUrl);
}
  
let city = document.querySelector("#search-city");
city.addEventListener("submit", cityChange);

//Search by location
function displayPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=imperial`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `My Location`;
  axios.get(apiUrl).then(showWeather);
}

function getLocation(place) {
  navigator.geolocation.getCurrentPosition(displayPosition);
}

let place = document.querySelector("#local");
place.addEventListener("click", getLocation);

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

let celsius= document.querySelector(".celsius");
celsius.addEventListener("click", displayMetric);

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

let fahrenheitLink= document.querySelector(".fahrenheit");
fahrenheitLink.addEventListener("click", displayImperial);

let key = `e411a3752881f98038e4e57881b9b78f`;
let fahrenheit = null;
let mph = null;
let maxTemp = null;
let minTemp = null;

function showForecast(event) {
  console.log(event);
}