let rulesRequired = (value, rules, isValid) => {
  if (!rules.required) {
    return;
  }

  if (rules.required && value.trim() !== "" && isValid) {
    return true;
  }

  if ((rules.required && value.trim() === "") || !isValid) {
    return false;
  }
};

let minLengthRule = (value, rules, isValid) => {
  if (!rules.required) {
    return;
  }

  if (rules.required && value.length >= rules.minLength && isValid) {
    return true;
  }

  if ((rules.required && value.length < rules.minLength) || !isValid) {
    return false;
  }
};

let emailRule = (value, rules, isValid) => {
  if (!rules.required) {
    return;
  }

  const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  if (rules.required && rules.isEmail && pattern.test(value) && isValid) {
    return true;
  }

  if ((rules.required && rules.isEmail && !pattern.test(value)) || !isValid) {
    return false;
  }
};

let checkValidity = (value, rules) => {
  if (value !== null) {
    let isValid = true;
    let returnedValue;

    returnedValue = rulesRequired(value, rules, isValid);

    if (typeof returnedValue === "boolean") {
      isValid = returnedValue;
    }

    returnedValue = minLengthRule(value, rules, isValid);

    if (typeof returnedValue === "boolean") {
      isValid = returnedValue;
    }

    returnedValue = emailRule(value, rules, isValid);

    if (typeof returnedValue === "boolean") {
      isValid = returnedValue;
    }

    return isValid;
  }
};

export { rulesRequired, minLengthRule, emailRule, checkValidity };
