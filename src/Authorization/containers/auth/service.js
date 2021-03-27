const constants={
  emptyString: "",
  errorType: "errorAuthorization"
}

const checkIfThereIsAuthorizationError = (error) => {
  let authorizationError = error
    ? { errorText: error.message, errorType: constants.errorType }
    : { errorText: constants.emptyString, errorType: constants.errorType };

  return authorizationError;
};


const createFormElementsArray = (controls) => {
  let formElementsArray = [];
  for (let key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key],
    });
  }

  console.log(formElementsArray)

  return formElementsArray;
};

export {checkIfThereIsAuthorizationError, createFormElementsArray};
