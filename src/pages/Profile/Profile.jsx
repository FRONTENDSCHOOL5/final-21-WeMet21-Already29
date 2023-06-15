import React, { useEffect, useState } from "react";
import Products from "../../components/Products";
import Loading from "../../components/Loading";

import share from "../../assets/images/share.png";
import { GreenBigButton, GreenMdButton } from "../../components/Button/Button";
import { FollowCountSpan, LinkStyle, ProductSection, ProductUl, ProfileHeader, ProfileIntro, ProfileSection, ShareButton } from "./ProfileStyle";
import { followButtonHandler } from "../../utils/followButtonHandler";

export default function Profile() {
  const userAccountName = "testtestabc";
  const [userData, setUserData] = useState(null);
  const [mouseStartPosition, setMouseStartPosition] = useState(0);
  const [mouseEndPosition, setMouseEndPosition] = useState(0);
  const [slideUlLocation, setslideUlLocation] = useState(0);

  const fetchUserData = () => {
    fetch(`https://api.mandarin.weniv.co.kr/profile/${userAccountName}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => setUserData(json.profile));
  };

  useEffect(() => {
    fetchUserData();
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
  console.log(slideUlLocation);

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
              <GreenBigButton
                type="button"
                onClick={() => {
                  return followButtonHandler(userAccountName);
                }}
                contents={userData.isfollow ? "언팔로우" : "팔로우"}
              ></GreenBigButton>
              <ShareButton type="button">
                <img src={share} alt="공유하기" />
              </ShareButton>
            </div>
          </ProfileSection>
          <ProductSection onMouseDown={mouseStart} onDrag={mouseEnd}>
            <LinkStyle to={`/productlist/${userData.accountname}`} style={{ userDrag: "none" }}>
              판매 중인 상품
            </LinkStyle>
            <ProductUl className="slide-ul" style={{ transform: `translateX(${slideUlLocation}px)` }}>
              <Products userAccountName={userData.accountname} />
            </ProductUl>
          </ProductSection>
          <section className="user-post-section"></section>
        </main>
      ) : (
        <>
          <Loading />
        </>
      )}
    </>
  );
}
