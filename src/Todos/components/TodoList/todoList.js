import React from 'react' ;
import './todoList.css';

export const todoList=(props)=> {
    let showList=[];
    for (let i=0; i<props.todos.length; i++){
       showList.push(
       <div className="todo"  key={i} > <li class={props.todos[i].completed ? "completed" : undefined}>{props.todos[i].todo}</li>
       
            <button class="complete-btn" type="submit" onClick={()=>props.todoCompleted(i)}>
                <i class="fas fa-check"></i>
            </button>

            <button class="trash-btn" type="submit" onClick={()=>props.todoDelete(i)}>
                <i class="fas fa-trash"></i>
            </button>

       </div>
       )
    }
    
        return (
            <div>
                <div class="todo-container">
                <div class="todo-list">  
                    {showList}
                </div>
                </div>
            </div>
        )
    
}

export default todoList
