export default function roundToTwoDecimals(num) {
  return +Math.round((num + Number.EPSILON) * 100) / 100;
}
