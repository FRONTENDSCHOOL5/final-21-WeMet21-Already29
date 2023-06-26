import styled from "styled-components";

export const Container = styled.div`
  width: 358px;
  display: flex;
  align-items: center;
`;

export const FollowerImgTest = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  vertical-align: middle;
`;

export const FollowerInfo = styled.div`
  padding: 5px 0;
  flex-grow: 1;
`;

export const FollowerName = styled.p`
  font-size: 14px;
  margin-bottom: 6px;
`;

export const FollowerIntro = styled.p`
  font-size: 12px;
  color: #767676;
`;
