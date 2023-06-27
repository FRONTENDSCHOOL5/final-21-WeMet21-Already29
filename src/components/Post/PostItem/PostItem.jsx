/* eslint-disable no-undef */
import React from "react";
import { Container, TextComment, PostUser, PostUserImg, PostUserBox, PostUserName, PostUserId, PostContent, PostImg, PostInfoBox, PostBtnBox, PostDate, BtnLike, BtnComment, BtnImg, BtnMore } from "./PostItemStyle";
import heart from "../../../assets/images/uil_heart.png";
import fillHeart from "../../../assets/images/uil_fullHeart.png";
import message from "../../../assets/images/icon-message-circle.png";
import { heartButtonHandler } from "../../../utils/heartButtonHandler";
import { imageErrorHandler, profileImgErrorHandler } from "../../../utils/imageErrorHandler";

export default function PostItem({ myFeed }) {
  function formatDate(dateString) {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    return `${year}년 ${month}월 ${day}일`;
  }
  console.log(myFeed);

  const heartHandler = async (postId, postHeart) => {
    if (postHeart) {
      const res = await heartButtonHandler.minus(postId);
      const json = await res.json();
      console.log(json);
    } else {
      const res = await heartButtonHandler.plus(postId);
      const json = await res.json();
      console.log(json);
    }
  };

  return (
    <ul>
      {myFeed &&
        myFeed.map((item) => (
          <Container key={item.id}>
            <PostUser to={`/profile/${item.author.accountname}`}>
              <PostUserImg src={item.author.image} alt="사용자 이미지" onError={profileImgErrorHandler} />
              <PostUserBox>
                <PostUserName>{item.author.username}</PostUserName>
                <PostUserId>@ {item.author.accountname}</PostUserId>
              </PostUserBox>
            </PostUser>
            <PostContent>
              <TextComment>
                {item.content.split("\n").map((line) => (
                  <span>
                    {line}
                    <br />
                  </span>
                ))}
              </TextComment>
              {item.image && <PostImg src={item.image} alt="포스트 이미지" onError={imageErrorHandler} />}
              <PostInfoBox>
                <PostBtnBox>
                  <BtnLike
                    onClick={() => {
                      heartHandler(item.id, item.hearted);
                    }}
                  >
                    <BtnImg src={item.hearted ? fillHeart : heart} className="heart-image" alt="게시글 좋아요" />
                    {item.heartCount}
                  </BtnLike>
                  <BtnComment to={`/post/${item.id}`}>
                    <BtnImg src={message} alt="게시글 댓글" />
                    {item.commentCount}
                  </BtnComment>
                </PostBtnBox>
                <PostDate>{formatDate(item.createdAt)}</PostDate>
              </PostInfoBox>
            </PostContent>
          </Container>
        ))}
    </ul>
  );
}
