export default function convertUnits(value, fromUnit, toUnit) {
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
    console.log(`${fromUnit}:${myValue} --> ${toUnit}:${myValue}}`);
    return convertedValue;
  }
  throw new Error(
    `Conversion from '${fromUnit}' to '${toUnit}' is not supported.`,
  );
}
