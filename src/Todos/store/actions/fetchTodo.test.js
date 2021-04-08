import * as actionTypes from "./actionTypes";

// import axios from 'axios';
// import moxios from 'moxios';
// import Enzyme from "enzyme";
// import Adapter from "@wojtekmaj/enzyme-adapter-react-17";


// import { createStore, applyMiddleware, compose, combineReducers } from "redux";
// import thunk from "redux-thunk";
// import authReducer from "../../../Authorization/store/reducers/auth";
// import todosReducer from "../../store/reducers/reducer";

// Enzyme.configure({ adapter: new Adapter() });


import {
  actionStart,
  actionFail,
  fetchTodoSuccess,
  fetchTodo,
  createUrlWithUserId,
  submitTodoSuccess,
  markAsCompletedSuccess,
  deleteTodoSuccess,
  resetError,
  logoutUserData,
} from "./fetchTodo.js";

test("When actionStart receives type: actionTypes.FETCH_TODO_START, then it returns type: actionTypes.FETCH_TODO_START", () => {
  // arrange
  const actionType = actionTypes.FETCH_TODO_START;

  // act
  const actionResult = actionStart(actionType);

  // assert
  expect(actionResult).toEqual({
    type: actionType,
  });
});

test("When actionFail receives type:actionTypes.FETCH_TODO_FAIL and error, then it returns type:actionTypes.FETCH_TODO_FAIL and error", () => {
  // arrange
  const actionType = actionTypes.FETCH_TODO_FAIL;
  const inputError = "Request failed with status code 401";

  // act
  const actionResult = actionFail(inputError, actionType);

  // assert
  expect(actionResult).toEqual({
    type: actionType,
    error: inputError,
  });
});

test("When createUrlWithUserId receives initialUrl, userId and token, then finalUrl is returned", () => {
  // arrange
  const initialUrl = `${process.env.REACT_APP_POST_TODO_DYNAMIC}`;
  const userId = "randomUserId";
  const token = "randomToken";
  const finalUrl =
    `${process.env.REACT_APP_POST_TODO_DYNAMIC}` +
    `/randomUserId.json?auth=randomToken`;

  // act
  const functionResult = createUrlWithUserId(initialUrl, userId, token);

  // assert
  expect(functionResult).toBe(finalUrl);
});

test("When fetchTodoSuccess receives todos array of objects, then it returns type: actionTypes.FETCH_TODO_SUCCESS and todos array of objects", () => {
  // arrange
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

  // act
  const actionResult = fetchTodoSuccess(todo);

  // assert
  expect(actionResult).toEqual({
    type: actionType,
    todos: todo,
  });
});

test("When submitTodoSuccess receives newTodo object, then object with type SUBMIT_TODO_SUCCESS is created", () => {
  // arrange
  const newTodo = { completed: false, delete: false, todo: "6" };
  const newEndpoint = "-MVacg3vLa0YlgUnvBxW";
  const actionType = actionTypes.SUBMIT_TODO_SUCCESS;

  // act
  const actionResult = submitTodoSuccess(newTodo, newEndpoint);
  // assert
  expect(actionResult).toEqual({
    type: actionType,
    newTodo: newTodo,
    newEndpoint: newEndpoint,
  });
});

test("When markAsCompletedSuccess receives type:actionTypes.MARK_AS_COMPLETED_SUCCESS and index, then it returns actionTypes.MARK_AS_COMPLETED_SUCCESS and index", () => {
  // arrange
  const randomIndex = 1;
  const actionType = actionTypes.MARK_AS_COMPLETED_SUCCESS;

  // act
  const actionResult = markAsCompletedSuccess(randomIndex);

  //assert
  expect(actionResult).toEqual({
    type: actionType,
    index: randomIndex,
  });
});

test("When deleteTodoSuccess receives type:actionTypes.DELETE_TODO_SUCCESS, index and oldTodos, then it returns actionTypes.DELETE_TODO_SUCCESS, index and oldTodos", () => {
  // arrange
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

  // act
  const actionResult = deleteTodoSuccess(oldTodosInput, randomIndex);

  // assert
  expect(actionResult).toEqual({
    type: actionType,
    index: randomIndex,
    oldTodos: oldTodosInput,
  });
});

test("When resetError receives type:actionTypes.RESET_ERROR and errorType, then it returns type:actionTypes.RESET_ERROR and errorType", () => {
  // arrange
  const actionType = actionTypes.RESET_ERROR;
  const errorTypeInput = "tooManyTodos";

  // act
  const actionResult = resetError(errorTypeInput);

  // assert
  expect(actionResult).toEqual({
    type: actionType,
    errorType: errorTypeInput,
  });
});

test("When logoutUserData receives type:actionTypes.LOGOUT_USER_DATA, then it returns actionTypes.LOGOUT_USER_DATA", () => {
  // arrange
  const actionType = actionTypes.LOGOUT_USER_DATA;

  // act
  const actionResult = logoutUserData();

  // assert
  expect(actionResult).toEqual({
    type: actionType,
  });
});
