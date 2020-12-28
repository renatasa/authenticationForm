import React, { Component } from 'react';
import TodoList from '../../components/TodoList/todoList';
import Spinner from '../../components/Spinner/spinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import WarningMessage from '../../components/WarningMessage/WarningMessage';
import SignOutButton from '../../../Authentication/components/UI/SignOutButton/SignOutButton';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import './todo.css';

export class Todo extends Component {
    state={
        inputText: '',
        showWarning: false
    }

    componentDidMount(){
        this.props.onFetchTodo();
    }


    inputChangedHandler = (event) =>{
        event.preventDefault();
        this.setState({inputText: event.target.value})
    }

    submitHandler = (event) =>{
        event.preventDefault();
        if(this.state.inputText==''){
            this.setState({showWarning: true})
        } else if(this.props.endpoint!== null && !this.props.loading ){
        let newTodo =  { todo: this.state.inputText, completed:false, delete:false}
        let updatedTodos=[...this.props.todos, newTodo]
        this.props.onSubmitTodo(this.props.endpoint, updatedTodos);
        this.setState({inputText:''})
      } 

    }

    todoDelete=(index)=>{
        this.props.onDeleteTodo(this.props.endpoint, index, this.props.todos)
    }

    todoCompleted=(index)=>{
       this.props.onMarkAsCompleted(this.props.endpoint, index, this.props.todos[index])
    }

    closeWarning=()=>{
        this.setState({showWarning: false})
    }

    render() {
        let todoList=null;
        
        if (this.props.todos && !this.props.loading){
            todoList=                
                <TodoList 
                    todos={this.props.todos}
                    todoDelete={this.todoDelete}
                    todoCompleted={this.todoCompleted}
                    inputChangedHandler={this.inputChangedHandler}
                />
        } else {
            todoList=<Spinner/>
        }

        return (
            <div>
                <SignOutButton/>
                <form  class={!this.props.todos ? "initialForm" : undefined}>
                                        <input type="text" value={this.state.inputText} class="todo-input" onChange={this.inputChangedHandler}/>
                                        <button class="todo-button" type="submit" onClick={this.submitHandler}>
                                        <i class="fas fa-plus-square"></i>
                                        </button>
                                     </form>

                                    {todoList}
               <ErrorMessage/>
               <WarningMessage showWarning={this.state.showWarning}
                               closeWarning={this.closeWarning}/>
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
        todos: state.todos.todos, 
        loading: state.todos.loading, 
        endpoint: state.todos.endpoint,
        fetchTodoError: state.todos.fetchTodoError,
        submitTodoError: state.todos.submitTodoError,
        submitTodoSuccess: state.todos.submitTodoSuccess
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onFetchTodo: ()=>dispatch(actions.fetchTodo()), 
        onSubmitTodo: (endpoint, newTodo)=>dispatch(actions.submitTodo(endpoint, newTodo)),
        onMarkAsCompleted: (endpoint, index, todo)=>dispatch(actions.markAsCompleted(endpoint, index, todo)),
        onDeleteTodo: (endpoint, index, todos)=>dispatch(actions.deleteTodo(endpoint, index, todos))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
