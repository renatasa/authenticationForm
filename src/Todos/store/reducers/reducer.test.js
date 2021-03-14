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

