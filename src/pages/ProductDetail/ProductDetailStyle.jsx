import styled from "styled-components";

const ProductPage = styled.main``;

const ProductImage = styled.img`
  width: 100%;
`;

const ProductImageWrapper = styled.section`
  display: flex;
  height: 400px;
  align-items: center;
  border: 1px solid var(--main-color);
  overflow: hidden;
`;

const ProductTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  margin: 20px 0;
`;

const ProductPrice = styled.p`
  font-size: 2.4rem;
  font-weight: bold;
  margin-bottom: 5px;

  span {
    font-size: 2rem;
    margin-left: 5px;
  }
`;

const ProductDetailSection = styled.section`
  .distributor {
    border: 2px solid var(--line-gray-color);
    text-align: center;
    border-radius: 5px;
    padding: 13px;
    margin: 10px 0;
    background-color: var(--white-color);
    color: var(--gray-color);
    font-size: 1.4rem;
  }

  span {
    color: var(--gray-color);
  }
`;

const AuthorInfo = styled.section`
  padding: 23px 15px 24px;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  position: fixed;
  width: min(390px, 80vw);
  bottom: 0;
  background-color: var(--white-color);
  border-top: 1px solid var(--line-gray-color);

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

export { ProductImage, ProductPage, AuthorInfo, ProductImageWrapper, ProductPrice, ProductTitle, ProductDetailSection };
