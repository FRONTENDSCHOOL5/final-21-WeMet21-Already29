import styled from "styled-components";

export const StyleInput = styled.input`
  width: 100%;
  padding-bottom: 8px;
  margin: 10px 0 16px;
  border: 0;
  box-shadow: 0 2px 0 0 var(--line-gray-color);
  outline: none;
  font-family: inherit;

  &::placeholder {
    color: #bdbdbd;
    font-size: 1.4rem;
  }

  &:focus {
    box-shadow: 0 2px 0 0 var(--main-color);
  }

  &:disabled {
    background-color: var(--white-color);
    color: var(--line-gray-color);
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const Stylelabel = styled.label`
  font-size: 1.2rem;
  color: var(--gray-color);
`;
