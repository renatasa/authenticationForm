import React from "react";
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
  let setTimeoutFn = true;
  if (errorType === "fetchTodoError") {
    setTimeoutFn = false;
  }

  // when todos cant be fetched from backend, app doesn't load , no other actions are possible , resetError function does not execute
  // rest of the error messages reset themselves automatically after 2 seconds, or user resets them by clicking X icon
  // in case of errorAuthorisation , resetError does not receive errorType, because there is only one type of error in Authorisation reducer store
  if (error && errorType && setTimeoutFn) {
    setTimeout(() => props.resetError(errorType), 2000);
  }

  switch (errorType) {
    // show error message when todos could not be fetched from backend
    // this error message does not dissapear and does not reset
    case "fetchTodoError":
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
              <FontAwesomeIcon icon={faTimes} onClick={props.resetError} />
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
              <FontAwesomeIcon
                icon={faTimes}
                onClick={() => props.resetError(errorType)}
              />
            </div>
          </div>
        </div>
      );

    // shows error message, when new todo was not added, or todo was not marked as completed or todo was not deleted (HTTP PUT / DELETE / POST request status !==200)
    case "submitCompleteDeleteTodoError":
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
              className={`${classes.alertItemClose} ${classes.alertItemIcon}`}
            >
              <FontAwesomeIcon
                icon={faTimes}
                onClick={() => props.resetError(errorType)}
              />
            </div>
          </div>
        </div>
      );

    // shows error message when user tries to add more todos than it is allowed
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
              className={`${classes.alertItemClose} ${classes.alertItemIcon}`}
            >
              <FontAwesomeIcon
                icon={faTimes}
                onClick={() => props.resetError(errorType)}
              />
            </div>
          </div>
        </div>
      );

    default:
      return "";
  }
};

export default errorMessage;
