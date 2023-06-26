import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Footer/FooterMenu/FooterMenu";
import PostHome from "./PostHomeFeed";
import EmptyHome from "./EmptyHomeFeed";
import { FeedSection } from "./HomeFeedStyle";

export default function Home() {
  const [myFeed, setMyFeed] = useState(null);
  console.log(myFeed);

  return (
    <>
      <Header type="logo" itemLength={myFeed && myFeed.length} />

      <FeedSection>
        <PostHome myFeed={myFeed} setMyFeed={setMyFeed} />
        {myFeed && myFeed.length === 0 && <EmptyHome />}
      </FeedSection>

      <Navigation itemLength={myFeed && myFeed.length} />
    </>
  );
}
