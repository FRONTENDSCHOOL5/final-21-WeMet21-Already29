import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import BottomSheetContext from "../../contexts/ModalContext/BottomSheetContext";
import BottomSheet from "../../components/Modal/BottomSheet/BottomSheet";
import ModalContext from "../../contexts/ModalContext/ModalContext";
import AlertModal from "../../components/Modal/AlertModal/AlertModal";
import ShareModal from "../../components/ShareModal/ShareModal";
import Navigation from "../../components/Footer/FooterMenu/FooterMenu";
import ProfileHeader from "../../components/Profile/ProfileHeader/ProfileHeader";
import ProfileProduct from "../../components/Profile/ProfileProduct/ProfileProduct";
import ProfilePost from "../../components/Profile/ProfilePost/ProfilePost";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [ShareModalOpen, setShareModalOpen] = useState(false);
  const navigator = useNavigate();

  const logoutHandler = () => {
    navigator("/");
  };

  return (
    <>
      <BottomSheetContext.Consumer>
        {({ isBottomSheetOpen, setBottomSheetOpen }) => (
          <>
            {userData && localStorage.getItem("username") === userData.username ? <Header type="basic" setBottomSheetOpen={setBottomSheetOpen}></Header> : <Header type="back" />}

            <ModalContext.Consumer>
              {({ isModalOpen, setModalOpen }) => (
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
                        로그아웃
                      </button>
                    </BottomSheet>
                  )}

                  {isModalOpen && (
                    <AlertModal
                      submitText="로그아웃"
                      onSubmit={() => {
                        logoutHandler();
                        setModalOpen(false);
                      }}
                      onCancel={() => setModalOpen(false)}
                    >
                      로그아웃하시겠어요?
                    </AlertModal>
                  )}
                </>
              )}
            </ModalContext.Consumer>
          </>
        )}
      </BottomSheetContext.Consumer>
      <main>
        <ProfileHeader userData={userData} setUserData={setUserData} setShareModalOpen={setShareModalOpen} />
        <ProfileProduct userData={userData} />
        <ProfilePost />
        <Navigation />
        {ShareModalOpen && <ShareModal setShareModalOpen={setShareModalOpen} />}
      </main>
    </>
  );
}
