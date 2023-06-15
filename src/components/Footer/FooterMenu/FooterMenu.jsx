import React from 'react';
import { useLocation } from 'react-router-dom';
import { StyledTabMenu, StlyedNavLink } from './TabMenuStyle';
import homeIcon from '../../../assets/images/home.png'; 
import homeIconActive from '../../../assets/images/home-fill.png';
import storeIcon from '../../../assets/images/store.png';
import storeIconActive from '../../../assets/images/store-fill.png';
import uploadIcon from '../../../assets/images/edit.png';
import uploadIconActive from '../../../assets/images/edit-fill.png'
import profileIcon from '../../../assets/images/user.png';
import profileIconActive from '../../../assets/images/user-fill.png';

const TabMenu = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <StyledTabMenu>
      <StlyedNavLink to="/homefeed">
        <img
          src={pathname === '/homefeed' ? homeIconActive : homeIcon}
          alt="홈페이지 이동 이미지 버튼"
        />
        <p>홈</p>
      </StlyedNavLink>
      <StlyedNavLink to="/product">
        <img
          src={pathname === '/product' ? storeIconActive : storeIcon}
          alt="판매상품 이동 이미지 버튼"
        />
        <p>판매상품 </p>
      </StlyedNavLink>
      <StlyedNavLink to="/postupload">
        <img
          src={pathname === '/postupload' ? uploadIconActive : uploadIcon}
          alt="게시물 작성 이동 이미지 버튼"
        />
        <p>게시물 작성</p>
      </StlyedNavLink>
      <StlyedNavLink to={`/profile`}>
        <img
          src={
            pathname === `/profile`
              ? profileIconActive
              : profileIcon
          }
          alt="프로필 정보 이동 이미지 버튼"
        />
        <p>프로필</p>
      </StlyedNavLink>
    </StyledTabMenu>
  );
};

export default TabMenu;
