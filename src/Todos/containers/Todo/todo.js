import React, { Component } from "react";
import TodoList from "../../components/TodoList/todoList";
import { Redirect } from "react-router-dom";
import Spinner from "../../components/Spinner/spinnerTodo";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import SignOutButton from "../../../Authentication/components/UI/SignOutButton/SignOutButton";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import classes from "./todo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

export class Todo extends Component {
  state = {
    inputText: "",
    warning: false,
    tooManyTodos: false,
  };

  componentDidMount() {
    if (this.props.token) {
      this.props.onFetchTodo(this.props.token, this.props.userId);
    }
  }

  inputChangedHandler = (event) => {
    event.preventDefault();
    if (event.target.value.length <= 60) {
      this.setState({ inputText: event.target.value });
    }
  };

  submitHandler = (event) => {
    event.preventDefault();
    if (this.state.inputText === "") {
      this.setState({ warning: true });
    } else if (
      this.props.token !== null &&
      this.props.userId !== null &&
      !this.props.loading
    ) {
      if (this.props.todos.length >= 5) {
        this.setState({ tooManyTodos: true });
      } else {
        let newTodo = {
          todo: this.state.inputText,
          completed: false,
          delete: false,
        };
        let updatedTodos = [];

        if (this.props.todos) {
          updatedTodos = [...this.props.todos, newTodo];
        } else {
          updatedTodos.push(newTodo);
        }

        this.props.onSubmitTodo(
          this.props.userId,
          updatedTodos,
          this.props.token
        );
        this.setState({ inputText: "" });
      }
    }
  };

  todoDelete = (index) => {
    let endpoint = this.props.endpointsArr[index];
    if (endpoint && this.props.token && this.props.userId) {
      this.props.onDeleteTodo(
        endpoint,
        index,
        this.props.todos,
        this.props.token,
        this.props.userId
      );
    }
  };

  todoCompleted = (index) => {
    let endpoint = this.props.endpointsArr[index];
    if (endpoint && this.props.token && this.props.userId) {
      this.props.onMarkAsCompleted(
        endpoint,
        index,
        this.props.todos[index],
        this.props.token,
        this.props.userId
      );
    }
  };

  errorWarningResetFunction = (stateProperty) => {
    this.setState({ [stateProperty]: false });
  };

  render() {
    let todoList = null;
    let warning = this.state.warning
      ? { errorText: "Input field is empty!", errorType: "warning" }
      : { errorText: "", errorType: "warning" };

    let maxTodosLimitExceeded = this.state.tooManyTodos
      ? {
          errorText: "No more than 5 todos are available",
          errorType: "tooManyTodos",
        }
      : { errorText: "", errorType: "tooManyTodos" };

    if (this.props.todos.length > 0 && !this.props.loading) {
      todoList = (
        <TodoList
          todos={this.props.todos}
          todoDelete={this.todoDelete}
          todoCompleted={this.todoCompleted}
          inputChangedHandler={this.inputChangedHandler}
        />
      );
    }

    if (this.props.todos.length === 0 && this.props.loading) {
      todoList = <Spinner />;
    }

    if (!this.props.token && !this.props.userId && !this.props.loading) {
      this.props.onLogoutUserData();
    }

    return (
      <div className={classes.todoComponent}>
        <SignOutButton />
        <form
          onSubmit={this.submitHandler}
          className={classes.todoComponentForm}
        >
          <input
            type="text"
            value={this.state.inputText}
            className={classes.todoComponentInput}
            onChange={this.inputChangedHandler}
          />
          <button
            className={classes.todoComponentButton}
            type="submit"
            onClick={this.submitHandler}
          >
            <FontAwesomeIcon icon={faPlusSquare} />
          </button>
        </form>
        <ErrorMessage
          error={{
            errorText: this.props.fetchTodoError,
            errorType: "fetchTodoError",
          }}

        />
        <ErrorMessage
          error={{
            errorText: this.props.submitTodoError,
            errorType: "submitCompleteDeleteTodoError",
          }}
          resetError={this.props.onResetError}
        /> 
        <ErrorMessage
          error={maxTodosLimitExceeded}
          resetError={this.errorWarningResetFunction}
        /> 

        {todoList}

        <ErrorMessage
          error={warning}
          resetError={this.errorWarningResetFunction}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos.todos,
    endpointsArr: state.todos.endpointsArr,
    loading: state.todos.loading,
    fetchTodoError: state.todos.fetchTodoError,
    submitTodoError: state.todos.submitCompleteDeleteTodoError,
    submitTodoSuccess: state.todos.submitTodoSuccess,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchTodo: (token, userId) => dispatch(actions.fetchTodo(token, userId)),
    onSubmitTodo: (userId, newTodo, token) =>
      dispatch(actions.submitTodo(userId, newTodo, token)),
    onMarkAsCompleted: (endpoint, index, todo, token, userId) =>
      dispatch(actions.markAsCompleted(endpoint, index, todo, token, userId)),
    onDeleteTodo: (endpoint, index, todos, token, userId) =>
      dispatch(actions.deleteTodo(endpoint, index, todos, token, userId)),
      onResetError:  (errorType) => dispatch(actions.resetError(errorType)),
      onLogoutUserData: () => dispatch(actions.logoutUserData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
