import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import UserContext from "../../store/auth-context";
import { Link } from "react-router-dom";
import logo from "../../assets/images/tinder.png";
import "./Navbar.css";

const Navbar = (props) => {
  const userContext = useContext(UserContext);
  const [cart, setCart] = useState([]);
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");

  let username = userContext.user.name || "guest";

  username = userContext.user.name || "guest";
  if (username.includes(" ")) {
    username = username.split(" ")[0];
  }

  useEffect(() => {
    async function fetchCart() {
      const response = await axios.get(
        "http://localhost:8000/api/v1/user/cart",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("JWT")}`,
          },
        }
      );
      setCart(response.data.cart);
    }
    if (userContext.isLoggedIn === true) {
      fetchCart();
    }

    async function fetchProduct() {
      const response = await axios.get("http://localhost:8000/api/v1/product");
      setProduct(response.data.product);
    }

    fetchProduct();
  }, []);

  const searchHandler = (e) => {
    setSearch(e.target.value);

    const newFilteredProducts = product.filter((elem) => {
      return elem.name.toLowerCase().includes(search.toLowerCase());
    });

    // console.log(newFilteredProducts);?

    userContext.updateFilteredProduct(newFilteredProducts);

    console.log(userContext.filteredProduct);

    props.isSearched(search);
  };

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
          <p>Hello, {username}</p>
        </li>
      </div>
      <div className="navbar-center">
        <input
          className="navbar-search"
          type="text"
          placeholder="Search for products..."
          onChange={searchHandler}
        />
        <ion-icon name="search-outline" id="icon"></ion-icon>
      </div>
      <div className="navbar-right">
        <li className="nav-item">
          <ion-icon name="recording-outline" id="icon"></ion-icon>
          <p>Orders</p>
        </li>
        <li className="nav-item">
          <ion-icon name="person-outline" id="icon"></ion-icon>
          <Link
            className="nav-link"
            to={username !== "guest" ? "/logout" : "/login"}
          >
            {username !== "guest" ? "Logout" : "Login"}
          </Link>
        </li>
        <li className="nav-item">
          <div>
            <ion-icon name="cart-outline" id="icon"></ion-icon>
            <span className="cart-item-count">{cart.length || 0}</span>
          </div>
          <Link to="/cart" className="nav-link">
            Cart
          </Link>
        </li>
      </div>
    </nav>
  );
};

export default Navbar;

// signpu,login, create new products if you are seller and you can buy products as buyer , stripe payment integration
// search functionality is left and everything else is I think done for a ecommerse project
