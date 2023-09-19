import React, { useRef, useState } from "react";
import classes from "./SigninForm.module.css";
import { signInService } from "../../api/apiServices";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import UsernameInput from "../UI/Inputs/UsernameInput";
import PasswordInput from "../UI/Inputs/PasswordInput";
import toast, { Toaster } from "react-hot-toast";

const SigninForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [isWrongPassword, setIsWrongPassword] = useState(false);
  const [isExistUsername, setIsExistUsername] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredUsername = usernameRef.current.value;
    const enteredPassword = passwordRef.current.value;
    setIsExistUsername(true);
    setIsWrongPassword(false);
    if (enteredUsername.trim() === "") {
      setIsExistUsername(false);
      setErrorMessage("Username is required");
      return;
    }
    if (enteredPassword.trim() === "") {
      setIsWrongPassword(true);
      setErrorMessage("Password is required");
      return;
    }
    console.log(enteredUsername, enteredPassword);
    if (isExistUsername && !isWrongPassword) {
      const res = await signInService(enteredUsername, enteredPassword);
      console.log("res", res);
      if (res && res.success === false && res.msg === "Username not exists") {
        setIsExistUsername(false);
        setErrorMessage(res.msg);
        toast.error(res.msg);
        return;
      }
      if (res && res.success === false && res.msg === "Password not match") {
        setIsWrongPassword(true);
        setErrorMessage(res.msg);
        toast.error(res.msg);
        return;
      }
      toast.success("Sign in successfully");
      login(res.token);
      setTimeout(() => {
        navigate("/candidates"); // the timer is used here to slow down the main thread and let the toast message to be shown
      }, 1500);
    }
  };
  return (
    <div>
      <h3>Sign in</h3>
      <div>
        <form className={classes.form}>
          <UsernameInput usernameRef={usernameRef} />
          {!isExistUsername && (
            <p className={classes["invalid-input"]}>{errorMessage}</p>
          )}
          <PasswordInput passwordRef={passwordRef} />
          {isWrongPassword && (
            <p className={classes["invalid-input"]}>{errorMessage}</p>
          )}
          <button
            type="submit"
            className={classes["form-btn"]}
            onClick={submitHandler}
          >
            Sign in
          </button>
          <Toaster />
        </form>
      </div>
    </div>
  );
};

export default SigninForm;
