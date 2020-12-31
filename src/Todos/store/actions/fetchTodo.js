import * as actionTypes from './actionTypes';
import axios from 'axios';

//fetching todos from backend
export const fetchTodoStart=()=>{
    return{
        type: actionTypes.FETCH_TODO_START
    }
}

export const fetchTodoSuccess=(todo)=>{
    return{
        type: actionTypes.FETCH_TODO_SUCCESS,
        todos: todo

    }
}

export const fetchTodoFail=(error)=>{
    return{
        type:actionTypes.FETCH_TODO_FAIL, 
        error: error

    }
}

export const fetchTodo=(token)=>{
    return dispatch=>{
       dispatch(fetchTodoStart());
        axios.get(process.env.REACT_APP_GET_TODO+token)
            .then(response=>{
                dispatch(fetchTodoSuccess(response.data));
            })
            .catch( (error)=> {
                dispatch(fetchTodoFail(error.message))
          })
    }
}


//adding new todo to backend and store
export const submitTodoStart=()=>{
    return{
        type: actionTypes.SUBMIT_TODO_START
}
}


export const submitTodoSuccess=(newTodo)=>{
    return{
        type: actionTypes.SUBMIT_TODO_SUCCESS,
        newTodo: newTodo
}
}


export const submitTodoFail=(error)=>{
    return{
        type: actionTypes.SUBMIT_TODO_FAIL, 
        error: error
}
}


export const submitTodo=(endpoint, allTodos, token)=>{
    let newTodo= allTodos[allTodos.length-1] ;
  let url=`${process.env.REACT_APP_POST_TODO_DYNAMIC}/${endpoint.toString()}/${(allTodos.length-1).toString()}.json/`;
 // let url=`${process.env.REACT_APP_POST_TODO_DYNAMIC}/${(allTodos.length-1).toString()}.json/` +token;
    console.log('url with token ', url);

    return dispatch=>{
        dispatch(submitTodoStart());
        axios.patch(url, newTodo)
        .then(response=>{
            dispatch(submitTodoSuccess(newTodo))
        })
        .catch(error=>{
           dispatch(submitTodoFail(error.message))
        })
    }
}


//mark todo as completed
export const markAsCompletedStart=()=>{
    return{
        type: actionTypes.MARK_AS_COMPLETED_START
}
}


export const markAsCompletedSuccess=(index)=>{
    return{
        type: actionTypes.MARK_AS_COMPLETED_SUCCESS,
        index: index
}
}


export const markAsCompletedFail=(error)=>{
    return{
        type: actionTypes.MARK_AS_COMPLETED_FAIL, 
        error: error
}
}

export const markAsCompleted=(endpoint, index, todo)=>{
    let newTodo={...todo, completed: !todo.completed};
     let url=`${process.env.REACT_APP_POST_TODO_DYNAMIC}/${endpoint.toString()}/${index.toString()}.json/`;

    return dispatch=>{
        dispatch(markAsCompletedStart());
        axios.put(url, newTodo)
        .then(response=>{
            dispatch(markAsCompletedSuccess(index))
        })
        .catch(error=>{
           dispatch(markAsCompletedFail(error.message))
        })

        
    }
}


//delete todo
export const deleteTodoStart=()=>{
    return{
        type: actionTypes.DELETE_TODO_START
}
}


export const deleteTodoSuccess=(oldTodos)=>{
    return{
        type: actionTypes.DELETE_TODO_SUCCESS,
        oldTodos: oldTodos
}
}


export const deleteTodoFail=(error)=>{
    return{
        type: actionTypes.DELETE_TODO_FAIL, 
        error: error
}
}

export const deleteTodo=(endpoint, index, todos)=>{
    let oldTodos=[...todos];
    oldTodos.splice(index, 1);
    let todosObj={};

       for (let i=0; i<oldTodos.length; i++){
        let newObj={...todosObj, ...{[i]: oldTodos[i]}}
        todosObj={...todosObj, ...newObj};
      }
         let url=`${process.env.REACT_APP_POST_TODO_DYNAMIC}/${endpoint.toString()}.json/`;

    return dispatch=>{
        dispatch(deleteTodoStart());
        axios.put(url, todosObj)
        .then(response=>{
            dispatch(deleteTodoSuccess(oldTodos))
        })
        .catch(error=>{
           dispatch(deleteTodoFail(error.message))
        })

        
    }
}

export const resetError=()=>{
    return{
        type: actionTypes.RESET_ERROR
}
}

