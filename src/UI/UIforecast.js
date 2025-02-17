import fetchImages from "../utils/imageHandling";
import { date2day, isToday } from "../utils/conversionHelpers";

export default class ForecastUI {
  constructor(container) {
    this.container = container;
  }

  createDOM() {
    const containerDOM = document.createElement("div");

    const dayDOM = document.createElement("p");
    containerDOM.appendChild(dayDOM);

    const iconDOM = document.createElement("img");
    containerDOM.appendChild(iconDOM);

    const tempDOM = document.createElement("span");
    tempDOM.classList.add("value");
    containerDOM.appendChild(tempDOM);

    this.container.appendChild(containerDOM);

    return { dayDOM, iconDOM, tempDOM };
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
    const { forecast } = dataObj;

    forecast.slice(0, 7).forEach((item) => {
      // Fetch wanted API data
      const { date, icon, temp } = item;
      // Create new DOM objects
      const { dayDOM, iconDOM, tempDOM } = this.createDOM();
      // Update content
      if (isToday(date)) {
        dayDOM.textContent = "Today";
      } else {
        dayDOM.textContent = date2day(date);
      }

      iconDOM.src = fetchImages(icon, "svg");
      tempDOM.textContent = temp;
    });
  }
}
