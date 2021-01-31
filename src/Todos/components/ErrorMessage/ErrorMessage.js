import React from "react";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import classes from "./ErrorMessage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export const errorMessage = (props) => {
  let error = null;
  let errorType = null;

  if (props.fetchTodoError) {
    error = props.fetchTodoError;
    errorType = "errorFetchingTodos";
  }

  if (props.submitCompleteDeleteTodoError) {
    error = props.submitCompleteDeleteTodoError;
    errorType = "errorChangingTodo";
    setTimeout(() => props.onResetError(), 2000);
  }

  switch (errorType) {
    // show error message when todos could not be fetched from backend
    case "errorFetchingTodos":
      return (
        <div className={error ? `${classes.alertWrapper}` : undefined}>
          <div className={classes.alertBackdrop}></div>
          <div className={error ? `${classes.alertItem}` : undefined}>
            <div className={classes.icon}>
              <FontAwesomeIcon icon={faBomb} />
            </div>
            <div className={classes.data}>
              <p className={classes.title}>Error</p>
              <p className={classes.sub}>{error}</p>
            </div>
          </div>
        </div>
      );

    // shows error message, when new todo was not added, or todo was not marked as completed or todo was not deleted (HTTP PUT / DELETE / POST request status !==200)
    case "errorChangingTodo":
      return (
        <div className={classes.errorSubmitingTodo}>
          <div className={error ? `${classes.todoNotAdded}` : undefined}>
            <div className={classes.otherError}>{error}</div>
            <div className={`${classes.close} ${classes.icon}`}>
              <FontAwesomeIcon icon={faTimes} onClick={props.onResetError} />
            </div>
          </div>
        </div>
      );

    default:
      return "";
  }
};

const mapStateToProps = (state) => {
  return {
    fetchTodoError: state.todos.fetchTodoError,
    submitCompleteDeleteTodoError: state.todos.submitCompleteDeleteTodoError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onResetError: () => dispatch(actions.resetError()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(errorMessage);
