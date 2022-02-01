import axios from "axios";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/tinder.png";
import UserContext from "../../store/auth-context";
import "./Cart.css";

import { loadStripe } from "@stripe/stripe-js";

const CartItem = ({ name, quantity, price, id, removeCart, image }) => {
  const removeFromCartHandler = () => {
    removeCart(id);
  };

  const cart_image = `http://localhost:8000/${image}`;

  return (
    <figure className="cart">
      <img src={cart_image} className="cart-image" alt="baby image" />
      <div className="cart-details">
        <h3 className="turtary-heading">{name}</h3>
        <p className="quantity">
          <span>
            Quantity: <strong>{quantity}</strong>
          </span>
          <span className="subtotal">
            Total: <strong>${price}</strong>
          </span>
        </p>
        <button
          href="#"
          className="btn btn-remove"
          onClick={removeFromCartHandler}
        >
          Remove from cart
        </button>
      </div>
    </figure>
  );
};

const Cart = () => {
  let [cart, setCart] = useState([]);
  const userContext = useContext(UserContext);
  const [checkout, setCheckout] = useState(false);

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
  }, [cart]);

  let grandTotal = 0;
  cart.forEach((elem) => {
    grandTotal += elem.product.price * elem.quantity;
  });

  grandTotal = grandTotal.toFixed(2);

  const checkoutHandler = async (e) => {
    setCheckout(true);

    try {
      const stripe = await loadStripe(
        "pk_test_51KLszlAOCbZpLbN5Jo4DYHL2Npn45YeAAeH2SCWq0iWJ19V2CNPMn6OX4ydBgaWPr73IEPNqICPpkXVYCrp5sxBp00kYGtG98z"
      );

      const session = await axios.get(
        `http://localhost:8000/api/v1/order/checkout-session/${grandTotal}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("JWT")}`,
          },
        }
      );

      await stripe.redirectToCheckout({
        sessionId: session.data.session.id,
      });
    } catch (err) {
      console.log(err.message);
      alert("error", err.message);
      setCheckout(false);
    }
  };

  const removeFromCart = async (cartId) => {
    const response = await axios({
      method: "post",
      url: "http://localhost:8000/api/v1/user/removefromcart",
      headers: {
        Authorization: `Bearer ${Cookies.get("JWT")}`,
      },
      data: {
        id: cartId,
      },
    });
  };

  return (
    <section className="section-cart">
      <div className="container">
        <Link to="/">
          <img className="logo" src={logo} />
        </Link>
        <div className="cart-header">
          <h2 className="secondary-heading">Cart</h2>
          <p className="grand-total">
            Grand total: <strong>${grandTotal}</strong>
            <button
              className="btn btn-filled"
              style={{ marginLeft: "3.2rem" }}
              onClick={checkoutHandler}
            >
              {checkout ? "Processing..." : "Checkout"}
            </button>
          </p>
        </div>
        <div className="cart-container">
          {!cart.length <= 0 ? (
            cart.map((cartItem) => {
              return (
                <CartItem
                  key={cartItem._id}
                  id={cartItem._id}
                  name={cartItem.product.name}
                  quantity={cartItem.quantity}
                  price={cartItem.product.price * cartItem.quantity}
                  removeCart={removeFromCart}
                  image={cartItem.product.image}
                />
              );
            })
          ) : (
            <h2 className="secondary-heading">No item in the cart</h2>
          )}
        </div>
      </div>
    </section>
  );
};

export default Cart;
