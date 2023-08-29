import { Link } from "react-router-dom";
import styled from "styled-components";

const Button = styled.button`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "44px"};
  font-size: ${(props) => props.fontSize || "1.4rem"};
  border-radius: 10px;
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

const WhiteButton = styled(Button)`
  width: ${(props) => props.width || "120px"};
  height: ${(props) => props.height || "34px"};
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

export { StyleButton, ProfileNav, WhiteButton };
