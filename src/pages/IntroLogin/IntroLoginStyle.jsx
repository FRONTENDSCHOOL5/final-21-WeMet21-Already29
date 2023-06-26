import styled from "styled-components";
import { Link } from "react-router-dom";
import emailImage from "../../assets/images/mail.png";

const StyledIntroLoginPage = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 10px;
  font-size: 1.6rem;
  box-shadow: 1px 1px 10px black;
  padding: 0 34px;

  h1 {
    font-size: 3rem;
    font-weight: 700;
    align-self: flex-start;
  }

  .sub-title {
    font-size: 1.8rem;
    font-weight: 400;
  }

  img {
    margin: 60px 0 30px;
  }
  .signup-text {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
`;

const EmailLoginLink = styled(Link)`
  display: block;
  border: 1px solid #ccc;
  width: 80%;
  text-align: center;
  padding: 10px 0;
  border-radius: 10px;

  &::before {
    content: url(${emailImage});
    width: 12px;
    height: 12px;
  }
`;

const EmailSignUpLink = styled(Link)`
  font-weight: 700;
  &::after {
    content: ">>";
    font-size: 1.4rem;
    margin-left: 8px;
  }
`;

export { StyledIntroLoginPage, EmailSignUpLink, EmailLoginLink };
