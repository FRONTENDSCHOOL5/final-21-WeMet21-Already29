import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavWrapper = styled.div`
  position: fixed;
  width: min(390px, 80vw);
  height: 6rem;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  -webkit-box-align: center;
  align-items: center;
  background-color: #ffffff;
  border-top: 1px solid var(--line-gray-color);
`;

const NavLink = styled(Link)`
  width: 8.4rem;
  height: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--line-gray-color);

  &.active {
    color: var(--main-color); /* Apply active color */
  }
`;

const StyledNavText = styled.p`
  margin-top: 0.4rem;
  font-size: 1rem;
  white-space: nowrap;
`;

export { NavWrapper, StyledNavText, NavLink };

