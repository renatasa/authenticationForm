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
  const actualState = reducer(undefined, {});

  // assert
  expect(actualState).toEqual(initialState);
});

test("When reducer receives { type: actionTypes.AUTH_START }, then error becomes null, loading becomes true", () => {
  // arrange
  const expectedStateError = null;
  const expectedStateLoading = true;
  const action = { type: actionTypes.AUTH_START };

  // act
  const actualState = reducer(initialState, action);

  // assert
  expect(actualState.loading).toBe(expectedStateLoading);
  expect(actualState.error).toBe(expectedStateError);
});

test("When reducer receives { type: actionTypes.AUTH_START }, then userId and idToken are being updated in state, error becomes null, loading becomes true", () => {
  // arrange
  const expectedStateError = null;
  const expectedStateLoading = false;
  const action = {
    type: actionTypes.AUTH_SUCCESS,
    userId: "random user ID",
    idToken: "random token",
  };

  // act
  const actualState = reducer(initialState, action);

  // assert
  expect(actualState.userId).toBe(action.userId);
  expect(actualState.token).toBe(action.idToken);
  expect(actualState.loading).toBe(expectedStateLoading);
  expect(actualState.error).toBe(expectedStateError);
});

test("When reducer receives { type: actionTypes.AUTH_FAIL }, then error updates, loading becomes false", () => {
  // arrange
  const expectedStateLoading = false;
  const action = { type: actionTypes.AUTH_FAIL, error: "random error" };

  // act
  const actualState = reducer(initialState, action);

  // assert
  expect(actualState.error).toBe(action.error);
  expect(actualState.loading).toBe(expectedStateLoading);
});

test("When reducer receives { type: actionTypes.SET_AUTH_REDIRECT_PATH }, then authRedirection updates in state", () => {
  // arrange
  const action = {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: "/randomPath",
  };

  // act
  const actualState = reducer(initialState, action);

  // assert
  expect(actualState.authRedirection).toBe(action.path);
});

test("When reducer receives { type: actionTypes.SET_RESET_ERROR}, then error becomes null in state", () => {
  // arrange
  const action = { type: actionTypes.RESET_ERROR };
  const expectedStateErrorAfterReset = null;

  // act
  const actualState = reducer(initialState, action);

  // assert
  expect(actualState.error).toBe(expectedStateErrorAfterReset);
});
