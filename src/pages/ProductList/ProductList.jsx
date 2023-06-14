import Products from "../../components/Products";
import { useRef, useState } from "react";
import { H2, Section, Ul } from "./ProductListStyle";

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
