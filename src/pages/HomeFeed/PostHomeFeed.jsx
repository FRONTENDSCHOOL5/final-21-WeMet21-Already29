import React, {useEffect} from "react";
import PostItem from "../../components/Post/PostItem/PostItem";
import { List } from "./PostHomeFeedStyle";
import axios from "axios";

export default function PostHome({myFeed, setMyFeed}) {
  const getFeed = (page) => {
    return axios.get(
      `https://api.mandarin.weniv.co.kr/post/feed/?limit=10&skip=${page * 10}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-type": "application/json",
        },
      },
    )
  }
  
useEffect(() => {
  getFeed(1).then(res=> {
    console.log(res)
    setMyFeed(res.data.posts)})
}, []);

  return (
    <List>
      <PostItem myFeed={myFeed} />
    </List>
  );
}



