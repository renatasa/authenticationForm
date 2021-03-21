import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import classes from "./todoList.module.css";

const createShowList=(todos, todoCompleted, todoDelete)=>{
  let showList=[];
  if(todos.length===0){
    return showList;
  }
  for (let i = 0; i < todos.length; i++) {
    showList.push(
      <div className={classes.todo} key={i}>
        {" "}
        <li
          className={
            todos[i].completed
              ? `${classes.completed} ${classes.todoLi}`
              : `${classes.todoLi}`
          }
        >
          {todos[i].todo}
        </li>
        <button
          className={classes.completeBtn}
          type="submit"
          onClick={() => todoCompleted(i)}
        >
          <FontAwesomeIcon icon={faCheck} />
        </button>
        <button
          className={classes.trashBtn}
          type="submit"
          onClick={() => todoDelete(i)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    );
  }

  return showList ;
}

export const todoList = (props) => {
  let showList = createShowList(props.todos, props.todoCompleted, props.todoDelete);
  return (

      <div className={classes.todoContainer} data-test="component-todoList">
        <div className={classes.todoList}>{showList}</div>
      </div>
  );
};

todoList.propTypes = {
  inputChangedHandler: PropTypes.func.isRequired,
  todoCompleted: PropTypes.func.isRequired,
  todoDelete: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      todo: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      delete: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default todoList;
