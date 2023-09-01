import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Swiper } from "swiper/react";

export const LinkStyle = styled(NavLink)`
  font-weight: bold;
  font-size: 1.6rem;

  &::after {
    content: ">";
    margin-left: 5px;
  }
`;

export const ProductSection = styled.section`
  overflow: hidden;
  border: 1px solid var(--line-gray-color);
  padding: 16px 3px 23px 20px;
  margin-bottom: 6px;
`;

export const CustomSwiper = styled(Swiper)`
  margin-top: 16px;

  .product-img {
    width: 100%;
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

  span {
    display: none;
  }
`;
