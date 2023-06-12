import React from 'react';
import mainLogo from '../../assets/images/main-logo.png';
import footerLogo from '../../assets/images/splash-footer.png'
import StyledSplashPage from './styled';

const SplashPage = () => (
    <StyledSplashPage>
      <h1 className="main-logo">
        <img src={mainLogo} alt="mainLogo" />
      </h1>
      <footer className='footer-logo'>
        <img src={footerLogo} alt="footerLogo" />
      </footer>
    </StyledSplashPage>
);

export default SplashPage;