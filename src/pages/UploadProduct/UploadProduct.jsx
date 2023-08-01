import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ImgPlace, ImgUploadButton, InputLabel, Page } from "./UploadProductStyle";
import iconAlbum from "../../assets/images/icon-image.png";
import Header from "../../components/Header/Header";
import UserInput from "../../components/UserInput/UserInput";
import Button from "../../components/Button/Button";
import fetchApi from "../../utils/fetchApi";
import { profileImgErrorHandler } from "../../utils/imageErrorHandler";
import { useImage } from "../../hooks/useImage";

export default function UploadProduct() {
  const imgPre = useRef(null);
  const [productTitle, setProductTitle] = useState(""),
    [productPrice, setProductPrice] = useState(""),
    [productLink, setProductLink] = useState("");
  const { image: productImage, setImage: setProductImage, inputImageHandler } = useImage();
  const { id: productId } = useParams();
  const isModify = !!productId;

  const data = {
    product: {
      itemName: productTitle,
      price: parseInt(productPrice),
      link: productLink,
      itemImage: productImage,
    },
  };

  const navigate = useNavigate();

  useEffect(() => {
    // 상품 수정이라면 처음 실행시 상품 정보 인풋창으로 불러오기
    if (isModify) {
      fetchApi(`product/${productId}`, "PUT").then((res) => {
        setProductTitle(res.product.itemName);
        setProductPrice(res.product.price);
        setProductLink(res.product.link);
        setProductImage(res.product.itemImage);
      });
    }
  }, [isModify, productId]);

  const inputValueHandler = (e) => {
    switch (e.target.type) {
      case "text":
        setProductTitle(e.target.value);
        break;
      case "number":
        setProductPrice(e.target.value);
        break;
      case "url":
        setProductLink(e.target.value);
        break;
      default:
        break;
    }
  };

  const uploadProductHandler = (e) => {
    e.preventDefault();
    if (isModify) {
      fetchApi(`product/${productId}`, "PUT", JSON.stringify(data)).then((res) => navigate(`/product/detail/${res.product.id}`));
    } else {
      fetchApi("product", "post", JSON.stringify(data)).then((res) => navigate(`/product/detail/${res.product.id}`));
    }
  };

  const buttonKeyboardEvent = (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.target.firstElementChild.click();
    }
  };

  const [btnDisable, setBtnDisable] = useState(false);

  useEffect(() => {
    if (productTitle && productPrice && productLink && productImage) {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  }, [productTitle, productLink, productPrice, productImage]);

  return (
    <>
      <Header type="submitHeader">
        <Button category="basic" width="90px" height="32px" form="product" disabled={btnDisable}>
          저장
        </Button>
      </Header>
      <Page>
        <form id="product" onSubmit={uploadProductHandler}>
          <span>이미지 등록</span>
          <ImgPlace>
            <InputLabel htmlFor="productImg">
              <ImgUploadButton tabIndex={0} onKeyDown={buttonKeyboardEvent}>
                <img src={iconAlbum} alt="앨범 아이콘" />
              </ImgUploadButton>
            </InputLabel>
            <img src={productImage} alt="" ref={imgPre} id="productImagePre" onError={profileImgErrorHandler} />
          </ImgPlace>
          <input type="file" id="productImg" accept="image/*" style={{ display: "none" }} onChange={inputImageHandler} />
          <UserInput type="text" minLength={2} id="productNameInput" value={productTitle} onChange={inputValueHandler} placeholder="2~15자 이내여야 합니다." required>
            상품명
          </UserInput>
          <UserInput
            type="number"
            onWheel={(e) => {
              // 마우스휠로 값 변경되는 것 방지
              e.target.blur();
              // 포커스 잃지 않게
              setTimeout(() => {
                e.target.focus();
              }, 0);
            }}
            onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}
            id="productPriceInput"
            value={productPrice}
            onChange={inputValueHandler}
            placeholder="숫자만 입력 가능합니다."
            pattern="[0-9]*"
            required
            min={100}
            max={999999999}
          >
            가격
          </UserInput>
          <UserInput
            type="url"
            id="productUrlInput"
            // pattern="//^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?$/;/"
            value={productLink}
            onChange={inputValueHandler}
            placeholder="URL을 입력해주세요."
            required
          >
            판매 링크
          </UserInput>
        </form>
      </Page>
    </>
  );
}
