const { fromUnixTime } = require("date-fns");

export function convertUnits(value, fromUnit, toUnit) {
  const myValue = value;
  const conversions = {
    // Length conversions
    "inches to centimeters": () => myValue * 2.54,
    "centimeters to inches": () => myValue / 2.54,
    "feet to meters": () => myValue * 0.3048,
    "meters to feet": () => myValue / 0.3048,
    "miles to kilometers": () => myValue * 1.60934,
    "kilometers to miles": () => myValue / 1.60934,

    // Weight conversions
    "pounds to kilograms": () => myValue * 0.453592,
    "kilograms to pounds": () => myValue / 0.453592,
    "ounces to grams": () => myValue * 28.3495,
    "grams to ounces": () => myValue / 28.3495,

    // Temperature conversions
    "fahrenheit to celsius": () => ((myValue - 32) * 5) / 9,
    "celsius to fahrenheit": () => (myValue * 9) / 5 + 32,
  };

  const key = `${fromUnit.toLowerCase()} to ${toUnit.toLowerCase()}`;

  if (conversions[key]) {
    const convertedValue = conversions[key](myValue);
    // console.log(`${fromUnit}:${myValue} --> ${toUnit}:${myValue}}`);
    return convertedValue;
  }
  throw new Error(
    `Conversion from '${fromUnit}' to '${toUnit}' is not supported.`,
  );
}

export function extractDateTime(datetimeEpoch) {
  const myDate = fromUnixTime(datetimeEpoch);
  const time = `${myDate.getHours()}:${myDate.getMinutes()}:${myDate.getSeconds()}`;
  const date = `${myDate.getFullYear()}/${myDate.getMonth() + 1}/${myDate.getDate()}`;
  // console.log(`EpochTime:${datetimeEpoch} --> Date:${date} ; Time:${time}`);

  return { time, date };
}

export function date2day(dateString) {
  // Create a Date object
  const date = new Date(dateString);

  // Array of day names
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  // Get the day of the week as a number (0-6)
  const dayNumber = date.getDay();
  // Get the day name from the array
  const dayName = daysOfWeek[dayNumber];
  return dayName;
}

export function isToday(dateString) {
  const date = new Date(dateString);
  const today = new Date(); // Get today's date
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}
