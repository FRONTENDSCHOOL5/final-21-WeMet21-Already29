import { useLocation } from "react-router-dom";
import homeIcon from "../../../assets/images/icon-home.svg";
import fillHomeIcon from "../../../assets/images/home-fill.png";
import searchIcon from "../../../assets/images/search.png";
import fillSearchIcon from "../../../assets/images/search-fill.png";
import editIcon from "../../../assets/images/edit.png";
import fillEditIcon from "../../../assets/images/edit-fill.png";
import userIcon from "../../../assets/images/icon-user.svg";
import fillUserIcon from "../../../assets/images/icon-user-fill.svg";
import { NavWrapper, NavLink, StyledNavText } from './FooterMenuStyle';

export default function Navigation() {
  const location = useLocation();

  return (
    <NavWrapper>
      <NavLink
        to="/home"
        className={`nav-link ${location.pathname === "/home" ? "active" : ""}`}
      >
        <img
          src={location.pathname === "/home" ? fillHomeIcon : homeIcon}
          alt="홈"
        />
        <StyledNavText>홈</StyledNavText>
      </NavLink>

      <NavLink
        to="/search"
        className={`nav-link ${
          location.pathname === "/search" ? "active" : ""
        }`}
      >
        <img
          src={location.pathname === "/search" ? fillSearchIcon : searchIcon}
          alt="검색"
          width="24px"
        />
        <StyledNavText>검색</StyledNavText>
      </NavLink>

      <NavLink
        to="/makepost"
        className={`nav-link ${
          location.pathname === "/makepost" ? "active" : ""
        }`}
      >
        <img
          src={location.pathname === "/makepost" ? fillEditIcon : editIcon}
          alt="작성"
          width="24px"
        />
        <StyledNavText>게시물 작성</StyledNavText>
      </NavLink>

      <NavLink
        // eslint-disable-next-line no-undef
        to="/myprofile/:accountname"
        className={`nav-link ${
          location.pathname === "/myprofile/:accountname" ? "active" : ""
        }`}
      >
        <img
          src={
            location.pathname === "/myprofile/:accountname"
              ? fillUserIcon
              : userIcon
          }
          alt="프로필"
        />
        <StyledNavText>프로필</StyledNavText>
      </NavLink>
    </NavWrapper>
  );
}