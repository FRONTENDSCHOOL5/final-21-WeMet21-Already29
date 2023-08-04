import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import uploadDateCalculate from "../../utils/uploadDateCalculate";
import { SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { CustomSwiper, FilterAside } from "./ProductsStyle";
import Header from "../Header/Header";
import { imageErrorHandler } from "../../utils/imageErrorHandler";
import category from "../../contexts/ProductCategoryContext";
import SquareButton from "../Button/SquareButton/SquareButton";

const RenderItemList = ({ item }) => {
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

const ListPage = ({ productDatas }) => {
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
          {productDatas[0].author.username}님 판매상품
        </Header>
      )}
      <FilterAside>
        <form>
          <fieldset>
            <legend className="a11y-hidden">상품 카테고리 필터</legend>
            <button type="button" onClick={() => setcheckedItems(new Set())}>
              초기화
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
              return <RenderItemList item={item} key={index} />;
            })
          : productDatas &&
            productDatas.map((item, index) => {
              return <RenderItemList item={item} key={index} />;
            })}
      </ul>
    </>
  );
};

const ProfilePage = ({ productDatas }) => {
  return (
    <ul>
      {productDatas && (
        <CustomSwiper slidesPerView={2.5} spaceBetween={10}>
          {productDatas.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <li>
                  <Link to={`/product/detail/${item.id}`}>
                    <div className="product-img-section">
                      <img src={item.itemImage} alt="상품 이미지" className="product-img" onError={imageErrorHandler} />
                    </div>
                    <div className="product-info-section">
                      <h3 className="product-title">{item.itemName}</h3>
                      <p className="product-price">{new Intl.NumberFormat().format(item.price)}원</p>
                    </div>
                  </Link>
                </li>
              </SwiperSlide>
            );
          })}
        </CustomSwiper>
      )}
    </ul>
  );
};

export default function Products({ page, productDatas, setProductDatas }) {
  const product = {
    listPage: <ListPage productDatas={productDatas} setProductDatas={setProductDatas} />,
    profilePage: <ProfilePage productDatas={productDatas} />,
  };

  return product[page];
}
