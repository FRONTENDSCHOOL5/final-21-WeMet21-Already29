import styled from "styled-components";

const Ul = styled.ul`
  li {
    width: 100%;
    font-size: 18px;

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
      width: 200px;
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
    }
  }

  li + li {
    border-top: 1px solid #ccc;
  }
`;

export { Ul };
