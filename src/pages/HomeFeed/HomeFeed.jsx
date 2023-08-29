import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

import Header from "../../components/Header/Header";
import Navigation from "../../components/NavBar/NavBar";
import Button from "../../components/Button/Button";
import UserPost from "../../components/Profile/ProfilePostSection/ProfilePost/ProfilePost";

import grayLogo from "../../assets/images/search-big.png";

import { EmptyWrapper, FeedSection } from "./HomeFeed.style";

export default function HomeFeed() {
  const [homeFeed, setHomeFeed] = useState(null);
  const pageEnd = useRef(null);
  const { getData: getHomeFeed, page } = useInfiniteScroll("post/feed", pageEnd);
  const navigate = useNavigate();

  useEffect(() => {
    getHomeFeed(page).then((json) =>
      setHomeFeed((prev) => {
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
      <Header type="logo" itemLength={homeFeed && homeFeed.length} />

      <FeedSection>
        {homeFeed && homeFeed.length === 0 ? (
          <EmptyWrapper>
            <img src={grayLogo} alt="로고이미지" />
            <h2>유저를 검색해 팔로우 해보세요!</h2>
            <Button type="button" category="basic" onClick={() => navigate("/search")}>
              검색하기
            </Button>
          </EmptyWrapper>
        ) : (
          homeFeed && (
            <ul>
              <UserPost posts={homeFeed} />
            </ul>
          )
        )}
        <div ref={pageEnd}></div>
      </FeedSection>

      <Navigation itemLength={homeFeed && homeFeed.length} />
    </>
  );
}
