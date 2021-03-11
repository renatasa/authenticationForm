import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { findByTestAttr, checkProps } from "../../../../test/testUtils";
import Input from "./Input.jsx";

Enzyme.configure({ adapter: new Adapter() });

//arrange
const defaultProps = {
  changed: (event) => this.inputChangedHandler(event, formElement.id),
  elementConfig: { type: "email", placeholder: "Mail Address" },
  value: "",
};

const setup = (props = { defaultProps }) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Input {...setupProps} />);
};

test("input component renders without error", () => {
  //act
  const wrapper = setup({});

  //assert
  const inputComponent = findByTestAttr(wrapper, "component-formInput");
  expect(inputComponent.length).toBe(1);
});

test("does not throw warning with expected props", () => {
  checkProps(Input, defaultProps);
});
