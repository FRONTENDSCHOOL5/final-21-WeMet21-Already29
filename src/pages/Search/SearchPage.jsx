import React from "react";
import useDebounce from "../../hooks/useDebounce";

import Header from "../../components/Header/Header";
import TabMenu from "../../components/NavBar/NavBar";
import UserList from "../../components/SearchUserList/SearchUserList";

import StyledSearch from "./SearchPage.style";

export default function SearchPage() {
  const { output: searchList, keyword, setKeyword } = useDebounce("user/searchuser/?keyword=");

  return (
    <StyledSearch>
      <Header
        type="search"
        inputtype="text"
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
      />
      <main className="searchMain">
        <h3 className="a11y-hidden">검색어와 일치하는 사용자의 리스트</h3>
        {searchList && searchList.map((item) => <UserList searchList={searchList} keyword={keyword} key={item._id} username={item.username} accountname={`@ ${item.accountname}`} image={item.image} alt={`${item.username}님의 프로필 사진`} />)}
      </main>
      <TabMenu></TabMenu>
    </StyledSearch>
  );
}
