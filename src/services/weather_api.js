// helper function to handle network error that doesn't use promise rejects.
export function handleError(fn) {
  return (...params) => fn(...params).catch(console.error);
}
// Get weather data
export async function fetchWeather(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=UD9TAVWLH8YHYSE5DLVUGJXF7`;

  const response = await fetch(url, { mode: "cors" });
  if (!response) {
    throw new Error(`Response status ${response.status}`);
  }
  const responseData = await response.json();
  console.log(responseData);
}
// Helper function to extract condition data
export function processConditions({ currentConditions }) {
  const {
    datetimeEpoch,
    temp,
    preciprob,
    humidity,
    windspeed,
    icon,
    condition,
  } = currentConditions;

  const myDate = new Date(datetimeEpoch);
  const time = `${myDate.getHours()}:${myDate.getMinutes()}:${myDate.getSeconds()}`;

  return {
    date: myDate.getDate(),
    time,
    temp,
    preciprob,
    humidity,
    windspeed,
    icon,
    condition,
  };
}

// Extract wanted weather data
export function processData(responseData) {
  const { resolvedAddress, description, currentConditions, days } =
    responseData;
  const condition = processConditions(currentConditions);
  const forecast = days.map((day) => processConditions(day));

  return { resolvedAddress, description, condition, forecast };
}
