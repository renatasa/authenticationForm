import {
  checkIfThereIsAuthorizationError,
  createFormElementsArray,
} from "./service.js";

const emptyString = "";
const errorType = "errorAuthorization";

test("When checkIfThereIsAuthorizationError receives null as a prop, then it returns object with values of emptyString, otherwise - object with non empty values", () => {
  // arrange
  const errorNotNull = { message: "Random error" };
  const errorNull = null;
  const expectedObjectWhenErrorNotNull = {
    errorText: errorNotNull.message,
    errorType: errorType,
  };
  const expectedObjectWhenErrorNull = {
    errorText: emptyString,
    errorType: errorType,
  };

  // act
  const actualObjectWhenErrorNotNull = checkIfThereIsAuthorizationError(
    errorNotNull
  );
  const actualObjectWhenErrorNull = checkIfThereIsAuthorizationError(errorNull);

  // assert
  expect(actualObjectWhenErrorNotNull).toEqual(expectedObjectWhenErrorNotNull);
  expect(actualObjectWhenErrorNull).toEqual(expectedObjectWhenErrorNull);
});

test("When createFormElementsArray receives object of nested object of nested object, then it returns array of nested object of nested object", () => {
  // arrange
  const expectedInput = {
    
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address",
        },
        value: "",
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        touched: false,
    
    },
  };

  const expectedResult = [
    {
      config: {
        elementType: "input",
        elementConfig: { type: "email", placeholder: "Mail Address" },
        value: "",
        touched: false,
  
      },
      id: "email",
    },
    {
      config: {
        elementConfig: { type: "password", placeholder: "Password" },
        elementType: "input",
        value: "",
        touched: false,
      },
      id: "password",
    },
  ];

  // act
  const actualResult=createFormElementsArray(expectedInput)

  // assert
  expect(actualResult[0]).toEqual(expectedResult[0])
  expect(actualResult[1]).toEqual(expectedResult[1])
});
