import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { findByTestAttr, checkProps } from "../../../test/testUtils";
import ErrorMessage from "./ErrorMessage.jsx";

Enzyme.configure({ adapter: new Adapter() });

test("When ErrorMessage component receives expected props, then it does not throw warning", () => {
  // arrange
  const defaultProps = {
    error: { errorText: "", errorType: "tooManyTodos" },
    resetError: (stateProperty) => onResetError(stateProperty),
  };
  // assert
  checkProps(ErrorMessage, defaultProps);
});

test('When ErrorMessage receives errorType: "fetchTodoError", then fetchTodoError case is being rendered', () => {
  // arrange
  const fetchTodoErrorProps = {
    error: { errorText: "", errorType: "fetchTodoError" },
  };

  // act
  const wrapper = shallow(<ErrorMessage {...fetchTodoErrorProps} />);

  //assert
  const inputComponent = findByTestAttr(wrapper, "component-fetchTodoError");
  expect(inputComponent.length).toBe(1);
});

test('When ErrorMessage receives errorType:"errorAuthorisation", then errorAuthorization case is being rendered', () => {
  // arrange
  const authorizationErrorProps = {
    error: { errorText: "", errorType: "errorAuthorization" },
    resetError: () => resetError(),
  };

  // act
  const wrapper = shallow(<ErrorMessage {...authorizationErrorProps} />);

  //assert
  const inputComponent = findByTestAttr(
    wrapper,
    "component-authorizationError"
  );
  expect(inputComponent.length).toBe(1);
});

test('When ErrorMessage component receives errorType:"warning" renders warning case without error', () => {
  // arrange
  const warningProps = {
    error: { errorText: "", errorType: "warning" },
    resetError: () => resetError("warning"),
  };

  // act
  const wrapper = shallow(<ErrorMessage {...warningProps} />);

  //assert
  const inputComponent = findByTestAttr(wrapper, "component-warning");
  expect(inputComponent.length).toBe(1);
});

test('When ErrorMessage receives errorType:"submitCompleteDeleteTodoError", then submitCompleteDeleteTodoError case is being rendered', () => {
  // arrange
  const submitCompleteDeleteTodoErrorProps = {
    error: { errorText: "", errorType: "submitCompleteDeleteTodoError" },
    resetError: () => resetError("submitCompleteDeleteTodoError"),
  };

  // act
  const wrapper = shallow(
    <ErrorMessage {...submitCompleteDeleteTodoErrorProps} />
  );

  //assert
  const inputComponent = findByTestAttr(
    wrapper,
    "component-submitCompleteDeleteTodoError"
  );
  expect(inputComponent.length).toBe(1);
});

test('When ErrorMessage receives errorType:"tooManyTodos", then tooManyTodos case is being rendered', () => {
  // arrange
  const tooManyTodos = {
    error: { errorText: "", errorType: "tooManyTodos" },
    resetError: () => resetError("tooManyTodos"),
  };

  // act
  const wrapper = shallow(<ErrorMessage {...tooManyTodos} />);

  //assert
  const inputComponent = findByTestAttr(wrapper, "component-tooManyTodos");
  expect(inputComponent.length).toBe(1);
});
