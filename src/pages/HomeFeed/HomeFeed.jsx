import React, { useState } from "react";
import { Container } from "./HomeFeedStyle";
import Header from '../../components/Header/Header';
import Navigation from "../../components/Footer/FooterMenu/FooterMenu";
import PostHome from "./PostHomeFeed";
import EmptyHome from "./EmptyHomeFeed";

export default function Home() {
  const [myFeed, setMyFeed] = useState(null);
  console.log(myFeed)

  return (
    <Container>
      <Header type="logo" />
      <PostHome myFeed={myFeed} setMyFeed={setMyFeed} />
      {myFeed ? "" : <EmptyHome />}
      <Navigation />
    </Container>
  );
}

