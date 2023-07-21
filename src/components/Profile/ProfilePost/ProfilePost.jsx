import React, { useEffect, useRef, useState } from "react";
import { PostSection, PostSectionHeader, Posts } from "./ProfilePostStyle";
import list from "../../../assets/images/icon-post-list-on.png";
import album from "../../../assets/images/icon-post-album-on.png";
import { useParams } from "react-router-dom";
import UserPost from "../../Post/UserPost/UserPost";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";

export default function ProfilePost() {
  const [isAlbum, setIsAlbum] = useState(false);
  const [posts, setPosts] = useState(null);
  const params = useParams();
  const pageEnd = useRef(null);
  const myAccountname = localStorage.getItem("accountname");
  const { getData, page } = useInfiniteScroll(`post/${params.id}/userpost`, pageEnd);

  const fetchPost = () => {
    getData(page)
      .then((res) => res.json())
      .then((json) =>
        setPosts((prev) => {
          if (prev) {
            return [...prev, ...json.post];
          } else {
            return json.post;
          }
        })
      );
  };

  useEffect(() => {
    // 게시글이 있는 다른 프로필에서 내 프로필로 넘어올 때,
    // 이전에 있던 포스트 데이터의 작성자가 로그인한 유저가 아닐 때
    if (posts && posts.length !== 0 && posts[0].author.accountname !== params.id) {
      console.log("case0");
      // 이전 포스트 데이터 삭제
      setPosts(null);
      getData(0)
        .then((res) => res.json())
        .then((json) => setPosts(json.post));
    }
    // 게시글이 없는 다른 프로필에서 내 프로필로 넘어올 때
    else if (posts && posts.length === 0 && myAccountname === params.id) {
      console.log("case1");
      getData(0)
        .then((res) => res.json())
        .then((json) => setPosts(json.post));
    }
    // 다른 페이지에서 내 프로필로 넘어올 때
    else if (myAccountname === params.id) {
      console.log("case2");
      fetchPost();
    }
    // 로그인 한 유저의 프로필이 아닐 때
    else {
      console.log("case3");
      fetchPost();
    }
    // eslint-disable-next-line
  }, [page, params]);

  return (
    <>
      {posts && posts.length !== 0 && (
        <PostSection>
          <PostSectionHeader>
            <h2 className="a11y-hidden">게시물</h2>
            <button
              onClick={() => {
                setIsAlbum(false);
              }}
            >
              <img src={list} alt="리스트로 보기" style={{ opacity: isAlbum ? 0.5 : 1 }} />
            </button>
            <button
              onClick={() => {
                setIsAlbum(true);
              }}
            >
              <img src={album} alt="앨범으로 보기" style={{ opacity: isAlbum ? 1 : 0.5 }} />
            </button>
          </PostSectionHeader>
          <Posts isAlbum={isAlbum}>
            <UserPost posts={posts} isAlbum={isAlbum} />
          </Posts>
        </PostSection>
      )}
      <div ref={pageEnd} />
    </>
  );
}
