import React from "react";
import mainLogo from "../../assets/images/main-logo.png";
import bigEarth from "../../assets/images/bigEarth.png";

import { StyledSplashPage, EarthImageWrap, LogoImageWrap } from "./SplashStyle";

const SplashPage = () => (
  <StyledSplashPage>
    <LogoImageWrap>
      <img src={mainLogo} alt="mainLogo" className="main-logo" />
    </LogoImageWrap>
    <EarthImageWrap>
      <div className="walk-mascot" />
      <img src={bigEarth} alt="footerLogo" className="earth-image" />
    </EarthImageWrap>
  </StyledSplashPage>
);

export default SplashPage;
