import React from "react";
import Auth from "./Auth";

import {
  rulesRequired,
  minLengthRule,
  emailRule,
  checkValidity,
} from "./service.js";

let testWord = "randomWord";

// testing rulues required validation function
test("rulesRequired validation function result should be truthy", () => {
  expect(
    rulesRequired(
      testWord,
      {
        required: true,
      },
      true
    )
  ).toBeTruthy();
});

test("rulesRequired validation function result should be falsy", () => {
  expect(
    rulesRequired(
      testWord,
      {
        required: true,
      },
      false
    )
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
  expect(
    minLengthRule(
      "a",
      {
        required: true,
        minLength: 6,
      },
      testWord.length
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
