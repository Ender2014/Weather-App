import { extractHourlyData } from "../controllers/weatherController";
import fetchImages from "../utils/imageHandling";

export default class TodayForecastUI {
  constructor(container) {
    this.container = container;
  }

  createDOM() {
    const containerDOM = document.createElement("div");

    const timeDOM = document.createElement("p");
    containerDOM.appendChild(timeDOM);

    const iconDOM = document.createElement("img");
    containerDOM.appendChild(iconDOM);

    const tempDOM = document.createElement("div");
    tempDOM.classList.add("value");
    containerDOM.appendChild(tempDOM);

    this.container.appendChild(containerDOM);
    return { timeDOM, iconDOM, tempDOM };
  }

  removeDisplay() {
    // Validate container
    if (this.container) this.container.textContent = "";
  }

  updateDisplay(dataObj) {
    // Validate input
    if (!dataObj) {
      console.error("Invalid data object provided to updateDisplay.");
      return;
    }
    // Reset the display first
    this.removeDisplay();
    // Get every three hours
    const nHoursdata = extractHourlyData(dataObj, 3);

    nHoursdata.forEach((item) => {
      // Fetch wanted API data
      const { datetime, icon, temp } = item;
      // Create new DOM objects
      const { timeDOM, iconDOM, tempDOM } = this.createDOM();
      // Update content
      timeDOM.textContent = datetime;
      iconDOM.src = fetchImages(icon, "svg");
      tempDOM.textContent = temp;
    });
  }
}
