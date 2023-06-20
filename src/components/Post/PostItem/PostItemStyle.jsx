import styled from "styled-components";
import MoreIcon from "../../../assets/images/s-icon-more-vertical.svg";

const Container = styled.li`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  color: white;
`;

const PostUser = styled.div`
  display: flex;
  gap: 13px;
`;

const PostUserImg = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
`;

const PostUserBox = styled.a`
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
  height: 238px;
  margin: 17px 0 12px;
  border: 0.5px solid #dbdbdb;
  border-radius: 10px;
`;

const PostInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
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

const BtnComment = styled.button`
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

const BtnMore = styled.button`
  width: 18px;
  height: 18px;
  background: url(${MoreIcon});
  position: absolute;
  top: 7px;
  right: 0;
  padding: 0;
  border: 0;
  background-color: transparent;
`;

export { Container, PostUser, PostUserImg, PostUserBox, PostUserName, PostUserId, PostContent, PostImg, PostInfoBox, PostBtnBox, PostDate, BtnLike, BtnComment, BtnImg, BtnMore };
