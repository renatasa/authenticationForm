import { findByTestAttr, checkProps } from "../../../test/testUtils";
import { Auth } from "./Auth";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import * as actions from "../../store/actions/auth";
Enzyme.configure({ adapter: new Adapter() });

const returnElementsFromAuthComponent = (expectedPropsFromReduxStore) => {
  const wrapper = shallow(<Auth {...expectedPropsFromReduxStore} />);
  const spinnerComponent = findByTestAttr(wrapper, "component-spinner");
  const loginForm = findByTestAttr(wrapper, "component-loginForm");
  const errorMessageComponent = findByTestAttr(wrapper, "component-error");
  const authComponent = findByTestAttr(wrapper, "component-auth");
  const redirectToTodos = findByTestAttr(wrapper, "component-redirectToTodos");

  return {
    spinnerComponent: spinnerComponent,
    loginForm: loginForm,
    errorMessageComponent: errorMessageComponent,
    authComponent: authComponent,
    redirectToTodos: redirectToTodos,
  };
};

test("When Auth component receives loading: true as expected prop, Spinner , ErrorMessage components are being rendered , login form, Redirect component are not being rendered", () => {
  // arrange
  const expectedPropsFromReduxStore = {
    loading: false,
    isAuthenticated: false,
    authRedirectPath: "/",
    error: "",
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onResetAuthError: () => dispatch(actions.resetError()),
  };

  // act
  const authElements = returnElementsFromAuthComponent(
    expectedPropsFromReduxStore
  );
  const {
    spinnerComponent,
    loginForm,
    errorMessageComponent,
    authComponent,
    redirectToTodos,
  } = authElements;

  // assert
  expect(spinnerComponent.length).toBe(0);
  expect(loginForm.length).toBe(1);
  expect(errorMessageComponent.length).toBe(1);
  expect(authComponent.length).toBe(1);
  expect(redirectToTodos.length).toBe(0);
});

test("When Auth component receives loading: true as a prop, Spinner , ErrorMessage components are being rendered , login form, Redirect component are not being rendered", () => {
  // arrange
  const expectedPropsFromReduxStore = {
    loading: true,
    isAuthenticated: false,
    authRedirectPath: "/",
    error: "",
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onResetAuthError: () => dispatch(actions.resetError()),
  };

  // act
  const authElements = returnElementsFromAuthComponent(
    expectedPropsFromReduxStore
  );
  const {
    spinnerComponent,
    loginForm,
    errorMessageComponent,
    authComponent,
    redirectToTodos,
  } = authElements;

  // assert
  expect(spinnerComponent.length).toBe(1);
  expect(loginForm.length).toBe(0);
  expect(errorMessageComponent.length).toBe(1);
  expect(authComponent.length).toBe(1);
  expect(redirectToTodos.length).toBe(0);
});

test("When Auth component receives loading: false and isAuthenticated: true as props, Redirect, ErrorMessage components are being rendered , login form, Spinner component are not being rendered", () => {
  // arrange
  const expectedPropsFromReduxStore = {
    loading: false,
    isAuthenticated: true,
    authRedirectPath: "/todos",
    error: "",
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onResetAuthError: () => dispatch(actions.resetError()),
  };

  // act
  const authElements = returnElementsFromAuthComponent(
    expectedPropsFromReduxStore
  );
  const {
    spinnerComponent,
    loginForm,
    errorMessageComponent,
    authComponent,
    redirectToTodos,
  } = authElements;

  // assert
  expect(spinnerComponent.length).toBe(0);
  expect(loginForm.length).toBe(1);
  expect(errorMessageComponent.length).toBe(1);
  expect(authComponent.length).toBe(1);
  expect(redirectToTodos.length).toBe(1);
});

test("When Auth component receives correct props from Redux, then it renders without warning", () => {
  //arrange
  const defaultProps = {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onResetAuthError: () => dispatch(actions.resetError()),
    loading: false,
    error: "",
    isAuthenticated: false,
    authRedirectPath: "/",
  };

  // assert
  checkProps(Auth, defaultProps);
});
