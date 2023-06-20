import styled, { keyframes } from 'styled-components';

const fadeInOut = keyframes`
    0% {opacity: 0;} 
    100%{opacity:1;}
`;

const StyledSplashPage = styled.main`
    height: 970px;
    width: 390px;
    background-color: white;
    font-size: 35px;
    font-family: 'HambakSnow';
    box-shadow: -1px 0 30px -1px #f2f2f2, 1px 0 30px -1px #f2f2f2;
    margin: 0 auto;

    h1 {
      text-shadow: 2px 2px 4px #5f5f5fbe;
      margin-left: 150px;
    }

    footer {
      position: absolute;
      width: 650px;
      height: 621px;
      left: -1px;
      bottom: -365px;
    }
    
    .footer-logo {
      width: 438px;
      height: 438px;
      position: relative;
      display: block;
      margin: 0 auto;
      margin-top: -50px;
    }

    .main-logo {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    .main-logo img {
      margin-top: 254px;
      width: 144px;
      height: 144px;
    }

    .main-logo,
    .main-logo img {
      animation: ${fadeInOut} 1s ease-out forwards;
    }
`;

export default StyledSplashPage;
