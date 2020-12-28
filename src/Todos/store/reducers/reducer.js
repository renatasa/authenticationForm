import * as actionTypes from '../actions/actionTypes';

let initialState = {
    todos: null,
    deletedTodos:null,
    endpoint: null,
    loading: false,
    fetchTodoError: false,
    submitTodoError: false,
    submitTodoSuccess:false
}

const fetchTodoStart=(state, action)=>{
    return {...state, loading: true, fetchTodoError: false}
}

const fetchTodoSuccess=(state, action)=>{
    return {...state, endpoint: Object.keys(action.todos)[0], todos: [...action.todos[Object.keys(action.todos)[0]]], loading: false}
}

const fetchTodoFail=(state, action)=>{
    return{...state, loading: false, fetchTodoError: action.error}
}

const submitTodoStart=(state, action)=>{
  return{...state, loading: true, submitTodoSuccess: false, submitTodoError: false}
}


const submitTodoSuccess=(state, action)=>{
  return{...state, loading: false, todos: [...state.todos, {...action.newTodo}], submitTodoSuccess: true, submitTodoError: false}
}

const submitTodoFail=(state, action)=>{
  return{...state, loading: false, submitTodoSuccess: false, submitTodoError: action.error}
}


const markAsCompletedStart=(state, action)=>{
  return{...state, loading: true, submitTodoSuccess: false, submitTodoError: false}
}


const markAsCompletedSuccess=(state, action)=>{
      let updatedObj = JSON.parse(JSON.stringify(state.todos));
      updatedObj[action.index].completed= !state.todos[action.index].completed;
      return{...state, loading: false, todos: [...updatedObj], submitTodoSuccess: true, submitTodoError: false}
}

const markAsCompletedFail=(state, action)=>{
  return{...state, loading: false, submitTodoSuccess: false, submitTodoError: action.error}
}

const deleteTodoStart=(state, action)=>{
  return{...state, loading: true, submitTodoSuccess: false, submitTodoError: false}
}

const deleteTodoSuccess=(state, action)=>{
      let updatedObj = JSON.parse(JSON.stringify(action.oldTodos));
      return{...state, loading: false, todos: [...updatedObj], submitTodoSuccess: true, submitTodoError: false}
}

const deleteTodoFail=(state, action)=>{
  return{...state, loading: false, submitTodoSuccess: false, submitTodoError: action.error}
}

const resetError=(state, action)=>{
  return {...state, fetchTodoError: false, submitTodoError: false}
}

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