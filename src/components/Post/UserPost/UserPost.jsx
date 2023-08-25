import React from "react";
import { Link } from "react-router-dom";
import { imageErrorHandler } from "../../../utils/imageErrorHandler";
import CardHeader from "../../Card/CardHeader/CardHeader";
import CardContent from "../../Card/CardContent/CardContent";

function UserPost({ posts, isAlbum }) {
  return (
    <>
      {posts && !isAlbum ? (
        posts.map((post) => {
          return (
            <li key={post.id}>
              <CardHeader image={post.author.image} username={post.author.username} accountname={post.author.accountname} />
              <CardContent post={post} />
            </li>
          );
        })
      ) : posts.filter((post) => post.image).length ? (
        posts
          .filter((post) => post.image)
          .map((post) => {
            return (
              <li key={post.id}>
                <Link to={`/post/${post.id}`}>
                  <img src={post.image.split(",")[0]} alt="게시글 이미지" onError={imageErrorHandler} />
                </Link>
              </li>
            );
          })
      ) : (
        <strong>게시글이 없습니다</strong>
      )}
    </>
  );
}

export default UserPost;
