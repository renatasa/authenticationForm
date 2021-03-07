import {
  rulesRequired,
  minLengthRule,
  emailRule,
  checkValidity,
} from "./service.js";


// testing rulues required validation function
test("rulesRequired validation function result should be truthy", () => {
  
const rulesSet = {
  required: true
};
const testValue = "randomWord";
const isPrevValidationRulePassed = true;
  
  expect(
    rulesRequired(testValue, rulesSet, isPrevValidationRulePassed)
  ).toBeTruthy();
});

test("rulesRequired validation function result should be falsy", () => {
  
const rulesSet = {
  required: true
};
const testValue = "randomWord";
const isPrevValidationRulePassed = false;
  
  expect(
        rulesRequired(testValue, rulesSet, isPrevValidationRulePassed)
  ).toBeFalsy();
});

test("rulesRequired validation function result should be undefined", () => {
  expect(
    rulesRequired(
      testWord,
      {
        required: false,
      },
      true
    )
  ).toBeUndefined();
});

// testing minLength validation function
test("minLength validation function result should be undefined", () => {
  expect(
    minLengthRule(
      testWord,
      {
        required: false,
      },
      0
    )
  ).toBeUndefined();
});

test("minLength validation function result should be truthy", () => {
  expect(
    minLengthRule(
      testWord,
      {
        required: true,
        minLength: 6,
      },
      testWord.length
    )
  ).toBeTruthy();
});

test("minLength validation function result should be falsy", () => {
  const testValue = "a";
  const isPrevValidationRulePassed = true;
  
  expect(
    minLengthRule(
      testValue,
      {
        required: true,
        minLength: 6,
      },
      isPrevValidationRulePassed
    )
  ).toBeFalsy();
});

// testing emailRule validation function
test("emailRule validation function result should be undefined", () => {
  expect(
    emailRule(
      testWord,
      {
        required: false,
      },
      0
    )
  ).toBeUndefined();
});

test("emailRule validation function result should be truthy", () => {
//  const
  expect(
    emailRule(
      "a@a.lt",
      {
        required: true,
        isEmail: true,
      },
      true
    )
  ).toBeTruthy();
});

test("minLength validation function result should be falsy", () => {
  expect(
    emailRule(
      "a",
      {
        required: true,
        isEmail: true,
      },
      true
    )
  ).toBeFalsy();
});

// testing checkValidity function result should be undefined
test("checkValidity function result should be undefined", () => {
  expect(
    checkValidity(null, {
      required: true,
    })
  ).toBeUndefined();
});

// testing checkValidity function result should be truthy
test("checkValidity function result should be truthy", () => {
  expect(
    checkValidity(testWord, {
      required: true,
    })
  ).toBeTruthy();
});

// testing checkValidity function result should be falsy
test("checkValidity function result should be falsy", () => {
  expect(
    checkValidity("a", {
      required: true,
      minLength: 6,
    })
  ).toBeFalsy();
});

