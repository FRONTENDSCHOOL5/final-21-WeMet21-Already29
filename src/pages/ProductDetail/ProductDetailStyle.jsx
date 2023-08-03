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

  span {
    color: var(--gray-color);
  }
`;

const AuthorInfo = styled.section`
  padding: 10px 0 20px;
  width: 100%;
  font-size: 1.6rem;
  position: fixed;
  width: 390px;
  box-sizing: border-box;
  bottom: 0;
  background-color: var(--white-color);
  border-top: 1px solid var(--line-gray-color);
  box-sizing: border-box;
`;

export { ProductImage, ProductPage, AuthorInfo, ProductImageWrapper, ProductPrice, ProductTitle, ProductDetailSection };
