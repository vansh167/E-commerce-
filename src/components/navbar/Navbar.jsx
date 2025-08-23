import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useShopContext } from "../../context/ShopContext";
import logo from "../../assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Navbar.css";

const Navbar = () => {
  const { getTotalCartItem } = useShopContext();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow-sm" >
      <div className="container-fluid" style={{backgroundColor:"#E3E6F3", boxShadow:" 0 5px 15px rgba(0, 0, 0, 0.06)",width:"100%"}}>
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="logo" style={{ width: "120px" }} />
        </Link>

        {/* Hamburger Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Shop</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/mens">Men</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/womens">Women</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/kids">Kids</Link>
            </li>
          </ul>

          {/* Right Section (Login + Cart) */}
          <div className="d-flex align-items-center gap-2">
            <Link to="/login">
              <button className="btn btn-primary">Login</button>
            </Link>
            <Link to="/cart" className="position-relative">
              <img src={cart_icon} alt="cart" style={{ height: "25px" }} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {getTotalCartItem()}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
