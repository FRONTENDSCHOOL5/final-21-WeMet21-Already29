import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PostHeader, PostMenuWrap, PostContent } from "./UserPostStyle";
import comment from "../../../assets/images/icon-message-circle.png";
import heart from "../../../assets/images/uil_heart.png";
import fillHeart from "../../../assets/images/uil_fullHeart.png";
import { heartButtonHandler } from "../../../utils/heartButtonHandler";
import { imageErrorHandler, profileImgErrorHandler } from "../../../utils/imageErrorHandler";
import { SwiperSlide, Swiper } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
SwiperCore.use([Pagination]);

function UserPost({ posts, isAlbum }) {
  const [ishearted, setIsHearted] = useState([]);
  const [heartCount, setHeartCount] = useState([]);
  const [prevPostLength, setPrevPostLength] = useState(0);
  const navigator = useNavigate();
  console.log(prevPostLength);

  useEffect(() => {
    setPrevPostLength((prevNum) => {
      if (prevNum !== 0) {
        return posts.length - prevNum;
      } else {
        return posts.length;
      }
    });

    const heartedArr = [...ishearted];
    const heartCountArr = [...heartCount];

    for (let i = prevPostLength; i < posts.length; i++) {
      heartedArr.push(posts[i].hearted);
      heartCountArr.push(posts[i].heartCount);
    }

    setIsHearted(heartedArr);
    setHeartCount(heartCountArr);
  }, [posts]);

  const heartHandler = (postId, postHeart, index) => {
    const changeHeartCountArr = [...heartCount];
    const changeHeartedArr = [...ishearted];

    if (postHeart) {
      heartButtonHandler.minus(postId);
      changeHeartCountArr.splice(index, 1, heartCount[index] - 1);
    } else {
      heartButtonHandler.plus(postId);
      changeHeartCountArr.splice(index, 1, heartCount[index] + 1);
    }

    changeHeartedArr.splice(index, 1, !changeHeartedArr[index]);
    setIsHearted(changeHeartedArr);
    setHeartCount(changeHeartCountArr);
  };

  return (
    <>
      {posts && !isAlbum
        ? posts.map((post, index) => {
            return (
              <li key={post.id}>
                <>
                  <PostHeader>
                    <img src={post.author.image} alt="게시글 작성자 프로필 사진" onError={profileImgErrorHandler} />
                    <div>
                      <h2>
                        <span className="a11y-hidden">게시글 작성자 이름</span>
                        {post.author.username}
                      </h2>
                      <p>@ {post.author.accountname}</p>
                    </div>
                  </PostHeader>
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
                    <PostMenuWrap>
                      <button
                        type="button"
                        onClick={() => {
                          heartHandler(post.id, ishearted[index], index);
                          console.log(index);
                        }}
                      >
                        <img src={ishearted[index] ? fillHeart : heart} className="heart-image" alt="좋아요 이미지" />
                      </button>
                      <p>
                        <span className="a11y-hidden">좋아요 : </span>
                        {heartCount[index]}
                      </p>

                      <Link to={`/post/${post.id}`}>
                        <img src={comment} className="comment-image" alt="댓글 이미지" />
                        <p>
                          <span className="a11y-hidden">댓글 : </span>
                          {post.commentCount}
                        </p>
                      </Link>
                    </PostMenuWrap>
                    <time dateTime={post.createdAt.slice(0, 10)}>{post.createdAt.slice(0, 10).replace("-", "년 ").replace("-", "월 ") + "일"}</time>
                  </PostContent>
                </>
              </li>
            );
          })
        : ""}
      {posts &&
        isAlbum &&
        posts
          .filter((post) => {
            return post.image;
          })
          .map((post, index) => {
            return (
              <li key={post.id}>
                <Link to={`/post/${post.id}`}>
                  <img src={post.image.split(",")[0]} alt="게시글 이미지" onError={imageErrorHandler} />
                </Link>
              </li>
            );
          })}
    </>
  );
}

export default UserPost;
