import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledTabMenu = styled.article`
  width: 100%;
  height: 60px;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-top: 0.5px solid #dbdbdb;
`;

const StlyedNavLink = styled(NavLink)`
  display: block;
  width: 84px;
  text-align: center;

  

  img {
    width: 18px;
    height: 20px;
    margin-top: 6px;
  }

  p {
    font-size: var(--font-sm-size);
    margin: 6px;
    color: #767676;
  }

  &.active {
    img {
      width: 18px;
      height: 20px;
    }
  }
`;

export { StyledTabMenu, StlyedNavLink };