import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useGetUserInfo from "../../../hooks/useGetUserInfo";

import { SwiperSlide, Swiper } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";

import { imageErrorHandler } from "../../../utils/imageErrorHandler";
import { heartButtonHandler } from "../../../utils/heartButtonHandler";

import comment from "../../../assets/images/icon-message-circle.png";
import heartImage from "../../../assets/images/uil_heart.png";
import fillHeart from "../../../assets/images/uil_fullHeart.png";

import { PostContent, PostMenuWrap } from "./CardContent.style";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

SwiperCore.use([Pagination]);

export default function CardContent({ post, commentCount }) {
  const navigator = useNavigate();
  const [isHearted, setIsHearted] = useState(false);
  const [heartCount, setHeartCount] = useState(0);
  const getUserInfo = useGetUserInfo();
  const { pathname } = useLocation();

  useEffect(() => {
    setIsHearted(post.hearted);
    setHeartCount(post.heartCount);
  }, [post]);

  const heart = {
    serverRequest() {
      isHearted ? heartButtonHandler.minus(post.id) : heartButtonHandler.plus(post.id);
    },
    toggle() {
      setIsHearted((prev) => !prev);
    },
    countHandle() {
      isHearted ? setHeartCount((prev) => prev - 1) : setHeartCount((prev) => prev + 1);
    },
  };

  const heartHandler = () => {
    heart.serverRequest();
    heart.toggle();
    heart.countHandle();
  };

  return (
    <PostContent>
      {pathname.includes("post") && <h2 className="a11y-hidden">게시물 상세</h2>}
      <p
        className="post-text"
        onClick={() => {
          navigator(`/post/${post.id}`);
        }}
      >
        {post.content.split("\n").map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </p>

      {post.image && post.image.split(",").length > 1 && (
        <Swiper pagination={{ clickable: true }}>
          {post.image.split(",").map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <img src={item} className="post-image" alt="포스트 이미지" onError={imageErrorHandler} height={390} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
      {post.image && post.image.split(",").length === 1 && <img src={post.image} className="post-image" alt="포스트 이미지" onError={imageErrorHandler} />}

      <PostMenuWrap>
        <button type="button" onClick={() => heartHandler()}>
          <img src={isHearted ? fillHeart : heartImage} className="heart-image" alt="좋아요 이미지" />
        </button>
        <p>
          <span className="a11y-hidden">좋아요 : </span>
          {heartCount}
        </p>

        <Link to={`/post/${post.id}`} onClick={getUserInfo}>
          <img src={comment} className="comment-image" alt="댓글 이미지" />
          <p>
            <span className="a11y-hidden">댓글 : </span>
            {commentCount || post.commentCount}
          </p>
        </Link>
      </PostMenuWrap>

      <time dateTime={post.createdAt.slice(0, 10)}>{post.createdAt.slice(0, 10).replace("-", "년 ").replace("-", "월 ") + "일"}</time>
    </PostContent>
  );
}
