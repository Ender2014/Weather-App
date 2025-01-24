import { extractDateTime } from "../utils/conversionHelpers";
import { getNumelements } from "../utils/listHelpers";

// Helper Function: Reformat and process data
function processConditions(currentConditions) {
  // Extract wanted data
  const {
    datetime,
    datetimeEpoch,
    temp,
    precip,
    humidity,
    windspeed,
    cloudcover,
    icon,
    conditions,
    hours,
  } = currentConditions;

  // Data processing logic
  const { date } = extractDateTime(datetimeEpoch);
  return {
    date,
    datetime,
    temp: `${temp}\u00B0`,
    precip,
    humidity,
    windspeed,
    cloudcover,
    icon,
    conditions,
    hours,
  };
}

// Extract wanted weather data
function extractAllData(responseData) {
  const { address, resolvedAddress, description, currentConditions, days } =
    responseData;
  const condition = processConditions(currentConditions);
  const forecast = days.map((day) => processConditions(day));

  return { address, resolvedAddress, description, ...condition, forecast };
}

export function extractWeatherDetails(data) {
  const { precip, humidity, windspeed, cloudcover } = data;

  const conditions = [
    { id: "precip", text: "Rain", val: precip },
    { id: "humidity", text: "Humidity", val: humidity },
    { id: "windspeed", text: "Wind", val: windspeed },
    { id: "cloudcover", text: "Cloudy", val: cloudcover },
  ];
  return conditions;
}

export function extractHourlyData(responseData, nHours) {
  const nHoursdata = [];
  const { forecast } = responseData;
  let hours = forecast.map((day) => day.hours)[0];

  hours = hours.filter((hour) => {
    const hourOfDay = parseInt(hour.datetime.split(":")[0], 10);
    return hourOfDay >= 6 && hourOfDay <= 21; // 6 AM to 9 PM
  });

  getNumelements(hours, nHours).forEach((el) => {
    const { datetime, icon, temp } = el;
    nHoursdata.push({ datetime, icon, temp: `${temp}\u00B0` });
  });

  return nHoursdata;
}

// Entry Point for module: Get weather data
// lang = (option),aggregateHours = ()
export async function fetchWeather(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&lang=en&key=UD9TAVWLH8YHYSE5DLVUGJXF7`;
  const response = await fetch(url, { mode: "cors" });

  if (!response) {
    throw new Error(`Response status ${response.status}`);
  }
  const responseData = await response.json();
  const data = extractAllData(responseData);

  return data;
}
