import React from "react";
import classes from "./Input.module.css";

const EmailInput = ({ emailRef }) => {
  return (
    <input
      type="mail"
      placeholder="Email"
      ref={emailRef}
      className={classes["form-item"]}
    />
  );
};

export default EmailInput;
