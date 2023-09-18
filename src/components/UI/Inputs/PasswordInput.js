import React, { useRef, useState } from "react";
import classes from "./Input.module.css";

const PasswordInput = ({ passwordRef }) => {
  return (
    <input
      type="password"
      placeholder="Password"
      ref={passwordRef}
      className={classes["form-item"]}
    />
  );
};

export default PasswordInput;
