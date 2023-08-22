import React, {useContext, useEffect, useState} from "react";
import category from "../../contexts/ProductCategoryContext";
import Header from "../Header/Header";
import styled from "styled-components";
import SquareButton from "../Button/SquareButton/SquareButton";
import {Link} from "react-router-dom";
import {imageErrorHandler} from "../../utils/imageErrorHandler";
import uploadDateCalculate from "../../utils/uploadDateCalculate";
import refresh from "../../assets/images/Icon-refresh.png";

export const FilterAside = styled.aside`
  form {
    overflow: auto;
  }
  fieldset {
    display: flex;
    gap: 9px;
    width: max-content;
    padding: 8px 0px;
  }
`;

export const ProductItem = ({item}) => {
  const [isShare, setIsShare] = useState("");

  useEffect(() => {
    try {
      setIsShare(JSON.parse(item.link).isShare);
    } catch (e) {}
  }, [item.link]);

  return (
    <li key={item.id}>
      <Link to={`/product/detail/${item.id}`}>
        <div className="product-img-section">
          <img src={item.itemImage} alt="상품 이미지" className="product-img" onError={imageErrorHandler} />
        </div>
        <div className="product-info-section">
          <h3 className="product-title">{item.itemName}</h3>
          <p className="product-price">{isShare ? "나눔!" : new Intl.NumberFormat().format(item.price) + "원"}</p>
        </div>
        <span>{uploadDateCalculate(item.updatedAt)}</span>
      </Link>
    </li>
  );
};

const ListProduct = ({productDatas, skip, setSkip, hasMore}) => {
  const categoryData = useContext(category);
  const [checkedItems, setcheckedItems] = useState("");
  const [filterProductDatas, setFilterProductDatas] = useState("");

  useEffect(() => {
    if (productDatas) {
      const filterDatas = productDatas.filter((item) => {
        try {
          return checkedItems && checkedItems.has(JSON.parse(item.link).category);
        } catch (e) {
          return null;
        }
      });
      setFilterProductDatas(filterDatas);
    }
  }, [checkedItems, productDatas]);

  useEffect(() => {
    if (filterProductDatas && filterProductDatas.length) {
      while (hasMore) {
        if (filterProductDatas.length >= 6 || hasMore) {
          break;
        }
        setSkip((prev) => prev + 1);
      }
    }
  }, [filterProductDatas, setSkip, hasMore]);

  const filterCheckboxHandler = (e) => {
    if (e.target.checked) {
      setcheckedItems((prev) => new Set([...prev, e.target.id]));
    } else {
      setcheckedItems((prev) => {
        const copy = new Set(prev);
        copy.delete(e.target.id);
        return copy;
      });
    }
  };

  return (
    <>
      {productDatas && (
        <Header type="back" href={`/profile/${productDatas[0].author.accountname}`}>
          {productDatas[0].author.username}님의 상품
        </Header>
      )}
      <FilterAside>
        <form>
          <fieldset>
            <legend className="a11y-hidden">상품 카테고리 필터</legend>
            <button type="button" onClick={() => setcheckedItems(new Set())}>
              <img src={refresh} alt="초기화버튼" style={{width: "24px"}} />
            </button>
            {Object.entries(categoryData).map((item) => {
              const key = item[0];
              const value = item[1];
              return (
                <React.Fragment key={key}>
                  <SquareButton type="checkbox" data={key} value={value} state={checkedItems} setState={filterCheckboxHandler} />
                </React.Fragment>
              );
            })}
          </fieldset>
        </form>
      </FilterAside>

      <ul>
        {filterProductDatas && checkedItems.size
          ? filterProductDatas.map((item, index) => {
              return <ProductItem item={item} key={index} />;
            })
          : productDatas &&
            productDatas.map((item, index) => {
              return <ProductItem item={item} key={index} />;
            })}
      </ul>
    </>
  );
};

export default ListProduct;
