import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import UsernameInput from "../UI/Inputs/UsernameInput";
import PasswordInput from "../UI/Inputs/PasswordInput";
import EmailInput from "../UI/Inputs/EmailInput";
import { signUpService } from "../../api/apiServices";
import classes from "./SignupForm.module.css";
import toast, { Toaster } from "react-hot-toast";

const SignupForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const emailRef = useRef(null);
  const [validUsername, setValidUsername] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [usernameAlreadyExists, setUsernameAlreadyExists] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredUsername = usernameRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredEmail = emailRef.current.value;
    setValidUsername(true);
    setValidPassword(true);
    setValidEmail(true);
    setUsernameAlreadyExists(false);
    console.log(
      "enteredUsername, enteredPassword, enteredEmail",
      enteredUsername,
      enteredPassword,
      enteredEmail
    );
    if (enteredUsername.trim() === "") {
      setValidUsername(false);
      return;
    }
    if (enteredPassword.trim() === "") {
      setValidPassword(false);
      return;
    }
    if (enteredEmail.trim() === "") {
      setValidEmail(false);
      return;
    }
    if (enteredUsername && enteredPassword && enteredEmail) {
      const res = await signUpService(
        enteredUsername,
        enteredPassword,
        enteredEmail
      );
      console.log("res", res);
      if (res && res.success === false) {
        setUsernameAlreadyExists(true);
        toast.error("Unsuccessful sign up");
        return;
      }
      toast.success("Signed up successfully");
      login(res.token);
      setTimeout(() => {
        navigate("/candidates"); // the timer is used here to slow down the main thread and let the toast message to be shown
      }, 1500);
    }
  };

  return (
    <div>
      <h3>Sign up</h3>
      <form onSubmit={submitHandler} className={classes.form}>
        <span>
          <UsernameInput usernameRef={usernameRef} />
          {usernameAlreadyExists && (
            <p className={classes["invalid-input"]}>Username already exists</p>
          )}
          {!validUsername && (
            <p className={classes["invalid-input"]}>
              Please enter a valid username
            </p>
          )}
        </span>
        <span>
          <PasswordInput passwordRef={passwordRef} />
          {!validPassword && (
            <p className={classes["invalid-input"]}>
              Please enter a valid password
            </p>
          )}
        </span>
        <span>
          <EmailInput emailRef={emailRef} />
          {!validEmail && (
            <p className={classes["invalid-input"]}>
              Please enter a valid email
            </p>
          )}
        </span>
        <button
          type="submit"
          onClick={submitHandler}
          className={classes["form-btn"]}
        >
          Sign up
        </button>
        <Toaster />
      </form>
    </div>
  );
};

export default SignupForm;
