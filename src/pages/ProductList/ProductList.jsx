import { useEffect, useRef, useState } from "react";
import Products from "../../components/Products/Products";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { ProductListSection } from "./ProductListStyle";
import { useParams } from "react-router-dom";
import Navigation from "../../components/Footer/FooterMenu/FooterMenu";

export default function ProductList() {
  const userAccountName = useParams();
  const pageEnd = useRef(null);
  const [products, setProducts] = useState(null);
  const { getData, page } = useInfiniteScroll(`product/${userAccountName.id}`, pageEnd);

  useEffect(() => {
    setTimeout(() => {
      getData(page)
        .then((res) => res.json())
        .then((json) =>
          setProducts((prev) => {
            return prev ? [...prev, ...json.product] : json.product;
          })
        );
    }, 200);

    console.log("리렌더");
  }, [page]);

  console.log(products);

  return (
    <>
      <ProductListSection>
        <Products products={products} />
      </ProductListSection>
      <div ref={pageEnd} />
      <Navigation />
    </>
  );
}
