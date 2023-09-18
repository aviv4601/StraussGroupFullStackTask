import React, { useRef, useState } from "react";
import classes from "./Input.module.css";

const UsernameInput = ({ usernameRef }) => {
  return (
    <input
      type="username"
      placeholder="Username"
      ref={usernameRef}
      className={classes["form-item"]}
    />
  );
};

export default UsernameInput;
