let createWarning = (stateWarning) => {
  let warning = stateWarning
    ? { errorText: "Input field is empty!", errorType: "warning" }
    : { errorText: "", errorType: "warning" };

  return warning;
};

let createMaxTodosLimitExceeded = (tooManyTodos) => {
  let maxTodosLimitExceeded = tooManyTodos
    ? {
        errorText: "No more than 5 todos are available",
        errorType: "tooManyTodos",
      }
    : { errorText: "", errorType: "tooManyTodos" };

  return maxTodosLimitExceeded;
};

export { createWarning, createMaxTodosLimitExceeded };
