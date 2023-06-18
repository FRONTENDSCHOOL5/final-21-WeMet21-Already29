import React, { useRef, useState } from "react";

import iconAlbum from "../../assets/images/icon-image.svg";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, ImgPlace, ImgUploadButton, Input, InputLabel, Page } from "./UploadProductStyle";

export default function UploadProduct() {
  const imgPre = useRef(null),
    submitBtn = useRef(null);

  const [productTitle, setProductTitle] = useState(""),
    [productPrice, setProductPrice] = useState(""),
    [productLink, setProductLink] = useState(""),
    [productImage, setproductImage] = useState(""),
    [productImageUrl, setproductImageUrl] = useState("https://api.mandarin.weniv.co.kr/1686629045637.png");

  const [isModify, setIsModify] = useState(false);
  const param = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // useParams hook으로 파라미터 값을 가져와서 파라미터가 존재한다면 isModify 상태값을 true로 변경
    if (param.id !== undefined) {
      setIsModify(true);
    }
    if (param.id === undefined) {
      setIsModify(false);
    }
  });

  useEffect(() => {
    // 상품 수정이라면 처음 실행시 상품 정보 인풋창으로 불러오기
    if (isModify) {
      fetch(`https://api.mandarin.weniv.co.kr/product/${param.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          setProductTitle(json.product.itemName);
          setProductPrice(json.product.price);
          setProductLink(json.product.link);
          setproductImageUrl(json.product.itemImage);
        });
    }

    return () => {
      setProductTitle("");
      setProductPrice("");
      setProductLink("");
      setproductImageUrl("");
    };
  }, [isModify]);

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

  const data = {
    product: {
      itemName: productTitle,
      price: parseInt(productPrice),
      link: productLink,
      itemImage: productImageUrl,
    },
  };

  const modifyProductHandler = (e) => {
    e.preventDefault();

    fetch(`https://api.mandarin.weniv.co.kr/product/${param.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => navigate(`/product/detail/${json.product.id}`));
  };

  const uploadProductHandler = (e) => {
    e.preventDefault();

    fetch("https://api.mandarin.weniv.co.kr/product", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => navigate(`/product/detail/${json.product.id}`));
  };

  const handleImgInput = async (e) => {
    if (e.target.files.length === 0) {
      return;
    }
    const formData = new FormData();
    const userImg = e.target.files[0];
    if (userImg.size > 1000000) {
      alert("1MB 미만의 이미지 파일만 업로드 가능합니다.");
      return;
    }

    const fileNamesplitArray = userImg.name.split(".");
    const fileExtension = fileNamesplitArray[fileNamesplitArray.length - 1];
    const fileExtensionValues = ["jpg", "gif", "png", "jpeg", "bmp", "tif", "heic"];

    if (!fileExtensionValues.includes(fileExtension)) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    setproductImage(e.target.value);
    formData.append("image", userImg);

    const res = await fetch("https://api.mandarin.weniv.co.kr/image/uploadfile", {
      method: "POST",
      body: formData,
    });
    const json = await res.json();
    console.log(json);
    setproductImageUrl(`https://api.mandarin.weniv.co.kr/${json.filename}`);
  };

  const buttonKeyboardEvent = (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.target.firstElementChild.click();
    }
  };

  useEffect(() => {
    if (productTitle && productPrice && productLink) {
      submitBtn.current.disabled = false;
    } else {
      submitBtn.current.disabled = true;
    }
  }, [productTitle, productLink, productPrice, productImage]);

  return (
    <>
      <Button type="submit" form="abc" ref={submitBtn}>
        저장
      </Button>
      <Page>
        <form id="abc" onSubmit={isModify ? modifyProductHandler : uploadProductHandler}>
          <span>이미지 등록</span>
          <ImgPlace>
            <InputLabel htmlFor="productImg">
              <ImgUploadButton tabIndex={0} onKeyDown={buttonKeyboardEvent}>
                <img src={iconAlbum} alt="앨범 아이콘" />
              </ImgUploadButton>
            </InputLabel>
            <img src={productImageUrl} alt="" ref={imgPre} id="productImagePre" />
          </ImgPlace>

          <input type="file" id="productImg" accept="image/*" style={{ display: "none" }} onChange={handleImgInput} />
          <InputLabel htmlFor="productNameInput">상품명</InputLabel>
          <Input type="text" minLength={2} id="productNameInput" value={productTitle} onChange={inputValueHandler} placeholder="2~15자 이내여야 합니다." required />
          <InputLabel htmlFor="productPriceInput">가격</InputLabel>
          <Input
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
          />
          <InputLabel htmlFor="productUrlInput">판매 링크</InputLabel>
          <Input
            type="url"
            id="productUrlInput"
            // pattern="//^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?$/;/"
            value={productLink}
            onChange={inputValueHandler}
            placeholder="URL을 입력해주세요."
            required
          />
        </form>
      </Page>
    </>
  );
}
