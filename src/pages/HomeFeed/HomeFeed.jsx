import React from "react";
import { Container } from "./HomeFeedStyle";
import Navigation from "../../components/Footer/FooterMenu/FooterMenu";
import PostHome from "./PostHomeFeed";
import EmptyHome from "./EmptyHomeFeed";

export default function Home() {
  return (
    <Container>
      {/* <EmptyHome /> */}
      <PostHome />
      <Navigation />
    </Container>
  );
}
