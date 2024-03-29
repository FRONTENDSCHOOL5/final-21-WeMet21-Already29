import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

import Navigation from "../../components/NavBar/NavBar";
import category from "../../contexts/ProductCategoryContext";
import Header from "../../components/Header/Header";
import ToggleButtonGroup from "../../components/ToggleButton/ToggleButton";
import ProductItem from "../../components/ProductItem/ProductItem";

import refresh from "../../assets/images/Icon-refresh.png";

import { FilterAside, ProductListMain } from "./ProductSaleList.style";

export default function ProductSale() {
  const { id: userAccountName } = useParams();
  const pageEnd = useRef(null);
  const [products, setProducts] = useState(null);
  const { getData, page, setPage, hasMore } = useInfiniteScroll(`product/${userAccountName}`, pageEnd);
  const categoryData = useContext(category);
  const [checkedItems, setcheckedItems] = useState("");
  const [filterProductDatas, setFilterProductDatas] = useState("");

  useEffect(() => {
    getData(page).then((json) =>
      setProducts((prev) => {
        return prev ? [...prev, ...json.product] : json.product;
      })
    );
  }, [page]);

  useEffect(() => {
    if (products) {
      const filterDatas = products.filter((item) => {
        try {
          return checkedItems && checkedItems.has(categoryData[JSON.parse(item.link).category]);
        } catch (e) {
          return null;
        }
      });
      setFilterProductDatas(filterDatas);
    }
  }, [checkedItems, products, categoryData]);

  useEffect(() => {
    if (filterProductDatas && filterProductDatas.length) {
      while (hasMore) {
        if (filterProductDatas.length >= 6 || hasMore) {
          break;
        }
        setPage((prev) => prev + 1);
      }
    }
  }, [filterProductDatas, setPage, hasMore]);

  const filterCheckboxHandler = (e) => {
    if (e.target.checked) {
      setcheckedItems((prev) => new Set([...prev, e.target.value]));
    } else {
      setcheckedItems((prev) => {
        const copy = new Set(prev);
        copy.delete(e.target.value);
        return copy;
      });
    }
  };
  console.log(checkedItems);
  return (
    <>
      {products && (
        <Header type="back" href={`/profile/${products[0].author.accountname}`}>
          {products[0].author.username}님의 상품
        </Header>
      )}
      <FilterAside>
        <form>
          <fieldset>
            <legend className="a11y-hidden">상품 카테고리 필터</legend>
            <button type="button" onClick={() => setcheckedItems(new Set())}>
              <img src={refresh} alt="초기화버튼" style={{ width: "24px" }} />
            </button>
            <ToggleButtonGroup type="checkbox" data={Object.entries(categoryData)} state={checkedItems} setState={filterCheckboxHandler} />
          </fieldset>
        </form>
      </FilterAside>
      <ProductListMain>
        <ul>
          {filterProductDatas && checkedItems.size
            ? filterProductDatas.map((item, index) => {
                return <ProductItem item={item} key={item.id} />;
              })
            : products &&
              products.map((item, index) => {
                return <ProductItem item={item} key={item.id} />;
              })}
        </ul>
      </ProductListMain>
      <div ref={pageEnd} />
      <Navigation />
    </>
  );
}
