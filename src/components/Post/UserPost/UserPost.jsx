import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { heartButtonHandler } from "../../../utils/heartButtonHandler";
import { imageErrorHandler } from "../../../utils/imageErrorHandler";

import CardHeader from "../../Card/CardHeader/CardHeader";
import CardContent from "../../Card/CardContent/CardContent";

function UserPost({ posts, isAlbum }) {
  const [isheartedArray, setIsHeartedArray] = useState([]);
  const [heartCountArray, setheartCountArray] = useState([]);
  const [prevPostLength, setPrevPostLength] = useState(0);

  console.log(prevPostLength);

  useEffect(() => {
    setPrevPostLength((prevNum) => {
      if (prevNum !== 0) {
        return posts.length - prevNum;
      } else {
        return posts.length;
      }
    });

    const heartedArr = [...isheartedArray];
    const heartCountArr = [...heartCountArray];

    for (let i = prevPostLength; i < posts.length; i++) {
      heartedArr.push(posts[i].hearted);
      heartCountArr.push(posts[i].heartCount);
    }

    setIsHeartedArray(heartedArr);
    setheartCountArray(heartCountArr);
    // eslint-disable-next-line
  }, [posts]);

  const heartHandler = (postId, postHeart, index) => {
    const changeHeartCountArr = [...heartCountArray];
    const changeHeartedArr = [...isheartedArray];

    if (postHeart) {
      heartButtonHandler.minus(postId);
      changeHeartCountArr.splice(index, 1, heartCountArray[index] - 1);
    } else {
      heartButtonHandler.plus(postId);
      changeHeartCountArr.splice(index, 1, heartCountArray[index] + 1);
    }

    changeHeartedArr.splice(index, 1, !changeHeartedArr[index]);
    setIsHeartedArray(changeHeartedArr);
    setheartCountArray(changeHeartCountArr);
  };

  return (
    <>
      {posts && !isAlbum
        ? posts.map((post, index) => {
            return (
              <li key={post.id}>
                <>
                  <CardHeader image={post.author.image} username={post.author.username} accountname={post.author.accountname} />
                  <CardContent index={index} post={post} heartHandler={heartHandler} heartCountArray={heartCountArray} isheartedArray={isheartedArray} />
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
