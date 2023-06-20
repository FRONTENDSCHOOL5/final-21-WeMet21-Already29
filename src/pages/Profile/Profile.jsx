import React, { useEffect, useState } from "react";
import Products from "../../components/Products/Products";
import Loading from "../../components/Loading";
import share from "../../assets/images/share.png";
import { GreenMdButton } from "../../components/Button/Button";
import { FollowCountSpan, LinkStyle, PostSection, PostSectionHeader, Posts, ProductSection, ProfileHeader, ProfileIntro, ProfileNavBar, ProfileSection, ShareButton } from "./ProfileStyle";
import { followButtonHandler, unfollowButtonHandler } from "../../utils/followUpButttonHandler";
import { Link, useParams } from "react-router-dom";
import Post from "../../components/Post/Post";
import list from "../../assets/images/icon-post-list-on.png";
import album from "../../assets/images/icon-post-album-on.png";
import { WhiteMdButton } from "../../components/Button/Button";
import Header from "../../components/Header/Header";

export default function Profile() {
  const params = useParams();
  const [userData, setUserData] = useState(null);
  const [isfollow, setIsFollow] = useState(null);
  const [isAlbum, setIsAlbum] = useState(false);
  const [haveProduct, setHaveProduct] = useState(false);
  const [havePost, setHavePost] = useState(false);
  const [followCount, setFollowCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

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

  useEffect(() => {
    fetchUserData();
    fetchProducts();
    fetchPost();
  }, [params]);

  return (
    <>
      <Header type="basic"></Header>
      {userData ? (
        <main>
          <ProfileSection>
            <ProfileHeader className="profile-header">
              <p>
                <FollowCountSpan>{followCount}</FollowCountSpan>
                followers
              </p>
              <img src={userData.image} alt="프로필 사진" />
              <p>
                <FollowCountSpan>{followingCount}</FollowCountSpan>
                followings
              </p>
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
                    <WhiteMdButton type="button" contents="프로필 수정"></WhiteMdButton>
                  </Link>

                  <Link to="/uploadProduct">
                    <WhiteMdButton type="button" contents="상품 등록"></WhiteMdButton>
                  </Link>
                </>
              ) : (
                <>
                  {isfollow ? <WhiteMdButton onClick={followUphandler} contents={"언팔로우"}></WhiteMdButton> : <GreenMdButton type="button" onClick={followUphandler} contents={"팔로우"}></GreenMdButton>}
                  <ShareButton type="button">
                    <img src={share} alt="공유하기" />
                  </ShareButton>
                </>
              )}
            </ProfileNavBar>
          </ProfileSection>

          {haveProduct ? (
            <ProductSection>
              <LinkStyle to={`/productlist/${userData.accountname}`} style={{ userDrag: "none" }}>
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
      ) : (
        <>
          <Loading />
        </>
      )}
    </>
  );
}
