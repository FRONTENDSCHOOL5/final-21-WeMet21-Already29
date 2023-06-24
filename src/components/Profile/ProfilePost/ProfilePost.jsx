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
  }, [page]);

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
