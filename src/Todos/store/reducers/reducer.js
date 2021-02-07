import * as actionTypes from "../actions/actionTypes";

let initialState = {
  todos: [],
  endpointsArr: [],
  deletedTodos: null,
  loading: false,
  fetchTodoError: false,
  submitCompleteDeleteTodoError: false,
  submitTodoSuccess: false,
};

const fetchTodoStart = (state, action) => {
  return { ...state, loading: true, fetchTodoError: false };
};

const fetchTodoSuccess = (state, action) => {
  if (action.todos) {
    return {
      ...state,
      todos: [...Object.values(action.todos)],
      endpointsArr: [...Object.keys(action.todos)],
      loading: false,
    };
  } else {
    return { ...state, loading: false };
  }
};

const fetchTodoFail = (state, action) => {
  return { ...state, loading: false, fetchTodoError: action.error };
};

const submitTodoStart = (state, action) => {
  return {
    ...state,
    loading: true,
    submitTodoSuccess: false,
    submitCompleteDeleteTodoError: false,
  };
};

const submitTodoSuccess = (state, action) => {
  let newEndpointsArr = [...state.endpointsArr];
  newEndpointsArr.push(action.newEndpoint);
  return {
    ...state,
    loading: false,
    todos: [...state.todos, { ...action.newTodo }],
    endpointsArr: newEndpointsArr,
    submitTodoSuccess: true,
    submitCompleteDeleteTodoError: false,
  };
};

const submitTodoFail = (state, action) => {
  return {
    ...state,
    loading: false,
    submitTodoSuccess: false,
    submitCompleteDeleteTodoError: action.error,
  };
};

const markAsCompletedStart = (state, action) => {
  return {
    ...state,
    loading: true,
    submitTodoSuccess: false,
    submitCompleteDeleteTodoError: false,
  };
};

const markAsCompletedSuccess = (state, action) => {
  let updatedObj = JSON.parse(JSON.stringify(state.todos));
  updatedObj[action.index].completed = !state.todos[action.index].completed;
  return {
    ...state,
    loading: false,
    todos: [...updatedObj],
    submitTodoSuccess: true,
    submitCompleteDeleteTodoError: false,
  };
};

const markAsCompletedFail = (state, action) => {
  return {
    ...state,
    loading: false,
    submitTodoSuccess: false,
    submitCompleteDeleteTodoError: action.error,
  };
};

const deleteTodoStart = (state, action) => {
  return {
    ...state,
    loading: true,
    submitTodoSuccess: false,
    submitCompleteDeleteTodoError: false,
  };
};

const deleteTodoSuccess = (state, action) => {
  let updatedObj = JSON.parse(JSON.stringify(action.oldTodos));
  let newEndpointsArr = [...state.endpointsArr];
  newEndpointsArr.splice(action.index, 1);
  return {
    ...state,
    loading: false,
    todos: [...updatedObj],
    endpointsArr: newEndpointsArr,
    submitTodoSuccess: true,
    submitCompleteDeleteTodoError: false,
  };
};

const deleteTodoFail = (state, action) => {
  return {
    ...state,
    loading: false,
    submitTodoSuccess: false,
    submitCompleteDeleteTodoError: action.error,
  };
};

const resetError = (state, action) => {
  return { ...state, [`${action.errorType}`]: false };
};


const reducer=(state=initialState, action)=>{
  switch(action.type){
      case actionTypes.FETCH_TODO_START: return fetchTodoStart(state, action);
      case actionTypes.FETCH_TODO_SUCCESS: return fetchTodoSuccess(state, action);
      case actionTypes.FETCH_TODO_FAIL: return fetchTodoFail(state, action);

      case actionTypes.SUBMIT_TODO_START: return submitTodoStart(state, action);
      case actionTypes.SUBMIT_TODO_SUCCESS: return submitTodoSuccess(state, action);
      case actionTypes.SUBMIT_TODO_FAIL: return submitTodoFail(state, action);

      case actionTypes.MARK_AS_COMPLETED_START: return markAsCompletedStart(state, action);
      case actionTypes.MARK_AS_COMPLETED_SUCCESS: return markAsCompletedSuccess(state, action);
      case actionTypes.MARK_AS_COMPLETED_FAIL: return markAsCompletedFail(state, action);

      case actionTypes.DELETE_TODO_START: return deleteTodoStart(state, action);
      case actionTypes.DELETE_TODO_SUCCESS: return deleteTodoSuccess(state, action);
      case actionTypes.DELETE_TODO_FAIL: return deleteTodoFail(state, action);

      case actionTypes.RESET_ERROR: return resetError(state, action);

      default: return state;
  }
}

export default reducer;
