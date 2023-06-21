import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { AuthorInfo, ProductDetailSection, ProductImage, ProductImageWrapper, ProductPage, ProductPrice, ProductTitle } from "./ProductDetailStyle";
import { followButtonHandler, unfollowButtonHandler } from "../../utils/followUpButttonHandler";
import uploadDateCalculate from "../../utils/uploadDateCalculate";
import { GreenMdButton, WhiteMdButton } from "../../components/Button/Button";

export default function ProductDetail() {
  const param = useParams();
  const [product, setProduct] = useState(null);
  const [productAuthor, setProductAuthor] = useState(null);
  const [isfollow, setIsFollow] = useState(null);
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
          navigator(`/productlist/${productAuthor.accountname}`);
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

  const unfollowHandler = async () => {
    const res = await unfollowButtonHandler(productAuthor.accountname);
    const json = await res.json();
    console.log(json);
    setIsFollow(json.profile.isfollow);
  };
  const followHandler = async () => {
    const res = await followButtonHandler(productAuthor.accountname);
    const json = await res.json();
    console.log(json);
    setIsFollow(json.profile.isfollow);
  };

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
            <p className="distributor">
              구매링크 : <a href={product.link}>{product.link}</a>
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
            {isfollow ? <WhiteMdButton contents={"언팔로우"} onClick={unfollowHandler}></WhiteMdButton> : <GreenMdButton contents={"팔로우"} onClick={followHandler}></GreenMdButton>}
          </AuthorInfo>
        </>
      ) : (
        <Loading />
      )}
    </ProductPage>
  );
}
