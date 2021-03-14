import * as actionTypes from "../actions/actionTypes";
import reducer from "./reducer";

let initialState = {
  todos: [],
  endpointsArr: [],
  deletedTodos: null,
  loading: false,
  fetchTodoError: "",
  submitCompleteDeleteTodoError: "",
  submitTodoSuccess: false,
};

test("Todo reducer returns default state when no actions are dispatched", () => {
  const newState = reducer(undefined, {});

  expect(newState).toEqual(initialState);
});

test("Todo reducer returns state when fetchTodoStart action is dispatched", () => {
  const newState = reducer(initialState, {
    type: actionTypes.FETCH_TODO_START,
  });
  expect(newState.loading).toBe(true);
  expect(newState.fetchTodoError).toBe("");
});

test("Todo reducer returns state when fetchTodoSuccess action is dispatched and there are some todos fetched from backend", () => {
  const mockTodosArrayWithEndpoints = [
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

  const newState = reducer(initialState, {
    type: actionTypes.FETCH_TODO_SUCCESS,
    todos: mockTodosArrayWithEndpoints,
  });

  expect(newState.todos).toEqual([...Object.values(mockTodosArrayWithEndpoints)]);
  expect(newState.endpointsArr).toEqual([...Object.keys(mockTodosArrayWithEndpoints)]);
  expect(newState.loading).toBe(false);
});


