import React, { useEffect, useState } from "react";
import StyledSearch from "./SearchPageStyle";
import Header from "../../components/Header/Header";
import TabMenu from "../../components/Footer/FooterMenu/FooterMenu";
import CardHeader from "../../components/Card/CardHeader/CardHeader";
import { useNavigate } from "react-router-dom";

function Search() {
  const navigate = useNavigate();
  const [searchList, setSearchList] = useState([]);
  const [keyword, setKeyword] = useState("");

  function handleClick(accountname) {
    console.log(accountname);
    navigate(`/profile/${accountname}`, {
      state: {
        accountname: accountname,
      },
    });
  }

  useEffect(() => {
    if (keyword) {
      const GetUserInfo = async () => {
        try {
          const response = await fetch(
            `https://api.mandarin.weniv.co.kr/user/searchuser/?keyword=${keyword}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-type": "application/json",
              },
            }
          );
          const result = await response.json();

          setSearchList(result);
        } catch (err) {
          console.log(err);
        }
      };
      GetUserInfo();
    }
  }, [keyword]);

  useEffect(() => {
    const loading = setTimeout(() => {
      if (keyword !== "" && !keyword.startsWith("")) {
        Search();
      }
    }, 100);

    return () => {
      clearTimeout(loading);
    };
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
          <CardHeader
            image={item.image}
            username={item.username}
            accountname={item.accountname}
            key={item._id}
          />
        ))}
      </main>
      <TabMenu></TabMenu>
    </StyledSearch>
  );
}

export default Search;
