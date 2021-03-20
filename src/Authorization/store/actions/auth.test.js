import * as actionTypes from "./actionTypes";
import {
  authStart,
  authSuccess,
  authFail,
  logout,
  setAuthRedirectPath,
  resetError,
} from "./auth.js";

test("When authStart executes, then it returns type: actionTypes.AUTH_START", () => {
  // arrange
  const actionType = actionTypes.AUTH_START;

  // act
  const actionResult = authStart();

  // assert
  expect(actionResult).toEqual({
    type: actionType,
  });
});

test("When authSuccess receives userId and token, then it returns type: actionTypes.AUTH_SUCCESS, userId and token", () => {
  // arrange
  const actionType = actionTypes.AUTH_SUCCESS;
  const randomUserId = "random user id";
  const randomToken = "random token";

  // act
  const actionResult = authSuccess(randomToken, randomUserId);

  // assert
  expect(actionResult).toEqual({
      type: actionType,
    userId :randomUserId,
    idToken: randomToken
  });
});

test("When authFail receives type:actionTypes.AUTH_FAIL and error, then it returns type:actionTypes.AUTH_FAIL and error", () => {

  // arrange
  const actionType = actionTypes.AUTH_FAIL;
  const inputError = "Request failed with status code 401";

// act
const actionResult= authFail(inputError);

  expect(actionResult).toEqual({
    type: actionType,
    error: inputError,
  });
});


test("When logout executes, then it returns type: actionTypes.AUTH_LOGOUT", () => {
    // arrange
    const actionType = actionTypes.AUTH_LOGOUT;
  
    // act
    const actionResult = logout();
  
    // assert
    expect(actionResult).toEqual({
      type: actionType,
    });
  });

  test("When logout executes, then it returns type: actionTypes.AUTH_LOGOUT", () => {
    // arrange
    const actionType = actionTypes.AUTH_LOGOUT;
  
    // act
    const actionResult = logout();
  
    // assert
    expect(actionResult).toEqual({
      type: actionType,
    });
  });

  test("When setAuthRedirectPath executes, then it returns type: actionTypes.SET_AUTH_REDIRECT_PATH", () => {
    // arrange
    const actionType = actionTypes.SET_AUTH_REDIRECT_PATH;
    const randomPath="/todos";
  
    // act
    const actionResult = setAuthRedirectPath(randomPath);
  
    // assert
    expect(actionResult).toEqual({
      type: actionType,
      path: randomPath
    });
  });
  

  test("When resetError executes, then it returns type: actionTypes.RESET_ERROR", () => {
    // arrange
    const actionType = actionTypes.RESET_ERROR;
  
    // act
    const actionResult = resetError();
  
    // assert
    expect(actionResult).toEqual({
      type: actionType
    });
  });