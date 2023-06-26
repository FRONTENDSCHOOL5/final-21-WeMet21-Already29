import styled, { keyframes } from "styled-components";

const fadeInOut = keyframes`
    from {opacity: .2;} 
`;

const Earth = keyframes`
  from{
    transform: translateY(40px);
    opacity: .5
  }

`;

const rotateEarth = keyframes`
  to{
    rotate: 360deg;
  }
`;

const EarthImageWrap = styled.div``;
const LogoImageWrap = styled.div``;

const StyledSplashPage = styled.main`
  background-color: white;
  box-shadow: -1px 0 30px -1px #f2f2f2, 1px 0 30px -1px #f2f2f2;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  overflow: hidden;

  .main-logo {
    animation: ${fadeInOut} ease-out 0.6s;
    animation: name duration timing-function delay iteration-count direction fill-mode;
    margin-right: 38px;
  }

  .earth-image {
    animation: ${Earth} 0.4s ease-in-out, ${rotateEarth} 10s cubic-bezier(0, 0, 1, 1) 0.4s infinite;
    animation: name duration timing-function delay iteration-count direction fill-mode;
    position: relative;
    bottom: -60%;
  }
`;

export { StyledSplashPage, EarthImageWrap, LogoImageWrap };
