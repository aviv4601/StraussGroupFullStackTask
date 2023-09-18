import React, { useRef, useState } from "react";
import classes from "./SigninForm.module.css";
import { signInService } from "../../api/apiServices";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import UsernameInput from "../UI/Inputs/UsernameInput";
import PasswordInput from "../UI/Inputs/PasswordInput";

const SigninForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [isWrongPassword, setIsWrongPassword] = useState(false);
  const [isExistUsername, setIsExistUsername] = useState(true);

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredUsername = usernameRef.current.value;
    const enteredPassword = passwordRef.current.value;
    setIsExistUsername(true);
    setIsWrongPassword(false);
    if (enteredUsername.trim() === "") {
      setIsExistUsername(false);
      return;
    }
    if (enteredPassword.trim() === "") {
      setIsWrongPassword(true);
      return;
    }
    console.log(enteredUsername, enteredPassword);
    if (isExistUsername && !isWrongPassword) {
      const res = await signInService(enteredUsername, enteredPassword);
      console.log("res", res);
      if (res && res.success === false && res.msg === "Username not exists") {
        setIsExistUsername(false);
        return;
      }
      if (res && res.success === false && res.msg === "Password not match") {
        setIsWrongPassword(true);
        return;
      }

      login(res.token);
      navigate("/candidates");
    }
  };
  return (
    <div>
      <h3>Sign in</h3>
      <div>
        <form className={classes.form}>
          <UsernameInput usernameRef={usernameRef} />
          {!isExistUsername && (
            <p className={classes["invalid-input"]}>Username not exists</p>
          )}
          <PasswordInput passwordRef={passwordRef} />
          {isWrongPassword && (
            <p className={classes["invalid-input"]}>Wrong password</p>
          )}
          <button
            type="submit"
            className={classes["form-btn"]}
            onClick={submitHandler}
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default SigninForm;
