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

let hour = now.getHours();
let minute = now.getMinutes();

let dayTime = document.querySelector("h3");
dayTime.innerHTML = `${day} ${hour}:${minute}`;

//City Search and change
function cityChange(event) {
  event.preventDefault();
  let input = document.querySelector("#search-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${input.value}`;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=e411a3752881f98038e4e57881b9b78f&units=imperial`;

  function showWeather(response) {
    let dayTemp = Math.round(response.data.main.temp);
    console.log(dayTemp);
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
    console.log(response.data)
  } 
  axios.get(apiUrl).then(showWeather);
  
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
    console.log(response.data)
}

function displayPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = `e411a3752881f98038e4e57881b9b78f`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showCurrentWeather);
  console.log(apiUrl);
}

function getLocation(place) {
  navigator.geolocation.getCurrentPosition(displayPosition);
}
let place = document.querySelector("#local");
place.addEventListener("click", getLocation);

