import styled, { keyframes } from "styled-components";
import walkMascot from "../../assets/images/walkMascot.png";

const fadeInOut = keyframes`
    from {opacity: .2;} 
`;

const rotateEarth = keyframes`
  to{rotate: -360deg}
`;

const StyledSplashPage = styled.main`
  position: relative;
  background-color: white;
  box-shadow: -1px 0 30px -1px #f2f2f2, 1px 0 30px -1px #f2f2f2;
  padding-top: 20%;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
`;

const LogoImageWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 10%;

  .main-logo {
    animation: ${fadeInOut} ease-out 0.6s;
    animation: name duration timing-function delay iteration-count direction fill-mode;
  }
`;

const EarthImageWrap = styled.div`
  width: 200%;
  position: relative;
  bottom: -50%;
  left: -50%;

  .earth-image {
    animation: ${rotateEarth} 8s cubic-bezier(0, 0, 1, 1) infinite;
  }
  .walk-mascot {
    position: absolute;
    top: -20%;
    left: 30%;
    z-index: 1;
    width: calc(2049px / 8);
    height: 170px;
    background: url(${walkMascot}) no-repeat 0 0 / auto 100%;
    animation: walk 1s infinite steps(7);
  }
  @keyframes walk {
    to {
      background-position: right 0;
    }
  }
`;

export { StyledSplashPage, EarthImageWrap, LogoImageWrap };
