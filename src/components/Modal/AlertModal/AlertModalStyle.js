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

export const ModalWrapper = styled.article`
  font-size: 1.6rem;
  position: relative;
  text-align: center;
  line-height: 4;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 20px;
  width: 252px;
  box-shadow: 0 0 2px var(--gray-color);
  z-index: 998;
`;

export const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  line-height: 3;

  button {
    flex-basis: 100%;
    flex-grow: 1;
    border-top: 1px solid var(--line-gray-color);
  }
  button:first-child {
    border-right: 1px solid var(--line-gray-color);
  }
`;
