import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import uploadDateCalculate from "../utils/uploadDateCalculate";

export default function Products(props) {
  const userAccountName = props.userAccountName;
  const [timeView, setTimeView] = useState(false);
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
    console.log(json);
    const userProductItems = json.product;
    setProductDatas(userProductItems);
  }

  useEffect(() => {
    fetchUserProducts();
    setTimeView(props.timeView);
  }, []);

  return (
    <>
      {productDatas
        ? productDatas.map((item) => {
            return (
              <li key={item.id}>
                <Link to={`/product/detail/${item.id}`} draggable={false}>
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
    </>
  );
}
