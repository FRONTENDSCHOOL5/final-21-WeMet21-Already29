import styled from "styled-components";

export const PostContent = styled.article`
  padding: 0 20px;
  margin-bottom: 25px;

  .post-text {
    font-size: 1.4rem;
    margin: 16px 0;
    line-break: anywhere;
  }
  time {
    display: block;
    font-size: 1rem;
    color: var(--gray-color);
  }
  .post-image {
    border-radius: 10px;
  }
`;

export const PostMenuWrap = styled.div`
  margin: 15px 0;

  button {
    border: 0;
    padding: 0;
    background-color: initial;
  }
  img {
    width: 20px;
  }
  p {
    display: inline-block;
    margin-left: 6px;
    font-size: 1.4rem;
    color: var(--gray-color);
    vertical-align: middle;
  }
  .comment-image {
    margin-left: 12px;
  }
`;
