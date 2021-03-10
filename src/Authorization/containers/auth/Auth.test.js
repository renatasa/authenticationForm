import {
  rulesRequired,
  minLengthRule,
  emailRule,
  checkValidity,
} from "./service.js";

let testWord = "randomWord";

// testing rulues required validation function
test("rulesRequired validation function result should be truthy", () => {
  const rulesSet = {
    required: true,
  };
  const testValue = "randomWord";
  const isPrevValidationRulePassed = true;

  expect(
    rulesRequired(testValue, rulesSet, isPrevValidationRulePassed)
  ).toBeTruthy();
});

test("rulesRequired validation function result should be falsy", () => {
  const rulesSet = {
    required: true,
  };
  const testValue = "randomWord";
  const isPrevValidationRulePassed = false;

  expect(
    rulesRequired(testValue, rulesSet, isPrevValidationRulePassed)
  ).toBeFalsy();
});

// testing minLength validation function
test("minLength validation function result should be undefined", () => {
  const rulesSet = {
    required: false,
    minLength: 6,
  };
  const testValue = "randomWord";
  const isPrevValidationRulePassed = false;

  expect(
    minLengthRule(testValue, rulesSet, isPrevValidationRulePassed)
  ).toBeUndefined();
});

test("minLength validation function result should be truthy", () => {
  const rulesSet = {
    required: true,
    minLength: 6,
  };
  const testValue = "randomWord";
  const isPrevValidationRulePassed = true;

  expect(
    minLengthRule(testValue, rulesSet, isPrevValidationRulePassed)
  ).toBeTruthy();
});

test("minLength validation function result should be falsy", () => {
  const rulesSet = {
    required: true,
    minLength: 6,
  };
  const testValue = "Word";
  const isPrevValidationRulePassed = true;

  expect(
    minLengthRule(testValue, rulesSet, isPrevValidationRulePassed)
  ).toBeFalsy();
});

// testing emailRule validation function
test("emailRule validation function result should be undefined", () => {
  const rulesSet = {
    required: false,
    isEmail: true,
  };
  const testValue = "mail@mail.com";
  const isPrevValidationRulePassed = true;
  expect(
    emailRule(testValue, rulesSet, isPrevValidationRulePassed)
  ).toBeUndefined();
});

test("emailRule validation function result should be truthy", () => {
  const rulesSet = {
    required: true,
    isEmail: true,
  };
  const testValue = "mail@mail.com";
  const isPrevValidationRulePassed = true;
  expect(
    emailRule(testValue, rulesSet, isPrevValidationRulePassed)
  ).toBeTruthy();
});

test("minLength validation function result should be falsy", () => {
  const rulesSet = {
    required: true,
    isEmail: true,
  };
  const testValue = "mail";
  const isPrevValidationRulePassed = true;
  expect(
    emailRule(testValue, rulesSet, isPrevValidationRulePassed)
  ).toBeFalsy();
});

// testing checkValidity function result should be undefined
test("checkValidity function result should be undefined", () => {
  const rulesSet = {
    required: true,
  };
  const testValue = null;
  expect(checkValidity(testValue, rulesSet)).toBeUndefined();
});

// testing checkValidity function result should be truthy
test("checkValidity function result should be truthy", () => {
  const rulesSet = {
    required: true,
  };
  const testValue = "randomWord";
  expect(checkValidity(testWord, rulesSet)).toBeTruthy();
});

// testing checkValidity function result should be falsy
test("checkValidity function result should be falsy", () => {
  const rulesSet = {
    required: true,
    minLength: 6,
  };
  const testValue = "Word";
  expect(checkValidity(testValue, rulesSet)).toBeFalsy();
});
