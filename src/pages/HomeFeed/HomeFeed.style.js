import styled from "styled-components";

export const FeedSection = styled.main`
  margin-bottom: 80px;

  li {
    list-style: none;
  }
`;
export const EmptyWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  height: max-content;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;

  h2 {
    margin: 0px;
    font-weight: 400;
    font-size: 14px;
    color: #767676;
  }
`;
