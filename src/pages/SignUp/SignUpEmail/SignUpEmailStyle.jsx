import styled from "styled-components";

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const H1 = styled.h1`
  width: 100%;
  text-align: center;
  margin: 2.5rem 0px 4rem;
  font-size: 2.4rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 1.2rem;
  color: var(--gray-color);
  margin-bottom: 1rem;
`;

export const Input = styled.input`
  margin-bottom: 3rem;
  padding-bottom: 0.8rem;
  border: none;
  outline: none;
  font-size: 1.4rem;
  border-bottom: 2px solid var(--line-gray-color);

  &:focus {
    border-color: var(--main-color);
  }

  &::placeholder {
    font-size: 1.4rem;
    color: var(--line-gray-color);
  }
`;
