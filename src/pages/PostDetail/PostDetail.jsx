import React from "react";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { Link, useParams } from "react-router-dom";
import { PostHeader, PostMenuWrap, PostContent } from "../../components/Post/PostStyle";
import comment from "../../assets/images/icon-message-circle.png";
import heart from "../../assets/images/uil_heart.png";
import fillHeart from "../../assets/images/uil_fullHeart.png";
import { heartButtonHandler } from "../../utils/heartButtonHandler";

export default function PostDetail() {
  const params = useParams();
  console.log(params);
  const [post, setPost] = useState(null);

  const fetchPost = () =>
    fetch(`https://api.mandarin.weniv.co.kr/post/${params.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => setPost(json.post));

  useEffect(() => {
    fetchPost();
  }, []);

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
    fetchPost();
  };
  return (
    <>
      {post && (
        <>
          <Header type="basic"></Header>
          <PostHeader>
            <img src={post.author.image} alt="게시글 작성자 프로필 사진" />
            <div>
              <h2>
                <span className="a11y-hidden">게시글 작성자 이름</span>
                {post.author.username}
              </h2>
              <p>@ {post.author.accountname}</p>
            </div>
          </PostHeader>
          <PostContent>
            <p className="post-text">{post.content}</p>
            {post.image ? <img src={post.image} className="post-image" alt="게시글 이미지" /> : ""}
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

              <img src={comment} className="comment-image" alt="댓글 이미지" />
              <p>
                <span className="a11y-hidden">댓글 : </span>
                {post.commentCount}
              </p>
            </PostMenuWrap>
            <time dateTime={post.createdAt.slice(0, 10)}>{post.createdAt.slice(0, 10).replace("-", "년 ").replace("-", "월 ") + "일"}</time>
          </PostContent>
        </>
      )}
    </>
  );
}
