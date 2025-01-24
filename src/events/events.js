import { fetchWeather } from "../controllers/weatherController";
import ForecastUI from "../UI/UIforecast";
import HeroUI from "../UI/UIhero";
import WeatherDetailsUI from "../UI/UIweatherDetails";
import TodayForecastUI from "../UI/UItodaycast";
import { handleError, renderError } from "../utils/errorHandling";
import { updatePage } from "../controllers/displayController";
import {
  populateStorage,
  fetchFromStorage,
  storageAvailable,
} from "../services/storage";

// Initialize cached data

// Initialize all event listeners (entry point for application)
export default function initEventlisteners() {
  // UI parent containers
  const searchBtn = document.querySelector(".searchBtn");
  const searchBar = document.getElementById("searchbar");
  const errorMsg = document.querySelector(".error");

  const forecast = document.querySelector(".forecast");
  const hero = document.querySelector(".lol");
  const conditions = document.querySelector(".conditions");
  const tdyForecast = document.querySelector(".content");

  // UI objects
  const forecastDOM = new ForecastUI(forecast);
  const heroDOM = new HeroUI(hero);
  const weatherDetailsDOM = new WeatherDetailsUI(conditions);
  const tdyForecastDOM = new TodayForecastUI(tdyForecast);

  // UI object list
  const domElements = [forecastDOM, heroDOM, weatherDetailsDOM, tdyForecastDOM];

  // Current location
  let location = "Kuala Lumpur";
  if (storageAvailable || fetchFromStorage("location") !== null) {
    location = fetchFromStorage("location");
  }

  window.onload = async function () {
    const dataObj = await handleError(fetchWeather)(location);
    updatePage(domElements, dataObj);
    populateStorage("location", location);
  };

  // load when page search
  searchBtn.addEventListener("click", async () => {
    const dataObj = await handleError(fetchWeather)(searchBar.value);
    if (dataObj) location = searchBar.value;
    updatePage(domElements, dataObj);
    renderError(searchBar, errorMsg, dataObj);
    populateStorage("location", location);
  });

  /* // load data every 10 seconds
  setInterval(async () => {
    const dataObj = await handleError(fetchWeather)(location);
    updatePage(domElements, dataObj);
    populateStorage("location", location);
  }, 10000); */
}
