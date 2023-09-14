import React from "react";
import Typed from "react-typed";
import classes from "./Signin.module.css";
import SigninForm from "../components/Signin/SigninForm";

const Signin = () => {
  return (
    <div className={classes.container}>
      <div className={classes.text}>
        <div>
          <h1>
            Hi{" "}
            <Typed
              strings={["Noa", "Shira", "Aviv", "Shai", "Danielle", "Amir"]}
              typeSpeed={120}
              backSpeed={140}
              loop
            />
          </h1>
        </div>
      </div>
      <div>
        <SigninForm />
      </div>
    </div>
  );
};

export default Signin;
