// Helper function to handle async errors that doesn't use promise rejects.
export default function handleError(fn) {
  return (...params) => fn(...params).catch(console.error);
}

// Form error validation
