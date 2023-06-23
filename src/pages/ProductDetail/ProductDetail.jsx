import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { AuthorInfo, ProductDetailSection, ProductImage, ProductImageWrapper, ProductPage, ProductPrice, ProductTitle } from "./ProductDetailStyle";
import uploadDateCalculate from "../../utils/uploadDateCalculate";
import Header from "../../components/Header/Header";
import BottomSheetContext from "../../contexts/ModalContext/BottomSheetContext";
import BottomSheet from "../../components/Modal/BottomSheet/BottomSheet";
import ModalContext from "../../contexts/ModalContext/ModalContext";
import AlertModal from "../../components/Modal/AlertModal/AlertModal";

export default function ProductDetail() {
  const param = useParams();
  const [product, setProduct] = useState(null);
  const [productAuthor, setProductAuthor] = useState(null);
  const navigator = useNavigate();

  const deleteProductHandler = () => {
    fetch(`https://api.mandarin.weniv.co.kr/product/${param.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        navigator(`/product/list/${productAuthor.accountname}`);
      });
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
        console.log(json);
        setProduct(json.product);
        setProductAuthor(json.product.author);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <ProductPage>
      <BottomSheetContext.Consumer>
        {({ setBottomSheetOpen }) => {
          return productAuthor && localStorage.getItem("username") === productAuthor.username ? <Header type="basic" setBottomSheetOpen={setBottomSheetOpen}></Header> : <Header type="back" />;
        }}
      </BottomSheetContext.Consumer>
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

          <AuthorInfo>
            <Link to={`/profile/${productAuthor.accountname}`}>
              <img src={productAuthor.image} alt="상점 프로필 사진" />
              <div>
                <p>{productAuthor.username}</p>
                <p>@ {productAuthor.accountname}</p>
              </div>
            </Link>
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
                          <Link to={`/product/modify/${param.id}`} onClick={() => setBottomSheetOpen(false)}>
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
