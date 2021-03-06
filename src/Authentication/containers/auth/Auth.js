import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import Spinner from "../../components/UI/SpinnerAuth/SpinnerAuth";
import ErrorMessage from "../../../Todos/components/ErrorMessage/ErrorMessage";
import * as actions from "../../store/actions/index";
import * as service from "./service";
import classes from "./Auth.module.css";

export class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignup: true,
  };


  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: service.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };
    this.setState({ controls: updatedControls });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSignup: !prevState.isSignup };
    });
  };

  checkIfThereIsAuthorizationError = () => {
    let authorizationError = this.props.error
      ? { errorText: this.props.error.message, errorType: "errorAuthorization" }
      : { errorText: "", errorType: "errorAuthorisation" };

    return authorizationError;
  };

  createFormElementsArray = () => {
    let formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    return formElementsArray;
  };

  createInputs = (formElementsArray) => {
    let inputs = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    ));
    return inputs;
  };

  createForm = (inputs) => {
    // if (this.props.loading) form = <Spinner />;
    if (this.props.loading) {
      return <Spinner />;
    }

    let form = (
      <form className={classes.containerAuth}>
        <div>
          <div className={classes.formTitleAuth}>
            {this.state.isSignup ? "Login" : "Sing up"}
          </div>
          {inputs}
          <button
            className={classes.formButtonAuth}
            type="submit"
            onClick={this.submitHandler}
          >
            SUBMIT
          </button>
        </div>
        <div
          className={classes.formLinkAuth}
          onClick={this.switchAuthModeHandler}
        >
          SWITCH TO {this.state.isSignup ? " SIGN UP" : " LOGIN"}
        </div>
      </form>
    );

    return form;
  };

  createAuthRedirect = () => {
    let authRedirect = null;

    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return authRedirect;
  };

  render() {
    let authorizationError = this.checkIfThereIsAuthorizationError();
    let formElementsArray = this.createFormElementsArray();
    let inputs = this.createInputs(formElementsArray);
    let form = this.createForm(inputs);
    let authRedirect = this.createAuthRedirect();

    return (
      <div className={classes.formContainer}>
        {authRedirect}
        {form}
        <ErrorMessage
          error={authorizationError}
          resetError={this.props.onResetAuthError}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirection,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onResetAuthError: () => dispatch(actions.resetError()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
