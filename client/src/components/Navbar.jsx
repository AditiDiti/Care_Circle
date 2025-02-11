import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { HashLink } from "react-router-hash-link";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/reducers/rootSlice";
import { FiMenu } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { jwtDecode } from "jwt-decode";

import Logo from "./Logo.jsx";
import SvgIcon from "./SvgIcon.jsx";

const Navbar = () => {
  const [iconActive, setIconActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(
    localStorage.getItem("token")
      ? jwtDecode(localStorage.getItem("token"))
      : ""
  );

  const logoutFunc = () => {
    dispatch(setUserInfo({}));
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header>
      <nav className={iconActive ? "nav-active" : ""}>
        <NavLink className="d-flex gap-8" to={"/"}>
            <Logo />
            <h2 className="nav-logo m-auto">
              CareCircle
            </h2>
          </NavLink>
        <ul className="nav-links">
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li className="dropdown">
            <NavLink to={"/doctors"}>Doctors</NavLink>
            { !token && !user && (
              <div className="dropdown-content">
                <NavLink to={"/applyfordoctor"}>Join our team</NavLink>
                <NavLink to={"/doctors"}>Our team</NavLink>
              </div>
            )}
          </li>
          {token && user.isAdmin && (
            <li>
              <NavLink to={"/dashboard/users"}>Dashboard</NavLink>
            </li>
          )}
          {token && !user.isAdmin && (
            <>
              <li>
                <NavLink to={"/appointments"}>Appointments</NavLink>
              </li>
              <li>
                <NavLink to={"/notifications"}>Notifications</NavLink>
              </li>
              <li>
                <HashLink to={"/#contact"}>Contact Us</HashLink>
              </li>
              <li>
                <NavLink to={"/profile"} className="d-flex gap-4">
                  <SvgIcon name="avatar" className="wh-24 fill-knight-black" />
                </NavLink>
              </li>
            </>
          )}
          {!token ? (
            <>
              <li>
                <NavLink className="ripple ripple-surface btn btn-primary" to={"/login"}>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink className="ripple ripple-surface btn btn-primary" to={"/register"}>
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <span className="btn" onClick={logoutFunc}>
                Logout
              </span>
            </li>
          )}
        </ul>
        <div className="menu-icons">
          {!iconActive && (
            <FiMenu
              className="menu-open"
              onClick={() => {
                setIconActive(true);
              }}
            />
          )}
          {iconActive && (
            <RxCross1
              className="menu-close"
              onClick={() => {
                setIconActive(false);
              }}
            />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
