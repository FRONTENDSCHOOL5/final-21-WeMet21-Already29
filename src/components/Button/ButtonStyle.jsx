import { Link } from "react-router-dom";
import styled from "styled-components";

const Button = styled.button`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "44px"};
  border-radius: 10px;
  font-size: 1.4rem;
  box-sizing: border-box;
  text-align: center;
  color: var(--white-color);

  &:disabled {
    background-color: var(--unactive-color);
  }
`;

const StyleButton = styled(Button)`
  background-color: var(--main-color);
`;

const ProfileUna = styled(Button)`
  width: 120px;
  padding: 10px 0;
  border: 1px solid var(--gray-color);
  color: var(--gray-color);
`;

const ProfileNav = styled(Link)`
  display: inline-block;
  text-align: center;
  width: 12rem;
  padding: 10px 0;
  border: 1px solid var(--gray-color);
  border-radius: 10px;
  color: var(--gray-color);
  font-size: 1.4rem;
`;

export { StyleButton, ProfileNav, ProfileUna };
