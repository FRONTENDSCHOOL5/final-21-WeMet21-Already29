import React, { useEffect, useRef } from "react";
import PostItem from "../../components/Post/PostItem/PostItem";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

export default function PostHome({ myFeed, setMyFeed }) {
  const pageEnd = useRef(null);
  const { getData, page } = useInfiniteScroll("post/feed", pageEnd);

  useEffect(() => {
    getData(page)
      .then((res) => res.json())
      .then((json) =>
        setMyFeed((prev) => {
          if (prev) {
            return [...prev, ...json.posts];
          } else {
            return json.posts;
          }
        })
      );
  }, [page]);

  console.log(myFeed);

  return (
    <>
      {myFeed && myFeed.length !== 0 && <PostItem myFeed={myFeed} />}
      <div ref={pageEnd}></div>
    </>
  );
}
