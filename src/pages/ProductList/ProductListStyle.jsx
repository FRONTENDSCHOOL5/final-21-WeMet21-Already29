import styled from "styled-components";

const ProductListSection = styled.section`
  padding-bottom: 60px;

  li {
    width: 100%;
    font-size: 1.5rem;
    padding: 0 20px;
    box-sizing: border-box;

    a {
      margin: 10px 0;
      display: flex;
      gap: 10px;
    }
    .product-img-section {
      flex-shrink: 0;
    }
    .product-info-section {
      flex-grow: 0;
      overflow: hidden;
    }
    .product-img {
      border-radius: 10px;
      object-fit: cover;
      width: 150px;
      aspect-ratio: 4/3;
    }
    .product-title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .product-price {
      color: var(--main-color);
      font-weight: bold;
      font-size: 1.8rem;
    }

    span {
      margin-left: auto;
      flex-shrink: 0;
      font-size: 1.2rem;
      color: var(--gray-color);
    }
  }

  li + li {
    border-top: 1px solid #ccc;
  }
`;

export { ProductListSection };
