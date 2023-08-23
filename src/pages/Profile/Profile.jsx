import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import BottomSheetContext from "../../contexts/ModalContext/BottomSheetContext";
import BottomSheet from "../../components/Modal/BottomSheet/BottomSheet";
import ModalContext from "../../contexts/ModalContext/ModalContext";
import AlertModal from "../../components/Modal/AlertModal/AlertModal";
import ShareModal from "../../components/Modal/ShareModal/ShareModal";
import Navigation from "../../components/Footer/FooterMenu/FooterMenu";
import ProfileHeader from "../../components/Profile/ProfileHeader/ProfileHeader";
import ProfileProduct from "../../components/Profile/ProfileProduct/ProfileProduct";
import ProfilePost from "../../components/Profile/ProfilePost/ProfilePost";
import UserInfo from "../../contexts/LoginContext";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading/Loading";

export default function Profile() {
  const [ShareModalOpen, setShareModalOpen] = useState(false);
  const navigator = useNavigate();
  const { isBottomSheetOpen, setBottomSheetOpen } = useContext(BottomSheetContext);
  const { isModalOpen, setModalOpen } = useContext(ModalContext);
  const { userInfo } = useContext(UserInfo);
  const { accountname } = userInfo;
  const { id: currentAccountName } = useParams();
  const { data: userData, isLoading } = useFetch(`profile/${currentAccountName}`, "GET");

  const logoutHandler = () => {
    setModalOpen(false);
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    navigator("/login");
  };

  return isLoading ? (
    <Loading />
  ) : (
    <>
      {userData && accountname === userData.accountname ? <Header type="basic" setBottomSheetOpen={setBottomSheetOpen}></Header> : <Header type="back" />}
      <main>
        <ProfileHeader userData={userData} setShareModalOpen={setShareModalOpen} />
        <ProfileProduct userData={userData} />
        <ProfilePost />
        <Navigation />
      </main>
      {ShareModalOpen && <ShareModal setShareModalOpen={setShareModalOpen} />}
      {isBottomSheetOpen && (
        <BottomSheet>
          <button
            type="button"
            onClick={() => {
              setModalOpen(true);
              setBottomSheetOpen(false);
            }}
          >
            로그아웃
          </button>
        </BottomSheet>
      )}
      {isModalOpen && (
        <AlertModal submitText="로그아웃" onSubmit={() => logoutHandler()}>
          로그아웃하시겠어요?
        </AlertModal>
      )}
    </>
  );
}
