export default function convertUnits(value, fromUnit, toUnit) {
  const newValue = value;
  const conversions = {
    // Length conversions
    "inches to centimeters": () => newValue * 2.54,
    "centimeters to inches": () => newValue / 2.54,
    "feet to meters": () => newValue * 0.3048,
    "meters to feet": () => newValue / 0.3048,
    "miles to kilometers": () => newValue * 1.60934,
    "kilometers to miles": () => newValue / 1.60934,

    // Weight conversions
    "pounds to kilograms": () => newValue * 0.453592,
    "kilograms to pounds": () => newValue / 0.453592,
    "ounces to grams": () => newValue * 28.3495,
    "grams to ounces": () => newValue / 28.3495,

    // Temperature conversions
    "fahrenheit to celsius": () => ((newValue - 32) * 5) / 9,
    "celsius to fahrenheit": () => (newValue * 9) / 5 + 32,
  };

  const key = `${fromUnit.toLowerCase()} to ${toUnit.toLowerCase()}`;

  if (conversions[key]) {
    return conversions[key](newValue);
  }
  throw new Error(
    `Conversion from '${fromUnit}' to '${toUnit}' is not supported.`,
  );
}
