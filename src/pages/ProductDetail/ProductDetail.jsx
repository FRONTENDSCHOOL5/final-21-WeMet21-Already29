import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
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

export default function ProductDetail() {
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);
  const [productAuthor, setProductAuthor] = useState(null);
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
    <ProductPage>
      <BottomSheetContext.Consumer>
        {({ setBottomSheetOpen }) => {
          return productAuthor && localStorage.getItem("username") === productAuthor.username ? (
            <Header type="basic" href={`/product/list/${localStorage.getItem("accountname")}`} setBottomSheetOpen={setBottomSheetOpen}></Header>
          ) : (
            <Header type="back" />
          );
        }}
      </BottomSheetContext.Consumer>
      {product ? (
        <>
          <ProductImageWrapper>
            <ProductImage src={product.itemImage} alt="상품 이미지" onError={imageErrorHandler} />
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

          <AuthorInfo>
            <CardHeader image={productAuthor.image} username={productAuthor.username} accountname={productAuthor.accountname} />
          </AuthorInfo>

          <BottomSheetContext.Consumer>
            {({ isBottomSheetOpen, setBottomSheetOpen }) => (
              <ModalContext.Consumer>
                {({ isModalOpen, setModalOpen }) => {
                  return (
                    <>
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
                    </>
                  );
                }}
              </ModalContext.Consumer>
            )}
          </BottomSheetContext.Consumer>
        </>
      ) : (
        <Loading />
      )}
    </ProductPage>
  );
}
