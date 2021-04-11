import * as actionTypes from "./actionTypes";
import moxios from "moxios";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { creatingStore, mockRequest } from "../../../test/testUtils";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "../../../Authorization/store/reducers/auth";
import todosReducer from "../reducers/reducer";

Enzyme.configure({ adapter: new Adapter() });

import {
  actionStart,
  actionFail,
  fetchTodoSuccess,
  fetchTodo,
  submitTodo,
  createUrlWithUserId,
  submitTodoSuccess,
  markAsCompletedSuccess,
  deleteTodoSuccess,
  resetError,
  logoutUserData,
} from "./fetchTodo.js";

describe("integration test", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  test("When fetchTodo receives server response 200, then todos and endpointsArr arrays are updated in redux store", () => {
    // arrange
    const inputConstants = {
      token: "someToken",
      userId: "someUserId",
    };

    const responseData = [
      {
        "-MVSiQiKk_syfF9JsBkx": { completed: false, delete: false, todo: "1" },
      },
      {
        "-MVSiR0oDck8IDv3HtqJ": { completed: false, delete: false, todo: "2" },
      },
      { "-MVSiRNuIGz7PHDbPhQo": { completed: true, delete: false, todo: "3" } },
    ];

    const serverResponseOk = 200;

    // act
    mockRequest(serverResponseOk, responseData);
    const store = creatingStore();

    // assert
    return store
      .dispatch(fetchTodo(inputConstants.token, inputConstants.userId))
      .then(() => {
        const actualState = store.getState();
        expect(actualState.todos.todos).toEqual([...Object.values(responseData)]);
        expect(actualState.todos.endpointsArr).toEqual([
          ...Object.keys(responseData),
        ]);
      });
  });

  test("When fetchTodo receives server response 400, then fetchTodoError updates, todos and endpointsArr are equal to empty arrays in redux store", () => {
    // arrange
    const inputConstants = {
      token: "someToken",
      userId: "someUserId",
    };

    const responseData = { message: "Request failed with status code 400" };
    const badRequest = 400;
    const emptyArray = [];

    // act
    mockRequest(badRequest, responseData);
    const store = creatingStore();

    // assert
    return store
      .dispatch(fetchTodo(inputConstants.token, inputConstants.userId))
      .then(() => {
        const actualState = store.getState();
        expect(actualState.todos.fetchTodoError).toBe(responseData.message);
        expect(actualState.todos.todos).toEqual(emptyArray);
        expect(actualState.todos.endpointsArr).toEqual(emptyArray);
      });
  });


  test("When submitTodo receives server response 200, then new todo and new endpoint are being added to todos and endpointsArr arrays,  submitCompleteDeleteTodoError equals empty string in redux store", () => {
    // arrange
    const inputConstants = {
      token: "someToken",
      userId: "someUserId",
      todos: [
        { completed: false, delete: false, todo: "1" },
        { completed: false, delete: false, todo: "2" },
        { completed: true, delete: false, todo: "3" },
      ],
    };

    const initialState = {
      todos: {
        todos: [
          { completed: false, delete: false, todo: "1" },
          { completed: false, delete: false, todo: "2" },
        ],
        endpointsArr: ["randomEndpoint1", "randomEndpoint2"],
        submitCompleteDeleteTodoError: "",
      },
    };

    const responseData = { name: "randomEndpoint3" };

    const serverResponseOk = 200;

    // act
    mockRequest(serverResponseOk, responseData);

    const rootReducer = combineReducers({
      auth: authReducer,
      todos: todosReducer,
    });

    const store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(thunk)
    );

    // assert
    return store
      .dispatch(
        submitTodo(
          inputConstants.token,
          inputConstants.todos,
          inputConstants.userId
        )
      )
      .then(() => {
        const actualState = store.getState();
        console.log(actualState.todos.submitCompleteDeleteTodoError)
        expect(actualState.todos.todos[actualState.todos.todos.length - 1]).toEqual(
          inputConstants.todos[inputConstants.todos.length - 1]
        );
        expect(
          actualState.todos.endpointsArr[actualState.todos.endpointsArr.length - 1]
        ).toEqual(responseData.name);
        expect(
          actualState.todos.submitCompleteDeleteTodoError
        ).toBe(initialState.todos.submitCompleteDeleteTodoError);
      });
  });


  test("When submitTodo receives server response 400, then todos and endpointsArr arrays remains the same , submitCompleteDeleteTodoError is updated in redux store", () => {
    // arrange
    const inputConstants = {
      token: "someToken",
      userId: "someUserId",
      todos: [
        { completed: false, delete: false, todo: "1" },
        { completed: false, delete: false, todo: "2" },
        { completed: true, delete: false, todo: "3" },
      ],
    };

    const initialState = {
      todos: {
        todos: [
          { completed: false, delete: false, todo: "1" },
          { completed: false, delete: false, todo: "2" },
        ],
        endpointsArr: ["randomEndpoint1", "randomEndpoint2"],
        submitCompleteDeleteTodoError: "",
      },
    };

    const responseData = { message: "Request failed with status code 400" };

    const badRequest = 400;

    // act
    mockRequest(badRequest, responseData);

    const rootReducer = combineReducers({
      auth: authReducer,
      todos: todosReducer,
    });

    const store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(thunk)
    );

    // assert
    return store
      .dispatch(
        submitTodo(
          inputConstants.token,
          inputConstants.todos,
          inputConstants.userId
        )
      )
      .then(() => {
        const actualState = store.getState();
        expect(actualState.todos.todos).toEqual(
          initialState.todos.todos
        );
        expect(
          actualState.todos.endpointsArr
        ).toEqual(initialState.todos.endpointsArr);
        expect(
          actualState.todos.submitCompleteDeleteTodoError
        ).toBe(responseData.message);
      });
  });
});

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
