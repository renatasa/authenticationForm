import { findByTestAttr, checkProps } from "../../../test/testUtils";
import { Todo as unconnectedTodo } from "./Todo";
import Todo from "./Todo";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import * as actions from "../../store/actions/fetchTodo";
Enzyme.configure({ adapter: new Adapter() });

import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "../../../Authorization/store/reducers/auth";
import todosReducer from "../../store/reducers/reducer";
import { Provider } from "react-redux";

test("When Todo component receives required props from Redux, then it renders without throwing warning", () => {
  //arrange
  const defaultProps = {
    todos: [],
    endpointsArr: [],
    deletedTodos: null,
    loading: false,
    fetchTodoError: "",
    submitTodoError: "",
    submitTodoSuccess: false,
    token: "randomToken",
    userId: "randomUserId",
    onFetchTodo: (token, userId) => dispatch(actions.fetchTodo(token, userId)),
    onSubmitTodo: (userId, newTodo, token) =>
      dispatch(actions.submitTodo(userId, newTodo, token)),
    onMarkAsCompleted: (endpoint, index, todo, token, userId) =>
      dispatch(actions.markAsCompleted(endpoint, index, todo, token, userId)),
    onDeleteTodo: (endpoint, index, todos, token, userId) =>
      dispatch(actions.deleteTodo(endpoint, index, todos, token, userId)),
    onResetError: (errorType) => dispatch(actions.resetError(errorType)),
    onLogoutUserData: () => dispatch(actions.logoutUserData()),
  };

  // assert
  checkProps(unconnectedTodo, defaultProps);
});

test("When Todo component receives token and userId props from Redux, then it renders todoComponent, SignOutButtonComponent, todoForm, fetchTodoError, submitCompleteDeleteTodoError, maxTodoLimitExceededError  ", () => {
  // arrange
  const expectedPropsFromReduxStore = {
    todos: {
      todos: [],
      endpointsArr: [],
      loading: false,
      fetchTodoError: "",
      submitCompleteDeleteTodoError: "",
      submitTodoSuccess: false,
      onFetchTodo: (token, userId) =>
        dispatch(actions.fetchTodo(token, userId)),
    },
    auth: {token: "randomToken", userId: "randomUserId" },
  };

  const rootReducer = combineReducers({
    auth: authReducer,
    todos: todosReducer,
  });

  const store = createStore(
    rootReducer,
    expectedPropsFromReduxStore,
    applyMiddleware(thunk)
  );

  // act
  const wrapper = shallow(<Todo store={store} />)
    .dive()
    .dive();
  console.log(wrapper.debug());
  const todoComponent = findByTestAttr(wrapper, "component-Todo");
  const SignOutButtonComponent = findByTestAttr(
    wrapper,
    "component-SignOutButton"
  );
  const todoFormComponent = findByTestAttr(wrapper, "component-todoForm");
  const fetchTodoErrorComponent = findByTestAttr(
    wrapper,
    "component-fetchTodoError"
  );
  const submitCompleteDeleteTodoErrorComponent = findByTestAttr(
    wrapper,
    "component-submitCompleteDeleteTodoError"
  );
  const maxTodoLimitExceededErrorComponent = findByTestAttr(
    wrapper,
    "component-maxTodoLimitExceededError"
  );

  // assert
  expect(todoComponent.length).toBe(1);
  expect(SignOutButtonComponent.length).toBe(1);
  expect(todoFormComponent.length).toBe(1);
  expect(fetchTodoErrorComponent.length).toBe(1);
  expect(submitCompleteDeleteTodoErrorComponent.length).toBe(1);
  expect(maxTodoLimitExceededErrorComponent.length).toBe(1);
});

