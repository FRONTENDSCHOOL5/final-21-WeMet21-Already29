import styled, { css } from "styled-components";

export const PostSection = styled.section`
  border: 1px solid var(--line-gray-color);
  padding-top: 0;
  padding-bottom: 60px;
  li {
    list-style: none;
  }
`;

export const PostSectionHeader = styled.header`
  border-bottom: 1px solid var(--line-gray-color);
  padding: 10px 16px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  button {
    width: 26px;
    height: 26px;
    border: 0;
    padding: 0;
    background-color: initial;
  }
`;

export const Posts = styled.ul`
  ${(props) =>
    props.isAlbum &&
    css`
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      padding-bottom: 0;
      margin: 12px;
      gap: 8px;
      img {
        object-fit: cover;
        height: 110px;
        width: 100%;
      }
    `};
`;
