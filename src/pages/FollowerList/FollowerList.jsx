import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import fetchApi from "../../utils/fetchApi";
import { FollowList, FollowListItem } from "./FollowerListStyle";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import CardHeader from "../../components/Card/CardHeader/CardHeader";
import TabMenu from "../../components/Footer/FooterMenu/FooterMenu";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { useRef } from "react";

export default function FollowerList({ isfollow, followType }) {
  const params = useParams();
  const accountname = params.id;
  const [followerList, setFollowerList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const pageType = followType.replace("List", "");
  const [followState, setFollowState] = useState([]);
  const pageEnd = useRef(null);
  const token = localStorage.getItem("token");
  const { getData, page } = useInfiniteScroll(`profile/${accountname}/${pageType}`, pageEnd);

  const followArrayHandler = () => {
    const arr = [];
    if (pageType === "following") {
      followingList.map((item) => {
        arr.push(item.isfollow);
      });
    } else {
      followerList.map((item) => {
        arr.push(item.isfollow);
      });
    }
    setFollowState(arr);
  };

  const followButtonHandler = (index) => {
    const arr = [...followState];
    arr[index] = !arr[index];
    setFollowState(arr);
  };

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

  useEffect(() => {
    getData(page).then((json) => {
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
    followArrayHandler();
  }, [page]);

  const followTypeUI = {
    followerList: (
      <>
        <Header type="back">followers</Header>
        <FollowList>
          {followerList.map((follower, index) => {
            return (
              <FollowListItem key={index}>
                <CardHeader image={follower.image} username={follower.username} accountname={follower.accountname} />
                <Button
                  category={followState[index] ? "white" : "basic"}
                  type="button"
                  width="5.6rem"
                  height="2.8rem"
                  fontSize="1.2rem"
                  onClick={() => {
                    if (followState[index]) {
                      UnFollow(follower.accountname);
                    } else {
                      Follow(follower.accountname);
                    }
                    followButtonHandler(index);
                  }}
                >
                  {followState[index] ? "취소" : "팔로우"}
                </Button>
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
        <Header type="back">followings</Header>
        <FollowList>
          {followingList.map((following, index) => {
            return (
              <FollowListItem key={index}>
                <CardHeader image={following.image} username={following.username} accountname={following.accountname}></CardHeader>
                {following.accountname !== accountname && (
                  <Button
                    category={followState[index] ? "white" : "basic"}
                    type="button"
                    width="5.6rem"
                    height="2.8rem"
                    fontSize="1.2rem"
                    onClick={() => {
                      if (followState[index]) {
                        UnFollow(following.accountname);
                      } else {
                        Follow(following.accountname);
                      }
                      followButtonHandler(index);
                    }}
                  >
                    {followState[index] ? "취소" : "팔로우"}
                  </Button>
                )}
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
