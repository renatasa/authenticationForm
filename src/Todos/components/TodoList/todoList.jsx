import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import classes from "./todoList.module.css";

export const todoList = (props) => {
  let showList = [];
  for (let i = 0; i < props.todos.length; i++) {
    showList.push(
      <div className={classes.todo} key={i}>
        {" "}
        <li
          className={
            props.todos[i].completed
              ? `${classes.completed} ${classes.todoLi}`
              : `${classes.todoLi}`
          }
        >
          {props.todos[i].todo}
        </li>
        <button
          className={classes.completeBtn}
          type="submit"
          onClick={() => props.todoCompleted(i)}
        >
          <FontAwesomeIcon icon={faCheck} />
        </button>
        <button
          className={classes.trashBtn}
          type="submit"
          onClick={() => props.todoDelete(i)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    );
  }

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
