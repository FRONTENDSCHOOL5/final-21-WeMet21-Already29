import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FollowList, FollowListItem } from "./FollowerListStyle";
import Header from "../../components/Header/Header";
import TabMenu from "../../components/Footer/FooterMenu/FooterMenu";
import FollowItem from "../../components/FollowItem/FollowItem";
import axios from "axios";

export default function FollowerList({ type, followType }) {
  const params = useParams();
  const accountname = params.id;
  const token = localStorage.getItem("token");
  const [followerList, setFollowerList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    type === "followers" ? getFollowerList() : getFollowingList();
  }, []);

  const getFollowerList = async () => {
    try {
      const res = await axios.get(`https://api.mandarin.weniv.co.kr/profile/${accountname}/follower`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      });
      setFollowerList(res.data);
    } catch (err) {
      console.error(err);
      navigate("/error");
    }
  };

  const getFollowingList = async () => {
    try {
      const res = await axios.get(`https://api.mandarin.weniv.co.kr/profile/${accountname}/following`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      });
      setFollowingList(res.data);
    } catch (err) {
      console.error(err);
      navigate("/error");
    }
  };

  const followTypeUI = {
    followerList: (
      <>
        <FollowList>
          <Header type="followers" />
          {followerList.map((follower, index) => {
            return (
              <FollowListItem key={index}>
                <FollowItem username={follower.username} intro={follower.intro} image={follower.image} accountname={follower.accountname} isfollow={follower.isfollow} />
              </FollowListItem>
            );
          })}
        </FollowList>
        <TabMenu />
      </>
    ),

    followingList: (
      <>
        <FollowList>
          <Header type="followings" />
          {followingList.map((following, index) => {
            return (
              <FollowListItem key={index}>
                <FollowItem username={following.username} intro={following.intro} image={following.image} accountname={following.accountname} isfollow={following.isfollow} />
              </FollowListItem>
            );
          })}
        </FollowList>
        <TabMenu />
      </>
    ),
  };
  return <>{followTypeUI[followType]}</>;
}
