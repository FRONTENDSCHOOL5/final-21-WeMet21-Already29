import styled from "styled-components";

const ProductPage = styled.main``;

const ProductImage = styled.img`
  width: 100%;
`;

const ProductImageWrapper = styled.section`
  display: flex;
  height: 400px;
  align-items: center;
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
  padding: 0 20px;
  .distributor {
    border: 2px solid var(--line-gray-color);
    text-align: center;
    border-radius: 5px;
    padding: 13px;
    margin-top: 20px;
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
  width: 390px;
  box-sizing: border-box;
  bottom: 0;
  background-color: var(--white-color);
  border-top: 1px solid var(--line-gray-color);
  box-sizing: border-box;

  img {
    width: 50px;
    border-radius: 50%;
    aspect-ratio: 1/1;
    object-fit: cover;
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
    cursor: pointer;
  }
`;

export { ProductImage, ProductPage, AuthorInfo, ProductImageWrapper, ProductPrice, ProductTitle, ProductDetailSection };
