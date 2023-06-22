import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import uploadDateCalculate from "../../utils/uploadDateCalculate";
import { SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { CustomSwiper } from "./ProductsStyle";
import Header from "../Header/Header";
import Error from "../../pages/404/Error";

export default function Products(props) {
  const userAccountName = props.userAccountName;
  const [swiper, setSwiper] = useState(false);
  const [timeView, setTimeView] = useState(false);
  const [productDatas, setProductDatas] = useState(null);
  const [nameView, setNameView] = useState(false);

  async function fetchUserProducts() {
    const res = await fetch(`https://api.mandarin.weniv.co.kr/product/${userAccountName}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
    });
    const json = await res.json();
    console.log(json);
    const userProductItems = json.product;
    setProductDatas(userProductItems);
  }

  useEffect(() => {
    fetchUserProducts();
    setTimeView(props.timeView);
    setSwiper(props.swiper);
    setNameView(props.nameView);
  }, []);
  console.log(productDatas);
  return (
    <>
      {nameView && productDatas && productDatas.length !== 0 ? <Header type="back">{productDatas[0].author.username}님 판매상품</Header> : ""}
      <ul>
        {productDatas && swiper ? (
          <CustomSwiper slidesPerView={2.5} spaceBetween={10}>
            {productDatas.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <Link to={`/product/detail/${item.id}`}>
                    <div className="product-img-section">
                      <img src={item.itemImage} alt="상품 이미지" className="product-img" />
                    </div>
                    <div className="product-info-section">
                      <h3 className="product-title">{item.itemName}</h3>
                      <p className="product-price">{new Intl.NumberFormat().format(item.price)}원</p>
                    </div>
                    {timeView ? <span>{uploadDateCalculate(item.updatedAt)}</span> : ""}
                  </Link>
                </SwiperSlide>
              );
            })}
          </CustomSwiper>
        ) : (
          ""
        )}
        {productDatas && !swiper
          ? productDatas.map((item) => {
              return (
                <li key={item.id}>
                  <Link to={`/product/detail/${item.id}`}>
                    <div className="product-img-section">
                      <img src={item.itemImage} alt="상품 이미지" className="product-img" />
                    </div>
                    <div className="product-info-section">
                      <h3 className="product-title">{item.itemName}</h3>
                      <p className="product-price">{new Intl.NumberFormat().format(item.price)}원</p>
                    </div>
                    {timeView ? <span>{uploadDateCalculate(item.updatedAt)}</span> : ""}
                  </Link>
                </li>
              );
            })
          : ""}
        {productDatas && productDatas.length === 0 ? <Error>판매중인 상품이 없습니다</Error> : ""}
      </ul>
    </>
  );
}
