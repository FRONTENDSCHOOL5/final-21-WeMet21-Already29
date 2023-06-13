import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import IconArrowLeft from "../assets/images/IconArrowLeft.png";
import IconMoreVertical from "../assets/images/IconMoreVertical.png";
import Share from "../assets/images/Share.png";
import Talk from "../assets/images/Talk.png";
import Unmaned1 from "../assets/images/Unmaned1.png";

const Profile = styled.section`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 390px;
  height: 386px;
`;

const NavBasic = styled.nav`
  width: 390px;
  height: 48px;
`;

const BtnBack = styled.button`
  border: none;
  outline: none;
  background-color: white;
  float: left;
  margin: 13px 16px 13px 13px;
`;
const BtnMenu = styled.button`
  border: none;
  outline: none;
  background-color: white;
  float: right;
  margin: 13px 13px 13px 16px;
`;

const BtnBackImage = styled.img`
  background-color: white;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 42px;
  margin-top: 30px;
`;

const ProfileImage = styled.img``;

const ProfileFollowers = styled.div`
  margin-top: 10px;
  text-align: center;
`;

const ProfileFollowings = styled.div`
  margin-top: 10px;
  text-align: center;
`;

const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
  justify-content: center;
  margin-top: 13px;
`;

const ProfileBtnWrap = styled.div`
  display: flex;
  gap: 19.5px;
  align-items: center;
  justify-content: center;
  margin-top: 1.5rem;
`;

const NavStyle = styled(NavLink)`
  display: block;
  list-style: none;
  text-align: center;
  color: #767676;
  text-decoration: none;
  font-size: 0.8rem;
`;

const CircleDiv1 = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50px;
  border: 1px solid #dbdbdb;
`;

const TalkImage = styled.img`
  width: 15px;
  height: 15px;
  margin: 9.5px;
`;

const CircleDiv2 = styled.div`
  width: 34px;
  height: 34px;
  border: 1px solid #dbdbdb;
  border-radius: 50px;
`;

const ShareImage = styled.img`
  width: 15px;
  height: 15px;
  margin: 9.5px;
`;

const FollowBtn = styled.button`
  border: none;
  width: 120px;
  height: 34px;
  background-color: #058b2e;
  border-radius: 10px;
  color: #fff;
`;

const ProfileName = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  margin-top: 1rem;
`;

const ProfileAccount = styled.span`
  font-size: 0.75rem;
  line-height: 0.875rem;
  color: #767676;
  margin-top: 0.375rem;
`;

const ProfileDesc = styled.p`
  font-size: 0.875rem;
  line-height: 0.875rem;
  margin-top: 1rem;
  color: #767676;
`;

export default function MyProfile() {
  return (
    <>
      <Profile>
        <NavBasic>
          <BtnBack>
            <BtnBackImage src={IconArrowLeft} />
          </BtnBack>
          <BtnMenu>
            <BtnBackImage src={IconMoreVertical} />
          </BtnMenu>
        </NavBasic>
        <main>
          <section className="profile">
            <h1 className="a11y-hidden">로그인</h1>
            <section id="content" className="profile-sec">
              <h2 className="a11y-hidden">프로필 영역</h2>
              <div className="container">
                <div className="ProfileWrap">
                  <ProfileContainer>
                    <ProfileFollowers>
                      <h2>0</h2>
                      <p>followers</p>
                    </ProfileFollowers>
                    <ProfileImage src={Unmaned1} />
                    <ProfileFollowings>
                      <h2>0</h2>
                      <p>followings</p>
                    </ProfileFollowings>
                  </ProfileContainer>

                  <CenterContainer>
                    <ProfileName>애월읍 위니브 감귤농장</ProfileName>
                    <ProfileAccount>@weniv_Mandarin </ProfileAccount>
                    <ProfileDesc>애월읍 감귤 전국 배송, 귤따기 체험, 감귤 농장 </ProfileDesc>
                  </CenterContainer>

                  <ProfileBtnWrap>
                    <NavStyle>
                      <CircleDiv1>
                        <TalkImage src={Talk} />
                      </CircleDiv1>
                    </NavStyle>
                    <FollowBtn>팔로우</FollowBtn>
                    <NavStyle>
                      <CircleDiv2>
                        <ShareImage src={Share} />
                      </CircleDiv2>
                    </NavStyle>
                  </ProfileBtnWrap>
                </div>
              </div>
            </section>
          </section>
        </main>
      </Profile>
    </>
  );
}
