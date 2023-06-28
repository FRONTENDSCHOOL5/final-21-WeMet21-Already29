import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.li`
  position: relative;
  width: 100%;
  color: white;
  margin-bottom: 20px;
`;

const PostUser = styled(Link)`
  display: flex;
  gap: 13px;
`;

const TextComment = styled.p`
  margin-bottom: 25px;
`;

const PostUserImg = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
`;

const PostUserBox = styled.div`
  align-self: center;
`;

const PostUserName = styled.p`
  font-size: 14px;
  margin-bottom: 2px;
`;

const PostUserId = styled.p`
  font-size: 12px;
  color: #767676;
`;

const PostContent = styled.div`
  width: 100%;
  margin: 17px 0;
  font-size: 14px;
  line-height: 17px;
  color: black;
`;

const PostImg = styled.img`
  display: block;
  width: 100%;
  border: 0.5px solid #dbdbdb;
  border-radius: 10px;
  object-fit: contain;
  max-height: 500px;
`;

const PostInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
`;

const PostBtnBox = styled.div`
  display: flex;
  gap: 16px;
`;

const PostDate = styled.p`
  font-size: 10px;
  color: #767676;
`;

const BtnLike = styled.button`
  width: 41px;
  height: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #767676;
  padding: 0;
  border: 0;
  background-color: transparent;
`;

const BtnComment = styled(Link)`
  width: 38px;
  height: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #767676;
  padding: 0;
  border: 0;
  background-color: transparent;
`;

const BtnImg = styled.img`
  width: 20px;
  height: 20px;
`;

export { Container, TextComment, PostUser, PostUserImg, PostUserBox, PostUserName, PostUserId, PostContent, PostImg, PostInfoBox, PostBtnBox, PostDate, BtnLike, BtnComment, BtnImg };
