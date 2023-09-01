import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProductItem from "../../ProductItem/ProductItem";

import { SwiperSlide } from "swiper/react";

import fetchApi from "../../../utils/fetchApi";

import { CustomSwiper, LinkStyle, ProductSection } from "./ProfileProductSectionStyle";

export default function ProfileProduct({ userData }) {
  const [productDatas, setProductDatas] = useState(null);
  const { id: accountname } = useParams();

  useEffect(() => {
    fetchApi(`product/${accountname}/?limit=5`).then((res) => setProductDatas(res.product));
  }, [accountname]);

  return (
    userData &&
    productDatas &&
    productDatas.length !== 0 && (
      <ProductSection>
        <h2>
          <LinkStyle to={`/product/list/${userData.accountname}`} style={{ userDrag: "none" }}>
            판매 중인 상품
          </LinkStyle>
        </h2>

        <ul>
          {productDatas && (
            <CustomSwiper slidesPerView={2.5} spaceBetween={10}>
              {productDatas.map((item) => {
                return (
                  <SwiperSlide key={item.id}>
                    <ProductItem item={item} />
                  </SwiperSlide>
                );
              })}
            </CustomSwiper>
          )}
        </ul>
      </ProductSection>
    )
  );
}
