import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Products(props) {
  const userAccountName = props.userAccountName;
  const [productDatas, setProductDatas] = useState(null);

  async function fetchUserProducts() {
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
  }

  useEffect(() => {
    fetchUserProducts();
  }, []);

  return (
    <>
      {productDatas
        ? productDatas.map((item) => {
            return (
              <li key={item.id}>
                <Link to={`/product/detail/${item.id}`} draggable={false}>
                  <img src={item.itemImage} alt="상품 이미지" className="product-img" />
                  <h3 className="product-title">{item.itemName}</h3>
                  <p className="product-price">{new Intl.NumberFormat().format(item.price)}원</p>
                </Link>
              </li>
            );
          })
        : "loading.."}
    </>
  );
}