import styled from "styled-components";

const EmptyWrapper = styled.div`
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
`;

const EmptyText = styled.h2`
  margin: 0px;
  font-weight: 400;
  font-size: 14px;
  color: #767676;
`;

export { EmptyWrapper, EmptyText };
