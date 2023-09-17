import React from "react";
import { useAuth } from "../../../context/authContext";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import { RiLogoutCircleLine } from "react-icons/ri";
import { getGreeting } from "../../../utils/utils";

const AuthenticatedHeader = () => {
  const greeting = getGreeting();
  const { logout } = useAuth();
  return (
    <header>
      <nav>
        <ul className={classes["unordered-list"]}>
          <li className={classes["list-style"]}>
            <span>
              <strong>{greeting}</strong>
            </span>
          </li>
          <li className={classes["list-style"]}>
            <span className={classes["icon-wrapper"]}>
              <RiLogoutCircleLine />
            </span>
            <Link to="/" className={classes["anchor-style"]} onClick={logout}>
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AuthenticatedHeader;
