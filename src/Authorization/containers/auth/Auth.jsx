import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Input from "../../components/UI/Input/Input.jsx";
import Spinner from "../../components/UI/SpinnerAuth/SpinnerAuth.jsx";
import ErrorMessage from "../../../Todos/components/ErrorMessage/ErrorMessage.jsx";
import * as actions from "../../store/actions/index";
import * as service from "./service";
import classes from "./Auth.module.css";
import PropTypes from 'prop-types';

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
    },
    isSignup: true,
  };

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
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

  createInputs = (formElementsArray) => {
    let inputs = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    ));
    return inputs;
  };

  createForm = (inputs) => {
    if (this.props.loading) {
      return <Spinner data-test="component-spinner" />;
    }

    let form = (
      <form className={classes.containerAuth} data-test="component-loginForm">
        <div>
          <div className={classes.formTitleAuth} data-test="component-loginFormTitle">
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
          data-test="component-loginFormSwitchToButton"
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
      authRedirect = <Redirect to={this.props.authRedirectPath} data-test="component-redirectToTodos"/>;
    }

    return authRedirect;
  };


  renderForm() {
    const formElementsArray = service.createFormElementsArray(this.state.controls);
    const inputs = this.createInputs(formElementsArray);
    return this.createForm(inputs);
  }

  render() {
    return (
      <div className={classes.formContainer} data-test="component-auth">
        {this.createAuthRedirect()}
        {this.renderForm()}
        <ErrorMessage data-test="component-error"
          error={service.checkIfThereIsAuthorizationError(this.props.error)}
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
    isAuthenticated: state.auth.token !== '',
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

Auth.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired, 
  isAuthenticated: PropTypes.bool.isRequired,
  authRedirectPath: PropTypes.string.isRequired,
  onAuth : PropTypes.func.isRequired,
  onResetAuthError: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
