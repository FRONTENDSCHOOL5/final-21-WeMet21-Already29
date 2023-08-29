import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import SplashPage from "../Splash/SplashPage";
import Intro from "../Intro/Intro";
import UserInfo from "../../contexts/LoginContext";

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

  return loading ? <SplashPage /> : <Intro />;
};

export default StartSplash;
