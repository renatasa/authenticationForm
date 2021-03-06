import React from "react";
import classes from "./Input.module.css";
import PropTypes from 'prop-types';

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
    <div data-test="component-formInput">
      {inputElement}
    </div>
  );
};

input.propTypes = {
  changed: PropTypes.func.isRequired,
  elementConfig: PropTypes.shape({
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired
  }).isRequired,
  value: PropTypes.string.isRequired
}

export default input;
