export async function updatePage(domElements, data) {
  // Switch to use displayController.
  domElements.forEach((el) => {
    el.updateDisplay(data);
  });
}

export function loadImages() {}

export function handleErrors() {}

export function loadScreen() {}
