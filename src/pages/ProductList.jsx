import styled from "styled-components";
import Products from "../components/Products";
import { useRef, useState } from "react";

const Section = styled.section`
  margin-left: 20px;
  overflow: hidden;
`;

const H2 = styled.h2`
  font-weight: bold;
`;

const Ul = styled.ul`
  display: flex;
  overflow-x: clip;
  gap: 10px;

  li {
    flex-shrink: 0;
    width: 140px;
    font-size: 14px;

    .product-img {
      min-width: 100%;
      aspect-ratio: 4/3;
      border-radius: 10px;
      object-fit: cover;
    }
    .product-title {
      margin: 5px 0;
      width: 140px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: clip;
    }
    .product-price {
      color: var(--main-color);
    }
  }
`;

export default function ProductList() {
  const userAccountName = "testtestabc";
  const slideUl = useRef(null);
  const [mouseX, setmouseX] = useState(0);

  function test(e) {
    setmouseX(e.clientX);
  }

  return (
    <Section>
      <H2 className="product-section-title">판매 중인 상품</H2>
      <Ul ref={slideUl} onDrag={test} style={{ transform: `translateX: ${mouseX}px` }}>
        <Products userAccountName={userAccountName} />
      </Ul>
    </Section>
  );
}
