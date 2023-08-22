import {Swiper, SwiperSlide} from "swiper/react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {imageErrorHandler} from "../../utils/imageErrorHandler";

export const CustomSwiper = styled(Swiper)`
  margin-top: 16px;

  .product-img {
    width: 100%;
    border-radius: 10px;
    object-fit: cover;
    aspect-ratio: 1/1;
  }

  .product-title {
    margin: 5px 0;
    font-size: 1.4rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .product-price {
    color: var(--main-color);
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

const ProfileProduct = ({productDatas}) => {
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

export default ProfileProduct;
