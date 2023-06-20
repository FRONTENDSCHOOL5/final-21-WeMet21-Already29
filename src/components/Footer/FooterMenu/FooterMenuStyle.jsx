import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavWrapper = styled.div`
  position: fixed;
  width: min(390px, 80vw);
  height: 60px;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  -webkit-box-align: center;
  align-items: center;
  background-color: #fff;
  border-top: 1px solid rgb(219, 219, 219);
`;

const NavLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #767676;

  &.active {
    color: #058b2e; /* Apply active color */
  }
`;

const StyledNavText = styled.p`
  margin-top: 4px;
  font-size: 10px;
  white-space: nowrap;
`;

export { NavWrapper, StyledNavText, NavLink };