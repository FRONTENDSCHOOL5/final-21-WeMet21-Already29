import styled from "styled-components";

export const LoadingImage = styled.img`
  animation-duration: 2s;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: max(10vw, 100px);
  animation-name: rotate;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  @keyframes rotate {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;
