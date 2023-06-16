import React, { useState, useEffect } from 'react';
import { StyledHomeFeedPage, TabMenuWrap } from './HomeFeedStyle';
import TabMenu from '../../components/TabMenu/TabMenu';
import { TopMainNav } from '../../components/Navbar/TopNavbar';
import { GreenBigButton } from '../../components/Button/Button';
import TopImg from '../../assets/images/main-logo.png'
import MainSearch from '../../assets/images/search-big.png'

function HomeFeedPage() {
  const [UserFeed, setUserFeed] = useState([]);

  const goSearch = () => {
    window.location.href = '/search';
  };
  // "https://api.mandarin.weniv.co.kr/user/login"
  useEffect(() => {
    async function getUserFeed() {
      await fetch('https://api.mandarin.weniv.co.kr/post/feed?limit=999', {
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setUserFeed(res.posts || []);
        });
    }
    getUserFeed();
  }, []);
  
  return (
    <StyledHomeFeedPage>
      <header>
        <TopMainNav></TopMainNav>
          <img src={TopImg} alt="" className='TopImg' />
      </header>

      {UserFeed.length !== 0 ? (
        <main>
          {UserFeed.map((post, id) => (
            <div key={id}>
              
            </div>
          ))}
        </main>
      ) : (
        <main className="non-post">
          <img src={ MainSearch } alt="회색이미지" />
            <span>유저를 검색해 팔로우 해보세요!</span>
            
            <GreenBigButton contents={"검색하기"} type="button" onClick={goSearch}></GreenBigButton>
        </main>
      )}
      <TabMenuWrap>
        <TabMenu />
      </TabMenuWrap>
    </StyledHomeFeedPage>
  );
}

export default HomeFeedPage;
