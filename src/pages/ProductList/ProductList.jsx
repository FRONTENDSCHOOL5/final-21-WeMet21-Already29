import Products from "../../components/Products";
import { useRef } from "react";
import { Ul } from "./ProductListStyle";
import { useParams } from "react-router-dom";

export default function ProductList() {
  const userAccountName = useParams();
  const slideUl = useRef(null);

  return (
    <section>
      <Ul ref={slideUl}>
        <Products userAccountName={userAccountName.id} />
      </Ul>
    </section>
  );
}
