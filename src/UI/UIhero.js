const cityDOM = document.querySelector(".city");
const descDOM = document.querySelector(".description");
const tempDOM = document.querySelector(".currentTemp");

export default function updateDisplay(dataObj) {
  const { address, icon, conditions, temp } = dataObj;
  cityDOM.textContent = address;
  descDOM.textContent = conditions;
  tempDOM.textContent = temp;
}
