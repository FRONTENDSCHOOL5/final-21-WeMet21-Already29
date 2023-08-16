import styled from "styled-components";

export const StyleInput = styled.input`
  padding: 1.2rem;
  margin: 10px 0 16px;
  border: none;
  outline: var(--main-color);
  background-color: var(--box-gray-color);
  border-radius: 10px;

  &::placeholder {
    color: var(--gray-color);
    font-size: 14px;
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
  color: var(--font-black-color);
  font-weight: bold;
`;
