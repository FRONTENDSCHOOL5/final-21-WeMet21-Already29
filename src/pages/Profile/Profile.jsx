import React, { useEffect, useState } from "react";
import Products from "../../components/Products";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";

export default function Profile() {
  const userAccountName = "testtestabc";
  const [userData, setUserData] = useState(null);

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

  console.log(userData);

  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <>
      {userData ? (
        <main>
          <section className="user-profile-section">
            <div className="profile-header">
              <p>
                <span>{userData.followerCount}</span>
                followers
              </p>
              <img src={userData.image} alt="프로필 사진" />
              <p>
                <span>{userData.followingCount}</span>
                followings
              </p>
            </div>
            <div className="profile-intro">
              <h2>{userData.username}</h2>
              <p>@ {userData.accountname}</p>
              <p>소개 : {userData.intro ? userData.intro : "소개글이 작성되지 않았습니다"}</p>
            </div>
            <div className="profile-navbar">
              <button type="button">팔로우</button>
              <button type="button">share</button>
            </div>
          </section>
          <section className="user-products-section">
            <Link to="">이동</Link>
            <Products userAccountName={userData.accountname} />
          </section>
          <section className="user-post-section">게시물 리스트</section>
        </main>
      ) : (
        <>
          <Loading />
        </>
      )}
    </>
  );
}
