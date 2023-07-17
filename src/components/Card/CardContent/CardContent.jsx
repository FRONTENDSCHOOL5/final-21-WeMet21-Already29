import React from "react";
import comment from "../../../assets/images/icon-message-circle.png";
import heart from "../../../assets/images/uil_heart.png";
import fillHeart from "../../../assets/images/uil_fullHeart.png";
import { SwiperSlide, Swiper } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { PostContent, PostMenuWrap } from "./CardContentStyle";
import { Link, useNavigate } from "react-router-dom";
import { imageErrorHandler } from "../../../utils/imageErrorHandler";
SwiperCore.use([Pagination]);

export default function CardContent({ post, index, heartHandler, heartCountArray, isheartedArray }) {
  const navigator = useNavigate();
  const isPostFeed = heartHandler && heartCountArray && isheartedArray;
  console.log(post);
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
                <img src={item} className="post-image" alt="포스트 이미지" onError={imageErrorHandler} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
      {post.image && post.image.split(",").length === 1 && <img src={post.image} className="post-image" alt="포스트 이미지" onError={imageErrorHandler} />}

      {isPostFeed ? (
        <PostMenuWrap>
          <button
            type="button"
            onClick={() => {
              heartHandler(post.id, isheartedArray[index], index);
            }}
          >
            <img src={isheartedArray[index] ? fillHeart : heart} className="heart-image" alt="좋아요 이미지" />
          </button>
          <p>
            <span className="a11y-hidden">좋아요 : </span>
            {heartCountArray[index]}
          </p>

          <Link to={`/post/${post.id}`}>
            <img src={comment} className="comment-image" alt="댓글 이미지" />
            <p>
              <span className="a11y-hidden">댓글 : </span>
              {post.commentCount}
            </p>
          </Link>
        </PostMenuWrap>
      ) : (
        <PostMenuWrap>
          <button
            type="button"
            onClick={() => {
              heartHandler(post.id, post.hearted);
            }}
          >
            <img src={post.hearted ? fillHeart : heart} className="heart-image" alt="좋아요 이미지" />
          </button>
          <p>
            <span className="a11y-hidden">좋아요 : </span>
            {post.heartCount}
          </p>

          <Link to={`/post/${post.id}`}>
            <img src={comment} className="comment-image" alt="댓글 이미지" />
            <p>
              <span className="a11y-hidden">댓글 : </span>
              {post.commentCount}
            </p>
          </Link>
        </PostMenuWrap>
      )}

      <time dateTime={post.createdAt.slice(0, 10)}>{post.createdAt.slice(0, 10).replace("-", "년 ").replace("-", "월 ") + "일"}</time>
    </PostContent>
  );
}
