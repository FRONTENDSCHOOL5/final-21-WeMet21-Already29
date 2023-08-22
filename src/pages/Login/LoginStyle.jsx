import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginContainer = styled.div`
  height: 100vh;
  padding: 0 3.4rem;
`;

const H2 = styled.h2`
  margin-top: 54px;
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

export { LoginContainer, H2, LoginForm, StyleLink, NavStyle };
