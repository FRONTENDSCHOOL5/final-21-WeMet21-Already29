import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const ProductPage = styled.main`
  img {
    width: 100%;
  }
`;

export default function ProductDetail() {
  const param = useParams();
  const [product, setProduct] = useState(null);
  const [productAuthor, setProductAuthor] = useState(null);
  const navigator = useNavigate();
  const deleteProductHandler = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      fetch(`https://api.mandarin.weniv.co.kr/product/${param.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          alert(json.message);
          navigator("/productlist");
        });
    }
  };

  useEffect(() => {
    fetch(`https://api.mandarin.weniv.co.kr/product/detail/${param.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setProduct(json.product);
        setProductAuthor(json.product.author);
      });
  }, []);

  console.log(productAuthor);

  return (
    <ProductPage>
      {product ? (
        <>
          <img src={product.itemImage} alt="상품 이미지" />
          <h2>{product.itemName}</h2>
          <p>{new Intl.NumberFormat().format(product.price)}원</p>
          <a href={product.link}>상품 판매 링크</a>
          <br />
          <Link to={`/product/modify/${param.id}`}>상품 수정하기</Link>
          <button type="button" onClick={deleteProductHandler}>
            삭제하기
          </button>
        </>
      ) : (
        "...loading"
      )}
    </ProductPage>
  );
}
