import * as actionTypes from "./actionTypes";
import axios from 'axios';
import moxios from 'moxios';
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "../reducers/auth";
import todosReducer from "../../../Todos/store/reducers/reducer";

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

describe('integration test', () => {
  beforeEach(() => {
    moxios.install({baseURL:"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCmT_Z0Oh8gopkFVIKavmOUFknOQWono5M"});
  });
  afterEach(() => {
    moxios.uninstall();
  });
test("When auth completes axios request with response code 200, then token, userId, authRedirection are updated in redux store", ()=>{
  // {baseURL:"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCmT_Z0Oh8gopkFVIKavmOUFknOQWono5M"}
  
  // arrange
  const email = "email@email.com";
  const password = "password";
  const isSignUp = true;
  const responseData={idToken: "someToken", localId:"someLocalId", expiresIn: 1000}

  // act
  moxios.wait(() => {
    console.log('moxios1')
    const request = moxios.requests.mostRecent();
    console.log('moxios2')
    request.respondWith({
      status: 200,
      response: responseData,
    });
  });

  // assert
  const rootReducer = combineReducers({
    auth: authReducer,
    todos: todosReducer,
  });

  const store = createStore(
    rootReducer, 
    applyMiddleware(thunk)
  );

  let x =store.getState();
  console.log('store token', x);
  console.log(store);
  console.log(request)

  return store.dispatch(auth(email, password, isSignUp)).then(() => {
        const newState = store.getState();
        expect(newState.auth.token).toBe(responseData.idToken);
      })
})
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
