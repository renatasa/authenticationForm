import React from "react";
import classes from "./Input.module.css";

const input = (props) => {
  let inputElement = null;

  inputElement = (
    <input
      className={classes.formInputAuth}
      {...props.elementConfig}
      value={props.value}
      onChange={props.changed}
    />
  );

  return (
    <div>
      <label>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
