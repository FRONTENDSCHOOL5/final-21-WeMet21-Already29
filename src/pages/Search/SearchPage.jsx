import React, { useEffect, useState } from "react";
import StyledSearch from "./SearchPageStyle";
import Header from "../../components/Header/Header";
import TabMenu from "../../components/Footer/FooterMenu/FooterMenu";
import UserList from "../../components/UserList/UserList";
//import useAuthContext from '../../hooks/useAuthContext';

export default function Search() {
  const [searchList, setSearchList] = useState([]);
  const [keyword, setKeyword] = useState("");
  //const { auth } = useAuthContext();

  useEffect(() => {
    let getUsers;
    if (keyword) {
      getUsers = setTimeout(async () => {
        try {
          const response = await fetch(`https://api.mandarin.weniv.co.kr/user/searchuser/?keyword=${keyword}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-type": "application/json",
            },
          });
          const result = await response.json();

          setSearchList(result);
        } catch (err) {
          console.log(err);
        }
      }, 500);
    }
    return () => clearTimeout(getUsers);
  }, [keyword]);

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
        {searchList.map((item) => (
          <UserList searchList={searchList} keyword={keyword} key={item._id} username={item.username} accountname={`@ ${item.accountname}`} image={item.image} alt={`${item.username}님의 프로필 사진`} />
        ))}
      </main>
      <TabMenu></TabMenu>
    </StyledSearch>
  );
}
