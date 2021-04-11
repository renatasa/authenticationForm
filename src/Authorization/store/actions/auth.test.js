import * as actionTypes from "./actionTypes";
import moxios from "moxios";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { creatingStore, mockRequest } from "../../../test/testUtils";

Enzyme.configure({ adapter: new Adapter() });

import {
  authStart,
  authSuccess,
  authFail,
  auth,
  logout,
  setAuthRedirectPath,
  resetError,
} from "./auth.js";

describe("integration test", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test("When auth action creator completes axios request with response code 200, then token, userId, authRedirection are updated in redux store", () => {
    // arrange
    const inputConstants = {
      email: "email@email.com",
      password: "password",
      isSignUp: true,
    };
    const serverResponseOk = 200;
    const responseData = { idToken: "someToken", localId: "someLocalId" };
    const updatedAuthRedirection = "/todos";

    // act
    mockRequest(serverResponseOk, responseData);
    const store = creatingStore();

    // assert

    return store
      .dispatch(
        auth(
          inputConstants.email,
          inputConstants.password,
          inputConstants.isSignUp
        )
      )
      .then(() => {
        const actualState = store.getState();
        expect(actualState.auth.token).toBe(responseData.idToken);
        expect(actualState.auth.userId).toBe(responseData.localId);
        expect(actualState.auth.authRedirection).toBe(updatedAuthRedirection);
      });
  });

  test("When auth action creator completes axios request with response code 400, then error in redux store is updated", () => {
    // arrange
    const inputConstants = {
      email: "email@email.com",
      password: "password",
      isSignUp: true,
    };
    const badRequest = 400;
    const emptyStoreData = { idToken: "", localId: "", authRedirection: "/" };
    const responseData = { error: "Request failed with status code 400" };

    // act
    mockRequest(badRequest, responseData);

    const store = creatingStore();

    // assert

    return store
      .dispatch(
        auth(
          inputConstants.email,
          inputConstants.password,
          inputConstants.isSignUp
        )
      )
      .then(() => {
        const actualState = store.getState();
        expect(actualState.auth.token).toBe(emptyStoreData.idToken);
        expect(actualState.auth.userId).toBe(emptyStoreData.localId);
        expect(actualState.auth.authRedirection).toBe(
          emptyStoreData.authRedirection
        );
        expect(actualState.auth.error).toBe(responseData.error);
      });
  });
});

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
    userId: randomUserId,
    idToken: randomToken,
  });
});

test("When authFail receives type:actionTypes.AUTH_FAIL and error, then it returns type:actionTypes.AUTH_FAIL and error", () => {
  // arrange
  const actionType = actionTypes.AUTH_FAIL;
  const inputError = "Request failed with status code 401";

  // act
  const actionResult = authFail(inputError);

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

test("When setAuthRedirectPath executes, then it returns type: actionTypes.SET_AUTH_REDIRECT_PATH", () => {
  // arrange
  const actionType = actionTypes.SET_AUTH_REDIRECT_PATH;
  const randomPath = "/todos";

  // act
  const actionResult = setAuthRedirectPath(randomPath);

  // assert
  expect(actionResult).toEqual({
    type: actionType,
    path: randomPath,
  });
});

test("When resetError executes, then it returns type: actionTypes.RESET_ERROR", () => {
  // arrange
  const actionType = actionTypes.RESET_ERROR;

  // act
  const actionResult = resetError();

  // assert
  expect(actionResult).toEqual({
    type: actionType,
  });
});
