"use strict";
import {
  currentWeatherData,
  weatherData,
  backgroundDiaNoche,
} from "./weatherData.js";
let localStorageLat;
let localStorageLon;
const localStorageCoords = window.localStorage.getItem("coords");
const myButton = document.querySelector("button");
const actGps = document.getElementById("gps");

const succes = async (pos) => {
  const lat = await pos.coords.latitude;
  const lon = await pos.coords.longitude;
  const coordsOBJ = { lat, lon };
  localStorage.setItem("permission", "ok");
  localStorageLat = localStorage.setItem("lat", lat);
  localStorageLon = localStorage.setItem("lon", lon);
  fetchData(lat, lon);
  currentWeatherData(lat, lon);
};
async function loadCoord() {
  const loadedCoords = localStorage.getItem(localStorageCoords);
  if (loadedCoords === null) {
    handleClickButton();
  } else {
    const lat = await localStorageLat;
    const lon = await localStorageLon;
    console.log(lat, lon);
    fetchData(lat, lon);
    currentWeatherData(lat, lon);
  }
}
async function fetchData(lat, lon) {
  const key = "5ffc44f30e5179f5e6420ea84b83cb9a";
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,daily&appid=${key}`;
  const resp = await fetch(url);
  const data = await resp.json();
  weatherData(data);
  backgroundDiaNoche(data);
}

const error = (error) => {
  console.error(error);
};

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
const handleClickButton = () => {
  const geolocation = navigator.geolocation;
  geolocation.getCurrentPosition(succes, error, options);
  actGps.style.display = "none";
};

myButton.addEventListener("click", handleClickButton);
function init() {
  loadCoord();
}
init();
