import styled from "styled-components";

export const ProductHeader = styled.header`
  display: flex;
  gap: 18px;

  img {
    border-radius: 50%;
    width: 36px;
    height: 36px;
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

export const ProductContent = styled.section`
  margin-left: 54px;
  p {
    font-size: 1.4rem;
    margin: 16px 0;
  }
  time {
    display: block;
    font-size: 1rem;
    color: var(--gray-color);
  }
  img {
    border-radius: 10px;
    margin-bottom: 10px;
  }
`;
