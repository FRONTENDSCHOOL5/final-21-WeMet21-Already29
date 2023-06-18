import React, { useEffect, useRef, useState } from "react";
import Products from "../../components/Products";
import Loading from "../../components/Loading";
import share from "../../assets/images/share.png";
import { GreenMdButton } from "../../components/Button/Button";
import { FollowCountSpan, LinkStyle, PostSection, PostSectionHeader, Posts, ProductSection, ProductUl, ProfileHeader, ProfileIntro, ProfileSection, ShareButton } from "./ProfileStyle";
import { followButtonHandler, unfollowButtonHandler } from "../../utils/followUpButttonHandler";
import { useParams } from "react-router-dom";
import Post from "../../components/Post/Post";
import list from "../../assets/images/icon-post-list-on.png";
import album from "../../assets/images/icon-post-album-on.png";

export default function Profile() {
  const params = useParams();
  const [userData, setUserData] = useState(null);
  const [mouseStartPosition, setMouseStartPosition] = useState(0);
  const [mouseEndPosition, setMouseEndPosition] = useState(0);
  const [slideUlLocation, setslideUlLocation] = useState(0);
  const [isfollow, setIsFollow] = useState(null);
  const [isAlbum, setIsAlbum] = useState(false);
  const [haveProduct, setHaveProduct] = useState(false);
  const [havePost, setHavePost] = useState(false);

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
        // console.log(json);
        setUserData(json.profile);
        setIsFollow(json.profile.isfollow);
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
    fetchUserData();
    if (isfollow) {
      unfollowButtonHandler(userData.accountname);
    } else {
      followButtonHandler(userData.accountname);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchProducts();
    fetchPost();
  }, []);

  const mouseStart = (e) => {
    setMouseStartPosition(0 - e.pageX + slideUlLocation);
  };

  const mouseEnd = (e) => {
    if (e.pageX > 0) setMouseEndPosition(e.pageX);
  };

  useEffect(() => {
    setslideUlLocation(mouseStartPosition + mouseEndPosition);
  }, [mouseEndPosition]);

  useEffect(() => {
    if (slideUlLocation > 0) {
      setslideUlLocation(0);
    } else if (slideUlLocation < -500) {
      setslideUlLocation(-140 * 3);
    }
  }, [slideUlLocation]);

  return (
    <>
      {userData ? (
        <main>
          <ProfileSection>
            <ProfileHeader className="profile-header">
              <p>
                <FollowCountSpan>{userData.followerCount}</FollowCountSpan>
                followers
              </p>
              <img src={userData.image} alt="프로필 사진" />
              <p>
                <FollowCountSpan>{userData.followingCount}</FollowCountSpan>
                followings
              </p>
            </ProfileHeader>
            <ProfileIntro>
              <h2 className="user-name">{userData.username}</h2>
              <p className="account-name">@ {userData.accountname}</p>
              <p className="intro">{userData.intro ? userData.intro : "소개글이 작성되지 않았습니다"}</p>
            </ProfileIntro>
            <div className="profile-navbar">
              <GreenMdButton type="button" onClick={followUphandler} contents={isfollow ? "언팔로우" : "팔로우"}></GreenMdButton>
              <ShareButton type="button">
                <img src={share} alt="공유하기" />
              </ShareButton>
            </div>
          </ProfileSection>

          {haveProduct ? (
            <ProductSection onMouseDown={mouseStart} onDrag={mouseEnd}>
              <LinkStyle to={`/productlist/${userData.accountname}`} style={{ userDrag: "none" }}>
                판매 중인 상품
              </LinkStyle>
              <ProductUl style={{ transform: `translateX(${slideUlLocation}px)` }}>
                <Products userAccountName={userData.accountname} />
              </ProductUl>
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
