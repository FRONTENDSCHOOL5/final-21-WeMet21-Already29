import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { AuthorInfo, ProductDetailSection, ProductImage, ProductImageWrapper, ProductPage, ProductPrice, ProductTitle } from "./ProductDetailStyle";
import { followButtonHandler } from "../../utils/followButtonHandler";
import uploadDateCalculate from "../../utils/uploadDateCalculate";

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

  console.log(product);

  return (
    <ProductPage>
      {product ? (
        <>
          <ProductImageWrapper>
            <ProductImage src={product.itemImage} alt="상품 이미지" />
          </ProductImageWrapper>
          <ProductDetailSection>
            <ProductTitle>{product.itemName}</ProductTitle>
            <ProductPrice>
              {new Intl.NumberFormat().format(product.price)}
              <span>원</span>
            </ProductPrice>
            <span>{uploadDateCalculate(product.updatedAt)}</span>
            <p>
              구매링크<a href={product.link}>{product.link}</a>
            </p>
          </ProductDetailSection>
          <Link to={`/product/modify/${param.id}`}>상품 수정하기</Link>
          <button type="button" onClick={deleteProductHandler}>
            삭제하기
          </button>
          <AuthorInfo>
            <Link to={`/profile/${productAuthor.accountname}`}>
              <img src={productAuthor.image} alt="상점 프로필 사진" />
              <div>
                <p>{productAuthor.username}</p>
                <p>@ {productAuthor.accountname}</p>
              </div>
            </Link>
            <button type="button" onClick={followButtonHandler}>
              {productAuthor.isfollow ? "언팔로우" : "팔로우"}
            </button>
          </AuthorInfo>
        </>
      ) : (
        <Loading />
      )}
    </ProductPage>
  );
}
