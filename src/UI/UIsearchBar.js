// form handling
export default function renderError(el, err) {
  const errorDOM = err;
  errorDOM.textContent = "";
  if (el.validity.valueMissing) {
    errorDOM.textContent = "This field is required.";
  } else if (el.validity.typeMismatch) {
    errorDOM.textContent = `This field must be a ${el.id}.`;
  } else if (el.validity.tooLong) {
    errorDOM.textContent = `Too long.`;
  } else if (el.validity.tooShort) {
    errorDOM.textContent = `Too short.`;
  }
}
