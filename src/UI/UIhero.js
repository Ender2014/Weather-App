import fetchImages from "../utils/imageHandling";

export default class HeroUI {
  constructor(container) {
    this.container = container;
  }

  createDOM() {
    // Create left-hero column
    const leftHero = document.createElement("div");
    leftHero.classList.add("left-hero", "column");

    // Create container div for city and description
    const cityDescContainer = document.createElement("div");

    // Create h2 for city
    const city = document.createElement("h2");
    city.classList.add("city");

    // Create p for description
    const description = document.createElement("p");
    description.classList.add("description");

    // Append city and description to the cityDescContainer
    cityDescContainer.appendChild(city);
    cityDescContainer.appendChild(description);

    // Append cityDescContainer to left-hero column
    leftHero.appendChild(cityDescContainer);

    // Create h1 for current temperature
    const currentTemp = document.createElement("h1");
    currentTemp.classList.add("currentTemp", "value");

    // Append currentTemp to left-hero column
    leftHero.appendChild(currentTemp);

    // Create right-hero column
    const rightHero = document.createElement("div");
    rightHero.classList.add("right-hero", "column");

    // Append img to right-hero column
    const img = document.createElement("img");
    rightHero.appendChild(img);

    // Append left-hero and right-hero to the main hero container
    this.container.appendChild(leftHero);
    this.container.appendChild(rightHero);

    // (Optional) Append the hero container to the body or a specific parent element
    return { img, cityDescContainer, currentTemp };
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
    // Get wanted API data
    const { icon, resolvedAddress, conditions, temp } = dataObj;
    // Create new DOM objects
    const { img, cityDescContainer, currentTemp } = this.createDOM();
    // Update content
    img.src = fetchImages(icon, "svg");
    cityDescContainer.children[0].textContent = resolvedAddress.split(",")[0];
    cityDescContainer.children[1].textContent = conditions;
    currentTemp.textContent = temp;
  }
}
