import React, { useEffect, useState } from "react";
import { followButtonHandler, unfollowButtonHandler } from "../../../utils/followUpButttonHandler";
import { FollowCountSpan, ProfileIntro, ProfileNavBar, ProfileSection, ShareButton, WhiteButton, ProfileSectionHeader } from "./ProfileHeaderStyle";
import { Link, useParams } from "react-router-dom";
import Button from "../../Button/Button";
import share from "../../../assets/images/share.png";

export default function ProfileHeader({ setShareModalOpen, userData, setUserData }) {
  const [isfollow, setIsFollow] = useState(null);
  const [followCount, setFollowCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const params = useParams();

  const fetchUserData = async () => {
    const res = await fetch(`https://api.mandarin.weniv.co.kr/profile/${params.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
    });
    return res;

    // });
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
    fetchUserData()
      .then((res) => res.json())
      .then((json) => {
        setUserData(json.profile);
        setIsFollow(json.profile.isfollow);
        setFollowCount(json.profile.followerCount);
        setFollowingCount(json.profile.followingCount);
      });
  }, []);

  return (
    userData && (
      <ProfileSection>
        <ProfileSectionHeader className="profile-header">
          <Link to={`./follower`}>
            <FollowCountSpan>{followCount}</FollowCountSpan>
            followers
          </Link>
          <img src={userData.image} alt="프로필 사진" />
          <Link to={`./following`}>
            <FollowCountSpan>{followingCount}</FollowCountSpan>
            followings
          </Link>
        </ProfileSectionHeader>
        <ProfileIntro>
          <h2 className="user-name">{userData.username}</h2>
          <p className="account-name">@ {userData.accountname}</p>
          <p className="intro">{userData.intro ? userData.intro : "소개글이 작성되지 않았습니다"}</p>
        </ProfileIntro>
        <ProfileNavBar>
          {localStorage.getItem("username") === userData.username ? (
            <>
              <Link to={`modify`}>
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
    )
  );
}
