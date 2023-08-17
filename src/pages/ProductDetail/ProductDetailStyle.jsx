import styled from "styled-components";

export const ProductImageWrapper = styled.section`
  display: flex;
  height: 400px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const ProductTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 500;
  margin: 11px 0 9px;
`;

export const ProductPrice = styled.p`
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 15px;

  span {
    font-size: 2rem;
    margin-left: 5px;
  }
`;

export const ProductDetailSection = styled.section`
  margin-top: 20px;
  padding: 0 20px;

  .gr {
    color: var(--gray-color);
  }
`;

export const AuthorInfo = styled.section`
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

export const SaleText = styled.span`
  background-color: ${(props) => (props.isShare ? "#FFA200" : "var(--unactive-color)")};
  padding: 6px 10px;
  border-radius: 30px;
  color: #000;
  display: inline-block;
`;

export const ProductData = styled.div`
  padding: 10px 20px;
  line-height: 2;
  border-radius: 10px;
  border: 1px solid var(--line-gray-color);
  box-shadow: 3px 3px 3px var(--line-gray-color);
  margin-top: 37px;
`;

export const CategoryUl = styled.ul`
  p {
    font-size: 1.4rem;
  }

  li {
    display: flex;

    align-items: center;
    &::before {
      content: "";
      margin-right: 10px;
      width: 5px;
      height: 5px;
      background-color: var(--gray-color);
      border-radius: 50%;
    }
  }
  .category-title {
    display: inline-block;
    width: 6rem;
  }
`;
