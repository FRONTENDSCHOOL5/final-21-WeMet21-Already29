import styled from "styled-components";

const SignUpContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 390px;
  height: 100vh;
`;
const H1 = styled.h1`
  margin-top: 54px;
  text-align: center;
  font-size: var(--font-lg-size);
  margin-bottom: 40px;
  font-weight: bold;
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 3.4rem;
`;

export {SignUpContainer, H1, SignUpForm};
