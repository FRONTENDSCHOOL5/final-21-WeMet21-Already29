import styled, { keyframes } from "styled-components";

const fadeInOut = keyframes`
    0% {opacity: 0;} 
    100%{opacity:1;}
`;

const Earth = keyframes`
  0%{transform:translateY(100px)}
  100%{transform:translateY(0)}
`;

const StyledSplashPage = styled.main`
  background-color: white;
  box-shadow: -1px 0 30px -1px #f2f2f2, 1px 0 30px -1px #f2f2f2;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  overflow: hidden;
  gap: 300px;

  .main-logo {
    animation: ${fadeInOut} 1s ease-out forwards;
    width: 203px;
    margin-right: 38px;
  }

  .earth-image {
    animation: ${Earth} 1s ease-in-out;
  }
`;

export default StyledSplashPage;
