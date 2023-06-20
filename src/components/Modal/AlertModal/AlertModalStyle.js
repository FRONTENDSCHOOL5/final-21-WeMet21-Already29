import styled from "styled-components";

export const ModalBackDrop = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
`;

export const ModalWrapper = styled.section`
  font-size: 1.6rem;
  position: relative;
  text-align: center;
  line-height: 65px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 20px;
  width: 252px;
  height: 110px;
  box-shadow: 0 0 2px var(--gray-color);
  overflow: hidden;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  position: absolute;
  border-top: 1px solid var(--line-gray-color);
  bottom: 0;

  button {
    width: 50%;
    font-size: 1.4rem;
    font-weight: 500;
    background-color: initial;
    border: 0;
    padding: 0;
  }

  button:nth-child(2) {
    border-left: 1px solid var(--line-gray-color);
    color: var(--main-color);
  }
`;
