import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, PostUser, PostUserImg, PostUserBox, PostUserName, PostUserId, PostContent, PostImg, PostInfoBox, PostBtnBox, PostDate, BtnLike, BtnComment, BtnImg, BtnMore  } from "./PostItemStyle";
import axios from "axios";

export default function PostItem({ modalOpen }) {
  // const navigate = useNavigate();
  function moveDetail() {
    //  navigate("/detailpost");
  }
  const [postInfo, setPostInfo] = useState([]);
  const [authorInfo, setAuthorInfo] = useState([]);
  const [today, setToday] = useState('');

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setToday(formattedDate);
  }, []);

  useEffect(() => {
    getUserInfo();
  }, []);
  const getUserInfo = async () => {
    const token = localStorage.getItem("token");
    const accountname = localStorage.getItem("accountname");
    console.log(token);
    const res = await axios.get(
      `https://api.mandarin.weniv.co.kr/post/${accountname}/userpost`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      },
    );
    
    const posts = res.data.post;
    const authors = res.data.post[0].author;
    setPostInfo(posts);
    setAuthorInfo(authors);
  };
  console.log(postInfo);
  console.log(authorInfo);

  return (
    <>
      {postInfo.map(item => (
        <Container key={item.id}>
          <PostUser>
            <PostUserImg src={authorInfo.image} alt="사용자 이미지" />
            <PostUserBox>
              <PostUserName>{authorInfo.username}</PostUserName>
              <PostUserId>@ {authorInfo.accountname}</PostUserId>
            </PostUserBox>
          </PostUser>
          <PostContent>
            <p>{item.content}</p>
            <PostImg src={item.image} alt="포스트 이미지" />
            <PostInfoBox>
              <PostBtnBox>
                <BtnLike>
                  <BtnImg
                    src={
                      require("../../../assets/images/icon-heart.svg").default
                    }
                    alt="게시글 좋아요"
                  />
                  {item.heartCount}
                </BtnLike>
                <BtnComment onClick={moveDetail}>
                  <BtnImg
                    src={
                      require("../../../assets/images/icon-message-circle-1.svg")
                        .default
                    }
                    alt="게시글 댓글"
                  />
                  {item.commentCount}
                </BtnComment>
              </PostBtnBox>
              <PostDate>{today}</PostDate>
            </PostInfoBox>
          </PostContent>
          <BtnMore onClick={modalOpen}></BtnMore>
        </Container>
      ))}
    </>
  );
}

