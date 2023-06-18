import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ProductContent, ProductHeader } from "./PostStyle";

export default function Post(props) {
  const params = useParams();

  // console.log(props.listView);
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    fetch(`https://api.mandarin.weniv.co.kr/post/${params.id}/userpost`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => setPosts(json.post));
  }, []);

  console.log(posts);
  return (
    <>
      {posts && !props.isAlbum
        ? posts.map((post) => {
            return (
              <li key={post.id}>
                <>
                  <ProductHeader>
                    <img src={post.author.image} alt="게시글 작성자 프로필 사진" />
                    <div>
                      <h2>
                        <span className="a11y-hidden">게시글 작성자 이름</span>
                        {post.author.username}
                      </h2>
                      <p>@ {post.author.accountname}</p>
                    </div>
                  </ProductHeader>
                  <ProductContent>
                    <p>{post.content}</p>
                    {post.image ? <img src={post.image} alt="게시글 이미지" /> : ""}
                    <time>{post.updatedAt.slice(0, 10).replace("-", "년 ").replace("-", "월 ") + "일"}</time>
                  </ProductContent>
                </>
              </li>
            );
          })
        : ""}
      {posts && props.isAlbum
        ? posts
            .filter((post) => {
              return post.image;
            })
            .map((post) => {
              return (
                <li key={post.id}>
                  <img src={post.image} alt="게시글 이미지" />
                </li>
              );
            })
        : ""}
    </>
  );
}
