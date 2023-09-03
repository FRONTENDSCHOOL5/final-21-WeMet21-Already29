import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const Button = styled.button`
  ${(props) => {
    return css`
      width: ${props.btnWidth || "100%"};
      height: ${props.btnHeight || "44px"};
      font-size: ${props.btnFontSize || "1.4rem"};
    `;
  }}
  flex-shrink: 0;
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
  ${(props) => {
    return css`
      width: ${props.btnWidth || "100%"};
      height: ${props.btnHeight || "44px"};
      font-size: ${props.btnFontSize || "1.4rem"};
    `;
  }}
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
