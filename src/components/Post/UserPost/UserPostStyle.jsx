import styled from "styled-components";

export const PostHeader = styled.header`
  display: flex;
  gap: 18px;
  padding: 0 16px;
  margin-top: 20px;

  img {
    border-radius: 50%;
    width: 36px;
    height: 36px;
    object-fit: cover;
  }

  h2 {
    font-size: 1.4rem;
    margin-bottom: 4px;
  }

  p {
    font-size: 1.2rem;
    color: var(--gray-color);
  }
`;

export const PostContent = styled.section`
  padding: 0 16px;
  .post-text {
    font-size: 1.4rem;
    margin: 16px 0;
  }
  time {
    display: block;
    font-size: 1rem;
    color: var(--gray-color);
  }
  .post-image {
    border-radius: 10px;
    margin-bottom: 10px;
  }
`;

export const PostMenuWrap = styled.div`
  margin-bottom: 15px;

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
