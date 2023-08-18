import React, { useState, useEffect, useContext } from "react";
import SplashPage from "../Splash/SplashPage";
import IntroLoginPage from "../IntroLogin/IntroLoginPage";
import UserInfo from "../../contexts/LoginContext";
import { useNavigate } from "react-router-dom";

const StartSplash = () => {
  const [loading, setLoading] = useState(true);
  const { userInfo } = useContext(UserInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/") {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, []);

  useEffect(() => {
    if (userInfo && localStorage.getItem("token")) {
      // 로그인된 사용자인 경우 홈으로 이동
      navigate("/home");
    }
  }, [userInfo, navigate]);

  return loading ? <SplashPage /> : <IntroLoginPage />;
};

export default StartSplash;
