import Products from "../../components/Products";
import { useRef } from "react";
import { Ul } from "./ProductListStyle";

export default function ProductList() {
  const userAccountName = "testtestabc";
  const slideUl = useRef(null);

  return (
    <section>
      <Ul ref={slideUl}>
        <Products userAccountName={userAccountName} />
      </Ul>
    </section>
  );
}
