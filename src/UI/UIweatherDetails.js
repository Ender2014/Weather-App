import { removeItemOnce } from "../utils/listHelpers";
import { extractWeatherDetails } from "../controllers/weatherController";
// Create the conditions container
function createCondition(id, textContent) {
  const conditionDiv = document.createElement("div");
  conditionDiv.className = "con";
  conditionDiv.id = id;

  const paragraph = document.createElement("p");
  paragraph.textContent = textContent;
  conditionDiv.appendChild(paragraph);

  const value = document.createElement("div");
  value.classList.add("value");
  conditionDiv.appendChild(value);

  return conditionDiv;
}

export default class WeatherDetailsUI {
  constructor(container, conditions = []) {
    this.container = container;
    this.conditions = conditions;
  }

  setConditions(conditions) {
    this.conditions = conditions;
  }

  removeCondition(condition) {
    removeItemOnce(this.conditions, condition);
  }

  createDOM(dataObj) {
    const conditionEls = [];

    const weatherConds = extractWeatherDetails(dataObj);
    this.setConditions(weatherConds);

    this.conditions.forEach((condition) => {
      const conditionElement = createCondition(condition.id, condition.text);
      this.container.appendChild(conditionElement);
      conditionEls.push(conditionElement);
    });

    return conditionEls;
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
    // Create Dom elements
    const conditionEls = this.createDOM(dataObj);
    // Get relevant data
    conditionEls.forEach((condition) => {
      document.querySelector(`#${condition.id} .value`).textContent =
        dataObj[condition.id];
    });
  }
}
