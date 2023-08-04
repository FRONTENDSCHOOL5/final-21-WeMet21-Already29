import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthorInfo, ProductDetailSection, ProductImage, ProductImageWrapper, ProductPage, ProductPrice, ProductTitle } from "./ProductDetailStyle";
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

export default function ProductDetail() {
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);
  const [productAuthor, setProductAuthor] = useState(null);
  const [isShare, setIsShare] = useState(""),
    [category, setCategory] = useState(""),
    [size, setSize] = useState("");
  const { isBottomSheetOpen, setBottomSheetOpen } = useContext(BottomSheetContext);
  const { isModalOpen, setModalOpen } = useContext(ModalContext);
  const { userInfo } = useContext(UserInfo);

  useEffect(() => {
    if (product) {
      try {
        const saleData = JSON.parse(product.link);
        setIsShare(saleData.isShare);
        setCategory(saleData.category);
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

  useEffect(() => {
    fetchApi(`product/detail/${productId}`).then((res) => {
      setProduct(res.product);
      setProductAuthor(res.product.author);
    });
  }, []);

  return (
    product && (
      <ProductPage>
        {productAuthor && userInfo.username === productAuthor.username ? <Header type="basic" href={`/product/list/${userInfo.accountname}`} setBottomSheetOpen={setBottomSheetOpen}></Header> : <Header type="back" />}

        <ProductImageWrapper>
          <ProductImage src={product.itemImage} alt="상품 이미지" onError={imageErrorHandler} />
        </ProductImageWrapper>
        <ProductDetailSection>
          <ProductTitle>{product.itemName}</ProductTitle>

          <ProductPrice>
            {isShare ? (
              "나눔"
            ) : (
              <>
                {new Intl.NumberFormat().format(product.price)}
                <span>원</span>
              </>
            )}
          </ProductPrice>
          <span>{uploadDateCalculate(product.updatedAt)}</span>
          {`나눔: ${isShare} 상품 종류: ${category} 사이즈: ${size}`}
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
      </ProductPage>
    )
  );
}
