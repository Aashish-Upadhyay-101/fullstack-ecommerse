import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/tinder.png";
import "./Login.css";

const Login = () => {
  return (
    <section className="section-login">
      <div className="login">
        <Link to="/">
          <img className="logo" src={logo} alt="Logo of the company" />
        </Link>
        <h3 className="turtary-heading">Login</h3>
        <p className="login-text">
          See your growth and get consulting supports!
        </p>

        <form className="login-form">
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
          <div className="form-extra">
            <div className="remember-me">
              <input type="checkbox" className="checkbox" />
              <label>Remember me</label>
            </div>
            <a href="#" className="forget-password">
              Forget password?
            </a>
          </div>

          <button type="submit" className="btn btn-filled login-btn">
            Login
          </button>

          <label>
            Not registered yet?
            <Link to="/signup" className="forget-password create-account">
              Create an Account
            </Link>
          </label>
        </form>
      </div>
    </section>
  );
};

export default Login;
