import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Section = styled.section`
  margin-left: 20px;
`;

const H2 = styled.h2`
  font-weight: bold;
`;

const Ul = styled.ul`
  display: flex;
  overflow-x: clip;
  gap: 10px;

  li {
    flex-shrink: 0;
    width: 140px;
    font-size: 14px;

    .product-img {
      min-width: 100%;
      aspect-ratio: 4/3;
      border-radius: 10px;
      object-fit: cover;
    }
    .product-title {
      margin: 5px 0;
      width: 140px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: clip;
    }
    .product-price {
      color: var(--main-color);
    }
  }
`;

export default function ProductList() {
  const userAccountName = "testtestabc";
  const productList = useRef(null);
  const [productDatas, setProductDatas] = useState(null);

  useEffect(() => {
    (async function () {
      const res = await fetch(`https://api.mandarin.weniv.co.kr/product/${userAccountName}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-type": "application/json",
        },
      });
      const json = await res.json();

      const userProductItems = json.product;
      setProductDatas(userProductItems);
    })();
  }, []);

  return (
    <Section>
      <H2 className="product-section-title">판매 중인 상품</H2>
      <Ul ref={productList}>
        {productDatas
          ? productDatas.map((item) => {
              return (
                <li key={item.id}>
                  <Link to={`/product/detail/${item.id}`}>
                    <img src={item.itemImage} alt="상품 이미지" className="product-img" />
                    <h3 className="product-title">{item.itemName}</h3>
                    <p className="product-price">{new Intl.NumberFormat().format(item.price)}원</p>
                  </Link>
                </li>
              );
            })
          : "loading.."}
      </Ul>
    </Section>
  );
}
