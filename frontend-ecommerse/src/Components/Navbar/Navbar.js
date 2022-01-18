import React from "react";
import logo from "../../assets/images/tinder.png";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img className="navbar-logo" src={logo} alt="Logo ezon shopping site" />
        <li className="nav-item">
          <ion-icon name="git-network-outline" id="icon"></ion-icon>
          <p>Services</p>
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
          <p>Login</p>
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
