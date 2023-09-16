import React, { useRef, useState } from "react";
import classes from "./SigninForm.module.css";
import TextField from "@material-ui/core/TextField";
import { signInService } from "../../api/apiServices";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

// import { makeStyles } from "@mui/styles";

// const useStyles = makeStyles((theme) => ({
//   textField: {
//     "& .MuiOutlinedInput-root": {
//       "& fieldset": {
//         borderColor: "white", // Change the border color
//       },
//       "& input": {
//         color: "white", // Change the text color
//       },
//     },
//   },
// }));

const SigninForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [validUsername, setValidUsername] = useState(true);
  const [validPassword, setValidPassword] = useState(true);

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredUsername = usernameRef.current.value;
    const enteredPassword = passwordRef.current.value;
    if (enteredUsername.trim() === "") {
      setValidUsername(false);
      return;
    }
    if (enteredPassword.trim() === "") {
      setValidPassword(false);
      return;
    }
    console.log(enteredUsername, enteredPassword);
    if (validUsername && validPassword) {
      const res = await signInService(enteredUsername, enteredPassword);
      console.log("res", res);
      if (res && res.token) {
        console.log("res.token", res.token);
        login(res.token);
        navigate("/candidates");
      }
    }
  };
  return (
    <div>
      <h3>Sign in</h3>
      <div>
        <form className={classes.form}>
          <input
            type="text"
            placeholder="Username"
            ref={usernameRef}
            className={classes["form-item"]}
          />
          <input
            type="password"
            placeholder="Password"
            ref={passwordRef}
            className={classes["form-item"]}
          />
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
