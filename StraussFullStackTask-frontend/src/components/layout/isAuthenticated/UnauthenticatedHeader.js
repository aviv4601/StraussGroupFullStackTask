import React from "react";
import { Link, useLocation } from "react-router-dom";
import classes from "./Header.module.css";
import { BiUserCircle } from "react-icons/bi";

const UnauthenticatedHeader = () => {
  const location = useLocation();
  const isSigninPage = location.pathname === "/";
  console.log("isSigninPage", isSigninPage);
  return (
    <header>
      <nav>
        <ul>
          <li className={classes["list-style"]}>
            <span className={classes["icon-wrapper"]}>
              <BiUserCircle />
            </span>
            {isSigninPage ? (
              <Link to="/signup" className={classes["anchor-style"]}>
                Signup
              </Link>
            ) : (
              <Link to="/" className={classes["anchor-style"]}>
                Signin
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default UnauthenticatedHeader;
