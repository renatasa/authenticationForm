import * as actionTypes from "../actions/actionTypes";
import reducer from "./auth";

// arrange
const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirection: "/",
};

test("When no action is passed to reducer, then default state equals initialState", () => {
  // act
  const newState = reducer(undefined, {});

  // assert
  expect(newState).toEqual(initialState);
});

test("When reducer receives { type: actionTypes.AUTH_START }, then error becomes null, loading becomes true", () => {
  // arrange
  const error = null;
  const loading = true;
  const action = { type: actionTypes.AUTH_START };

  // act
  const newState = reducer(initialState, action);

  // assert
  expect(newState.loading).toBe(loading);
  expect(newState.error).toBe(error);
});

test("When reducer receives { type: actionTypes.AUTH_START, userId: \"random user ID\", idToken : \"random token\" }, then userId becomes action.userId, token becomes idToken, error becomes null, loading becomes true", () => {
  // arrange
  const error = null;
  const loading = false;
  const action = { type: actionTypes.AUTH_SUCCESS, userId: "random user ID", idToken : "random token" };

  // act
  const newState = reducer(initialState, action);

  // assert
  expect(newState.userId).toBe(action.userId)
  expect(newState.token).toBe(action.idToken)
  expect(newState.loading).toBe(loading);
  expect(newState.error).toBe(error);
});

test("When reducer receives { type: actionTypes.AUTH_FAIL, error: \"random error\"}, then error becomes action.error, loading becomes false", () => {
  // arrange
  const loading = false;
  const action = { type: actionTypes.AUTH_FAIL, error: "random error"};

  // act
  const newState = reducer(initialState, action);

  // assert
  expect(newState.error).toBe(action.error);
  expect(newState.loading).toBe(loading);
});

test("When reducer receives { type: actionTypes.SET_AUTH_REDIRECT_PATH, path: \"/randomPath\"}, then authRedirection becomes action.path", () => {
  // arrange
  const action = { type: actionTypes.SET_AUTH_REDIRECT_PATH, path: "/randomPath"};

  // act
  const newState = reducer(initialState, action);

  // assert
  expect(newState.authRedirection).toBe(action.path);
});

test("When reducer receives { type: actionTypes.SET_AUTH_REDIRECT_PATH, path: \"/randomPath\"}, then authRedirection becomes action.path", () => {
  // arrange
  const action = { type: actionTypes.RESET_ERROR};
  const errorAfterReset=null;

  // act
  const newState = reducer(initialState, action);

  // assert
  expect(newState.error).toBe(errorAfterReset);
});

