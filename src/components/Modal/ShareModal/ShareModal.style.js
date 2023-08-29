import styled from "styled-components";

export const CloseButton = styled.button`
  border: 0;
  padding: 0;
  background-color: initial;
  position: absolute;
  right: 20px;
  top: 10px;
  padding: 5px;

  img {
    width: 25px;
    filter: invert(30%);
  }
`;

export const ShareModalWrap = styled.article`
  background-color: var(--white-color);
  text-align: center;
  position: absolute;
  width: 350px;
  padding: 35px 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;

  h2 {
    font-size: 2.4rem;
    font-weight: 700;
    margin-bottom: 30px;
  }
`;

export const ShareItemWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export const ShareBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 10;
`;

export const UrlShareButton = styled.button`
  user-select: none;
  border: 0;
  padding: 0;
  background-color: var(--main-color);
  color: var(--white-color);
  width: 62px;
  height: 62px;
  border-radius: 50%;
  font-size: 2rem;
  font-weight: 700;
`;

export const KakaoShareButton = styled.a`
  cursor: pointer;
  user-select: none;
  -webkit-user-drag: none;
`;

export const KakaoIcon = styled.img`
  width: 62px;
  height: 62px;
`;
