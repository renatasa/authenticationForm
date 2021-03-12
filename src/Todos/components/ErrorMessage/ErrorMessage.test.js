import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { findByTestAttr, checkProps } from "../../../test/testUtils";
import ErrorMessage from "./ErrorMessage.jsx";

Enzyme.configure({ adapter: new Adapter() });

test("ErrorMessage does not throw warning with expected props", () => {
  let defaultProps = {
    error: { errorText: "", errorType: "tooManyTodos" },
    resetError: (stateProperty) => onResetError(stateProperty),
  };
  checkProps(ErrorMessage, defaultProps);
});

// checking if ErrorMessage switch works properly - if different ErrorMessages are being rendered with different props
test("ErrorMessage component renders fetchTodoError case without error", () => {
  // arrange
  let fetchTodoErrorProps = {
    error: { errorText: "", errorType: "fetchTodoError" },
  };

  // act
  let wrapper = shallow(<ErrorMessage {...fetchTodoErrorProps} />);

  //assert
  const inputComponent = findByTestAttr(wrapper, "component-fetchTodoError");
  expect(inputComponent.length).toBe(1);
});

test("ErrorMessage component renders errorAuthorization case without error", () => {
  // arrange
  let authorizationErrorProps = {
    error: { errorText: "", errorType: "errorAuthorization" },
    resetError: () => resetError(),
  };

  // act
  let wrapper = shallow(<ErrorMessage {...authorizationErrorProps} />);

  //assert
  const inputComponent = findByTestAttr(
    wrapper,
    "component-authorizationError"
  );
  expect(inputComponent.length).toBe(1);
});

test("ErrorMessage component renders warning case without error", () => {
  // arrange
  let warningProps = {
    error: { errorText: "", errorType: "warning" },
    resetError: () => resetError("warning"),
  };

  // act
  let wrapper = shallow(<ErrorMessage {...warningProps} />);

  //assert
  const inputComponent = findByTestAttr(wrapper, "component-warning");
  expect(inputComponent.length).toBe(1);
});

test("ErrorMessage component renders submitCompleteDeleteTodoError case without error", () => {
  // arrange
  let submitCompleteDeleteTodoErrorProps = {
    error: { errorText: "", errorType: "submitCompleteDeleteTodoError" },
    resetError: () => resetError("submitCompleteDeleteTodoError"),
  };

  // act
  let wrapper = shallow(
    <ErrorMessage {...submitCompleteDeleteTodoErrorProps} />
  );

  //assert
  const inputComponent = findByTestAttr(
    wrapper,
    "component-submitCompleteDeleteTodoError"
  );
  expect(inputComponent.length).toBe(1);
});

test("ErrorMessage component renders tooManyTodos error case without error", () => {
  // arrange
  let tooManyTodos = {
    error: { errorText: "", errorType: "tooManyTodos" },
    resetError: () => resetError("tooManyTodos"),
  };

  // act
  let wrapper = shallow(<ErrorMessage {...tooManyTodos} />);

  //assert
  const inputComponent = findByTestAttr(wrapper, "component-tooManyTodos");
  expect(inputComponent.length).toBe(1);
});
