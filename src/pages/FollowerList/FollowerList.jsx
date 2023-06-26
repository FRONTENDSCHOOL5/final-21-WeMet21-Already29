import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FollowList, FollowListItem } from "./FollowerListStyle";
import Header from "../../components/Header/Header";
import TabMenu from "../../components/Footer/FooterMenu/FooterMenu";
import FollowItem from "../../components/FollowItem/FollowItem";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { useRef } from "react";

export default function FollowerList({ type, followType }) {
  const params = useParams();
  const accountname = params.id;
  const [followerList, setFollowerList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const pageType = followType.replace("List", "");
  const pageEnd = useRef(null);
  const { getData, page } = useInfiniteScroll(`profile/${accountname}/${pageType}`, pageEnd);

  useEffect(() => {
    getData(page)
      .then((res) => res.json())
      .then((json) => {
        switch (pageType) {
          case "follower":
            console.log("팔로워 페이지");
            setFollowerList((prev) => {
              if (prev) {
                return [...prev, ...json];
              } else {
                return json;
              }
            });
            break;
          case "following":
            console.log("팔로잉 페이지");
            setFollowingList((prev) => {
              if (prev) {
                return [...prev, ...json];
              } else {
                return json;
              }
            });
            break;
          default:
            break;
        }
      });
  }, [page]);

  const followTypeUI = {
    followerList: (
      <>
        <FollowList>
          <Header type="back">followers</Header>
          {followerList.map((follower, index) => {
            return (
              <FollowListItem key={index}>
                <FollowItem username={follower.username} intro={follower.intro} image={follower.image} accountname={follower.accountname} isfollow={follower.isfollow} />
              </FollowListItem>
            );
          })}
        </FollowList>
        <div ref={pageEnd} />
        <TabMenu />
      </>
    ),

    followingList: (
      <>
        <FollowList>
          <Header type="back">followings</Header>
          {followingList.map((following, index) => {
            return (
              <FollowListItem key={index}>
                <FollowItem username={following.username} intro={following.intro} image={following.image} accountname={following.accountname} isfollow={following.isfollow} />
              </FollowListItem>
            );
          })}
        </FollowList>
        <div ref={pageEnd} />
        <TabMenu />
      </>
    ),
  };
  return <>{followTypeUI[followType]}</>;
}
