import styled from "styled-components";

export const StyleInput = styled.input`
  width: 100%;
  padding: 1.2rem;
  margin: 10px 0 16px;
  border: none;
  outline: var(--main-color);
  background-color: var(--box-gray-color);
  border-radius: 10px;
  box-sizing: border-box;

  &::placeholder {
    color: var(--gray-color);
    font-size: 14px;
  }

  &:focus {
    outline: 2px solid var(--main-color);
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
  color: var(--font-black-color);
  font-weight: bold;
`;
