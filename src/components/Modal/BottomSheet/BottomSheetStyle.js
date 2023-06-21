import styled from "styled-components";

export const BottomSheetBackDrop = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 99;
`;

export const BottomSheetWrapper = styled.article`
  border-radius: 10px 10px 0 0;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 390px;
  overflow: hidden;
  font-size: 1.4rem;
  background-color: #fff;
  padding-top: 20px;
  -webkit-user-drag: element;
  z-index: 100;

  button,
  a {
    background-color: inherit;
    display: block;
    text-align: left;
    width: 100%;
    border: 0;
    padding: 14px 26px;
    user-select: none;
    -webkit-user-drag: none;
  }
`;
