export function populateStorage(name, item) {
  if (item) {
    localStorage.setItem(name, JSON.stringify(item));
    return;
  }
  console.log("Invalid item");
}

export function fetchFromStorage(key) {
  let value = localStorage.getItem(key);
  if (value === null) {
    console.log("Key does not exist in localStorage");
  } else {
    try {
      value = JSON.parse(value);
      console.log("Parsed Value:", value);
    } catch (error) {
      console.log("Invalid JSON:", error);
    }
  }

  return value;
}

export function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}
