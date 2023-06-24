import React from "react";
import mainLogo from "../../assets/images/main-logo.png";
import footerLogo from "../../assets/images/splash-footer.png";
import StyledSplashPage from "./SplashStyle";

const SplashPage = () => (
  <StyledSplashPage>
    <img src={mainLogo} alt="mainLogo" className="main-logo" />
    <img src={footerLogo} alt="footerLogo" className="earth-image" />
  </StyledSplashPage>
);

export default SplashPage;
