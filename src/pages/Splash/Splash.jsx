import React, { useContext, useEffect, useState } from "react";

import mainLogo from "../../assets/images/main-logo.png";
import bigEarth from "../../assets/images/bigEarth.png";

import { StyledSplashPage, EarthImageWrap, LogoImageWrap } from "./Splash.style";
import { useNavigate } from "react-router-dom";
import UserInfo from "../../contexts/LoginContext";
import Intro from "../Intro/Intro";

const SplashPage = () => {
  const [loading, setLoading] = useState(true);
  const { userInfo } = useContext(UserInfo);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    if (userInfo && localStorage.getItem("token")) {
      // 로그인된 사용자인 경우 홈으로 이동
      navigate("/home");
    }
  }, [userInfo, navigate]);

  return loading ? (
    <StyledSplashPage>
      <LogoImageWrap>
        <img src={mainLogo} alt="mainLogo" className="main-logo" />
      </LogoImageWrap>
      <EarthImageWrap>
        <div className="walk-mascot" />
        <img src={bigEarth} alt="earth" className="earth-image" />
      </EarthImageWrap>
    </StyledSplashPage>
  ) : (
    <Intro />
  );
};

export default SplashPage;
