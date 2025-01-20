import { extractDateTime, convertUnits } from "../utils/conversionHelpers";

let isMetric = true;

// Helper Function: Reformat and process data
function processConditions(currentConditions) {
  // Extract wanted data
  const {
    datetimeEpoch,
    temp,
    feelslike,
    preciprob,
    humidity,
    windspeed,
    uvindex,
    icon,
    condition,
  } = currentConditions;

  // Data processing logic
  const { time, date } = extractDateTime(datetimeEpoch);
  if (isMetric) {
  }

  return {
    date,
    time,
    temp,
    feelslike,
    preciprob,
    humidity,
    windspeed,
    uvindex,
    icon,
    condition,
  };
}

// Extract wanted weather data
function extractData(responseData) {
  const { resolvedAddress, description, currentConditions, days } =
    responseData;
  const condition = processConditions(currentConditions);
  const forecast = days.map((day) => processConditions(day));

  return { resolvedAddress, description, condition, forecast };
}
// Entry Point for module: Get weather data
export default async function fetchWeather(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=UD9TAVWLH8YHYSE5DLVUGJXF7`;
  const response = await fetch(url, { mode: "cors" });
  if (!response) {
    throw new Error(`Response status ${response.status}`);
  }
  const responseData = await response.json();

  const cleanData = extractData(responseData);
  console.log(cleanData);
  return cleanData;
}
