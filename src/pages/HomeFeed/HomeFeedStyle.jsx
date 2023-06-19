import styled from 'styled-components';

const StyledHomeFeedPage = styled.div`
  width: 390px;
  height: 820px;
  border: 0.5px solid #dbdbdb;
  display: flex;
  flex-direction: column;
  font-family: "NexonGothic";
  width: 390px;
  margin: 0 auto;
  position: relative;

  * {
    box-sizing: border-box;
  }

  main {
    width: 390px;
    height: 712px;
    padding: 20px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
  }

  button {
    color: white;
    font-size: var(--font-lg-size);
    cursor: pointer;
  }

  button:hover {
    color: black;
    font-size: var(--font-lg-size);
    filter: saturate(2);
  }

  .non-post {
    margin-top: 200px;
  }

  span {
    margin: 20px 0px;
    font-size: var(--font-lg-size);
    color: #767676;
  }

  .TopImg {
    width: 51.06px;
    height: 45.82px;
    aspect-ratio: 2 / 1;
    position: absolute;
    top: 1px;
    left: 20px;   
  }
`;

const TabMenuWrap = styled.div`
  bottom: 0px;
`;

export { StyledHomeFeedPage, TabMenuWrap };