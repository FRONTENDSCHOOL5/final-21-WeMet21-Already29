import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import useFetch from "../../hooks/useFetch";

import Header from "../../components/Header/Header";
import CardHeader from "../../components/Card/CardHeader/CardHeader";
import BottomSheet from "../../components/Modal/BottomSheet/BottomSheet";
import AlertModal from "../../components/Modal/AlertModal/AlertModal";
import ShadowBox from "../../components/ShadowBox/ShadowBox";
import Loading from "../../components/Loading/Loading";
import UserInfo from "../../contexts/LoginContext";
import category from "../../contexts/ProductCategoryContext";
import ModalContext from "../../contexts/ModalContext/ModalContext";
import BottomSheetContext from "../../contexts/ModalContext/BottomSheetContext";

import fetchApi from "../../utils/fetchApi";
import uploadDateCalculate from "../../utils/uploadDateCalculate";
import { imageErrorHandler } from "../../utils/imageErrorHandler";

import { AuthorInfo, CategoryUl, ProductDetailSection, ProductImageWrapper, ProductPrice, ProductTitle, SaleText } from "./ProductDetail.style";

export default function ProductDetail() {
  const [isShare, setIsShare] = useState(""),
    [itemCategory, setItemCategory] = useState(""),
    [size, setSize] = useState("");
  const { id: productId } = useParams();
  const { data: product, isLoading } = useFetch(`product/detail/${productId}`);
  const productAuthor = product && product.author;
  const { isBottomSheetOpen, setBottomSheetOpen } = useContext(BottomSheetContext);
  const { isModalOpen, setModalOpen } = useContext(ModalContext);
  const { userInfo } = useContext(UserInfo);
  const categoryData = useContext(category);
  const navigator = useNavigate();

  useEffect(() => {
    if (product) {
      try {
        const saleData = JSON.parse(product.link);
        setIsShare(saleData.isShare);
        setItemCategory(saleData.category);
        setSize(saleData.size);
      } catch (e) {
        console.error(e);
      }
    }
  }, [product]);

  const deleteProductHandler = () => {
    fetchApi(`product/${productId}`, "delete").then(() => {
      navigator(`../list/${productAuthor.accountname}`);
    });
  };

  return product && !isLoading ? (
    <main>
      {productAuthor && userInfo.username === productAuthor.username ? <Header type="basic" href={`/product/list/${userInfo.accountname}`} setBottomSheetOpen={setBottomSheetOpen}></Header> : <Header type="back" />}

      <ProductImageWrapper>
        <img src={product.itemImage} alt="상품 이미지" onError={imageErrorHandler} />
      </ProductImageWrapper>
      <ProductDetailSection>
        <SaleText isShare={isShare}>{isShare ? "나눔" : "판매중"}</SaleText>
        <ProductTitle>{product.itemName}</ProductTitle>

        {!isShare && <ProductPrice>₩ {new Intl.NumberFormat().format(product.price)}</ProductPrice>}
        <span className="update-time gr">{uploadDateCalculate(product.updatedAt)}</span>
        <ShadowBox>
          <h2 className="a11y-hidden">상품정보</h2>
          <CategoryUl>
            <li>
              <h3 className="category-title gr">상품종류</h3>
              <span>{categoryData[itemCategory]}</span>
            </li>
            {size && (
              <li>
                <h3 className="category-title gr">사이즈</h3>
                <span>{size}</span>
              </li>
            )}
          </CategoryUl>
        </ShadowBox>
      </ProductDetailSection>

      <AuthorInfo>
        <CardHeader image={productAuthor.image} username={productAuthor.username} accountname={productAuthor.accountname} />
      </AuthorInfo>

      {isBottomSheetOpen && (
        <BottomSheet>
          <button
            type="button"
            onClick={() => {
              setModalOpen(true);
              setBottomSheetOpen(false);
            }}
          >
            삭제하기
          </button>
          <Link to={`/product/modify/${productId}`} onClick={() => setBottomSheetOpen(false)}>
            상품 수정하기
          </Link>
        </BottomSheet>
      )}

      {isModalOpen && (
        <AlertModal submitText="삭제" onSubmit={() => deleteProductHandler()}>
          상품을 삭제할까요?
        </AlertModal>
      )}
    </main>
  ) : (
    <Loading />
  );
}
