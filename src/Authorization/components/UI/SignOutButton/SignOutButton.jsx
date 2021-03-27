import React from "react";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import classes from "./SignOutButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faOutdent } from "@fortawesome/free-solid-svg-icons";

export const signOutButton = (props) => {
  let authRedirect = null;

  if (props.authRedirection === "/") {
    authRedirect = <Redirect to="/" />;
  }

  return (
    <div>
      <div className={classes.signOutIcon} onClick={props.onLogout}>
        {authRedirect}
        <FontAwesomeIcon icon={faOutdent} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authRedirection: state.auth.authRedirection,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(signOutButton);
