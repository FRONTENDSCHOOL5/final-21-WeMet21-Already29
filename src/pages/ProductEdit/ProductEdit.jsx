import React, { useRef, useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useImage } from "../../hooks/useImage";

import Header from "../../components/Header/Header";
import UserInput from "../../components/UserInput/UserInput";
import Button from "../../components/Button/Button";
import ShadowBox from "../../components/ShadowBox/ShadowBox";
import ToggleButtonGroup from "../../components/ToggleButton/ToggleButton";
import fassionCategory from "../../contexts/ProductCategoryContext";
import fetchApi from "../../utils/fetchApi";
import { profileImgErrorHandler } from "../../utils/imageErrorHandler";

import iconAlbum from "../../assets/images/icon-image.png";

import { ImgPlace, ImgUploadButton, InputLabel, Page } from "./ProductEdit.style";

export default function ProductEdit() {
  const imgPre = useRef(null);
  const [productTitle, setProductTitle] = useState(""),
    [productPrice, setProductPrice] = useState(""),
    [isShare, setIsShare] = useState(""), // isShare : 나눔 상태를 Boolean으로 나타냄
    [category, setCategory] = useState(""), // 상품 종류 (상의, 하의 ..)
    [size, setSize] = useState(""); // 상품 사이즈
  const { image: productImage, setImage: setProductImage, inputImageHandler } = useImage();
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const isModify = !!productId;
  const sizeDataArray = ["outer", "onePiece", "top", "pants"];
  const isHaveSize = sizeDataArray.includes(category);
  const categoryData = useContext(fassionCategory);
  const sizeData = ["FREE", "XS", "S", "M", "L", "XL"].map((size) => [size, size]);
  const isShareData = {
    false: "판매",
    true: "무료나눔",
  };

  const saleData = {
    isShare: isShare,
    category: category,
    size: isHaveSize ? size : null,
  };

  const data = {
    product: {
      itemName: productTitle,
      price: isShare ? parseInt(1) : parseInt(productPrice),
      link: JSON.stringify(saleData),
      itemImage: productImage,
    },
  };

  useEffect(() => {
    // 상품 수정이라면 처음 실행시 상품 정보 인풋창으로 불러오기
    if (isModify) {
      fetchApi(`product/${productId}`, "PUT").then((res) => {
        const product = res.product;
        try {
          const resSaleData = JSON.parse(res.product.link);
          setCategory(resSaleData.category);
          setIsShare(resSaleData.isShare);
          setSize(resSaleData.size);
        } catch (e) {
          console.error(e);
        }

        setProductTitle(product.itemName);
        setProductPrice(product.price === 1 ? 0 : product.price);
        setProductImage(product.itemImage);
      });
    }
  }, [isModify, productId, setProductImage]);

  const inputValueHandler = (e) => {
    switch (e.target.type) {
      case "text":
        setProductTitle(e.target.value);
        break;
      case "number":
        setProductPrice(e.target.value);
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
    const entered = productTitle && productImage && category && (!isHaveSize || size) && (isShare || productPrice);

    setBtnDisable(!entered);
  }, [productTitle, category, productPrice, productImage, isShare, isHaveSize, size]);

  useEffect(() => {
    if (isShare === "true") {
      setIsShare(true);
      setProductPrice(0);
    } else if (isShare === "false") {
      setIsShare(false);
      setProductPrice("");
    }
  }, [isShare]);

  return (
    <>
      <Header type="submitHeader">
        <Button category="basic" width="90px" height="32px" form="product" disabled={btnDisable}>
          저장
        </Button>
      </Header>
      <Page>
        <h2 className="a11y-hidden">상품 {isModify ? "수정" : "등록"}</h2>
        <form id="product" onSubmit={uploadProductHandler}>
          <span style={{ fontWeight: "700" }}>이미지 등록</span>
          <ImgPlace>
            <InputLabel htmlFor="productImg">
              <ImgUploadButton tabIndex={0} onKeyDown={buttonKeyboardEvent}>
                <img src={iconAlbum} alt="앨범 아이콘" />
              </ImgUploadButton>
            </InputLabel>
            <img src={productImage} alt="" ref={imgPre} id="productImagePre" onError={profileImgErrorHandler} />
          </ImgPlace>
          <input type="file" id="productImg" accept="image/*" style={{ display: "none" }} onChange={inputImageHandler} />
          <ShadowBox>
            <ToggleButtonGroup type="radio" title="거래 방식" data={Object.entries(isShareData)} name="sale-type" state={isShare} setState={setIsShare} />
          </ShadowBox>
          <ShadowBox>
            <UserInput type="text" minLength={2} id="productNameInput" value={productTitle} onChange={inputValueHandler} placeholder="상품명을 입력해주세요" required>
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
              placeholder={isShare ? 0 : "가격을 입력해주세요"}
              pattern="[0-9]*"
              disabled={Boolean(isShare)}
              required={Boolean(isShare)}
              min={100}
              max={999999999}
            >
              가격
            </UserInput>
          </ShadowBox>

          <ShadowBox>
            <ToggleButtonGroup type="radio" title="상품 종류" data={Object.entries(categoryData)} name="category" setState={setCategory} state={category} />
          </ShadowBox>

          {isHaveSize && (
            <ShadowBox>
              <ToggleButtonGroup type="radio" title="사이즈" data={sizeData} name="size" setState={setSize} state={size} />
            </ShadowBox>
          )}
        </form>
      </Page>
    </>
  );
}
