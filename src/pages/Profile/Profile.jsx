import React, { Children, useEffect, useRef, useState } from "react";
import Products from "../../components/Products";
import Loading from "../../components/Loading";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import share from "../../assets/images/share.png";
import { GreenBigButton, GreenMdButton, GreenSmButton } from "../../components/Button/Button";

const ProfileSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
  padding: 30px 0 26px;
  margin-bottom: 6px;
  border: 1px solid var(--line-gray-color);
`;
const ProfileHeader = styled.div`
  display: flex;
  align-items: center;

  p {
    color: var(--gray-color);
  }

  img {
    width: 110px;
    height: 110px;
    margin: 0 4rem;
  }
`;

const FollowCountSpan = styled.span`
  display: block;
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--font-black-color);
`;

const ProfileIntro = styled.div`
  .user-name {
    font-size: 1.6rem;
    font-weight: bold;
  }

  .account-name {
    font-size: 1.2rem;
    color: var(--gray-color);
    margin: 10px 0 20px;
  }

  .intro {
    color: var(--gray-color);
    font-size: 1.4rem;
  }
`;

const ShareButton = styled.button`
  border-radius: 50%;
  border: 1px solid var(--line-gray-color);
  width: 34px;
  height: 34px;
  padding: 0;
  vertical-align: top;

  img {
    width: 20px;
    height: 20px;
  }
`;

const LinkStyle = styled(NavLink)`
  font-weight: bold;
  font-size: 1.6rem;

  &::after {
    content: ">";
    margin-left: 5px;
  }
`;

const ProductUl = styled.ul`
  width: max-content;
  margin-top: 16px;

  li {
    display: inline-block;
    width: 140px;
  }

  li + li {
    margin: 0 10px;
  }

  .product-img {
    border-radius: 10px;
    object-fit: contain;
    aspect-ratio: 1/1;
  }

  .product-title {
    margin: 5px 0;
    font-size: 1.4rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .product-price {
    color: var(--main-color);
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

const ProductSection = styled.section`
  overflow: hidden;
  border: 1px solid var(--line-gray-color);
  padding: 16px 0 23px 30px;
`;

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

  const followButtonHandler = () => {
    fetch(`https://api.mandarin.weniv.co.kr/profile/${userData.accountname}/follow`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => alert(json.message));
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
              <GreenMdButton contents={userData.isfollow ? "언팔로우" : "팔로우"} type="button" onClick={followButtonHandler}></GreenMdButton>
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
