import { createWarning, createMaxTodosLimitExceeded } from "./service.js";

test('When createWarning receives true, then {errorText: "Input field is empty!", errorType: "warning"} object is returned', () => {
  // arrange
  const stateWarning = true;
  // assert
  expect(createWarning(stateWarning)).toEqual({
    errorText: "Input field is empty!",
    errorType: "warning",
  });
});

test('When createWarning receives false, then {errorText: "", errorType: "warning"} object is returned', () => {
  // arrange
  const stateWarning = false;
  // assert
  expect(createWarning(stateWarning)).toEqual({
    errorText: "",
    errorType: "warning",
  });
});

test('When createMaxTodosLimitExceeded receives true, then {errorText: "No more than 5 todos are available", errorType: "tooManyTodos"} is returned', () => {
  // arrange
  const tooManyTodos = true;
  // assert
  expect(createMaxTodosLimitExceeded(tooManyTodos)).toEqual({
    errorText: "No more than 5 todos are available",
    errorType: "tooManyTodos",
  });
});

test('When createMaxTodosLimitExceeded receives false, then {errorText: "",  errorType: "tooManyTodos"}', () => {
  // arrange
  const tooManyTodos = false;
  // assert
  expect(createMaxTodosLimitExceeded(tooManyTodos)).toEqual({
    errorText: "",
    errorType: "tooManyTodos",
  });
});
