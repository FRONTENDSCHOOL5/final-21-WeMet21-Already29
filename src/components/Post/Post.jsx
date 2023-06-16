import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Post() {
  const params = useParams();
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

  // console.log(posts);
  return (
    <>
      {posts
        ? posts.map((post) => {
            return (
              <li key={post.id}>
                <header>
                  <img src={post.author.image} alt="게시글 작성자 프로필 사진" />
                  <h2>
                    <span className="a11y-hidden">게시글 작성자 이름</span>
                    {post.author.username}
                  </h2>
                  <p>@ {post.author.accountname}</p>
                </header>
                <section>
                  <p>{post.content}</p>
                  {post.image ? <img src={post.image} alt="게시글 이미지" /> : ""}
                  <time>{post.updatedAt.slice(0, 10).replace("-", "년 ").replace("-", "월 ") + "일"}</time>
                </section>
              </li>
            );
          })
        : ""}
    </>
  );
}
