// Helper Function 1: Reformat and process data
function processConditions(currentConditions) {
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

  const myDate = new Date(datetimeEpoch);
  const time = `${myDate.getHours()}:${myDate.getMinutes()}:${myDate.getSeconds()}`;

  return {
    date: myDate.toLocaleString(),
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

// Helper Function 2: Extract wanted weather data
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
  return responseData;
}
