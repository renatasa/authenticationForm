import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { findByTestAttr } from "../../../../test/testUtils";
import SpinnerAuth from "./SpinnerAuth.jsx";

Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
  return shallow(<SpinnerAuth />);
};

test("SpinnerAuth component renders without error", () => {
  //act
  const wrapper = setup({});

  //arrange
  const inputComponent = findByTestAttr(wrapper, "component-spinnerAuth");

  //assert
  expect(inputComponent.length).toBe(1);
});
