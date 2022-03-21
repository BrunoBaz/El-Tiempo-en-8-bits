"use strict";
export { currentWeatherData, weatherData, backgroundDiaNoche };
const myBody = document.querySelector("body");
const mySection = document.querySelector("section.clima");
const myCarrusel = document.querySelector("section#carrusel");
const imgNube = (document.createElement("img").src =
  "./Recursos/nublado-animacion.gif");
const imgLuna = (document.createElement("img").src =
  "./Recursos/luna-animacion.gif");
const imgSol = (document.createElement("img").src =
  "./Recursos/sol-animacion.gif");
const imgPocasNubes = (document.createElement("img").src =
  "./Recursos/pocas-nubes-animacion.gif");
const imgLluvia = (document.createElement("img").src =
  "./Recursos/lluvia-animacion.gif");
const imgTormenta = (document.createElement("img").src =
  "./Recursos/tormenta-animacion.gif");
const imgNieve = (document.createElement("img").src =
  "./Recursos/nieve-animacion.gif");
const imgNiebla = (document.createElement("img").src =
  "./Recursos/niebla-animacion.gif");
const now = new Date().toLocaleString("es-ES", {
  timeStyle: "short",
  dateStyle: "long",
});
const currentWeatherData = async (lat, lon) => {
  const key = "5ffc44f30e5179f5e6420ea84b83cb9a";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;
  const resp = await fetch(url);
  const data = await resp.json();
  currentWeather(data);
};
const currentWeather = async (data) => {
  let clima = data.weather;
  let temp = Math.round(data.main.temp);
  let position = data.name;
  const hora = new Date(data.dt * 1000).getHours();
  const arrayCurrentWeather = clima.map((el) => {
    switch (el.main) {
      case "Clouds":
        return `<p>${now}</p>
            <p>${position}</p>
            <img src="${imgNube}">
            <p>${temp}ºC</p>
            <p> Hay algunas nubes en el cielo</p>`;
      case "Rain":
      case "Drizzle":
        return `<p>${now}</p>
            <p>${position}</p>
            <img src="${imgLluvia}">
            <p>${temp}ºC</p>
            <p>Está lloviendo ahora mismo</p>`;
      case "Clear":
        if (hora > 7 && hora < 20) {
          return `<p>${now}</p>
            <p>${position}</p>
            <img src="${imgSol}">
            <p>${temp}ºC</p>
            <p>El cielo está despejado</p>
            `;
        } else {
          return `<p>${now}</p>
            <p>${position}</p>
            <img src="${imgLuna}">
            <p>${temp}ºC</p>
            <p>El cielo está despejado</p>`;
        }
      case "Snow":
        return `<p>${now}</p>
            <p>${position}</p>
            <img src="${imgNieve}">
            <p>${temp}ºC</p>
            <p>Abrígate porque está nevando</p>`;
      case "Thunderstorm":
        return `<p>${now}</p>
            <p>${position}</p>
            <img src="${imgTormenta}">
  
            <p>${temp}ºC</p>
            <p>Resguardate, hay tormenta</p>`;

      case "Mist":
      case "Smoke":
      case "Haze":
      case "Dust":
      case "Fog":
      case "Sand":
      case "Ash":
      case "Squall":
      case "Tornado":
        return `<p>${now}</p>
            <p>${position}</p>
            <img src="${imgNiebla}">
            <p>${temp}ºC</p>
            <p>Hay niebla, mira por donde pisas</p>`;
    }
  });
  console.log(arrayCurrentWeather);
  mySection.innerHTML = arrayCurrentWeather.join("");
};
const weatherData = async (data) => {
  for (const horas of [data.hourly.slice(1, 9)]) {
    const newWeathers = horas.map((clima) => {
      return {
        hora: new Date(clima.dt * 1000).toLocaleString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        temp: Math.round(clima.temp),
        meteo: clima.weather.map((el) => el.main).join(),
      };
    });
    console.log(newWeathers);
    listWeather(newWeathers);
  }
};

const listWeather = async (newWeathers) => {
  console.log(newWeathers);
  const arrayHTMLweather = newWeathers.map((clima) => {
    switch (clima.meteo) {
      case "Clouds":
        return ` <li>
      <p>${clima.hora}</p>
      <img src="${imgNube}">
      <p>${clima.temp}ºC</p>`;

      case "Rain":
      case "Drizzle":
        return ` <li>
      <p>${clima.hora}</p>
      <img src="${imgLluvia}">
      <p>${clima.temp}ºC</p>`;

      case "Clear":
        if (clima.hora > "07:00" && clima.hora < "20:00") {
          return ` <li>
      <p>${clima.hora}</p>
      <img src="${imgSol}">
      <p>${clima.temp}ºC</p>`;
        } else {
          return ` <li>
        <p>${clima.hora}</p>
        <img src="${imgLuna}">
        <p>${clima.temp}ºC</p>`;
        }
      case "Snow":
        return ` <li>
      <p>${clima.hora}</p>
      <img src="${imgNieve}">
      <p>${clima.temp}ºC</p> `;

      case "Thunderstorm":
        return ` <li>
      <p>${clima.hora}</p>
      <img src="${imgTormenta}">
      <p>${clima.temp}ºC</p> `;

      case "Mist":
      case "Smoke":
      case "Haze":
      case "Dust":
      case "Fog":
      case "Sand":
      case "Ash":
      case "Squall":
      case "Tornado":
        return ` <li>
      <p>${clima.hora}</p>
      <img src="${imgNiebla}">
      <p>${clima.temp}ºC</p> `;
    }
  });
  myCarrusel.innerHTML = `<ul>${arrayHTMLweather.join("")}</ul>`;
};

const backgroundDiaNoche = async (data) => {
  const hora = new Date(data.current.dt * 1000).getHours();
  if (hora > 7 && hora < 20) {
    myBody.classList.remove("noche");
    myBody.classList.add("dia");
  } else {
    myBody.classList.remove("dia");
    myBody.classList.add("noche");
  }
};
