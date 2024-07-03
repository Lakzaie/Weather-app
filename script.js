import { removeModal, showModal } from "./utils/modal.js";

const BASE_URL = "https://api.openweathermap.org/data/2.5/";
const API_KEY = "e209eb004482f391be342d08a3ab772b";
const DAYS = [
  "یکشنبه",
  "دوشنبه",
  "سه شنبه",
  "چهار شنبه",
  "پنج شنبه",
  "جمعه",
  "شنبه",
];

const searchInput = document.querySelector("input");
const buttonSearch = document.querySelector("button");
const showInformation = document.getElementById("weather");
const forecastContainer = document.getElementById("forecast");
const imgLocation = document.getElementById("location");
const modalButton = document.getElementById("modal-button")

const getCurrentWeatherByName = async (city) => {
  const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fa`;
  const response = await fetch(url);
  const json = await response.json();
  try {
    const response = await fetch(url);
    const json = await response.json();
    if (+json.cod === 200) {
        return json;
      }else {
        showModal(json.message);
      }
}catch (error) {
    showModal("An error occured when fetch");
}
  
};

const getCurrentWeatherByCoordinates = async (lat, lon) => {
  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fa`;
  const response = await fetch(url);
  const json = await response.json();
  try {
    const response = await fetch(url);
    const json = await response.json();
    if (+json.cod === 200) {
        return json;
      }else {
        showModal(json.message);
      }
}catch (error) {
    showModal("An error occured when fetch");
}
};

const getCurrentWeatherByNameForecast = async (city) => {
  const url = `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=fa`;
  const response = await fetch(url);
  const json = await response.json();
  try {
    const response = await fetch(url);
    const json = await response.json();
    if (+json.cod === 200) {
        return json;
      }else {
        showModal(json.message);
      }
}catch (error) {
    showModal("An error occured when fetch");
}
};

const getFoecastWeatherByCoordinates = async (lat, lon) => {
  const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fa`;
  const response = await fetch(url);
  const json = await response.json();
  try {
    const response = await fetch(url);
    const json = await response.json();
    if (+json.cod === 200) {
        return json;
      }else {
        showModal(json.message);
      }
}catch (error) {
    showModal("An error occured when fetch");
}
};

const showInformationWeather = (data) => {
  showInformation.innerHTML = `
    <h1>${data.name} , ${data.sys.country}</h1>
    <div id="main">
    <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" />
    <span>${data.weather[0].description}</span>
    <p>${Math.round(data.main.temp)} C°</p>
    </div>

    <div id="info">
    <p> m/s سرعت باد : ${Math.round(data.wind.speed)}</p>
    <p> % رطوبت : ${Math.round(data.main.humidity)}</p>
    
    </div>
  `;
};

const renderForcastWeather = (data) => {
  forecastContainer.innerHTML = "";
  data = data.list.filter((obj) => obj.dt_txt.endsWith("12:00:00"));
  console.log(data);
  data.forEach((i) => {
    const forecastJsx = `
  <div>
  <img src="http://openweathermap.org/img/w/${i.weather[0].icon}.png" />
  <h3>${DAYS[new Date(i.dt * 1000).getDay()]}</h3>
  <p>${Math.round(i.main.temp)} °C</p>
  <span>${i.weather[0].description}</span>
  </div>
  `;
    forecastContainer.innerHTML += forecastJsx;
  });
};

const searchHandeler = async () => {
  const cityName = searchInput.value;

  if (!cityName) {
    showModal("Please enter city name!");
    return;
  }


  const currentData = await getCurrentWeatherByName(cityName);
  showInformationWeather(currentData);
  const forecastData = await getCurrentWeatherByNameForecast(cityName);
  renderForcastWeather(forecastData);
};

const positionCallback = async (position) => {
  const { latitude, longitude } = position.coords;
  const currentData = await getCurrentWeatherByCoordinates(latitude, longitude);
  showInformationWeather(currentData);
  const forecastData = await getFoecastWeatherByCoordinates(
    latitude,
    longitude
  );
  renderForcastWeather(forecastData);
};

const errorCallback = (error) => {
  console.log(error.message);
};

const locationHandeler = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(positionCallback, errorCallback);
  } else {
    showModal("Your browser does not support geolocation");
  }
};

const initHandeler = async () => {
  const currentData = await getCurrentWeatherByName("zahedan");
  showInformationWeather(currentData);
  const forecastData = await getCurrentWeatherByNameForecast("zahedan");
  renderForcastWeather(forecastData);
}

buttonSearch.addEventListener("click", searchHandeler);
buttonSearch.addEventListener("keydown", searchHandeler);
imgLocation.addEventListener("click", locationHandeler);
modalButton.addEventListener("click", removeModal)
document.addEventListener("DOMContentLoaded", initHandeler)
