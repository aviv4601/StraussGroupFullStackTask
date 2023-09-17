import React from "react";
import { useAuth } from "../../context/authContext";
import { Link, useLocation } from "react-router-dom";
import UnauthenticatedHeader from "./isAuthenticated/UnauthenticatedHeader";
import AuthenticatedHeader from "./isAuthenticated/AuthenticatedHeader";
import classes from "./isAuthenticated/Header.module.css";

const Header = () => {
  const { token } = useAuth();

  return (
    <div className={classes["header-container"]}>
      {!token ? <UnauthenticatedHeader /> : <AuthenticatedHeader />}
    </div>
  );
};

export default Header;
