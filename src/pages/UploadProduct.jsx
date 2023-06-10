import React, { useRef, useState } from "react";
import styled from "styled-components";
import iconAlbum from "../assets/images/icon-image.svg";
import { useEffect } from "react";

const Page = styled.main`
  margin: 0 34px;
`;

const PlaceImg = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3/2;
  margin: 18px 0 30px;
  background-color: #f2f2f2;
  border: 0.5px solid #ddd;
  border-radius: 10px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const InputLabel = styled.label`
  margin-bottom: 10px;
  font-size: 12px;
`;

const Input = styled.input`
  width: 100%;
  padding-bottom: 8px;
  border: 0;
  border-bottom: 1px solid #c4c4c4;
  outline: none;

  &::placeholder {
    color: #c4c4c4;
    font-size: 14px;
  }
`;

const Button = styled.button`
  background-color: var(--main-color);
  border: 0;
  color: #fff;
  font-size: 14px;
  padding: 7px 32px;
  border-radius: 32px;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
  }
`;

const ImgUploadButton = styled.div`
  display: inline-block;
  padding: 7px;
  border-radius: 50%;
  background-color: #767676;
  cursor: pointer;
  position: absolute;
  right: 12px;
  bottom: 12px;
`;

export default function UploadProduct() {
  const imgPre = useRef(null),
    submitBtn = useRef(null);

  const [productTitle, setProductTitle] = useState(""),
    [productPrice, setProductPrice] = useState(""),
    [productLink, setProductLink] = useState(""),
    [image, setImage] = useState(""),
    [imageUrl, setImageUrl] = useState("");

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
    const data = {
      product: {
        itemName: productTitle,
        price: parseInt(productPrice),
        link: productLink,
        itemImage: imageUrl,
      },
    };

    fetch("https://api.mandarin.weniv.co.kr/product", {
      method: "POST",
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0N2Q5MGI5YjJjYjIwNTY2MzJkNTJhZSIsImV4cCI6MTY5MTEzNzgwMSwiaWF0IjoxNjg1OTUzODAxfQ.EpWvVe_ikIVQjl8KCtCfV5atCmne5d9oNthDsbbbfC4",
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  };

  const handleImgInput = async (e) => {
    if (e.target.files.length === 0) {
      return;
    }
    if (e.target.files[0].size > 1000000) {
      alert("1MB 미만의 이미지 파일만 업로드 가능합니다.");
      return;
    }

    const formData = new FormData();
    const userImg = e.target.files[0];
    setImage(e.target.value);
    console.log(userImg);
    formData.append("image", userImg);

    const res = await fetch("https://api.mandarin.weniv.co.kr/image/uploadfile", {
      method: "POST",
      body: formData,
    });
    const json = await res.json();
    // C:\\fakepath\\tiger.PNG
    imgPre.current.style.display = "block";
    setImageUrl(`https://api.mandarin.weniv.co.kr/${json.filename}`);
  };

  const imgButtonfilterHandler = (e) => {
    if (!e.target.src) {
      e.preventDefault();
    }
  };

  const buttonKeyboardEvent = (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.target.firstElementChild.click();
    }
  };

  useEffect(() => {
    if (productTitle && productPrice && productLink && image) {
      submitBtn.current.disabled = false;
    } else {
      submitBtn.current.disabled = true;
    }
  }, [productTitle, productLink, productPrice, image]);

  return (
    <Page>
      <form onSubmit={uploadProductHandler}>
        <InputLabel htmlFor="productImg" onClick={imgButtonfilterHandler}>
          <span className="a11y-hidden">상품 이미지 등록</span>
          <PlaceImg>
            <img src={imageUrl} alt="" ref={imgPre} id="imagePre" onError={(e) => (e.target.style.display = "none")} />
            <ImgUploadButton tabIndex={0} onKeyDown={buttonKeyboardEvent}>
              <img src={iconAlbum} alt="앨범 아이콘" />
            </ImgUploadButton>
          </PlaceImg>
        </InputLabel>
        <input type="file" id="productImg" accept="image/*" style={{ display: "none" }} onChange={handleImgInput} required />

        <InputLabel htmlFor="productNameInput">상품명</InputLabel>
        <Input type="text" minLength={2} id="productNameInput" value={productTitle} onChange={inputValueHandler} placeholder="2~15자 이내여야 합니다." required></Input>

        <InputLabel htmlFor="productPriceInput">가격</InputLabel>
        <Input type="number" id="productPriceInput" value={productPrice} onChange={inputValueHandler} placeholder="숫자만 입력 가능합니다." pattern="[0-9]*" required></Input>

        <InputLabel htmlFor="productUrlInput">판매 링크</InputLabel>
        <Input type="url" id="productUrlInput" value={productLink} onChange={inputValueHandler} placeholder="URL을 입력해주세요." required></Input>

        <Button type="submit" ref={submitBtn}>
          저장
        </Button>
      </form>
    </Page>
  );
}
