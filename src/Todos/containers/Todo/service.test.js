import { createWarning, createMaxTodosLimitExceeded } from "./service.js";

// props being passed to ErrorMessage component generates warning
test("checkValidity function result should be truthy", () => {
  let stateWarning = true;
  expect(createWarning(stateWarning)).toEqual({
    errorText: "Input field is empty!",
    errorType: "warning",
  });
});

// props being passed to ErrorMessage component does not generate warning
test("checkValidity function result should be truthy", () => {
  let stateWarning = false;
  expect(createWarning(stateWarning)).toEqual({
    errorText: "",
    errorType: "warning",
  });
});

// props being passed to ErrorMessage component generate tooManyTodos Error Message
test("checkValidity function result should be truthy", () => {
  let tooManyTodos = true;
  expect(createMaxTodosLimitExceeded(tooManyTodos)).toEqual({
    errorText: "No more than 5 todos are available",
    errorType: "tooManyTodos",
  });
});

// props being passed to ErrorMessage component does not generate tooManyTodos Error Message
test("checkValidity function result should be truthy", () => {
  let tooManyTodos = false;
  expect(createMaxTodosLimitExceeded(tooManyTodos)).toEqual({
    errorText: "",
    errorType: "tooManyTodos",
  });
});
