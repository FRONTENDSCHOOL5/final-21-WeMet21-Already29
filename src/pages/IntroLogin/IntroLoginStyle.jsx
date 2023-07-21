import styled from "styled-components";
import { Link } from "react-router-dom";
import emailImage from "../../assets/images/mail.png";
import doubleArrow from "../../assets/images/doubleArrow.svg";

const StyledIntroLoginPage = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  gap: 25px;
  font-size: 1.6rem;
  box-shadow: 1px 1px 10px black;
  padding: 20px 34px;
  box-sizing: border-box;

  .title {
    font-size: 4rem;
    font-weight: 700;
    align-self: flex-start;
    margin-bottom: 20px;
  }

  .sub-title {
    width: 100%;
    font-size: 1.8rem;
    font-weight: 400;
    line-height: 1.2;

    span {
      display: block;
    }
  }

  img {
    margin: min(85px, 10vh) 0 10px;
  }

  .signup-text {
    display: flex;
    width: 100%;
    justify-content: space-between;

    span {
      color: var(--gray-color);
    }
  }
`;

const EmailLoginLink = styled(Link)`
  position: relative;
  display: block;
  border: 1px solid #000;
  width: 100%;
  text-align: center;
  padding: 12px 0;
  border-radius: 10px;
  font-weight: 500;
  font-size: 1.6rem;
  box-shadow: 1px 1px 3px var(--gray-color);
  transition: all.1s;
  transform: translateY(-1px);

  &::before {
    content: "";
    display: inline-block;
    width: 20px;
    height: 16px;
    background-image: url(${emailImage});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
    margin-right: 10px;
    vertical-align: top;
    transition: all.1s;
  }

  &:hover {
    background-color: var(--main-color);
    color: #fff;

    ::before {
      filter: invert(100%);
    }
  }

  &:active {
    box-shadow: none;
    transform: translateY(0);
  }
`;

const EmailSignUpLink = styled(Link)`
  font-weight: 700;
  font-size: 1.6rem;
  vertical-align: middle;

  &::after {
    content: "";
    background-image: url(${doubleArrow});
    background-position: center;
    display: inline-block;
    background-size: contain;
    width: 12px;
    height: 100%;
    vertical-align: top;
    margin-left: 6px;
    background-repeat: no-repeat;
    height: 100%;
    line-height: 1.6rem;
  }
`;

export { StyledIntroLoginPage, EmailSignUpLink, EmailLoginLink };
