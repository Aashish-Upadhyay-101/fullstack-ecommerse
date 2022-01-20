import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/tinder.png";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img
            className="navbar-logo"
            src={logo}
            alt="Logo ezon shopping site"
          />
        </Link>
        <li className="nav-item">
          <ion-icon name="git-network-outline" id="icon"></ion-icon>
          <p>Hello, guest</p>
        </li>
      </div>
      <div className="navbar-center">
        <input className="navbar-search" type="text" />
        <ion-icon name="search-outline" id="icon"></ion-icon>
      </div>
      <div className="navbar-right">
        <li className="nav-item">
          <ion-icon name="recording-outline" id="icon"></ion-icon>
          <p>Orders</p>
        </li>
        <li className="nav-item">
          <ion-icon name="person-outline" id="icon"></ion-icon>
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <div>
            <ion-icon name="cart-outline" id="icon"></ion-icon>
            <span className="cart-item-count">5</span>
          </div>
          <p>Cart</p>
        </li>
      </div>
    </nav>
  );
};

export default Navbar;
