import React from "react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import ListProduct from "./ListProduct";
import ProfileProduct from "./ProfileProduct";

export default function Products({ page, productDatas, setProductDatas, skip, setSkip, hasMore }) {
  const product = {
    listPage: <ListProduct productDatas={productDatas} setProductDatas={setProductDatas} skip={skip} setSkip={setSkip} hasMore={hasMore} />,
    profilePage: <ProfileProduct productDatas={productDatas} />,
  };

  return product[page];
}
