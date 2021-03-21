import * as actionTypes from "../actions/actionTypes";
import reducer from "./reducer";

// arrange
let initialState = {
  todos: [],
  endpointsArr: [],
  deletedTodos: null,
  loading: false,
  fetchTodoError: "",
  submitCompleteDeleteTodoError: "",
  submitTodoSuccess: false,
};

let initialStateWithSomeTodos = {
  todos: [
    { completed: false, delete: false, todo: "1" },
    { completed: false, delete: false, todo: "2" },
    { completed: true, delete: false, todo: "3" },
    { completed: false, delete: false, todo: "4" },
    { completed: false, delete: false, todo: "5" },
  ],
  endpointsArr: [
    "-MVSiQiKk_syfF9JsBkx",
    "-MVSiR0oDck8IDv3HtqJ",
    "-MVSiRNuIGz7PHDbPhQo",
    "-MVSiSdowPA5Cc1WlcnR",
    "-MVacg3vLa0YlgUnvBxW",
  ],
  deletedTodos: null,
  loading: false,
  fetchTodoError: "",
  submitCompleteDeleteTodoError: "",
  submitTodoSuccess: false,
};

const constants = {
  fetchTodoError: "request failed",
  emptyArray: [],
  emptyString: "",
  mockTodosArrayWithEndpoints: [
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
  ],
  randomTodo: { completed: false, delete: false, todo: "randomTodo" },
  randomEndpoint: "randomEndpoint",
};

test("When no Todo reducer is executed, then default state equals initialState", () => {
  // act
  const newState = reducer(undefined, {});

  // assert
  expect(newState).toEqual(initialState);
});

test('When fetchTodoStart reducer receives type: FETCH_TODO_START, then loading becomes true and fetchTodoError becomes " " ', () => {
  // act
  const newState = reducer(initialState, {
    type: actionTypes.FETCH_TODO_START,
  });
  // assert
  expect(newState.loading).toBe(true);
  expect(newState.fetchTodoError).toBe("");
});

describe("When fetchTodoSuccess reducer receives type: FETCH_TODO_SUCCESS", () => {
  test("and todos is not empty array of objects, todos and endpoints are being saved in state as arrays, loading becomes false", () => {
    // arrange
    const mockTodosArrayWithoutEndpoints = [
      ...Object.values(constants.mockTodosArrayWithEndpoints),
    ];

    const mockEndpointsArrayWithoutTodos = [
      ...Object.keys(constants.mockTodosArrayWithEndpoints),
    ];

    // act
    const newState = reducer(initialState, {
      type: actionTypes.FETCH_TODO_SUCCESS,
      todos: constants.mockTodosArrayWithEndpoints,
    });

    // assert
    expect(newState.todos).toEqual(mockTodosArrayWithoutEndpoints);
    expect(newState.endpointsArr).toEqual(mockEndpointsArrayWithoutTodos);
    expect(newState.loading).toBe(false);
  });

  test("and todos is empty array, todos and endpointsArr are empty arrays, state.loading becomes false", () => {
    // arrange
    const mockTodosArrayWithEndpoints = [];

    // act
    const newState = reducer(initialState, {
      type: actionTypes.FETCH_TODO_SUCCESS,
      todos: mockTodosArrayWithEndpoints,
    });

    // assert
    expect(newState.todos).toEqual(constants.emptyArray);
    expect(newState.endpointsArr).toEqual(constants.emptyArray);
    expect(newState.loading).toBe(false);
  });
});

test("When fetchTodoFail reducer receives type: FETCH_TODO_FAIL, then loading becomes true and fetchTodoError becomes not empty string ", () => {
  // act
  const newState = reducer(initialState, {
    type: actionTypes.FETCH_TODO_FAIL,
    error: constants.fetchTodoError,
  });
  // assert
  expect(newState.loading).toBe(false);
  expect(newState.fetchTodoError).toBe(constants.fetchTodoError);
});

test("When submitTodoStart reducer receives type: SUBMIT_TODO_START, then loading becomes false, submitTodoSuccess becomes false and submitCompleteDeleteTodoError becomes empty string ", () => {
  // act
  const newState = reducer(initialState, {
    type: actionTypes.SUBMIT_TODO_START,
  });
  // assert
  expect(newState.loading).toBe(true);
  expect(newState.submitTodoSuccess).toBe(false);
  expect(newState.submitCompleteDeleteTodoError).toBe(constants.emptyString);
});

test("When submitTodoSuccess reducer receives type: SUBMIT_TODO_SUCCESS, then loading becomes false, submitTodoSuccess becomes true and submitCompleteDeleteTodoError becomes empty string ", () => {
  // arrange
  const newTodosArray = [...initialState.todos, constants.randomTodo];
  const newEndpointsArray = [
    ...initialState.endpointsArr,
    constants.randomEndpoint,
  ];

  // act
  const newState = reducer(initialState, {
    type: actionTypes.SUBMIT_TODO_SUCCESS,
    newTodo: constants.randomTodo,
    newEndpoint: constants.randomEndpoint,
  });

  // assert
  expect(newState.loading).toBe(false);
  expect(newState.submitTodoSuccess).toBe(true);
  expect(newState.submitCompleteDeleteTodoError).toBe(constants.emptyString);
  expect(newState.todos).toEqual(newTodosArray);
  expect(newState.endpointsArr).toEqual(newEndpointsArray);
});

test("When submitTodoFail reducer receives type: SUBMIT_TODO_FAIL, then loading becomes false, submitTodoSuccess becomes false and submitCompleteDeleteTodoError becomes not empty string ", () => {
  // arrange
  const submitTodoError = "submit todo error";

  // act
  const newState = reducer(initialState, {
    type: actionTypes.SUBMIT_TODO_FAIL,
    error: submitTodoError,
  });

  // assert
  expect(newState.loading).toBe(false);
  expect(newState.submitTodoSuccess).toBe(false);
  expect(newState.submitCompleteDeleteTodoError).toBe(submitTodoError);
});

test("When markAsCompletedStart reducer receives type: MARK_AS_COMPLETED_START, then loading becomes false, submitTodoSuccess becomes false and submitCompleteDeleteTodoError becomes empty string ", () => {
  // act
  const newState = reducer(initialState, {
    type: actionTypes.MARK_AS_COMPLETED_START,
  });
  // assert
  expect(newState.loading).toBe(true);
  expect(newState.submitTodoSuccess).toBe(false);
  expect(newState.submitCompleteDeleteTodoError).toBe(constants.emptyString);
});

test("When markAsCompletedStart reducer receives type: MARK_AS_COMPLETED_SUCCESS, then loading becomes false, todos array updates, submitTodoSuccess becomes true and submitCompleteDeleteTodoError becomes empty string ", () => {
  // arrange
  const completedTodoRandomIndex = 1;
  let mockTodosArray = [
    { completed: false, delete: false, todo: "1" },
    { completed: true, delete: false, todo: "2" },
    { completed: true, delete: false, todo: "3" },
    { completed: false, delete: false, todo: "4" },
    { completed: false, delete: false, todo: "5" },
  ];

  // act
  const newState = reducer(initialStateWithSomeTodos, {
    type: actionTypes.MARK_AS_COMPLETED_SUCCESS,
    index: completedTodoRandomIndex,
  });

  // assert
  expect(newState.loading).toBe(false);
  expect(newState.submitTodoSuccess).toBe(true);
  expect(newState.submitCompleteDeleteTodoError).toBe(constants.emptyString);
  expect(newState.todos).toEqual(mockTodosArray);
});

test("When markAsCompletedFail reducer receives type: MARK_AS_COMPLETED_FAIL, then loading becomes false, submitTodoSuccess becomes false and submitCompleteDeleteTodoError becomes not empty string ", () => {
  //arrange
  const randomError = "random error";

  // act
  const newState = reducer(initialState, {
    type: actionTypes.MARK_AS_COMPLETED_FAIL,
    error: randomError,
  });

  // assert
  expect(newState.loading).toBe(false);
  expect(newState.submitTodoSuccess).toBe(false);
  expect(newState.submitCompleteDeleteTodoError).toBe(randomError);
});

test("When deleteTodoStart reducer receives type: DELETE_TODO_START then loading becomes true, submitTodoSuccess becomes false and submitCompleteDeleteTodoError becomes empty string ", () => {
  // act
  const newState = reducer(initialState, {
    type: actionTypes.DELETE_TODO_START,
  });

  // assert
  expect(newState.loading).toBe(true);
  expect(newState.submitTodoSuccess).toBe(false);
  expect(newState.submitCompleteDeleteTodoError).toBe(constants.emptyString);
});

test("When deleteTodoSuccess reducer receives type: DELETE_TODO_SUCCESS then loading becomes false, todos and endpointsArr array change, submitTodoSuccess becomes false and submitCompleteDeleteTodoError becomes empty string ", () => {
  // arrange
  const randomIndex = 1;
  const mockOldTodos = [
    { completed: false, delete: false, todo: "1" },
    { completed: true, delete: false, todo: "3" },
    { completed: false, delete: false, todo: "4" },
    { completed: false, delete: false, todo: "5" },
  ];
  const mockEndpointsArr = [
    "-MVSiQiKk_syfF9JsBkx",
    "-MVSiRNuIGz7PHDbPhQo",
    "-MVSiSdowPA5Cc1WlcnR",
    "-MVacg3vLa0YlgUnvBxW",
  ];

  // act
  const newState = reducer(initialStateWithSomeTodos, {
    type: actionTypes.DELETE_TODO_SUCCESS,
    oldTodos: mockOldTodos,
    index: randomIndex,
  });

  // assert
  expect(newState.loading).toBe(false);
  expect(newState.submitTodoSuccess).toBe(true);
  expect(newState.submitCompleteDeleteTodoError).toBe(constants.emptyString);
  expect(newState.todos).toEqual(mockOldTodos);
  expect(newState.endpointsArr).toEqual(mockEndpointsArr);
});

test("When deleteTodoFail reducer receives type: DELETE_TODO_FAIL then loading becomes true, submitTodoSuccess becomes false and submitCompleteDeleteTodoError becomes not empty string ", () => {
  // arrange
  const randomError = "random error";
  // act
  const newState = reducer(initialState, {
    type: actionTypes.DELETE_TODO_FAIL,
    error: randomError,
  });

  // assert
  expect(newState.loading).toBe(false);
  expect(newState.submitTodoSuccess).toBe(false);
  expect(newState.submitCompleteDeleteTodoError).toBe(randomError);
});

test("When resetError reducer receives type: RESET_ERROR and errorType : submitCompleteDeleteTodoError, then submitCompleteDeleteTodoError becomes not empty string ", () => {
  // arrange
  const errorType = "submitCompleteDeleteTodoError";
  // act
  const newState = reducer(initialState, {
    type: actionTypes.RESET_ERROR,
    errorType: errorType,
  });

  // assert
  expect(newState.submitCompleteDeleteTodoError).toBe(constants.emptyString);
});

test("When logoutUserData reducer receives type:LOGOUT_USER_DATA, then todos , endpointsArr become empty arrays ", () => {
  // arrange
  const emptyArray=[];
  // act
  const newState = reducer(initialState, {
    type: actionTypes.LOGOUT_USER_DATA,
  });

  // assert
  expect(newState.todos).toEqual(emptyArray);
  expect(newState.endpointsArr).toEqual(emptyArray);
});





