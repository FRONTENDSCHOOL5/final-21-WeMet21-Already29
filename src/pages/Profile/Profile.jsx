import React, { useEffect, useState } from "react";
import Products from "../../components/Products/Products";
import Loading from "../../components/Loading";
import share from "../../assets/images/share.png";
import { FollowCountSpan, LinkStyle, PostSection, PostSectionHeader, Posts, ProductSection, ProfileHeader, ProfileIntro, ProfileNavBar, ProfileSection, ShareButton } from "./ProfileStyle";
import { followButtonHandler, unfollowButtonHandler } from "../../utils/followUpButttonHandler";
import { Link, useNavigate, useParams } from "react-router-dom";
import Post from "../../components/Post/Post";
import list from "../../assets/images/icon-post-list-on.png";
import album from "../../assets/images/icon-post-album-on.png";
import Header from "../../components/Header/Header";
import BottomSheetContext from "../../contexts/ModalContext/BottomSheetContext";
import BottomSheet from "../../components/Modal/BottomSheet/BottomSheet";
import ModalContext from "../../contexts/ModalContext/ModalContext";
import AlertModal from "../../components/Modal/AlertModal/AlertModal";
import Button from "../../components/Button/Button";
import ShareModal from "../../components/ShareModal/ShareModal";
import styled from "styled-components";
import Navigation from "../../components/Footer/FooterMenu/FooterMenu";

const WhiteButton = styled.button`
  border: 0;
  padding: 0;
  width: 12rem;
  height: 3.4rem;
  background-color: var(--white-color);
  border: 1px solid #767676;
  border-radius: 10px;
  color: var(--gray-color);
`;

export default function Profile() {
  const params = useParams();
  const [userData, setUserData] = useState(null);
  const [isfollow, setIsFollow] = useState(null);
  const [isAlbum, setIsAlbum] = useState(false);
  const [haveProduct, setHaveProduct] = useState(false);
  const [havePost, setHavePost] = useState(false);
  const [followCount, setFollowCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [ShareModalOpen, setShareModalOpen] = useState(false);
  const navigator = useNavigate();

  const fetchUserData = () => {
    fetch(`https://api.mandarin.weniv.co.kr/profile/${params.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setUserData(json.profile);
        setIsFollow(json.profile.isfollow);
        setFollowCount(json.profile.followerCount);
        setFollowingCount(json.profile.followingCount);
        return json;
      });
  };

  const fetchProducts = () => {
    fetch(`https://api.mandarin.weniv.co.kr/product/${params.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.data) {
          setHaveProduct(true);
        }
      });
  };

  const fetchPost = () => {
    fetch(`https://api.mandarin.weniv.co.kr/post/${params.id}/userpost`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.post.length !== 0) setHavePost(true);
      });
  };

  const followUphandler = async () => {
    if (isfollow) {
      const res = await unfollowButtonHandler(userData.accountname);
      const json = await res.json();
      setIsFollow(json.profile.isfollow);
      setFollowCount(json.profile.followerCount);
    } else {
      const res = await followButtonHandler(userData.accountname);
      const json = await res.json();
      setIsFollow(json.profile.isfollow);
      setFollowCount(json.profile.followerCount);
    }
  };

  const logoutHandler = () => {
    navigator("/");
  };

  useEffect(() => {
    fetchUserData();
    fetchProducts();
    fetchPost();
  }, [params]);

  return (
    <>
      <BottomSheetContext.Consumer>
        {({ isBottomSheetOpen, setBottomSheetOpen }) => (
          <>
            {userData && localStorage.getItem("username") === userData.username ? <Header type="basic" setBottomSheetOpen={setBottomSheetOpen}></Header> : <Header type="back" />}
            {isBottomSheetOpen && (
              <>
                <BottomSheet>
                  <ModalContext.Consumer>
                    {({ isModalOpen, setModalOpen }) => (
                      <button
                        type="button"
                        onClick={() => {
                          setModalOpen(true);
                          setBottomSheetOpen(false);
                        }}
                      >
                        로그아웃
                      </button>
                    )}
                  </ModalContext.Consumer>
                </BottomSheet>
              </>
            )}
          </>
        )}
      </BottomSheetContext.Consumer>
      <ModalContext.Consumer>
        {({ isModalOpen, setModalOpen }) =>
          isModalOpen && (
            <AlertModal submitText="로그아웃" onSubmit={() => logoutHandler()} onCancel={() => setModalOpen(false)}>
              로그아웃하시겠어요?
            </AlertModal>
          )
        }
      </ModalContext.Consumer>
      {userData ? (
        <>
          <main>
            <ProfileSection>
              <ProfileHeader className="profile-header">
                <Link to={`../${userData.accountname}/follower`}>
                  <FollowCountSpan>{followCount}</FollowCountSpan>
                  followers
                </Link>
                <img src={userData.image} alt="프로필 사진" />
                <Link to={`../${userData.accountname}/following`}>
                  <FollowCountSpan>{followingCount}</FollowCountSpan>
                  followings
                </Link>
              </ProfileHeader>
              <ProfileIntro>
                <h2 className="user-name">{userData.username}</h2>
                <p className="account-name">@ {userData.accountname}</p>
                <p className="intro">{userData.intro ? userData.intro : "소개글이 작성되지 않았습니다"}</p>
              </ProfileIntro>
              <ProfileNavBar>
                {localStorage.getItem("username") === userData.username ? (
                  <>
                    <Link to={``}>
                      <WhiteButton type="button">프로필 수정</WhiteButton>
                    </Link>

                    <Link to="/product/upload">
                      <WhiteButton type="button">상품 등록</WhiteButton>
                    </Link>
                  </>
                ) : (
                  <>
                    {isfollow ? (
                      <WhiteButton onClick={followUphandler}>언팔로우</WhiteButton>
                    ) : (
                      <Button type="button" onClick={followUphandler} width="12rem" height="3.4rem">
                        팔로우
                      </Button>
                    )}
                    <ShareButton type="button" onClick={() => setShareModalOpen(true)}>
                      <img src={share} alt="공유하기" />
                    </ShareButton>
                  </>
                )}
              </ProfileNavBar>
            </ProfileSection>

            {haveProduct ? (
              <ProductSection>
                <LinkStyle to={`/product/list/${userData.accountname}`} style={{ userDrag: "none" }}>
                  판매 중인 상품
                </LinkStyle>
                <Products userAccountName={userData.accountname} swiper={true} />
              </ProductSection>
            ) : (
              ""
            )}
            {havePost ? (
              <PostSection>
                <PostSectionHeader>
                  <h2 className="a11y-hidden">게시물</h2>
                  <button
                    onClick={() => {
                      setIsAlbum(false);
                    }}
                  >
                    <img src={list} alt="리스트로 보기" style={{ opacity: isAlbum ? 0.5 : 1 }} />
                  </button>
                  <button
                    onClick={() => {
                      setIsAlbum(true);
                    }}
                  >
                    <img src={album} alt="앨범으로 보기" style={{ opacity: isAlbum ? 1 : 0.5 }} />
                  </button>
                </PostSectionHeader>
                <Posts isAlbum={isAlbum}>
                  <Post isAlbum={isAlbum} />
                </Posts>
              </PostSection>
            ) : (
              ""
            )}
          </main>
          <Navigation />
          {ShareModalOpen && <ShareModal setShareModalOpen={setShareModalOpen} />}
        </>
      ) : (
        <>
          <Loading />
        </>
      )}
    </>
  );
}
