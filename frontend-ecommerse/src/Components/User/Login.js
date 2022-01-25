import React, { useRef, useContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import LoadingScreen from "react-loading-screen";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../store/auth-context";
import logo from "../../assets/images/tinder.png";
import "./Login.css";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const userContext = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userInfo = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    const response = await axios({
      method: "post",
      url: "http://localhost:8000/api/v1/user/login",
      data: userInfo,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const token = response.data.token;

    const userResponse = await axios({
      method: "get",
      url: "http://localhost:8000/api/v1/user/myprofile",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const currentUser = userResponse.data.user;

    userContext.login(currentUser);

    Cookies.set("JWT", token, {
      path: "/",
    });

    setLoading(false);
    navigate("/");
  };

  if (loading) {
    return (
      <LoadingScreen
        loading={true}
        bgColor="#f1f1f1"
        spinnerColor="red"
        textColor="#555"
        logoSrc={logo}
        text="Logging in"
      ></LoadingScreen>
    );
  } else {
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

          <form className="login-form" onSubmit={loginSubmitHandler}>
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
  }
};

export default Login;
