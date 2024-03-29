import { useContext } from "react";
import { useLocation } from "react-router-dom";

import useGetUserInfo from "../../hooks/useGetUserInfo";
import UserInfo from "../../contexts/LoginContext";

import goTop from "../../utils/goTop";

import homeIcon from "../../assets/images/IconHome.png";
import fillHomeIcon from "../../assets/images/FillIconHome.png";
import searchIcon from "../../assets/images/IconSearch.png";
import fillSearchIcon from "../../assets/images/FillIconSearch.png";
import editIcon from "../../assets/images/IconEdit.png";
import fillEditIcon from "../../assets/images/FillIconEdit.png";
import userIcon from "../../assets/images/IconUser.png";
import fillUserIcon from "../../assets/images/FillIconUser.png";

import { NavWrapper, NavLink, StyledNavText } from "./NavBar.style";

export default function NavBar({ itemLength }) {
  const location = useLocation();
  const pathname = location.pathname;
  const { userInfo } = useContext(UserInfo);
  const { accountname } = userInfo;
  const getUserInfo = useGetUserInfo();

  return (
    <NavWrapper>
      <NavLink to="/home" className={`nav-link ${pathname === "/home" ? "active" : ""}`} onClick={() => goTop(itemLength)}>
        <img src={pathname === "/home" ? fillHomeIcon : homeIcon} alt="홈" width="24px" />
        <StyledNavText>홈</StyledNavText>
      </NavLink>

      <NavLink to="/search" className={`nav-link ${pathname === "/search" ? "active" : ""}`}>
        <img src={pathname === "/search" ? fillSearchIcon : searchIcon} alt="검색" width="24px" />
        <StyledNavText>검색</StyledNavText>
      </NavLink>

      <NavLink to="/post/upload" className={`nav-link ${pathname === "/post/upload" ? "active" : ""}`}>
        <img src={pathname === "/post/upload" ? fillEditIcon : editIcon} alt="작성" width="24px" />
        <StyledNavText>게시물 작성</StyledNavText>
      </NavLink>

      <NavLink
        to={accountname && `/profile/${accountname}`}
        className={pathname.includes(`profile/${accountname}`) ? "nav-link active" : pathname.includes(`list/${accountname}`) ? "active" : ""}
        onClick={(e) => {
          if (pathname === `/profile/${accountname}`) {
            goTop();
            e.preventDefault();
          }
        }}
        onMouseDown={getUserInfo}
      >
        <img src={pathname.includes(`profile/${accountname}`) || pathname.includes(`product/list/${accountname}`) ? fillUserIcon : userIcon} alt="프로필" width="24px" />
        <StyledNavText>프로필</StyledNavText>
      </NavLink>
    </NavWrapper>
  );
}
