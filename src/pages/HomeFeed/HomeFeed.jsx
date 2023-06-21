import React from "react";
import { Container } from "./HomeFeedStyle";
import Navigation from "../../components/Footer/FooterMenu/FooterMenu";
import PostHome from "./PostHomeFeed";
import EmptyHome from "./EmptyHomeFeed";
import Header from '../../components/Header/Header';

export default function Home() {
  return (
    <Container>
      <Header type="logo"/>
      {/* <EmptyHome /> */}
      <PostHome />
      <Navigation />
    </Container>
  );
}
