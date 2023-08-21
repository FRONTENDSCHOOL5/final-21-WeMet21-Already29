import React, { useEffect, useState } from "react";
import comment from "../../../assets/images/icon-message-circle.png";
import heartImage from "../../../assets/images/uil_heart.png";
import fillHeart from "../../../assets/images/uil_fullHeart.png";
import { SwiperSlide, Swiper } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { PostContent, PostMenuWrap } from "./CardContentStyle";
import { Link, useNavigate } from "react-router-dom";
import { imageErrorHandler } from "../../../utils/imageErrorHandler";
import { heartButtonHandler } from "../../../utils/heartButtonHandler";
import useGetUserInfo from "../../../hooks/useGetUserInfo";
SwiperCore.use([Pagination]);

export default function CardContent({ post, commentLen }) {
  const navigator = useNavigate();
  const [postHeart, setPostHeart] = useState(false);
  const [heartCount, setHeartCount] = useState(0);
  const getUserInfo = useGetUserInfo();

  useEffect(() => {
    setPostHeart(post.hearted);
    setHeartCount(post.heartCount);
  }, [post]);

  const heart = {
    serverRequest() {
      postHeart ? heartButtonHandler.minus(post.id) : heartButtonHandler.plus(post.id);
    },
    toggle() {
      setPostHeart((prev) => !prev);
    },
    countHandle() {
      postHeart ? setHeartCount((prev) => prev - 1) : setHeartCount((prev) => prev + 1);
    },
  };

  const heartHandler = () => {
    heart.serverRequest();
    heart.toggle();
    heart.countHandle();
  };

  return (
    <PostContent>
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
          <img src={postHeart ? fillHeart : heartImage} className="heart-image" alt="좋아요 이미지" />
        </button>
        <p>
          <span className="a11y-hidden">좋아요 : </span>
          {heartCount}
        </p>

        <Link to={`/post/${post.id}`} onMouseDown={getUserInfo}>
          <img src={comment} className="comment-image" alt="댓글 이미지" />
          <p>
            <span className="a11y-hidden">댓글 : </span>
            {commentLen || post.commentCount}
          </p>
        </Link>
      </PostMenuWrap>

      <time dateTime={post.createdAt.slice(0, 10)}>{post.createdAt.slice(0, 10).replace("-", "년 ").replace("-", "월 ") + "일"}</time>
    </PostContent>
  );
}
