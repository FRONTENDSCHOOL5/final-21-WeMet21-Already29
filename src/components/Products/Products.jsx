import React from "react";
import { Link } from "react-router-dom";
import uploadDateCalculate from "../../utils/uploadDateCalculate";
import { SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { CustomSwiper } from "./ProductsStyle";
import Header from "../Header/Header";
import { imageErrorHandler } from "../../utils/imageErrorHandler";

export default function Products({ products, productDatas }) {
  // products가 있으면 상품 상세 페이지 리스트 반환
  // productDatas는 프로필 상품 리스트

  return (
    <>
      {products && products.length !== 0 ? <Header type="back">{products[0].author.username}님 판매상품</Header> : ""}
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
        {products &&
          products.map((item) => {
            return (
              <li key={item.id}>
                <Link to={`/product/detail/${item.id}`}>
                  <div className="product-img-section">
                    <img src={item.itemImage} alt="상품 이미지" className="product-img" onError={imageErrorHandler} />
                  </div>
                  <div className="product-info-section">
                    <h3 className="product-title">{item.itemName}</h3>
                    <p className="product-price">{new Intl.NumberFormat().format(item.price)}원</p>
                  </div>
                  <span>{uploadDateCalculate(item.updatedAt)}</span>
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
}
