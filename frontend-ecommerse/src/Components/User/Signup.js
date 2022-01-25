import React, { useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/tinder.png";
import "./Login.css";

const Signup = () => {
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const navigate = useNavigate();

  const signupSubmitHandler = async (e) => {
    e.preventDefault();

    const userInfo = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
    };

    const response = await axios({
      method: "post",
      url: "http://localhost:8000/api/v1/user/signup",
      data: userInfo,
    });

    navigate("/login");
  };

  return (
    <section className="section-login">
      <div className="login">
        <Link to="/">
          <img className="logo" src={logo} alt="Logo of the company" />
        </Link>
        <h3 className="turtary-heading">Signup</h3>
        <p className="login-text">Create your account and start shopping!</p>

        <form className="login-form" onSubmit={signupSubmitHandler}>
          <div className="login-form-input">
            <label>Name</label>
            <input
              className="login-input"
              type="text"
              placeholder="John Smith"
              required
              ref={nameRef}
            />
          </div>
          <div className="login-form-input">
            <label>Email</label>
            <input
              className="login-input"
              type="text"
              placeholder="someone@gmail.com"
              required
              ref={emailRef}
            />
          </div>
          <div className="login-form-input">
            <label>Password</label>
            <input
              className="login-input"
              type="password"
              placeholder="min 8 characters"
              required
              ref={passwordRef}
            />
          </div>
          <div className="login-form-input">
            <label>Confirm password</label>
            <input
              className="login-input"
              type="password"
              placeholder="min 8 characters"
              required
              ref={confirmPasswordRef}
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
