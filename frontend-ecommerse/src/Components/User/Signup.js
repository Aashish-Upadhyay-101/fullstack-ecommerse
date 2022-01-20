import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/tinder.png";
import "./Login.css";

const Signup = () => {
  return (
    <section className="section-login">
      <div className="login">
        <Link to="/">
          <img className="logo" src={logo} alt="Logo of the company" />
        </Link>
        <h3 className="turtary-heading">Signup</h3>
        <p className="login-text">Create your account and start shopping!</p>

        <form className="login-form">
          <div className="login-form-input">
            <label>Name</label>
            <input
              className="login-input"
              type="text"
              placeholder="John Smith"
              required
            />
          </div>
          <div className="login-form-input">
            <label>Email</label>
            <input
              className="login-input"
              type="text"
              placeholder="someone@gmail.com"
              required
            />
          </div>
          <div className="login-form-input">
            <label>Password</label>
            <input
              className="login-input"
              type="password"
              placeholder="min 8 characters"
              required
            />
          </div>
          <div className="login-form-input">
            <label>Confirm password</label>
            <input
              className="login-input"
              type="password"
              placeholder="min 8 characters"
              required
            />
          </div>

          <button type="submit" className="btn btn-filled login-btn">
            Signup
          </button>

          <label>
            Already have an Account?
            <Link to="/login" className="forget-password create-account">
              Login
            </Link>
          </label>
        </form>
      </div>
    </section>
  );
};

export default Signup;
