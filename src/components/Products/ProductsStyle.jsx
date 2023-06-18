import { Swiper } from "swiper/react";
import styled from "styled-components";

export const CustomSwiper = styled(Swiper)`
  margin-top: 16px;

  .product-img {
    border-radius: 10px;
    object-fit: cover;
    aspect-ratio: 1/1;
  }

  .product-title {
    margin: 5px 0;
    font-size: 1.4rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .product-price {
    color: var(--main-color);
    font-weight: bold;
    font-size: 1.2rem;
  }
`;
