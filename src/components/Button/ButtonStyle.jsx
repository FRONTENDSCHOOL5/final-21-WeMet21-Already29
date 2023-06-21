import styled, { css } from 'styled-components';

const BtnStyle = styled.button`
  width: ${(props) => props.width || '32.2rem'};
  height: ${(props) => props.height || '4.4rem'};
  margin: ${(props) => props.margin || '0px auto'};
  color: ${(props) => props.color || 'var(--white-color)'};
  background: ${(props) => props.bgColor || 'var(--main-color)'};
  font-size: ${(props) => props.fontSize || '1.4rem'};
  font-weight: ${(props) => props.fontWeight || '500'};
  border-radius: ${(props) => props.borderRadius || '1rem'};
  border: ${(props) => props.border || 'none'};
  text-align: center;
  cursor: pointer;

  ${(props) =>
    props.disabled &&
    css`
      background-color: var(--unactive-color);
      cursor: default;
    `};

  ${(props) =>
    props.active &&
    css`
      background-color: var(--white-color);
      color: var(--gray-color);
      border: 1px solid var(--gray-color);
      cursor: pointer;
    `};
`;

export default BtnStyle;