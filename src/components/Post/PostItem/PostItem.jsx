/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import { Container, TextComment, PostUser, PostUserImg, PostUserBox, PostUserName, PostUserId, PostContent, PostImg, PostInfoBox, PostBtnBox, PostDate, BtnLike, BtnComment, BtnImg, BtnMore } from "./PostItemStyle";
import heart from "../../../assets/images/uil_heart.png";
import fillHeart from "../../../assets/images/uil_fullHeart.png";
import message from "../../../assets/images/icon-message-circle.png";
import { heartButtonHandler } from "../../../utils/heartButtonHandler";
import { imageErrorHandler, profileImgErrorHandler } from "../../../utils/imageErrorHandler";
import { SwiperSlide, Swiper } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

SwiperCore.use([Pagination]);

export default function PostItem({ myFeed }) {
  const [ishearted, setIsHearted] = useState([]);
  const [heartCount, setHeartCount] = useState([]);
  const [prevFeedLength, setPrevFeedLength] = useState(0);

  console.log(prevFeedLength);
  useEffect(() => {
    setPrevFeedLength((prevNum) => {
      if (prevNum !== 0) {
        return myFeed.length - prevNum;
      } else {
        return myFeed.length;
      }
    });

    const heartedArr = [...ishearted];
    const heartCountArr = [...heartCount];

    for (let i = prevFeedLength; i < myFeed.length; i++) {
      heartedArr.push(myFeed[i].hearted);
      heartCountArr.push(myFeed[i].heartCount);
    }

    setIsHearted(heartedArr);
    setHeartCount(heartCountArr);
  }, [myFeed]);

  const heartHandler = (feedId, feedHeart, index) => {
    const changeHeartCountArr = [...heartCount];
    const changeHeartedArr = [...ishearted];

    if (feedHeart) {
      heartButtonHandler.minus(feedId);
      changeHeartCountArr.splice(index, 1, heartCount[index] - 1);
    } else {
      heartButtonHandler.plus(feedId);
      changeHeartCountArr.splice(index, 1, heartCount[index] + 1);
    }

    changeHeartedArr.splice(index, 1, !changeHeartedArr[index]);
    setIsHearted(changeHeartedArr);
    setHeartCount(changeHeartCountArr);
  };

  function formatDate(dateString) {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    return `${year}년 ${month}월 ${day}일`;
  }
  console.log(myFeed);

  return (
    <ul>
      {myFeed &&
        myFeed.map((item, index) => (
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
                {item.content.split("\n").map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </TextComment>

              {item.image && item.image.split(",").length > 1 && (
                <Swiper pagination={{ clickable: true }} slidesPerView={1}>
                  {item.image.split(",").map((item, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <PostImg src={item} alt="포스트 이미지" onError={imageErrorHandler} />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              )}
              {item.image && item.image.split(",").length === 1 && <PostImg src={item.image} alt="포스트 이미지" onError={imageErrorHandler} />}

              <PostInfoBox>
                <PostBtnBox>
                  <BtnLike
                    onClick={() => {
                      heartHandler(item.id, ishearted[index], index);
                    }}
                  >
                    <BtnImg src={ishearted[index] ? fillHeart : heart} className="heart-image" alt="게시글 좋아요" />
                    {heartCount[index]}
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
