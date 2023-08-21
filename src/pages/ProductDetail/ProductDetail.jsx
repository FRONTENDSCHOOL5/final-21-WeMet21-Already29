import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthorInfo, CategoryUl, ProductDetailSection, ProductImageWrapper, ProductPrice, ProductTitle, SaleText } from "./ProductDetailStyle";
import uploadDateCalculate from "../../utils/uploadDateCalculate";
import Header from "../../components/Header/Header";
import BottomSheetContext from "../../contexts/ModalContext/BottomSheetContext";
import BottomSheet from "../../components/Modal/BottomSheet/BottomSheet";
import ModalContext from "../../contexts/ModalContext/ModalContext";
import AlertModal from "../../components/Modal/AlertModal/AlertModal";
import { imageErrorHandler } from "../../utils/imageErrorHandler";
import CardHeader from "../../components/Card/CardHeader/CardHeader";
import fetchApi from "../../utils/fetchApi";
import UserInfo from "../../contexts/LoginContext";
import category from "../../contexts/ProductCategoryContext";
import ShadowBox from "../../components/ShadowBox/ShadowBox";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading/Loading";

export default function ProductDetail() {
  const { id: productId } = useParams();
  const { data: product, isLoading } = useFetch(`product/detail/${productId}`);
  const productAuthor = product && product.author;
  const [isShare, setIsShare] = useState(""),
    [itemCategory, setItemCategory] = useState(""),
    [size, setSize] = useState("");
  const { isBottomSheetOpen, setBottomSheetOpen } = useContext(BottomSheetContext);
  const { isModalOpen, setModalOpen } = useContext(ModalContext);
  const { userInfo } = useContext(UserInfo);
  const categoryData = useContext(category);

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

  const navigator = useNavigate();

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
              <p className="category-text">
                <span className="category-title gr">상품종류</span>
                <span>{categoryData[itemCategory]}</span>
              </p>
            </li>
            {size && (
              <li>
                <p>
                  <span className="category-title gr">사이즈</span>
                  <span>{size}</span>
                </p>
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
        <AlertModal
          submitText="삭제"
          onSubmit={() => {
            deleteProductHandler();
            setModalOpen(false);
          }}
          onCancel={() => setModalOpen(false)}
        >
          상품을 삭제할까요?
        </AlertModal>
      )}
    </main>
  ) : (
    <Loading />
  );
}
