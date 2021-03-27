import React from "react";
import classes from "./spinnerTodo.module.css";

export const spinner = (props) => {
  return (
    <div>
      <div className={classes.todoSpinner}>Please wait...</div>
    </div>
  );
};

export default spinner;
