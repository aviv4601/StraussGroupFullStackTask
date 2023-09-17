import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
      color: "white",
    },
  },
}));

const SignupForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const classes = useStyles();
  const usernameRef = useRef();

  return (
    <div>
      <h3>Sign up</h3>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField
            error
            id="outlined-error-helper-text"
            label="Error"
            defaultValue="Hello World"
            helperText="Incorrect entry."
            variant="outlined"
            ref={usernameRef}
          />
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
