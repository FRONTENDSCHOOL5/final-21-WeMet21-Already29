import styled from "styled-components";

export const PostHeader = styled.header`
  padding: 0 16px;
  margin-top: 10px;
  width: 100%;
  box-sizing: border-box;

  a {
    display: inline-flex;
    gap: 12px;
    align-items: center;
  }

  .profile-image {
    border-radius: 50%;
    width: 36px;
    height: 36px;
    object-fit: cover;
  }

  .user-name {
    color: #000;
    font-size: 1.4rem;
    margin-bottom: 4px;
  }

  div {
    flex-grow: 1;
  }

  p {
    font-size: 1.2rem;
    color: var(--gray-color);
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
