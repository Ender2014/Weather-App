import fetchWeather from "../controllers/weatherController";
import updateDisplay from "../UI/UIhero";
import handleError from "../utils/errorHandling";

const searchBtn = document.querySelector(".searchBtn");
const searchBar = document.getElementById("searchbar");

export default function initEventlisteners() {
  searchBtn.addEventListener("click", async () => {
    const dataObj = await handleError(fetchWeather)(searchBar.value);
    // Switch to use displayController.
    updateDisplay(dataObj);
  });
}
