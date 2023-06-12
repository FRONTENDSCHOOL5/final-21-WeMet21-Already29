import React, { useRef, useState } from "react";
import styled from "styled-components";
import iconAlbum from "../assets/images/icon-image.svg";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

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
    object-fit: contain;
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
    [productImage, setproductImage] = useState(""),
    [productImageUrl, setproductImageUrl] = useState("https://api.mandarin.weniv.co.kr/1686546477978.png");

  const [isModify, setIsModify] = useState(false);
  const param = useParams();

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
    });
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
      .then((json) => console.log(json));
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

    const fileExtension = userImg.name.slice(-3).toLowerCase();
    if (fileExtension === "png" || fileExtension === "jpg") {
    } else {
      alert("png & jpg 파일만 업로드 가능합니다.");
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
    imgPre.current.style.display = "block";
    setproductImageUrl(`https://api.mandarin.weniv.co.kr/${json.filename}`);
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
    if (productTitle && productPrice && productLink) {
      submitBtn.current.disabled = false;
    } else {
      submitBtn.current.disabled = true;
    }
  }, [productTitle, productLink, productPrice, productImage]);

  return (
    <Page>
      <form onSubmit={isModify ? modifyProductHandler : uploadProductHandler}>
        <InputLabel htmlFor="productImg" onClick={imgButtonfilterHandler}>
          <span className="a11y-hidden">상품 이미지 등록</span>
          <PlaceImg>
            <img src={productImageUrl} alt="" ref={imgPre} id="productImagePre" />
            <ImgUploadButton tabIndex={0} onKeyDown={buttonKeyboardEvent}>
              <img src={iconAlbum} alt="앨범 아이콘" />
            </ImgUploadButton>
          </PlaceImg>
        </InputLabel>
        <input type="file" id="productImg" accept="image/*" style={{ display: "none" }} onChange={handleImgInput} />
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
