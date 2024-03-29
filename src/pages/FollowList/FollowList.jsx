import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import CardHeader from "../../components/Card/CardHeader/CardHeader";
import TabMenu from "../../components/NavBar/NavBar";
import UserInfo from "../../contexts/LoginContext";

import fetchApi from "../../utils/fetchApi";

import { FollowUl, FollowListItem } from "./FollowList.style";

function getUpdatedList(prev, json) {
  if (prev) {
    return [...prev, ...json];
  } else {
    return json;
  }
}

function FollowItem({ isfollow, accountname, itIsMe, username, image }) {
  const [followState, setfollowState] = useState(isfollow);
  const Follow = (targetAccount) => {
    try {
      fetchApi(`profile/${targetAccount}/follow`, "POST");
    } catch (err) {
      console.error("에러!", err);
    }
  };

  const UnFollow = (targetAccount) => {
    try {
      fetchApi(`profile/${targetAccount}/unfollow`, "DELETE");
    } catch (err) {
      console.error("에러!", err);
    }
  };
  return (
    <FollowListItem>
      <CardHeader image={image} username={username} accountname={accountname} />
      {!itIsMe && (
        <Button
          category={followState ? "white" : "basic"}
          type="button"
          width="5.6rem"
          height="2.8rem"
          fontSize="1.2rem"
          onClick={() => {
            setfollowState((prev) => !prev);
            followState ? UnFollow(accountname) : Follow(accountname);
          }}
        >
          {followState ? "취소" : "팔로우"}
        </Button>
      )}
    </FollowListItem>
  );
}

export default function FollowList() {
  const params = useParams();
  const accountname = params.id;
  const pageType = params["*"];
  const [followDataList, setFollowDataList] = useState([]);
  const { userInfo } = useContext(UserInfo);
  const pageEnd = useRef(null);
  const { getData, page } = useInfiniteScroll(`profile/${accountname}/${pageType}`, pageEnd);

  useEffect(() => {
    getData(page).then((json) => {
      setFollowDataList((prev) => getUpdatedList(prev, json));
    });
  }, [page]);

  return (
    <>
      <Header type="back">{pageType}s</Header>
      <FollowUl>
        {followDataList.map((user, index) => (
          <FollowItem key={index} isfollow={user.isfollow} accountname={user.accountname} itIsMe={user.accountname === userInfo.accountname} image={user.image} username={user.username} />
        ))}
      </FollowUl>
      <div ref={pageEnd} />
      <TabMenu />
    </>
  );
}
