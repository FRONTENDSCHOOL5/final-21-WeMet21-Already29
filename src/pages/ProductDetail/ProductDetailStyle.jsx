import styled from "styled-components";

const ProductPage = styled.main``;

const ProductImage = styled.img`
  width: 100%;
`;

const ProductImageWrapper = styled.div`
  display: flex;
  height: 400px;
  align-items: center;
`;

const ProductTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  margin: 20px 0;
`;

const ProductPrice = styled.p`
  font-size: 2.4rem;
  font-weight: bold;

  span {
    font-size: 2rem;
    color: var(--gray-color);
    margin-left: 5px;
  }
`;

const AuthorInfo = styled.div`
  padding: 23px 0 24px;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 1.6rem;

  img {
    width: 50px;
  }
  a {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  a p + p {
    font-size: 1.2rem;
    color: var(--gray-color);
    margin-top: 5px;
  }
  button {
    margin-left: auto;
    background-color: var(--main-color);
    border: 0;
    color: var(--white-color);
    font-size: 1.4rem;
    padding: 7px 32px;
    border-radius: 10px;
    cursor: pointer;
  }
`;

export { ProductImage, ProductPage, AuthorInfo, ProductImageWrapper, ProductPrice, ProductTitle };
