import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { useShopContext } from "../../context/ShopContext";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { cartCount, getTotalCartItem } = useShopContext();

  return (
    <div className="navbar">
      {/* Logo */}
      <div className="nav-logo">
        <img src={logo} alt="logo" className="nav-logo-img" />
      </div>

      {/* Navigation Menu */}
      <div className="nav-list-container">
        <ul className="nav-menu">
          <li onClick={() => setMenu("shop")}>
            <Link to="/">Shop</Link>
            {menu === "shop" && <hr />}
          </li>
          <li onClick={() => setMenu("mens")}>
            <Link to="/mens">Men</Link>
            {menu === "mens" && <hr />}
          </li>
          <li onClick={() => setMenu("womens")}>
            <Link to="/womens">Women</Link>
            {menu === "womens" && <hr />}
          </li>
          <li onClick={() => setMenu("kids")}>
            <Link to="/kids">Kids</Link>
            {menu === "kids" && <hr />}
          </li>
        </ul>
      </div>

      {/* Login & Cart */}
      <div className="nav-login-cart">
        <Link to="/login">
          <button>Login</button>
        </Link>

        <Link to="/cart">
          <div style={{ position: "relative" }}>
            <img src={cart_icon} alzzt="cart" />
            
          </div>
        </Link>
        <div className="nav-cart-count">{getTotalCartItem()}</div>
      </div>
    </div>
  );
};

export default Navbar;
