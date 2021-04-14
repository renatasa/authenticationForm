import * as actionTypes from "./actionTypes";
import axios from "axios";

export const actionStart = (type) => {
  return {
    type: type,
  };
};

export const actionFail = (error, type) => {
  return {
    type: type,
    error: error,
  };
};

// fetching todos from backend
export const fetchTodoSuccess = (todo) => {
  return {
    type: actionTypes.FETCH_TODO_SUCCESS,
    todos: todo,
  };
};

export const fetchTodo = (token, userId) => {
  return (dispatch) => {
    let url =
      `${process.env.REACT_APP_GET_TODO}/${userId.toString()}.json?auth=` +
      token;
    dispatch(actionStart(actionTypes.FETCH_TODO_START));
    return axios
      .get(url)
      .then((response) => {
        console.log(response);
        dispatch(fetchTodoSuccess(response.data));
      })
      .catch((error) => {
        dispatch(actionFail(error.message, actionTypes.FETCH_TODO_FAIL));
      });
  };
};

//adding new todo to backend and store
export const submitTodoSuccess = (newTodo, newEndpoint) => {
  return {
    type: actionTypes.SUBMIT_TODO_SUCCESS,
    newTodo: newTodo,
    newEndpoint: newEndpoint,
  };
};

export const createUrlWithUserId = (initialUrl, userId, token) => {
  return initialUrl + `/${userId.toString()}.json?auth=` + token;
};

export const submitTodo = (userId, allTodos, token) => {
  const newTodo = allTodos[allTodos.length - 1];
  const initialUrl = `${process.env.REACT_APP_POST_TODO_DYNAMIC}`;
  const url = createUrlWithUserId(initialUrl, userId, token);

  return (dispatch) => {
    dispatch(actionStart(actionTypes.SUBMIT_TODO_START));
    return axios
      .post(url, newTodo)
      .then((response) => {
        if (response.status === 200) {
          dispatch(submitTodoSuccess(newTodo, response.data["name"]));
        }
      })
      .catch((error) => {
        dispatch(actionFail(error.message, actionTypes.SUBMIT_TODO_FAIL));
      });
  };
};

//mark todo as completed
export const markAsCompletedSuccess = (index) => {
  return {
    type: actionTypes.MARK_AS_COMPLETED_SUCCESS,
    index: index,
  };
};

export const markAsCompleted = (endpoint, index, todo, token, userId) => {
  let newTodo = { ...todo, completed: !todo.completed };
  let url =
    `${
      process.env.REACT_APP_POST_TODO_DYNAMIC
    }/${userId.toString()}/${endpoint.toString()}.json?auth=` + token;

  return (dispatch) => {
    dispatch(actionStart(actionTypes.MARK_AS_COMPLETED_START));
    return axios
      .put(url, newTodo)
      .then((response) => {
        if (response.status === 200) {
          dispatch(markAsCompletedSuccess(index));
        }
      })
      .catch((error) => {
        dispatch(actionFail(error.message, actionTypes.MARK_AS_COMPLETED_FAIL));
      });
  };
};

//delete todo
export const deleteTodoSuccess = (oldTodos, index) => {
  return {
    type: actionTypes.DELETE_TODO_SUCCESS,
    oldTodos: oldTodos,
    index: index,
  };
};

export const deleteTodo = (endpoint, index, todos, token, userId) => {
  let oldTodos = [...todos];
  console.log(oldTodos.length);
  oldTodos.splice(index, 1);
  console.log(oldTodos.length);
  let todosObj = {};

  for (let i = 0; i < oldTodos.length; i++) {
    let newObj = { ...todosObj, ...{ [i]: oldTodos[i] } };
    todosObj = { ...todosObj, ...newObj };
  }

  const url =
    `${
      process.env.REACT_APP_POST_TODO_DYNAMIC
    }/${userId.toString()}/${endpoint.toString()}.json?auth` + token;

  return (dispatch) => {
    dispatch(actionStart(actionTypes.DELETE_TODO_START));
    return axios
      .delete(url)
      .then((response) => {
        if (response.status === 200) {
          dispatch(deleteTodoSuccess(oldTodos, index));
        }
      })
      .catch((error) => {
        dispatch(actionFail(error.message, actionTypes.DELETE_TODO_FAIL));
      });
  };
};

export const resetError = (errorType) => {
  return {
    type: actionTypes.RESET_ERROR,
    errorType: errorType,
  };
};

export const logoutUserData = () => {
  return {
    type: actionTypes.LOGOUT_USER_DATA,
  };
};
