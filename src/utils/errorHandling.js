// Helper function to handle async errors that doesn't use promise rejects.
export function handleError(fn) {
  return (...params) => fn(...params).catch(console.error);
}

// Form error validation
export function renderError(el, err, apiData) {
  const errorDOM = err;
  errorDOM.textContent = "";
  el.style.boxShadow = "none";
  el.setCustomValidity("");

  // Apply error styling
  if (el.validity.valueMissing) {
    errorDOM.textContent = "*This field is required.";
    el.style.boxShadow = "0 0 5px 1px red";
  } else if (el.validity.typeMismatch) {
    errorDOM.textContent = `*This field must be a ${el.id}.`;
    el.style.boxShadow = "0 0 5px 1px red";
  } else if (el.validity.tooLong) {
    errorDOM.textContent = `*Too long.`;
    el.style.boxShadow = "0 0 5px 1px red";
  } else if (el.validity.tooShort) {
    errorDOM.textContent = `*Too short.`;
    el.style.boxShadow = "0 0 5px 1px red";
  } else if (apiData === undefined) {
    errorDOM.textContent = `*Page falied to update: This field must be a valid city.`;
    el.style.boxShadow = "0 0 5px 1px red";
  }

  // Reset error styling
  setTimeout(() => {
    errorDOM.textContent = "";
    el.style.boxShadow = "none";
    el.setCustomValidity("");
  }, 10000);
}
