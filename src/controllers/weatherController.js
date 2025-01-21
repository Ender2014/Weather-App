import { extractDateTime } from "../utils/conversionHelpers";

// Helper Function: Reformat and process data
function processConditions(currentConditions) {
  // Extract wanted data
  const {
    datetime,
    datetimeEpoch,
    temp,
    feelslike,
    preciprob,
    humidity,
    windspeed,
    uvindex,
    icon,
    conditions,
  } = currentConditions;
  // Data processing logic
  const { date } = extractDateTime(datetimeEpoch);

  return {
    date,
    datetime,
    temp,
    feelslike,
    preciprob,
    humidity,
    windspeed,
    uvindex,
    icon,
    conditions,
  };
}

// Extract wanted weather data
function extractData(responseData) {
  const { address, resolvedAddress, description, currentConditions, days } =
    responseData;
  const condition = processConditions(currentConditions);
  const forecast = days.map((day) => processConditions(day));

  return { address, resolvedAddress, description, ...condition, forecast };
}
// Entry Point for module: Get weather data
export default async function fetchWeather(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=UD9TAVWLH8YHYSE5DLVUGJXF7`;
  const response = await fetch(url, { mode: "cors" });
  if (!response) {
    throw new Error(`Response status ${response.status}`);
  }
  const responseData = await response.json();
  const dataObj = extractData(responseData);
  console.log(dataObj);
  return dataObj;
}
