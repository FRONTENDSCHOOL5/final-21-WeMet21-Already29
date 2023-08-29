import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginContainer = styled.div`
  height: 100vh;
  padding: 4rem 3.4rem 0;
`;

const H2 = styled.h2`
  text-align: center;
  font-size: var(--font-lg-size);
  margin-bottom: 40px;
  font-weight: bold;
`;

const LoginForm = styled.form`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const StyleLink = styled(Link)`
  color: white;
`;

const NavStyle = styled(NavLink)`
  display: block;
  text-align: center;
  margin-top: 20px;
  color: var(--gray-color);
  font-size: var(--font-sm-size);
`;

const WarningMessage = styled.p`
  text-align: ${({ alignCenter }) => alignCenter && "center"};
  color: red;
  font-size: 1.1rem;
  margin: -1rem 0 1.5rem;
`;

export { LoginContainer, H2, LoginForm, StyleLink, NavStyle, WarningMessage };
