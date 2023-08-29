import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Button from "../../Button/Button";
import UserInfo from "../../../contexts/LoginContext";

import { profileImgErrorHandler } from "../../../utils/imageErrorHandler";
import { followButtonHandler, unfollowButtonHandler } from "../../../utils/followUpButttonHandler";

import share from "../../../assets/images/share.png";

import { FollowCountSpan, ProfileIntro, ProfileNavBar, ProfileSection, ShareButton, WhiteButton, ProfileSectionHeader } from "./ProfileHeaderSectionStyle";

export default function ProfileHeader({ setShareModalOpen, userData }) {
  const [isfollow, setIsFollow] = useState(null);
  const [followCount, setFollowCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const { userInfo } = useContext(UserInfo);
  const UserAccountname = userInfo.accountname;
  const splitString = "{[split]}";
  const { id: accountname } = useParams();
  const introduce = userData && userData.intro.includes(splitString) ? userData.intro.split(splitString)[0] : userData && userData.intro;
  const fassionStyle = userData && userData.intro.includes(splitString) && userData.intro.split(splitString)[1] !== "" && userData.intro.split(splitString)[1].split(",");

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
    if (userData) {
      setIsFollow(userData.isfollow);
      setFollowCount(userData.followerCount);
      setFollowingCount(userData.followingCount);
    }
  }, [accountname, userData]);

  return (
    userData && (
      <ProfileSection>
        <ProfileSectionHeader className="profile-header">
          <Link to={`./follower`}>
            <FollowCountSpan>{followCount}</FollowCountSpan>
            followers
          </Link>
          <img src={userData.image} alt="프로필 사진" onError={profileImgErrorHandler} />
          <Link to={`./following`}>
            <FollowCountSpan>{followingCount}</FollowCountSpan>
            followings
          </Link>
        </ProfileSectionHeader>
        <ProfileIntro>
          <h2 className="user-name">{userData.username}</h2>
          <p className="account-name">@ {userData.accountname}</p>
          <p className="intro">{introduce || "소개글이 작성되지 않았습니다"}</p>
          <p className="fassion-info">
            {fassionStyle &&
              fassionStyle.length !== 0 &&
              fassionStyle.map((fassion) => {
                return <span key={fassion}>#{fassion} </span>;
              })}
          </p>
        </ProfileIntro>
        <ProfileNavBar>
          {UserAccountname === userData.accountname ? (
            <>
              <Button category="profileNav" to="modify">
                프로필 수정
              </Button>
              <Button category="profileNav" to="/product/upload">
                상품 등록
              </Button>
            </>
          ) : (
            <>
              <Button category={isfollow ? "white" : "basic"} width="12rem" height="3.4rem" onClick={followUphandler}>
                {isfollow ? "언팔로우" : "팔로우"}
              </Button>
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
