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
  const { getData, page } = useInfiniteScroll(`post/${params.id}/userpost`, pageEnd);

  useEffect(() => {
    if (posts && posts.length !== 0 && posts[0].author.accountname !== params.id) {
      setPosts(null);
      console.log("포스트 리스트 모두 지우기");
    }

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
  }, [page, params]);

  // useEffect(() => {
  //   setPosts(null);

  //   console.log("파라미터가 바꼈을 시에만 첫 포스트들 불러오기");
  // }, [params]);

  console.log(posts);
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
