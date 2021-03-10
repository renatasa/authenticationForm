import React from "react";
import classes from "./SpinnerAuth.module.css";

const spinner = () => <div className={classes.loaderAuth} data-test="component-spinnerAuth">Loading...</div>;

export default spinner;
