import React, { useContext, useEffect } from "react";
import LoadingScreen from "react-loading-screen";
import logo from "../../assets/images/tinder.png";
import { useNavigate } from "react-router-dom";
import UserContext from "../../store/auth-context";

const Logout = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      userContext.logout();
      navigate("/");
    }, 2000);
  }, [navigate]);

  return (
    <LoadingScreen
      loading={true}
      bgColor="#f1f1f1"
      spinnerColor="red"
      textColor="#555"
      logoSrc={logo}
      text="Logging out"
    ></LoadingScreen>
  );
};

export default Logout;
