import styled from "styled-components";

export const PostHeader = styled.header`
  margin-top: 10px;
  flex-grow: 1;
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;

  a {
    display: inline-flex;
    gap: 12px;
    align-items: center;
    width: 90%;
    overflow: hidden;
  }

  .profile-image {
    border-radius: 50%;
    width: 36px;
    height: 36px;
    object-fit: cover;
    flex-shrink: 0;
  }

  .user-name {
    color: #000;
    font-size: 1.4rem;
    margin-bottom: 4px;
  }

  div {
    flex-grow: 1;
    overflow: hidden;
  }

  .accountname {
    font-size: 1.2rem;
    color: var(--gray-color);

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 1.1;
  }

  time {
    font-size: 1rem;
    color: var(--gray-color);

    &:before {
      content: "·";
      margin: 0 5px;
    }
  }

  button {
    vertical-align: top;
    float: right;
  }
`;
