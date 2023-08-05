import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Footer/FooterMenu/FooterMenu";
import EmptyHome from "./EmptyHomeFeed";
import { FeedSection } from "./HomeFeedStyle";
import UserPost from "../../components/Post/UserPost/UserPost";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

export default function Home() {
  const [myFeed, setMyFeed] = useState(null);
  const pageEnd = useRef(null);
  const { getData, page } = useInfiniteScroll("post/feed", pageEnd);

  useEffect(() => {
    getData(page).then((json) =>
      setMyFeed((prev) => {
        if (prev) {
          return [...prev, ...json.posts];
        } else {
          return json.posts;
        }
      })
    );
  }, [page]);

  return (
    <>
      <Header type="logo" itemLength={myFeed && myFeed.length} />

      <FeedSection>
        {myFeed && myFeed.length === 0 && <EmptyHome />}
        {myFeed && myFeed.length !== 0 && (
          <ul>
            <UserPost posts={myFeed} />
          </ul>
        )}
        <div ref={pageEnd}></div>
      </FeedSection>

      <Navigation itemLength={myFeed && myFeed.length} />
    </>
  );
}
