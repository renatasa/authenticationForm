import Resct from "react";
import { findByTestAttr } from "../../../test/testUtils";
import { Auth } from "./Auth";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new Adapter() });

test("When Auth component receives loading: true as expected prop, Spinner , ErrorMessage components are being rendered , login form, Redirect component are not being rendered", () => {
  // arrange
  const expectedPropsFromReduxStore = {
    loading: false,
    isAuthenticated: false,
    authRedirectPath: '/'
  };

  // act
  const wrapper = shallow(<Auth {...expectedPropsFromReduxStore} />);
  const spinnerComponent = findByTestAttr(wrapper, "component-spinner");
  const loginForm = findByTestAttr(wrapper, "component-loginForm");
  const errorMessageComponent = findByTestAttr(wrapper, "component-error");
  const authComponent = findByTestAttr(wrapper, "component-auth");
  const redirectToTodos = findByTestAttr(wrapper, "component-redirectToTodos");

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
    authRedirectPath: '/'
  };

  // act
  const wrapper = shallow(<Auth {...expectedPropsFromReduxStore} />);
  const spinnerComponent = findByTestAttr(wrapper, "component-spinner");
  const loginForm = findByTestAttr(wrapper, "component-loginForm");
  const errorMessageComponent = findByTestAttr(wrapper, "component-error");
  const authComponent = findByTestAttr(wrapper, "component-auth");
  const redirectToTodos = findByTestAttr(wrapper, "component-redirectToTodos");

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
    authRedirectPath: '/todos'
  };

  // act
  const wrapper = shallow(<Auth {...expectedPropsFromReduxStore} />);
  const spinnerComponent = findByTestAttr(wrapper, "component-spinner");
  const loginForm = findByTestAttr(wrapper, "component-loginForm");
  const errorMessageComponent = findByTestAttr(wrapper, "component-error");
  const authComponent = findByTestAttr(wrapper, "component-auth");
  const redirectToTodos = findByTestAttr(wrapper, "component-redirectToTodos");

  // assert
  expect(spinnerComponent.length).toBe(0);
  expect(loginForm.length).toBe(1);
  expect(errorMessageComponent.length).toBe(1);
  expect(authComponent.length).toBe(1);
  expect(redirectToTodos.length).toBe(1);
});

