import * as actionTypes from "./actionTypes";
import {
  actionStart,
  actionFail,
  fetchTodoSuccess,
  submitTodoSuccess,
  markAsCompletedSuccess,
  deleteTodoSuccess,
  resetError,
  logoutUserData,
} from "./fetchTodo.js";



test("When authStart receives type: actionTypes.FETCH_TODO_START, then it returns type: actionTypes.FETCH_TODO_START", () => {
  const actionType = actionTypes.FETCH_TODO_START;

  expect(actionStart(actionType)).toEqual({
    type: actionType,
  });
});

test("When authFail receives type:actionTypes.FETCH_TODO_FAIL and error, then it returns type:actionTypes.FETCH_TODO_FAIL and error", () => {
  const actionType = actionTypes.FETCH_TODO_FAIL;
  const inputError = "Request failed with status code 401";

  expect(actionFail(inputError, actionType)).toEqual({
    type: actionType,
    error: inputError,
  });
});

test("When fetchTodoSuccess receives todos array of objects, then it returns type: actionTypes.FETCH_TODO_SUCCESS and todos array ob objects", () => {
  const todo = [
    {
      "-MVSiQiKk_syfF9JsBkx": { completed: false, delete: false, todo: "1" },
    },
    {
      "-MVSiR0oDck8IDv3HtqJ": { completed: false, delete: false, todo: "2" },
    },
    { "-MVSiRNuIGz7PHDbPhQo": { completed: true, delete: false, todo: "3" } },
    {
      "-MVSiSdowPA5Cc1WlcnR": { completed: false, delete: false, todo: "4" },
    },
    {
      "-MVacg3vLa0YlgUnvBxW": { completed: false, delete: false, todo: "5" },
    },
  ];

  const actionType = actionTypes.FETCH_TODO_SUCCESS;

  expect(fetchTodoSuccess(todo)).toEqual({
    type: actionType,
    todos: todo,
  });
});

test("When submitTodoSuccess receives type:actionTypes.SUBMIT_TODO_SUCCESS, newTodo and newEndpoint, then it returns type:actionTypes.SUBMIT_TODO_SUCCESS, newTodo and newEndpoint", () => {
  const newTodo = { completed: false, delete: false, todo: "6" };
  const newEndpoint = "-MVacg3vLa0YlgUnvBxW";
  const actionType = actionTypes.SUBMIT_TODO_SUCCESS;

  expect(submitTodoSuccess(newTodo, newEndpoint)).toEqual({
    type: actionType,
    newTodo: newTodo,
    newEndpoint: newEndpoint,
  });
});

test("When markAsCompletedSuccess receives type:actionTypes.MARK_AS_COMPLETED_SUCCESS and index, then it returns actionTypes.MARK_AS_COMPLETED_SUCCESS and index", () => {
  const randomIndex = 1;
  const actionType = actionTypes.MARK_AS_COMPLETED_SUCCESS;

  expect(markAsCompletedSuccess(randomIndex)).toEqual({
    type: actionType,
    index: randomIndex,
  });
});

test("When deleteTodoSuccess receives type:actionTypes.DELETE_TODO_SUCCESS, index and oldTodos, then it returns actionTypes.DELETE_TODO_SUCCESS, index and oldTodos", () => {
  const randomIndex = 3;
  const actionType = actionTypes.DELETE_TODO_SUCCESS;
  const oldTodosInput = [
    {
      "-MVSiQiKk_syfF9JsBkx": { completed: false, delete: false, todo: "1" },
    },
    {
      "-MVSiR0oDck8IDv3HtqJ": { completed: false, delete: false, todo: "2" },
    },
    { "-MVSiRNuIGz7PHDbPhQo": { completed: true, delete: false, todo: "3" } },
    {
      "-MVacg3vLa0YlgUnvBxW": { completed: false, delete: false, todo: "5" },
    },
  ];

  expect(deleteTodoSuccess(oldTodosInput, randomIndex)).toEqual({
    type: actionType,
    index: randomIndex,
    oldTodos: oldTodosInput,
  });
});

test("When resetError type:actionTypes.RESET_ERROR and errorType, then it returns type:actionTypes.RESET_ERROR and errorType", () => {
  const actionType = actionTypes.RESET_ERROR;
  const errorTypeInput = "tooManyTodos";

  expect(resetError(errorTypeInput)).toEqual({
    type: actionType,
    errorType: errorTypeInput,
  });
});

test("When logoutUserData receives type:actionTypes.LOGOUT_USER_DATA, then it returns actionTypes.LOGOUT_USER_DATA", () => {
  const actionType = actionTypes.LOGOUT_USER_DATA;

  expect(logoutUserData()).toEqual({
    type: actionType,
  });
});
