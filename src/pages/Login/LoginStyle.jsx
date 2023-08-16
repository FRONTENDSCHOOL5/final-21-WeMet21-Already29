import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {Link} from "react-router-dom";

const LoginContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 390px;
  height: 100vh;
`;

const H1 = styled.h1`
  margin-top: 54px;
  text-align: center;
  font-size: var(--font-lg-size);
  margin-bottom: 40px;
  font-weight: bold;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 3.4rem;
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

export {LoginContainer, H1, LoginForm, StyleLink, NavStyle};
