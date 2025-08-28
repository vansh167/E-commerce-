import React from "react";
import "./Navbar.css";
import user from "../../assets/user.png"
import logo from "../../assets/logo.png"
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="logo" className="navbar-logo" />
      </div>

      <div className="navbar-right">
        <img src={user} alt="admin profile" className="navbar-user" />
      </div>
    </div>
  );
};

export default Navbar;
