import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

import Logo from "./Logo.jsx";

const MinimalNavbar = () => {
  const [iconActive, _] = useState(false);
  return (
    <header>
      <nav className="nav minimal">
        <NavLink className="d-flex gap-8" to={"/"}>
          <Logo />
          <h2 className="nav-logo m-auto">
            CareCircle
          </h2>
        </NavLink>
      </nav>
    </header>
  );
};

export default MinimalNavbar;
