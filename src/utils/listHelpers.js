export function removeItemOnce(arr, value) {
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  console.log(`Removed ${value} -->  ${arr}`);
  return arr;
}

export function removeItemAll(arr, value) {
  let i = 0;
  while (i < arr.length) {
    if (arr[i] === value) {
      arr.splice(i, 1);
    } else {
      i += 1;
    }
  }
  console.log(`Removed all itemss -->  ${arr}`);
  return arr;
}

export function obj2arr(obj) {
  const entries = Object.entries(obj);
  console.log(`Converted ${obj} --> list ${entries}`);
  return entries;
}

export function getNumelements(arr, num) {
  return arr.filter((el, index) => index % num === 0);
}
