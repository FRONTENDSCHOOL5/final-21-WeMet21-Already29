import React, { useEffect, useState } from "react";
import Products from "../../Products/Products";
import { LinkStyle, ProductSection } from "./ProfileProductStyle";
import { useParams } from "react-router-dom";
import fetchApi from "../../../utils/fetchApi";

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
        <LinkStyle to={`/product/list/${userData.accountname}`} style={{ userDrag: "none" }}>
          판매 중인 상품
        </LinkStyle>
        <Products page="profilePage" productDatas={productDatas} />
      </ProductSection>
    )
  );
}
