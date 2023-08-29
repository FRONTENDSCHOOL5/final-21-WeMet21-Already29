import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const LinkStyle = styled(NavLink)`
  font-weight: bold;
  font-size: 1.6rem;

  &::after {
    content: ">";
    margin-left: 5px;
  }
`;

export const ProductSection = styled.section`
  overflow: hidden;
  border: 1px solid var(--line-gray-color);
  padding: 16px 3px 23px 20px;
  margin-bottom: 6px;
`;
