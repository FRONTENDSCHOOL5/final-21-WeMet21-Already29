import React, { useEffect, useState } from "react";
import Products from "../../Products/Products";
import { LinkStyle, ProductSection } from "./ProfileProductStyle";
import { useParams } from "react-router-dom";

export default function ProfileProduct({ userData }) {
  const [productDatas, setProductDatas] = useState(null);
  const params = useParams();
  const accountname = params.id;
  async function fetchUserProducts() {
    const res = await fetch(`https://api.mandarin.weniv.co.kr/product/${accountname}/?limit=5`, {
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
  }, [params]);

  return (
    userData &&
    productDatas &&
    productDatas.length !== 0 && (
      <ProductSection>
        <LinkStyle to={`/product/list/${userData.accountname}`} style={{ userDrag: "none" }}>
          판매 중인 상품
        </LinkStyle>
        <Products productDatas={productDatas} />
      </ProductSection>
    )
  );
}
