import { Link } from "react-router-dom";
import styled from "styled-components";

export const ProfileSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
  padding: 30px 0 26px;
  margin-bottom: 6px;
  border: 1px solid var(--line-gray-color);
  border-top: 0;

  .profile-navbar {
    button:nth-child(2) {
      margin-left: 18px;
    }
  }
`;

export const ProfileSectionHeader = styled.div`
  display: flex;
  align-items: center;

  p {
    color: var(--gray-color);
    line-height: 1.5;
  }

  img {
    width: 110px;
    height: 110px;
    margin: 0 4rem;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const FollowCountSpan = styled.span`
  display: block;
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--font-black-color);
`;

export const ProfileIntro = styled.div`
  color: var(--gray-color);

  .user-name {
    color: initial;
    font-size: 1.6rem;
    font-weight: bold;
  }

  .account-name {
    font-size: 1.2rem;
    margin: 10px 0 14px;
  }

  .intro {
    font-size: 1.4rem;
  }

  .fassion-info {
    margin: 10px 0 5px;
    font-size: 1.4rem;
  }
`;

export const ProfileNavBar = styled.div`
  display: flex;
  gap: 8px;
`;

export const ShareButton = styled.button`
  background-color: var(--white-color);
  border-radius: 50%;
  border: 1px solid var(--line-gray-color);
  width: 34px;
  height: 34px;
  padding: 0;
  vertical-align: top;

  img {
    width: 20px;
    height: 20px;
  }
`;

export const WhiteButton = styled(Link)`
  border: 0;
  padding: 0;
  width: 12rem;
  height: 3.4rem;
  background-color: var(--white-color);
  border: 1px solid #767676;
  border-radius: 10px;
  color: var(--gray-color);
  line-height: 36px;
`;
