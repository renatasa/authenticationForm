import React from "react";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import classes from "./ErrorMessage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBomb,
  faTimes,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

export const errorMessage = (props) => {
  let error = props.error.errorText;
  let errorType = props.error.errorType;

  // error while submiting new todo, deleting todo or marking as completed dissapears in 2 seconds automatically
  if (props.error.errorText && props.error.errorType == "errorChangingTodos") {
    setTimeout(() => props.onResetError("submitCompleteDeleteTodoError"), 2000);
  }

  // warning while trying submit empty todo dissapears in 2seconds
  if (props.error.errorText && props.error.errorType == "warning") {
    setTimeout(() => props.errorWarningResetFunction("warning"), 2000);
  }

  // warning while trying submit empty todo and error while trying to add more than 10 todos dissapears in 2seconds
  if (props.error.errorText && props.error.errorType == "tooManyTodos") {
    setTimeout(() => props.errorWarningResetFunction("tooManyTodos"), 2000);
  }

  // logging in / signing in error dissapears in 2 seconds
  if (props.error.errorText && props.error.errorType == "errorAuthorisation") {
    setTimeout(() => props.resetAuthError(), 2000);
  }

  switch (errorType) {
    // show error message when todos could not be fetched from backend
    // this error message does not dissapear
    case "errorFetchingTodos":
      return (
        <div
          className={
            error
              ? `${classes.alertWrapper} ${classes.alertWrapperWithBackdrop}`
              : undefined
          }
        >
          <div className={classes.alertBackdrop}></div>
          <div
            className={
              error
                ? `${classes.alertItem} ${classes.alertItemErrorColors} ${classes.alertItemTop}`
                : `${classes.alertItemInactive}`
            }
          >
            <div className={classes.alertItemIcon}>
              <FontAwesomeIcon icon={faBomb} />
            </div>
            <div className={classes.alertItemData}>
              <p className={classes.alertItemTitle}>Error</p>
              <p className={classes.alertItemSub}>{error}</p>
            </div>
          </div>
        </div>
      );

    // shows error on unsuccessfull login or sign in
    case "errorAuthorisation":
      return (
        <div className={`${classes.alertWrapper}`}>
          <div
            className={
              error
                ? `${classes.alertItem} ${classes.alertItemErrorColors} ${classes.alertItemBottom}`
                : `${classes.alertItemInactive}`
            }
          >
            <div className={classes.alertItemIcon}>
              <FontAwesomeIcon icon={faBomb} />
            </div>
            <div className={classes.alertItemData}>
              <p className={classes.alertItemTitle}>Error</p>
              <p className={classes.alertItemSub}>{error}</p>
            </div>
            <div
              className={`${classes.alertItemClose} ${classes.alertItemIcon}`}
            >
              <FontAwesomeIcon icon={faTimes} onClick={props.resetAuthError} />
            </div>
          </div>
        </div>
      );

    // shows warning when user tries to add empty todo
    case "warning":
      return (
        <div className={`${classes.alertWrapper}`}>
          <div
            className={
              error
                ? `${classes.alertItem} ${classes.alertItemWarningColors} ${classes.alertItemBottom}`
                : `${classes.alertItemInactive}`
            }
          >
            <div className={classes.alertItemIcon}>
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </div>
            <div className={classes.alertItemData}>
              <p className={classes.alertItemTitle}>Warning</p>
              <p className={classes.alertItemSub}>{error}</p>
            </div>
            <div
              className={`${classes.alertItemClose} ${classes.alertItemIcon}`}
            >
              <FontAwesomeIcon icon={faTimes} onClick={props.closeWarning} />
            </div>
          </div>
        </div>
      );

    // shows error message, when new todo was not added, or todo was not marked as completed or todo was not deleted (HTTP PUT / DELETE / POST request status !==200)
    // this error message dissapears in 2 seconds
    case "errorChangingTodos":
      return (
        <div className={classes.alertWrapper}>
          <div
            className={
              error
                ? `${classes.alertItemTodoNotAdded} ${classes.alertItemErrorColors}`
                : `${classes.alertItemTodoNotAddedInactive}`
            }
          >
            <div className={classes.alertItemTodoNotAddedWidth}>{error}</div>
            <div
              className={`${classes.alertItemIconClose} ${classes.alertItemIcon}`}
            >
              <FontAwesomeIcon
                icon={faTimes}
                onClick={() =>
                  props.onResetError("submitCompleteDeleteTodoError")
                }
              />
            </div>
          </div>
        </div>
      );

    // shows error message when user tries to add more than 10 todos
    case "tooManyTodos":
      return (
        <div className={classes.alertWrapper}>
          <div
            className={
              error
                ? `${classes.alertItemTodoNotAdded} ${classes.alertItemErrorColors}`
                : `${classes.alertItemTodoNotAddedInactive}`
            }
          >
            <div className={classes.alertItemTodoNotAddedWidth}>{error}</div>
            <div
              className={`${classes.alertItemIconClose} ${classes.alertItemIcon}`}
            >
              <FontAwesomeIcon
                icon={faTimes}
                onClick={props.errorResetFunction}
              />
            </div>
          </div>
        </div>
      );

    default:
      return "";
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onResetError: (errorType) => dispatch(actions.resetError(errorType)),
  };
};

export default connect(null, mapDispatchToProps)(errorMessage);
