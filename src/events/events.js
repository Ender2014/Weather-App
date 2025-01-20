import fetchWeather from "../controllers/weatherController";
import handleError from "../utils/errorHandling";

const searchBtn = document.querySelector(".searchBtn");
const searchBar = document.getElementById("searchbar");

export default function initEventlisteners() {
  searchBtn.addEventListener("click", () => {
    handleError(fetchWeather)(searchBar.value);
  });
}
