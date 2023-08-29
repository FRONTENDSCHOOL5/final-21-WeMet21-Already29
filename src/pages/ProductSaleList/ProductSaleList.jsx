import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

import Products from "../../components/Products/Products";
import Navigation from "../../components/NavBar/NavBar";

import { ProductListSection } from "./ProductSaleList.style";

export default function ProductSale() {
  const { id: userAccountName } = useParams();
  const pageEnd = useRef(null);
  const [products, setProducts] = useState(null);
  const { getData, page, setPage, hasMore } = useInfiniteScroll(`product/${userAccountName}`, pageEnd);

  useEffect(() => {
    getData(page).then((json) =>
      setProducts((prev) => {
        return prev ? [...prev, ...json.product] : json.product;
      })
    );
  }, [page]);

  return (
    <>
      <ProductListSection>
        <Products page="listPage" productDatas={products} skip={page} setSkip={setPage} hasMore={hasMore} />
      </ProductListSection>
      <div ref={pageEnd} />
      <Navigation />
    </>
  );
}
